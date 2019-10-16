import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from '../../components/Icon'

export default class index extends Component {
  static navigationOptions = {
    tabBarLabel: '我的',
    tabBarIcon: ({ focused }) => {
      if (focused) {
        return (
          <Icon name='wode' size={18} color="#ea4c4c" />
        );
      }
      return (
        <Icon name='wode' size={18} />
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
      <View style={styles.background}>
        <View>
          <View style={styles.greenBox}></View>
        </View>
        <View style={styles.redBox}>
          <View style={styles.new}></View>
        </View>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  background: {
    backgroundColor: "blue",
    height: "100%"
  },
  greenBox: {
    backgroundColor: "green",
    width: 100,
    height: 100,
    // zIndex: 2
  },
  redBox: {
    height: 300,
    width: 300,
    backgroundColor: "red",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1,
  },
  new:{
    height: 350,
    width: 350,
    backgroundColor: "yellow",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 3,
  }
});

