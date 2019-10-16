import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Keyboard,TextInput } from 'react-native';
import IntervalTime from '../../../utils/IntervalTime'

export default class CommentItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Expand: false,//展开
      shouExpandBtn: true,//是否展示按钮
      num: '',
      awesome: false,
      nolike: false
    };
  }
  changeExpand = () => {
    this.setState({
      Expand: !this.state.Expand,
    })
  }
  

//   IntervalTime = (oldTime) => {
//     let now = new Date().getTime()
//     let old = new Date(oldTime).getTime()
//     var diffValue = parseInt(now - old),
//       minute = 1000 * 60,
//       hour = minute * 60,
//       day = hour * 24,
//       month = day * 30,
//       year = month * 12,

//       _year = diffValue / year,
//       _month = diffValue / month,
//       _week = diffValue / (7 * day),
//       _day = diffValue / day,
//       _hour = diffValue / hour,
//       _min = diffValue / minute;

//     if (_year >= 1) interT = new Date(oldTime).getFullYear() + '年' + (new Date(oldTime).getMonth() + 1) + '月' + new Date(oldTime).getDate() + '日';
//     else if (_month >= 1) interT = new Date(oldTime).getFullYear() + '年' + (new Date(oldTime).getMonth() + 1) + '月' + new Date(oldTime).getDate() + '日';
//     else if (_week >= 1) interT = new Date(oldTime).getFullYear() + '年' + (new Date(oldTime).getMonth() + 1) + '月' + new Date(oldTime).getDate() + '日';
//     else if (_day >= 1) interT = parseInt(_day) + "天前";
//     else if (_hour >= 1) interT = parseInt(_hour) + "小时前";
//     else if (_min >= 1) interT = parseInt(_min) + "分钟前";
//     else interT = "刚刚";
//     return interT;
//   }

  _onLayout = (event) => {
    let { x, y, width, height } = event.nativeEvent.layout;
    this.setState({
      num: Math.ceil(height / 20)
    })
    if (height <= 60) {
      this.setState({
        shouExpandBtn: false,
      })
    }
  }

  shouExpandCom = () => {
    if (this.state.shouExpandBtn) {
      return (
        <View style={styles.CommentItemExpand} >
          <Text
            style={{ flex: 1, textAlign: 'right', lineHeight: 20, color: '#222', fontSize: 15 }}
            onPress={() => this.changeExpand()}>
            {this.state.Expand ? '收回' : '展开'}
          </Text>
        </View>
      )
    } else {
      return (null)
    }
  }
  replyCom = (rep) => {
    if (rep) {
      return (
        <Text
          ellipsizeMode='tail'
          numberOfLines={3}
        >{rep[0].reply_id}:{rep[0].reply_content}</Text>
      )
    } else {
      return null
    }
  }
  render() {
    const {toDetails} = this.props
    return (
      <View style={{ flexDirection: 'row',paddingHorizontal:15,marginBottom:15 }}>
        <View style={{ width: 65, alignItems: 'center',paddingBottom:10}}>
          <View style={{ backgroundColor: '#ddd', width: 40, height: 40, borderRadius: 20 }}></View>
        </View>
        <View style={{ flex: 1 }}>
          <Text>{this.props.item.user_id}</Text>
          <View style={[{ marginTop: 10, overflow: 'hidden', },]}>
            <Text
              onPress={() => toDetails(this.props.item.son,this.props.item)}
              onLayout={this._onLayout} numberOfLines={this.state.Expand ? null : 3}
            >{this.props.item.com_content}</Text>
            <View>{this.shouExpandCom()}</View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
            <Text>{IntervalTime(this.props.item.com_time)}</Text>
            <TouchableOpacity style={{width: 60, height: 25, borderRadius: 8, borderColor: '#ddd', borderWidth: 1, marginLeft: 10,position:'relative' }} activeOpacity={1}>
              <Text style={{ flex: 1, textAlign: 'center', lineHeight: 23 }}>回复</Text>
              <TextInput style={{position:'absolute',width:60,height:25,opacity:0}}></TextInput>
            </TouchableOpacity>
            <Text style={{ marginHorizontal: 15 }}onPress={() => this.setState({awesome:!this.state.awesome})}>赞{this.state.awesome?this.props.item.com_like+1:this.props.item.com_like}</Text>
            <Text onPress={() => this.setState({nolike:!this.state.nolike})}>不赞同{this.state.nolike?this.props.item.com_nolike+1:this.props.item.com_nolike}</Text>
          </View>
          <View style={{ paddingLeft: 10, marginTop: 10, backgroundColor: '#ddd', }}>
            {this.replyCom(this.props.item.son)}
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  CommentItemExpand: {
    height: 20,
    width: 55,
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#fff'
  }
})
