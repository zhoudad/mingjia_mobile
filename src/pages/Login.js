import React, { Component } from 'react';
import {
  View, Text, StyleSheet, KeyboardAvoidingView, ScrollView, TouchableOpacity,
  TextInput, Image, ToastAndroid, Dimensions, AsyncStorage,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import DeviceInfo from 'react-native-device-info';
import axios from 'axios'
import px from '../utils/px'
import { BoxShadow } from 'react-native-shadow'
import Touchable from '../components/Touchable'
import UMShareModule from '../utils/ShareUtil'
import { storage, saveToken } from '../utils/storage'

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountNumber: '请输入手机号',
      password: '请输入验证码',
      btnText: '获取验证码',
      user_tel: '',
      user_code: '',
      ip: '',
      CountdownNum: 60,
      send: false,
      isSend: false,
      sendDate: null,
      refresh_token: '',
      result: ''
    };
  }

  componentDidMount() {
    DeviceInfo.getIpAddress().then(res => {
      this.setState({ ip: res })
    })
    DeviceInfo.getCarrier().then(res => {
      this.setState({ ip_name: res })
    })
  }
  sendVerification = async () => {
    let { CountdownNum } = this.state
    let myreg = /^1[3456789]\d{9}$/;
    console.log(this.state.user_tel)
    if (!this.state.user_tel) {
      ToastAndroid.show('手机号不能为空', ToastAndroid.SHORT);
    } else {
      if (myreg.test(this.state.user_tel)) {
        this.timer = setInterval(() => {
          if (this.state.CountdownNum >= 0) {
            this.setState({
              CountdownNum: CountdownNum >= 10 ? --CountdownNum : '0' + --CountdownNum,
              btnText: CountdownNum,
              isSend: true
            })
          } else {
            clearInterval(this.timer)
            this.setState({
              btnText: '重新发送',
              CountdownNum: 59,
              isSend: false
            })
          }
        }, 1000)
        await axios({
          method: 'post',
          url: 'http://218.108.34.222:8080/sendcode',
          data: {
            'tel': this.state.user_tel,
          }
        }).then((res) => {
          ToastAndroid.show('发送成功', ToastAndroid.SHORT);
        })
      } else {
        ToastAndroid.show('手机号格式不正确', ToastAndroid.SHORT);
      }
    }
  }

  loginIn = () => {
    if (!this.state.user_code) {
      ToastAndroid.show('验证码不能为空', ToastAndroid.SHORT);
      return
    }
    const { user_tel, user_code, ip, ip_name } = this.state;
    const { navigation } = this.props;
    axios({
      method: 'POST',
      url: 'http://218.108.34.222:8080/userinfo',
      data: { user_tel, user_code, ip, ip_name, 'user_ftime': new Date().getTime(), }
    }).then((res) => {
      console.log(res)
      if (res.data.status == 101 || res.data.status == 0 || res.data.status == 102) {
        // saveToken({ access_token: res.data.token })
        storage.save({
          key: 'userId',
          data: { user_id: res.data.result.user_id },
        });
        navigation.navigate('Select', { Token: res.data.token })
      }
    }).catch(err => {
      ToastAndroid.show('登录失败', ToastAndroid.SHORT);
    });
  }
  // 微信登陆授权
  weixinLogin = () => {
    UMShareModule.auth(2, async (code, result, message) => {
      let data = {
        city: result.city,
        country: result.country,
        headimgurl: result.iconurl,
        language: result.language,
        nickname: result.name,
        openid: result.openid,
        province: result.province,
        sex: result.gender == '男' ? 1 : 2,
        unionid: result.unionid
      }
      // console.log(data)
      if (code == 0) {
        fetch('http://218.108.34.222:8080/wechat', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }).then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson)
            switch (responseJson.status) {
              case '0':
                this.props.navigation.navigate('Registered', { id: responseJson.id })
                break;
              case '1':
                ToastAndroid.show('登录失败', ToastAndroid.SHORT);
                break;
              case '2':
                ToastAndroid.show('数据为空', ToastAndroid.SHORT);
                break;
              case '3':
                storage.save({
                  key: 'userId',
                  data: { user_id: responseJson.user_id },
                });
                this.props.navigation.navigate('Select')
                break;
              case '4':
                this.props.navigation.navigate('Registered', { id: responseJson.id })
                break;
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
      // this.props.navigation.navigate('Registered')
      // if (code == 0) {
      //   axios({
      //     url: 'http://218.108.34.222:8080/wechat',
      //     data: data,
      //     method: 'post'
      //   }).then(res => {
      //     console.log(res)
      //     switch (res.data.status) {
      //       case '0':
      //         this.props.navigation.navigate('Registered', { id: res.data.id })
      //         break;
      //       case '1':
      //         ToastAndroid.show('登录失败', ToastAndroid.SHORT);
      //         break;
      //       case '2':
      //         ToastAndroid.show('数据为空', ToastAndroid.SHORT);
      //         break;
      //       case '3':
      //         storage.save({
      //           key: 'userId',
      //           data: { user_id: res.data.result.user_id },
      //         });
      //         this.props.navigation.navigate('Select')
      //         break;
      //       case '4':
      //         this.props.navigation.navigate('Registered', { id: res.data.id })
      //         break;
      //     }
      //   }).catch(err => {
      //     console.log(err)
      //   })
      // }
    })
  }

  render() {
    const shadowOpt = {
      height: px(90),
      width: px(540),
      color: "#EA4C4C",
      border: px(25),
      radius: px(0),
      opacity: 0.1,
      x: 0,
      y: px(8),
      style: { marginTop: px(130), borderRadius: px(45) }
    }
    const { navigation } = this.props;
    return (
      <ScrollView contentContainerStyle={styles.loginScreen}>
        <KeyboardAvoidingView contentContainerStyle={{ flex: 1, alignItems: 'center' }} >
          <View style={styles.header}>
            <View style={{ width: px(140), height: px(140), borderRadius: px(70), backgroundColor: '#FFE1E1', justifyContent: 'center', alignItems: 'center' }}>

              <Text style={{ fontFamily: 'DFWaWaTC-W5', color: '#EA4C4C', fontSize: px(32) }}>Logo</Text>
            </View>
            {/* <Image style={{ width: px(140), height: px(140) }} source={require('../assets/images/a_soft_wechat.png')} /> */}
          </View>
          <View style={styles.form}>
            <View style={styles.item}>
              <Text style={styles.label}>手机号:</Text>
              <TextInput
                style={styles.input}
                placeholder={'请输入手机号'}
                placeholderTextColor={'#A8ABB3'}
                keyboardType={'number-pad'}
                underlineColorAndroid='transparent'
                onChangeText={(text) => this.setState({ user_tel: text })}
              ></TextInput>
            </View>
            <View style={styles.item}>
              <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <Text style={styles.label}>验证码:</Text>
                <TextInput
                  style={styles.input}
                  placeholder={'请输入验证码'}
                  placeholderTextColor={'#A8ABB3'}
                  keyboardType={'number-pad'}
                  // password={true}
                  underlineColorAndroid='transparent'
                  onChangeText={(text) => this.setState({ user_code: text })}
                ></TextInput>
              </View>
              <Touchable style={{ paddingHorizontal: 15, }} activeOpacity={0.8} onPress={() => this.state.isSend ? false : this.sendVerification()}>
                <Text style={{ lineHeight: 40, textAlign: 'right', color: '#ea4c4c', fontSize: px(24) }} >
                  {this.state.isSend ? this.state.btnText + 's' : this.state.btnText}
                </Text>
              </Touchable>
            </View>
          </View>
          {/* <BoxShadow setting={shadowOpt}> */}
          <View style={styles.loginButton}>
            <TouchableOpacity activeOpacity={1} style={{ flex: 1, }} onPress={() => this.loginIn()}>
              <Text style={{ color: '#fff', textAlign: 'center', lineHeight: px(90), fontSize: px(32), fontWeight: 'bold' }}
              >同意协议并登录</Text>
            </TouchableOpacity>
          </View>
          {/* </BoxShadow> */}
          <View style={{ marginTop: px(40), }}>
            <Text
              onPress={() => navigation.navigate('Policy')}
              style={{ textAlign: 'center', fontSize: 13, color: '#ea4c4c' }}>登录即代表同意《明家用户使用协议》</Text>
          </View>
        </KeyboardAvoidingView>
        <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginTop: px(100) }} >
          <TouchableOpacity activeOpacity={1} onPress={() => this.weixinLogin()}>
            <Image style={{ width: px(88), height: px(88) }} source={require('../assets/images/a_soft_wechat.png')} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  loginScreen: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    height: px(140),
    borderRadius: px(70),
    marginTop: px(180),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  form: {
    marginTop: px(80),
  },
  loginButton: {
    height: px(90),
    width: px(540),
    borderRadius: px(45),
    backgroundColor: '#ea4c4c',
    marginTop: px(130),
  },
  item: {
    width: px(540),
    height: px(120),
    borderBottomColor: '#e6e9f0',
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    fontSize: px(22),
  },
  label: {
    marginHorizontal: px(10),
    color: '#333333',
    fontFamily: 'PingFang-SC-Medium',
    fontSize: px(26)
  },
  input: {
    flex: 1,
    color: '#000000',
    fontWeight: 'bold',
    fontSize: px(28)
  }
})
// export default connect(
//   (state) => ({
//     status: state.loginIn.status,
//     isSuccess: state.loginIn.isSuccess,
//     user: state.loginIn.user,
//   }),
//   (dispatch) => ({
//     login: () => dispatch(loginAction.login()),
//   })

// )(Login)
