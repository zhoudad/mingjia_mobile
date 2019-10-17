import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { unitWidth, width } from '../AdapterUtil'
import Touchable from './Touchable'

export default class InputItme extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      VerificationText: '发送验证码',
      isSend: false
    };
  }
  VerificationItem(isShow) {
    if (isShow) {
      return (
        <TouchableOpacity style={{ paddingHorizontal: 15, }} activeOpacity={0.8}>
          <Text style={{ lineHeight: 40, textAlign: 'right', color: '#ea4c4c' }} >{this.state.VerificationText}</Text>
        </TouchableOpacity>
      )
    } else {
      return null
    }
  }

  render() {
    const { placeholder, password, lable, VerificationCode } = this.props
    return (
      <View style={styles.item}>
        <Text style={styles.label}>{lable}：</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({ text })}
          value={this.state.text}
          placeholder={placeholder}
          placeholderTextColor={'#ddd'}
          keyboardType={'number-pad'}
          password={password || false}
          returnKeyType={'done'}
          underlineColorAndroid='transparent'
        ></TextInput>
        <Touchable activeOpacity={1}>
          {this.VerificationItem(VerificationCode)}
        </Touchable>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  item: {
    // flex:1,
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
  },
  input: {
    marginStart: 10 * unitWidth,
    flex: 1,
  }
})
