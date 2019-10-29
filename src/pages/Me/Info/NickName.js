import React, { Component } from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';
import px from '../../../utils/px'

export default class NickName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: ''
    };
  }

  nameChang = (text) => {
    this.setState({ nickname: text }, () => {
      this.props.navigation.setParams({ newName: this.state.nickname })
    })
  }

  render() {
    const { navigation } = this.props
    return (
      <ScrollView style={{ flex: 1, backgroundColor:'#F2F4F7',marginTop:px(2) }}>
        <TextInput
          onChangeText={(text) => this.nameChang(text)}
          autoFocus={true}
          placeholderTextColor={'#999999'}
          style={{ height: px(100),backgroundColor:'#FFFFFF',paddingHorizontal:px(30),color:'#333333',fontSize:px(28) }}
          defaultValue={navigation.state.params.nickname}
        ></TextInput>
      </ScrollView>
    );
  }
}