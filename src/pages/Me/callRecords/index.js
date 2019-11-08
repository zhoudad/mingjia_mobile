import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, NativeModules} from 'react-native';
import px from '../../../utils/px';
import axios from 'axios'
import {storage} from '../../../utils/storage'
// const CallModule = NativeModules.RNCallBridgeModule
// CallModule.call(phone)

// const dic = CallModule.passCallTime()

export default class callRecords extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id:'',
      account_id:'',
      callInfo:[]
    };
  }

  async componentDidMount() {
    let self = this
    await storage.getBatchData([
      { key: 'userId', syncInBackground: false },
      { key: 'accountId', syncInBackground: false },
    ]).then(results => {
      self.setState({
        user_id: results[0].user_id,
        account_id: results[1].account_id,
      })
    },() => {
      self.getdata()
    })
    storage.load({
      key: 'callInfo',
    }).then(res => {
      self.setState({
        callInfo: res.callInfo,
      })
    }).catch(err => {
      console.log(err)
    })
    
  }

  getdata(){
    axios({
      url:'http://218.108.34.222:8080/call_show',
      data:{
        account_id:this.state.account_id,
        user_id:this.state.user_id
      },
      method:'post'
    }).then(res => {
      console.log(res)
    })
  }

  _renderItem(item,index) {
    return (
      <View style={styles.item} key={index}>
        <Text  style={{color:'#303233',lineHeight:px(46),fontSize:px(20)}}>{item.tel}</Text>
        <View style={{flexDirection:'row'}}>
          {/* <Text style={{color:'#A8AFB3',lineHeight:px(46),fontSize:px(20)}}>通话时长：5分10秒 </Text> */}
          <Text style={{color:'#A8AFB3',lineHeight:px(46),fontSize:px(20),marginStart:px(50)}}>拨打时间：{item.time}   {item.date}0</Text>
        </View>
      </View>
    )
  }

  render() {
    return (
      <ScrollView>
        {
          this.state.callInfo ? this.state.callInfo.map((item,index) => {
            return this._renderItem(item,index)
          }) : null
        }
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  item: {
    height: px(149),
    paddingVertical:px(38),
    marginHorizontal:px(30),
    borderBottomColor:'#EBEBEB',
    borderBottomWidth:px(2),
    justifyContent:'space-between'
  }
})