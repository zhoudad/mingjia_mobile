import React, { Component } from 'react';
<<<<<<< HEAD
import { View, Text, StyleSheet } from 'react-native';
=======
import { View, Text, Image } from 'react-native';
>>>>>>> ae4af7cc92f552875636025321b36cdadda85381
import Icon from '../../components/Icon'
import { unitWidth } from '../../AdapterUtil'

export default class index extends Component {
  static navigationOptions = {
    tabBarLabel: '我的',
    tabBarIcon: ({ focused }) => {
      if (focused) {
        return (
<<<<<<< HEAD
          <Icon name='wode' size={18} color="#ea4c4c" />
        );
      }
      return (
        <Icon name='wode' size={18} />
=======
          // <Icon name='wode' size={18} color="#ea4c4c"/>
          <Image style={{width:56*unitWidth,height:56*unitWidth}} source={require('../../assets/images/tabbar_mine_s.png')}/>
        );
      }
      return (
        // <Icon name='wode' size={18}/>
        <Image style={{width:56*unitWidth,height:56*unitWidth}} source={require('../../assets/images/tabbar_mine_n.png')}/>
>>>>>>> ae4af7cc92f552875636025321b36cdadda85381
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

