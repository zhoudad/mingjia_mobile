import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native';
import px from '../utils/px'
import Touchable from '../components/Touchable'
import axios from 'axios'
import DeviceInfo from 'react-native-device-info';
import { storage, saveToken } from '../utils/storage'

export default class Registered extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_code: '',
      user_tel: '',
      isSend: false,
      btnText: '获取验证码',
      CountdownNum: 60,
    };
  }

  sendVerification = async () => {
    let myreg = /^1[3456789]\d{9}$/;
    let {CountdownNum} = this.state
    if (!this.state.user_tel) {
      ToastAndroid.show('手机号不能为空', ToastAndroid.SHORT);
    } else {
      if (myreg.test(this.state.user_tel)) {
        this.timer = setInterval(() => {
          if (CountdownNum >= 0) {
            this.setState({
              CountdownNum: CountdownNum >= 10 ? --CountdownNum : '0' + --CountdownNum,
              btnText: CountdownNum,
              isSend: true
            })
          } else {
            clearInterval(this.timer)
            this.setState({
              btnText: '重新发送',
              CountdownNum: 60,
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

  componentDidMount() {
    DeviceInfo.getIpAddress().then(res => {
      this.setState({ ip: res })
    })
    DeviceInfo.getCarrier().then(res => {
      this.setState({ ip_name: res })
    })
	}
	get = () => {
		axios({
			url: 'http://218.108.34.222:8080/wechat_tel',
			method: 'POST',
			data: {
				tel: this.state.user_tel
			}
		}).then((res) => {
			console.log(res)
		}).catch((err) => {
			console.log(err)
		})
	}
	login = () => {
    let id = this.props.navigation.state.params.id
    if(!this.state.user_code){
      ToastAndroid.show('验证码不能为空', ToastAndroid.SHORT);
      return
    }
    console.log(id)
		axios({
			url: 'http://218.108.34.222:8080/tel_add',
			data: {
				user_tel: this.state.user_tel,
				user_code: this.state.user_code,
				user_ftime: new Date().getTime(),
				ip: this.state.ip,
				ip_name: this.state.ip_name,
				id: id
			},
			method: 'POST',
		}).then((res) => {
      console.log(res.data.result)
      saveToken({access_token:res.data.token})
      storage.save({
        key: 'userId',
        data: { user_id: res.data.result.user_id },
      });
			this.props.navigation.navigate('Select')
		}).catch((err) => {
			console.log(err)
		})
	}

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
        <TouchableOpacity activeOpacity={0.8} style={styles.loginButton} onPress={() => this.login()}>
          <Text style={{fontSize:px(32),color:'#FFF'}}>绑定手机号</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    width: px(540),
    height: px(120),
    borderBottomColor: '#e6e9f0',
    borderBottomWidth: px(1),
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
  },
  loginButton: {
    height: px(90),
    width: px(540),
    borderRadius: px(45),
    backgroundColor: '#ea4c4c',
    marginTop: px(130),
    justifyContent:'center',
    alignItems:'center'
  },
})