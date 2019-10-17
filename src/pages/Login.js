import React, { Component } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'; // 引入connect函数
import *as loginAction from '../actions/loginAction';// 导入action方法
import { NavigationActions } from 'react-navigation';
import { unitWidth, width } from '../AdapterUtil'
import InputItme from '../components/InputItme'
import px from '../utils/px'
import {BoxShadow} from 'react-native-shadow'

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
    };
  }
  shouldComponentUpdate(nextProps, nextState) {
    // 登录完成,切成功登录   
    if (nextProps.status === '登陆成功' && nextProps.isSuccess) {
      this.props.navigation.dispatch(resetAction)
      return false;
    }
    return true;
  }
  render() {
    const shadowOpt = {
      height: px(90),
      width: px(540),
      color: "#EA4C4C",
      border: px(25),
      radius: px(45),
      opacity: 0.2,
      x: 0,
      y: px(8),
      style:{marginTop: px(130)}
    }
    const { login } = this.props;
    return (
      <ScrollView contentContainerStyle={styles.loginScreen}>
        <KeyboardAvoidingView contentContainerStyle={{ flex: 1, alignItems: 'center' }} behavior='position'>
          <View style={styles.header}></View>
          <View style={styles.form}>
            <InputItme
              lable='手机号'
              placeholder='请输入手机号'
            />
            <InputItme
              lable='验证码'
              placeholder='请输入验证码'
              VerificationCode={true}
            />
          </View>
          <BoxShadow setting={shadowOpt}>
            <View style={styles.loginButton}>
              <TouchableOpacity activeOpacity={1} style={{ flex: 1 }} onPress={() => login()}>
                <Text style={{ color: '#fff', textAlign: 'center', lineHeight: 90 * unitWidth, fontSize: 16 }}
                >同意协议并登录</Text>
              </TouchableOpacity>
            </View>
          </BoxShadow>
          <View style={{ marginTop: 40 * unitWidth, }}>
            <Text style={{ textAlign: 'center', fontSize: 13, color: '#ea4c4c' }}>登录即代表同意《明家用户使用协议》</Text>
          </View>
        </KeyboardAvoidingView>
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
    width: 140 * unitWidth,
    height: 140 * unitWidth,
    backgroundColor: '#ffe1e1',
    borderRadius: 70 * unitWidth,
    marginTop: 215 * unitWidth,
  },
  form: {
    marginTop: 120 * unitWidth,
  },
  loginButton: {
    height: 90 * unitWidth,
    width: 540 * unitWidth,
    borderRadius: 45 * unitWidth,
    backgroundColor: '#ea4c4c',
    // marginTop: 130 * unitWidth,
    // shadowColor: '#EA4C4C',
    // shadowOpacity: 0.5,
    // shadowOffset: { w: 0, h: 4 },
    // shadowRadius:25*unitWidth,
    // elevation: 25*unitWidth,
  },
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
