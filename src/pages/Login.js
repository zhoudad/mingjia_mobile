import React, { Component } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, ScrollView, TouchableOpacity, TextInput, Image, ToastAndroid, Dimensions, AsyncStorage, } from 'react-native';
import { connect } from 'react-redux'; // 引入connect函数
import *as loginAction from '../actions/loginAction';// 导入action方法
import { NavigationActions } from 'react-navigation';
import { unitWidth, width } from '../AdapterUtil'
import * as WeChat from 'react-native-wechat';
// import DeviceInfo from 'react-native-device-info';
import axios from 'axios'
import px from '../utils/px'
import { BoxShadow } from 'react-native-shadow'
import Touchable from '../components/Touchable'

const resetAction = NavigationActions.navigate({
  routeName: 'Select',
  // actions: [
  //   NavigationActions.navigate({ routeName: 'Select' })
  // ]
})

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountNumber: '请输入手机号',
      password: '请输入验证码',
      btnText: '获取验证码',
      // isSendVerification: false,
      CountdownNum: 59,
      send: false,
      isSend: false,
      sendDate: null,
      appId: '',
      secret: '',
      refresh_token: ''
    };
  }
  shouldComponentUpdate(nextProps, nextState) {
    // 登录完成,切成功登录   
    if (nextProps.status === '登陆成功' && nextProps.isSuccess) {
      this.props.navigation.dispatch(resetAction)
      this.sendForm()
      return false;
    }
    return true;
  }
  componentDidMount() {
    WeChat.registerApp('wx07cb98a4feb4b5b3')
    _retrieveUserData = async () => {
      try {
        const value = await AsyncStorage.getItem('userData');
        if (value !== null) {
          // this.props.navigation.navigate('Main')
        }
      } catch (error) {
        // Error retrieving data
      }
    }
    _retrieveUserData()
    _retrieveWeixinUserData = async () => {
      try {
        const value = await AsyncStorage.getItem('weixinUserData');
        if (value !== null) {
          // this.props.navigation.navigate('Main')
        }
      } catch (error) {
        // Error retrieving data
      }
    }
    _retrieveWeixinUserData()
    axios({
      url: 'http://192.168.10.79:8080/wechatapi'
    }).then(res => {
      // console.log(res)
      this.setState({
        appId: res.data.appId,
        secret: res.data.secret,
      })
    }).catch(err => {
      return
    })
    // console.log(`设备名称:` + DeviceInfo.getDeviceName())
    // console.log(`设备所处国家:` + DeviceInfo.getDeviceCountry())
    // console.log(`设备地区:` + DeviceInfo.getDeviceLocale())
    // console.log(`运营商名称:` + DeviceInfo.getCarrier())
    // console.log(`设备ID:` + DeviceInfo.getDeviceId())
    // DeviceInfo.getIPAddress().then(ip => {
    //   // console.log(DeviceInfo.getCarrier())
    //   let data = Object.assign({}, this.state.sendDate, {
    //     ip: ip,
    //     ip_name: DeviceInfo.getCarrier()
    //   })
    //   this.setState({
    //     sendDate: data
    //   })
    // });
  }
  sendVerification = () => {
    if (this.state.send) {
      axios({
        method: 'post',
        url: 'http://192.168.10.79:8080/sendcode',
        data: {
          'tel': `${this.state.sendDate.tel}`,
        }
      }).then((res) => {
        console.log(res.data)
      })
      this.timer = setInterval(() => {
        if (this.state.CountdownNum >= 0) {
          if (this.state.CountdownNum > 10) {
            this.setState({
              CountdownNum: (this.state.CountdownNum - 1),
              btnText: this.state.CountdownNum,
              isSend: true
            })
          } else {
            this.setState({
              CountdownNum: ('0' + (this.state.CountdownNum - 1)),
              btnText: this.state.CountdownNum,
              isSend: true
            })
          }
        } else {
          clearInterval(this.timer)
          this.setState({
            btnText: '重新发送',
            CountdownNum: 59,
            isSend: false
          })
        }
      }, 1000)
    } else {
      ToastAndroid.show('手机号不能为空', ToastAndroid.SHORT);
    }

  }
  inputText = (text, input) => {
    let data = Object.assign({}, this.state.sendDate, {
      tel: text
    })
    this.setState({
      sendDate: data
    })
  }
  inputText1 = (text, input) => {
    let data = Object.assign({}, this.state.sendDate, {
      Verification: text
    })
    this.setState({
      sendDate: data
    })
  }
  sendForm = () => {
    let _this = this
    let userData = {
      'user_tel': this.state.sendDate.tel,
    }
    _userData = async () => {
      try {
        await AsyncStorage.setItem('userData', JSON.stringify(userData));
      } catch (error) {
        // Error saving data
      }
    }
    _userData()
    axios({
      method: 'post',
      url: 'http://192.168.10.79:8080/userinfo',
      data: {
        'user_tel': this.state.sendDate.tel,
        'user_code': this.state.sendDate.Verification,
        'user_ftime': (new Date()).getTime(),
        'ip': this.state.sendDate.ip,
        'ip_name': this.state.sendDate.ip_name,
      }
    })
      .then((res) => {
        // console.log(res)
        if (res.data.status == 101 || res.data.status == 0 || res.data.status == 102) {
          async function saveToken() {
            try {
              await AsyncStorage.setItem('token', res.data.token)
            } catch (error) {
              return
            }
          }
          saveToken()
          _this.props.navigation.navigate('Select')
        }
      })
  }
  onblur = (obj) => {
    let myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
    let regcode = /^\d{5}$/
    if (obj.input == 'tel') {
      if (this.state.sendDate != null && !this.state.sendDate.tel) {
        ToastAndroid.show('手机号不能为空', ToastAndroid.SHORT);
      } else {
        if (myreg.test(this.state.sendDate.tel)) {
          // ToastAndroid.show('进入App', ToastAndroid.SHORT);
          this.setState({ isSend: true })
        } else {
          ToastAndroid.show('手机号格式不正确', ToastAndroid.SHORT);
        }
      }
    } else if (obj.input == 'code') {
      if (this.state.sendDate != null && !this.state.sendDate.Verification) {
        ToastAndroid.show('验证码不能为空', ToastAndroid.SHORT);
      } else {
        if (regcode.test(this.state.sendDate.Verification)) {
          return
        } else {
          ToastAndroid.show('验证码格式不正确', ToastAndroid.SHORT);
        }
      }
    }
  }
  // 微信登陆授权
  weixinLogin = () => {
    let scope = 'snsapi_userinfo'
    let state = 'wechat_adk_mingjia'
    WeChat.isWXAppInstalled()
      .then((isInstalled) => {
        if (isInstalled) {
          //获取微信授权
          WeChat.sendAuthRequest(scope, state)
            .then(responseCode => {
              //授权成功获取token
              // console.log(this.state.appId)
              this.getAccessToken(responseCode);
            }).catch(error => {
              alert('授权错误：', error.message, [
                { text: '确定' }
              ])
            })
        } else {
          alert('没有安装微信', '请先安装微信', [
            { text: '确定' }
          ])
        }
      })
  }
  // 微信登陆获取token
  getAccessToken = (responseCode) => {
    _this = this
    switch (parseInt(responseCode.errCode)) {
      // 用户换取access_token的code，仅在ErrCode为0时有效  
      case 0:
        //获取token值

        axios({
          url: 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=' + this.state.appId + '&secret=' + this.state.secret + '&code=' + responseCode.code + '&grant_type=authorization_code'
        })
          .then(res => {
            //授权成功，获取用户头像等信息
            // console.log(res)
            this.setState({ refresh_token: res.data.refresh_token }, () => {
              this.getUserInfoFormWx(res);
            })
          })
          .catch(err => {
            console.log(err)
          })
        break;
      case -4:
        //用户拒绝
        break;
      case -2:
        //用户取消
        break;
    }
  }
  // 获取微信用户信息
  getUserInfoFormWx = (res) => {
    axios({
      url: 'https://api.weixin.qq.com/sns/userinfo?access_token=' + res.data.access_token + '&openid=' + res.data.openid
    }).then(res => {
      switch (parseInt(res.data.errcode)) {
        case 4001:
          axios({
            url: 'https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=' + this.state.appId + '&grant_type=refresh_token&refresh_token=' + this.state.refresh_token
          })
            .then(res => {
            })
            .catch(err => {
              console.log(err)
            })
      }
      axios({
        url: 'http://192.168.10.79:8080/wechat',
        data: res.data,
        method: 'POST'
      }).then((res) => {
        // AsyncStorage.setItem('weixinUserId',res.data.id);
        _storeData = async () => {
          try {
            await AsyncStorage.setItem('weixinUserId', JSON.stringify(res.data.id));
          } catch (error) {
            console.log(error)
          }
        }
        _storeData()
        console.log(res)
        if (res.data.status == 0 || res.data.status == 4) {
          this.props.navigation.navigate('WeChatTel')
        } else if (res.data.status == 1) {
          alert('登录失败')
        } else if (res.data.status == 2) {
          alert('数据为空')
        } else if (res.data.status == 3) {
          saveUserInfo = async () => {
            console.log(res.data)
            try {
              await AsyncStorage.setItem('userinfo', JSON.stringify(res.data))
            } catch (e) {
            }
          }
          saveUserInfo()
          this.props.navigation.navigate('Main')
        }
      }).catch((err) => {
        console.log(err)
      })

    }
    ).catch(err => { })
  }
  render() {
    const shadowOpt = {
      height: px(90),
      width: px(540),
      color: "#EA4C4C",
      border: px(25),
      radius: px(45),
      opacity: 0.1,
      x: 0,
      y: px(8),
      style: { marginTop: px(130) }
    }
    const { login } = this.props;
    return (
      <ScrollView contentContainerStyle={styles.loginScreen}>
        <KeyboardAvoidingView contentContainerStyle={{ flex: 1, alignItems: 'center' }} >
          <View style={styles.header}>
            <Image style={{ width: px(140), height: px(140) }} source={require('../assets/images/a_soft_wechat.png')} />
          </View>
          <View style={styles.form}>
            <View style={styles.item}>
              <Text style={styles.label}>手机号：</Text>
              <TextInput
                style={[styles.input]}
                placeholderTextColor={'#ddd'}
                keyboardType={'number-pad'}
                returnKeyType={'done'}
                underlineColorAndroid='transparent'
                onChangeText={(text, input = { 'input': 'tel' }) => { this.inputText(text, input) }}
                onBlur={() => this.onblur({ input: 'tel' })}
              ></TextInput>
            </View>
            <View style={styles.item}>
              <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <Text style={styles.label}>验证码：</Text>
                <TextInput
                  style={[styles.input]}
                  placeholderTextColor={'#ddd'}
                  keyboardType={'number-pad'}
                  password={true}
                  returnKeyType={'done'}
                  underlineColorAndroid='transparent'
                  onChangeText={(text, input = { 'input': 'code' }) => { this.inputText1(text) }}
                  onBlur={() => this.onblur({ input: 'code' })}
                ></TextInput>
              </View>
              <Touchable style={{ paddingHorizontal: 15, }} activeOpacity={0.8} onPress={() => this.state.isSend ? false : this.sendVerification()}>
                <Text style={{ lineHeight: 40, textAlign: 'right', color: '#ea4c4c' }} >
                  {this.state.isSend ? this.state.btnText + 's' : this.state.btnText}
                </Text>
              </Touchable>
            </View>
          </View>
          <BoxShadow setting={shadowOpt}>
            <View style={styles.loginButton}>
              <TouchableOpacity activeOpacity={1} style={{ flex: 1 }} onPress={() => login()}>
                <Text style={{ color: '#fff', textAlign: 'center', lineHeight: px(90), fontSize: px(32), fontWeight: 'bold' }}
                >同意协议并登录</Text>
              </TouchableOpacity>
            </View>
          </BoxShadow>
          <View style={{ marginTop: 40 * unitWidth, }}>
            <Text style={{ textAlign: 'center', fontSize: 13, color: '#ea4c4c' }}>登录即代表同意《明家用户使用协议》</Text>
          </View>
        </KeyboardAvoidingView>
        <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginTop: px(100) }} >
          <TouchableOpacity activeOpacity={1} onPress={this.weixinLogin}>
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
    height: 140 * unitWidth,
    borderRadius: 70 * unitWidth,
    marginTop: 180 * unitWidth,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  form: {
    marginTop: 80 * unitWidth,
  },
  loginButton: {
    height: 90 * unitWidth,
    width: 540 * unitWidth,
    borderRadius: 45 * unitWidth,
    backgroundColor: '#ea4c4c',
  },
  item: {
    width: 540 * unitWidth,
    height: 120 * unitWidth,
    borderBottomColor: '#e6e9f0',
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    fontSize: 22 * unitWidth,
  },
  label: {
    marginHorizontal: 20 * unitWidth,
    color: '#333333',
    fontFamily: 'PingFang-SC-Medium'
  },
  input: {
    marginStart: 10 * unitWidth,
    flex: 1,
    color: '#000000',
    fontWeight: 'bold'
  }
})
export default connect(
  (state) => ({
    status: state.loginIn.status,
    isSuccess: state.loginIn.isSuccess,
    user: state.loginIn.user,
  }),
  (dispatch) => ({
    login: () => dispatch(loginAction.login()),
  })

)(Login)
