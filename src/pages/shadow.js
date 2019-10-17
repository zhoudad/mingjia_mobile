import React, { Component } from 'react';
import {BoxShadow} from 'react-native-shadow'
import {
    Platform,
    StyleSheet,
    Text,
    View
  } from 'react-native';

export default class shadow extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const shadowOpt = {
        width:100,
        height:100,
        color:"#000",
        border:10,
        radius:50,
        opacity:0.2,
        x:0,
        y:8,
        style:{marginVertical:5}
      }
    return (
        <View style={styles.container}>
        <BoxShadow setting={shadowOpt}>
        <View style={{width:100,height:100,backgroundColor:'green',borderRadius:50}}>
          </View>
          </BoxShadow>
      </View>
    );
  }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
  });
