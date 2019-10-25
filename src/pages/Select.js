import React, { Component } from 'react';
import {
  Image, View, Text, StyleSheet, ScrollView, TextInput, KeyboardAvoidingView, ToastAndroid, TouchableOpacity
} from 'react-native';
import Touchable from '../components/Touchable';
import { unitWidth, width } from '../AdapterUtil'
import axios from 'axios'
import {saveToken,storage} from '../utils/storage'
export default class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      token:'',
    };
  }
  componentDidMount(){
    let self = this
    storage.load({
      key: 'accessToken',
    }).then((token) => {
      this.setState({ token })
      console.log(this.state.token)
    }).catch(() => {
      this.setState({
        token : self.props.navigation.state.params.Token
      })
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
      saveToken({access_token:this.state.token})
      if(res.data.status == '1103'){
        this.props.navigation.navigate('Main')
        storage.save({
          key: 'Id',
          data: {account_id:res.data.result.account_id},
        });
      }
    })
  }

  render() {
    return (
      <ScrollView style={styles.selectPage}>
        <View style={styles.logo}>
          <Image
            style={{ width: 180 * unitWidth, height: 125 * unitWidth, }}
            source={require('../assets/images/login_bg.png')}></Image>
        </View>
        <View style={styles.selectTit}>
          <Text style={{ textAlign: 'center', fontSize: 24 * unitWidth, }}>请选择开发商并输入相应的识别码 </Text>
          <Text style={{ marginTop: 20 * unitWidth, textAlign: 'center', fontSize: 24 * unitWidth, }}>温馨提示:不同的开发商有不同的识别码和楼盘信息哦！</Text>
        </View>
        <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
          <KeyboardAvoidingView behavior={'position'} >
            <TextInput
              style={styles.selectInput}
              placeholderTextColor={'#A8ABB3'}
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
    paddingHorizontal: 20 * unitWidth,
  },
  logo: {
    marginTop: 280 * unitWidth,
    height: 125 * unitWidth,
    justifyContent: 'center',
    flexDirection: 'row'
  },
  selectTit: {
    alignItems: 'center',
    marginTop: 60 * unitWidth,
  },
  selecrItem: {
    backgroundColor: 'red',
    flexDirection: 'column',
    alignItems: 'center',
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  selectInput: {
    width: 480 * unitWidth,
    height: 80 * unitWidth,
    borderRadius: 2,
    borderColor: '#E1E4E6',
    borderWidth: 1,
    marginTop: 45 * unitWidth,
    fontSize: 28 * unitWidth,
    backgroundColor: '#f5f7fa',
    textAlign: 'center',
    fontSize: 28 * unitWidth,
    color: '#000000'
  },
  selectButton: {
    color: '#fff',
    width: 540 * unitWidth,
    height: 90 * unitWidth,
    shadowColor: '#EA4C4C',
    shadowOpacity: 0.5,
    shadowOffset: { w: 0, h: 4 },
    textAlign: 'center',
    lineHeight: 90 * unitWidth,
    backgroundColor: '#ea4c4c',
    borderRadius: 45 * unitWidth,
    marginTop: 200 * unitWidth,
    fontSize: 32 * unitWidth,
  }
})
