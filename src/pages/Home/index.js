import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import Icon from '../../components/Icon'
import { unitWidth, width } from '../../AdapterUtil'

export default class index extends Component {
  static navigationOptions = {
    tabBarLabel: '首页',
    tabBarIcon: ({ focused }) => {
      if (focused) {
        return (
          // <Icon name='wode' size={18} color="#ea4c4c"/>
          <Image style={{width:56*unitWidth,height:56*unitWidth}} source={require('../../assets/images/tabbar_home_s.png')}/>
        );
      }
      return (
        // <Icon name='wode' size={18}/>
        <Image style={{width:56*unitWidth,height:56*unitWidth}} source={require('../../assets/images/tabbar_home_n.png')}/>
      );
    },
  };
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Text> index </Text>
      </View>
    );
  }
}
