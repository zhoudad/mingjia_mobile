import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, } from 'react-native';
import px from '../../../utils/px';
import axios from 'axios'
import {storage} from '../../../utils/storage'

export default class callRecords extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    })
    this.getdata()
  }

  getdata(){
    axios({
      url:'http://218.108.34.222:8080/call_show',
      data:{
        account_id:2,
        user_id:2
      },
      method:'psot'
    }).then(res => {
      console.log(res)
    })
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