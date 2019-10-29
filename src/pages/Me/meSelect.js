import React, { Component } from 'react';
import {
  Image, View, Text, StyleSheet, ScrollView, TextInput, KeyboardAvoidingView,
  ToastAndroid, TouchableOpacity, Dimensions
} from 'react-native';
import px from '../../utils/px'
import axios from 'axios'
import { saveToken, storage } from '../../utils/storage'
import navigationUtil from '../../utils/navigation'
const width = Dimensions.get('window').width;

export default class meSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      token: '',
    };
  }
  componentDidMount() {
    storage.load({
      key: 'accessToken',
    }).then((token) => {
      this.setState({ token: token })
    })

  }
  selected() {
    if (this.state.text == '') {
      ToastAndroid.show('内容不能为空', ToastAndroid.SHORT);
      return
    }
    axios({
      method: 'post',
      url: 'http://218.108.34.222:8080/choose',
      data: {
        name: this.state.text,
        token: this.state.token
      }
    }).then((res) => {
      console.log(res)
      saveToken({ access_token: this.state.token })
      navigationUtil.reset(this.props.navigation, 'Main');
    })
  }

  render() {
    return (
      <ScrollView style={styles.selectPage}>
        <View style={styles.logo}>
          <Image
            style={{ width: px(180), height: px(125), }}
            source={require('../../assets/images/login_bg.png')}></Image>
        </View>
        <View style={styles.selectTit}>
          <Text style={{ textAlign: 'center', fontSize: px(24), }}>请选择开发商并输入相应的识别码 </Text>
          <Text style={{ marginTop: px(20), textAlign: 'center', fontSize: px(24), }}>温馨提示:不同的开发商有不同的识别码和楼盘信息哦！</Text>
        </View>
        <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
          <KeyboardAvoidingView behavior={'position'} >
            <TextInput
              style={styles.selectInput}
              placeholder='请输入相应的开发商或者楼盘'
              onChangeText={(text) => this.setState({ text })}
            ></TextInput>
          </KeyboardAvoidingView>
        </View>
        <TouchableOpacity activeOpacity={0.8} style={{ alignItems: 'center' }}>
          <Text style={styles.selectButton} onPress={() => this.selected()}>进入App</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  selectPage: {
    flex: 1,
    width: width,
    paddingHorizontal: px(20),
  },
  logo: {
    marginTop: px(280),
    height: px(125),
    justifyContent: 'center',
    flexDirection: 'row'
  },
  selectTit: {
    alignItems: 'center',
    marginTop: px(60),
  },
  selectInput: {
    width: px(480),
    height: px(80),
    borderRadius: 2,
    borderColor: '#E1E4E6',
    borderWidth: 1,
    marginTop: px(45),
    fontSize: px(28),
    backgroundColor: '#f5f7fa',
    textAlign: 'center',
    fontSize: px(28),
    color: '#A8ABB3'
  },
  selectButton: {
    color: '#fff',
    width: px(540),
    height: px(90),
    shadowColor: '#EA4C4C',
    shadowOpacity: 0.5,
    shadowOffset: { w: 0, h: 4 },
    textAlign: 'center',
    lineHeight: px(90),
    backgroundColor: '#ea4c4c',
    borderRadius: px(45),
    marginTop: px(200),
    fontSize: px(32),
  }
})
