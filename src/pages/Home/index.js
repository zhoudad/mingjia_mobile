import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Icon from '../../components/Icon'

export default class index extends Component {
  static navigationOptions = {
    tabBarLabel: '首页',
    tabBarIcon: ({ focused }) => {
      if (focused) {
        return (
          <Icon name='wode' size={18} color="#ea4c4c"/>
        );
      }
      return (
        <Icon name='wode' size={18}/>
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
