import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  KeyboardAvoidingView
} from 'react-native';
import Touchable from '../components/Touchable';

export default class App extends Component { 
  render() {
    return (
        <View style={styles.container}>
        <KeyboardAvoidingView
          behavior='padding'
          style={styles.container}
        >
          <TextInput
            underlineColorAndroid={'white'}
            placeholder='这是一个简单的输入框'
            style={styles.textInput}
          />
        </KeyboardAvoidingView>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingHorizontal: 20,
    paddingTop:20
  },
  textInput: {
    borderRadius: 5,
    borderWidth: 1,
    height: 140,
    paddingHorizontal: 10
  }
});