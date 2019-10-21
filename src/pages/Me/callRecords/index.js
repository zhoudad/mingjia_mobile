import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, NativeModules } from 'react-native';
import px from '../../../utils/px';

// const CallModule = NativeModules.RNCallBridgeModule
// CallModule.call('17681888036')
const ToastExample = NativeModules.ToastExample
// const dic = await CallModule.passCallTime()
// ToastExample.show("Awesome", ToastExample.SHORT);

export default class callRecords extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  _renderItem() {
    return (
      <View style={styles.item}>
        <Text  style={{color:'#303233',lineHeight:px(46),fontSize:px(20)}}>(1)  4000008412</Text>
        <View style={{flexDirection:'row'}}>
          <Text style={{color:'#A8AFB3',lineHeight:px(46),fontSize:px(20)}}>通话时长：5分10秒 </Text>
          <Text style={{color:'#A8AFB3',lineHeight:px(46),fontSize:px(20),marginStart:px(50)}}>拨打时间：5/15   8：30</Text>
        </View>
      </View>
    )
  }

  render() {
    return (
      <ScrollView>
        {this._renderItem()}
        {this._renderItem()}
        {this._renderItem()}
        {this._renderItem()}
        {this._renderItem()}
        <Text onPress={() => ToastExample.show('12313123',CustomToast.SHORT)}>弹出Toast</Text>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  item: {
    height: px(149),
    justifyContent:'space-around',
    marginHorizontal:px(30),
    borderBottomColor:'#EBEBEB',
    borderBottomWidth:px(2)
  }
})