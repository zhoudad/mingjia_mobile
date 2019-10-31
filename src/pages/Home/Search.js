import React, { Component } from 'react';
import { View, Text, ScrollView, Image, TextInput } from 'react-native';
import px from '../../utils/px'

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ''
    };
  }

  render() {
    const { navigation } = this.props
    return (
      <View style={{ flex: 1 }}>
        <View style={{ height: px(100), flexDirection: 'row', alignItems: 'center', paddingHorizontal: px(30) }}>
          <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={1}>
            <Image
              style={{ width: px(56), height: px(56), marginStart: px(3) }}
              source={require('../../assets/images/nav_icon_back.png')} />
            <TextInput
              placeholder={'请输入验证码'}
              placeholderTextColor={'#A8ABB3'}
              underlineColorAndroid='transparent'
              onChangeText={(text) => this.setState({ text })}
              style={{ flex: 1, borderRadius: px(10), height: px(70) }} />
          </TouchableOpacity>
        </View>
        <ScrollView></ScrollView>
      </View>
    );
  }
}
