import React, { Component } from 'react';
import { View, Text, TouchableHighlight, TextInput, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import px from '../../../utils/px'
import NotItem from './NotItem'

export default class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      num: '',
      awesome: false,
      nolike: false
    };
  }
  _renderReply() {
    return (
      <View style={styles.replyItem}>
        <View style={{ height: px(60), alignItems: 'center', paddingBottom: px(10), flexDirection: 'row', marginTop: px(30) }}>
          <Image
            style={{ backgroundColor: '#EA4C4C', width: px(60), height: px(60), borderRadius: px(30) }} />
          <Text style={{ color: '#303133', fontSize: px(28), marginStart: px(20) }}>周大大</Text>
          <Text style={{ color: '#A8ABB3', fontSize: px(20), flex: 1, textAlign: 'right' }}>10分钟前</Text>
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ marginTop: px(30), }}>
            <Text style={{ color: '#303133', fontSize: px(24) }}>
              各地经常会举办房地产交易会，在房地产交易会上通常会开辟二手房专区。可通过查看网络或多留意报刊杂志等渠道获得信息。</Text>
          </View>
        </View>
      </View>
    )
  }
  render() {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: '#F2F4F7', }}>
        <View style={{ marginTop: px(30), }}>
          <NotItem />
          <NotItem />
        </View>
        <View style={{ flex: 1, }}>
          <View style={{ height: px(100), paddingStart: px(30), backgroundColor: '#fff', justifyContent: 'center', }}>
            <Text style={{ color: '#303133', fontWeight: 'bold', fontSize: px(32) }}>全部回复</Text>
          </View>
          <View style={{ flex: 1, marginTop: px(1) }}>
            {this._renderReply()}
            {this._renderReply()}
            {this._renderReply()}
            {this._renderReply()}
            {this._renderReply()}
            {this._renderReply()}
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
replyItem: {
    paddingHorizontal: px(30),
    marginBottom: px(30),
    backgroundColor:'#FFFFFF',
    paddingBottom:px(50)
  }
})