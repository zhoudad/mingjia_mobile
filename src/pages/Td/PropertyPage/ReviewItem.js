import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Keyboard, TextInput, Image,  } from 'react-native';
import IntervalTime from '../../../utils/IntervalTime'
import px from '../../../utils/px'
import { withNavigation } from 'react-navigation';

class ReviewItem extends Component {
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

//   _onLayout = (event) => {
//     let { x, y, width, height } = event.nativeEvent.layout;
//     this.setState({
//       num: Math.ceil(height / 20)
//     })
//     if (height <= 60) {
//       this.setState({
//         shouExpandBtn: false,
//       })
//     }
//   }

  shouExpandCom = () => {
    if (this.state.shouExpandBtn) {
      return (
        <View style={styles.CommentItemExpand} >
          <Text
            style={{ flex: 1, textAlign: 'right', color: '#A8ABB3', fontSize: px(24) }}
            onPress={() => this.setState({ Expand: !this.state.Expand, })}>
            {this.state.Expand ? '收回' : '展开>'}
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
        ></Text>
      )
    } else {
      return null
    }
  }
  render() {
    const {navigation} = this.props
    return (
      <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('ReviewDetails')}>
        <View style={styles.CommentItem}>
          <View style={{ height: px(60), alignItems: 'center', paddingBottom: px(10), flexDirection: 'row',marginTop:px(30) }}>
            <Image
              style={{ backgroundColor: '#EA4C4C', width: px(60), height: px(60), borderRadius: px(30) }} />
            <Text style={{ color: '#303133', fontSize: px(28), marginStart: px(20) }}>周大大</Text>
            <Text style={{ color: '#A8ABB3', fontSize: px(20), flex: 1, textAlign: 'right' }}>10分钟前</Text>
          </View>
          <View style={{ flex: 1 }}>
            <View style={{ marginTop: px(30), }}>
              <Text numberOfLines={this.state.Expand ? 999 : 2} style={{ color: '#303133', fontSize: px(24),lineHeight:px(46) }}>
                各地经常会举办房地产交易会，在房地产交易会上通常会开辟二手房专区。可通过查看网络或多留意报刊杂志等渠道获得信息。
                各地经常会举办房地产交易会，在房地产交易会上通常会开辟二手房专区。可通过查看网络或多留意报刊杂志等渠道获得信息。</Text>
              <View>{this.shouExpandCom()}</View>
              <View style={{marginTop:px(20),flexDirection:'row',alignItems:'center',flexWrap:'wrap'}}>
                <Image 
                style={{width:px(120),height:px(120),borderRadius:px(10),marginEnd:px(20)}}
                source={{uri:'https://facebook.github.io/react-native/img/tiny_logo.png'}}/>
                <Image 
                style={{width:px(120),height:px(120),borderRadius:px(10),marginEnd:px(20)}}
                source={{uri:'https://facebook.github.io/react-native/img/tiny_logo.png'}}/>
                
              </View>
            </View>
            <View style={{ marginTop: px(30),marginBottom:px(40) }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'flex-end' }}>
                <TouchableOpacity activeOpacity={1} style={{ flexDirection: 'row', alignItems: 'center', marginEnd: px(30) }}>
                  <Image style={{ width: px(40), height: px(40) }} source={require('../../../assets/images/comment_talk.png')} />
                  <Text style={{ marginStart: px(7) }}>123</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image style={{ width: px(40), height: px(40) }} source={require('../../../assets/images/comment_nice.png')} />
                  <Text style={{ marginStart: px(7) }}>123</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  CommentItemExpand: {
    height: px(30),
    backgroundColor: '#fff',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row'
  },
  replyBtn: {
    borderWidth: px(1),
    borderColor: '#D8DCE6',
    width: px(108),
    height: px(44),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: px(22),
  },
  CommentItem: {
    paddingHorizontal: px(30),
    marginBottom: px(30),
    backgroundColor:'#FFFFFF',
  }
})
export default withNavigation(ReviewItem);