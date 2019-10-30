import React, { Component } from 'react';
import { 
  View, Text, StyleSheet, KeyboardAvoidingView, ScrollView, TouchableOpacity, 
  TextInput, Image, ToastAndroid, Dimensions, AsyncStorage, 
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import * as WeChat from 'react-native-wechat';
import DeviceInfo from 'react-native-device-info';
import axios from 'axios'
import px from '../utils/px'
import { BoxShadow } from 'react-native-shadow'
import Touchable from '../components/Touchable'
import UMShareModule from '../utils/ShareUtil'

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
      appId: '',
      secret: '',
      refresh_token: ''
    };
  }
  // shouldComponentUpdate(nextProps, nextState) {
  //   // 登录完成,切成功登录   
  //   if (nextProps.status === '登陆成功' && nextProps.isSuccess) {
  //     this.props.navigation.dispatch(resetAction)
  //     // this.sendForm()
  //     return false;
  //   }
  //   return true;
  // }

  componentDidMount() {
    DeviceInfo.getIpAddress().then(res => {
      this.setState({ ip: res })
    })
    DeviceInfo.getCarrier().then(res => {
      this.setState({ ip_name: res })
    })

    axios({
      url: 'http://218.108.34.222:8080/wechatapi'
    }).then(res => {
      console.log(res)
      this.setState({
        appId: res.data.appId,
        secret: res.data.secret,
      })
    })

    UMShareModule.auth(2,(code,result,message) =>{
      // this.setState({result:message});
      // if (code == 200){
      //     this.setState({result:result.uid});
      // }
      console.log(code,result,message)
  });

    // WeChat.registerApp('wx07cb98a4feb4b5b3')
    // try {
    //   WeChat.registerApp('wx07cb98a4feb4b5b3');//从微信开放平台申请
    // } catch (e) {
    //   console.error(e);
    // }
    // _retrieveUserData = async () => {
    //   try {
    //     const value = await AsyncStorage.getItem('userData');
    //     if (value !== null) {
    //       // this.props.navigation.navigate('Main')
    //     }
    //   } catch (error) {
    //     // Error retrieving data
    //   }
    // }
    // _retrieveUserData()
    // _retrieveWeixinUserData = async () => {
    //   try {
    //     const value = await AsyncStorage.getItem('weixinUserData');
    //     if (value !== null) {
    //       // this.props.navigation.navigate('Main')
    //     }
    //   } catch (error) {
    //     // Error retrieving data
    //   }
    // }
    // _retrieveWeixinUserData()
    // axios({
    //   url: 'http://218.108.34.222:8080/wechatapi'
    // }).then(res => {
    //   // console.log(res)
    //   this.setState({
    //     appId: res.data.appId,
    //     secret: res.data.secret,
    //   })
    // }).catch(err => {
    //   return
    // })
  }
  sendVerification = async () => {
    let myreg = /^1[3456789]\d{9}$/;
    if (!this.state.user_tel) {
      ToastAndroid.show('手机号不能为空', ToastAndroid.SHORT);
    } else {
      if (myreg.test(this.state.user_tel)) {
        this.timer = setInterval(() => {
          if (this.state.CountdownNum >= 0) {
            this.setState({
              CountdownNum: this.state.CountdownNum > 10 ? --this.state.CountdownNum : '0' + --this.state.CountdownNum,
              btnText: this.state.CountdownNum,
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
    const { user_tel, user_code, ip, ip_name } = this.state;
    const self = this;
    const { navigation } = this.props;
    axios({
      method: 'POST',
      url: 'http://218.108.34.222:8080/userinfo',
      data: { user_tel, user_code, ip, ip_name, 'user_ftime': new Date().getTime(), }
    }).then((res) => {
      console.log(res);
      if (res.data.status == 101 || res.data.status == 0 || res.data.status == 102) {
        // saveToken(data.data);
        navigation.navigate('Select', { Token: res.data.token })
        // navigationUtil.reset(self.props.navigation, 'Select');
      }
    }).catch(err => {
      ToastAndroid.show('登录失败', ToastAndroid.SHORT);
      // console.log(err)
      // Alert.alert('登录失败', err.message || err);
    });
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
              console.log(responseCode)
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
    console.log('1')
    switch (parseInt(responseCode.errCode)) {
      // 用户换取access_token的code，仅在ErrCode为0时有效  
      case 0:
        //获取token值
        axios({
          url: 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=' + this.state.appId + '&secret=' + this.state.secret + '&code=' + responseCode.code + '&grant_type=authorization_code'
        })
          .then(res => {
            //授权成功，获取用户头像等信息
            console.log(res)
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
        url: 'http://218.108.34.222:8080/wechat',
        data: res.data,
        method: 'POST'
      }).then((res) => {
        // AsyncStorage.setItem('weixinUserId',res.data.id);
        // _storeData = async () => {
          try {
            AsyncStorage.setItem('weixinUserId', JSON.stringify(res.data.id));
          } catch (error) {
            console.log(error)
          }
        // }
        // _storeData()
        console.log(res)
        if (res.data.status == 0 || res.data.status == 4) {
          this.props.navigation.navigate('Registered')
        } else if (res.data.status == 1) {
          alert('登录失败')
        } else if (res.data.status == 2) {
          alert('数据为空')
        } else if (res.data.status == 3) {
          // saveUserInfo = async () => {
            // console.log(res.data)
            try {
              AsyncStorage.setItem('userinfo', JSON.stringify(res.data))
            } catch (e) {

            }
          // }
          // saveUserInfo()
          this.props.navigation.navigate('Main')
        }
      }).catch((err) => {
        console.log(err)
      })

    }
    )
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
            <Image style={{ width: px(140), height: px(140) }} source={require('../assets/images/a_soft_wechat.png')} />
          </View>
          <View style={styles.form}>
            <View style={styles.item}>
              <Text style={styles.label}>手机号:</Text>
              <TextInput
                style={styles.input}
                placeholder={'请输入手机号'}
                placeholderTextColor={'#A8ABB3'}
                keyboardType={'number-pad'}
                returnKeyType={'done'}
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
                  returnKeyType={'done'}
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
    justifyContent: 'center'
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
