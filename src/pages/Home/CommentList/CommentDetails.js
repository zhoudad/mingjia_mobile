import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput,Dimensions ,ScrollView} from 'react-native';
var screenWidth = Dimensions.get('window').width;
import IntervalTime from '../../../utils/IntervalTime'

class CommentDetailsItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
  render() {
    const {item,Reply} = this.props
    return (
      <View style={{ flexDirection: 'row', paddingVertical: 10, }}>
        <View style={{ width: 65, alignItems: 'center' }}>
          <View style={{ backgroundColor: '#ddd', width: 40, height: 40, borderRadius: 20 }}></View>
        </View>
        <View style={{ flex: 1 }}>
          <Text>{item.user_id}</Text>
          <View style={[{ marginTop: 10, overflow: 'hidden', }]}>
            <Text>{item.com_content?item.com_content:item.reply_content}</Text>
            {/* <View>{shouExpandCom()}</View> */}
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
            <Text>{IntervalTime(item.com_time?item.com_time:item.reply_time)}</Text>
            <TouchableOpacity style={{ width: 60, height: 25, borderRadius: 8, borderColor: '#ddd', borderWidth: 1, marginLeft: 10 }} activeOpacity={1}>
              <Text 
              onPress={() => Reply()}
              style={{ flex: 1, textAlign: 'center', lineHeight: 23 }}
              >回复</Text>
            </TouchableOpacity>
            <Text style={{ marginHorizontal: 15 }}onPress={() => this.setState({awesome:!this.state.awesome})}>赞{this.state.awesome?item.com_like?item.com_like+1:item.reply_like+1:item.com_like?item.com_like:item.reply_like}</Text>
            <Text onPress={() => this.setState({nolike:!this.state.nolike})}>不赞同{this.state.nolike?item.com_nolike?item.com_nolike+1:item.reply_nolike+1:item.com_nolike?item.com_nolike:item.reply_nolike}</Text>
          </View>
        </View>
      </View>
    );
  }
}
export default class CommentDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      com_content:'',
      com_list:[],
      com_item:'',
      focus:false,
    };
  }
  componentDidMount(){
    let { son,item } = this.props.navigation.state.params;
    console.log(item,son)
    this.setState({
      com_list:[...son],
      com_item:item
    })
  }
  ReplyCom = () => {
    if (this.state.focus) {
      return (
        <View style={styles.Publish}>
          <TextInput
            placeholder={'请输入你的回复'}
            ref={'ReplyInput'}
            style={styles.PublishInput}
            onChangeText={(text) => this.CommentCont(text)}
            onEndEditing={() => this.setState({ focus: false })}
          ></TextInput>
          <TouchableOpacity
            onPress={() => this.ReplyComment()}
            style={{ width: 80, height: 50, borderColor: '#ddd', borderWidth: 1, marginRight: 15, }}>
            <Text style={{ textAlign: 'center', lineHeight: 50, }}>发表评论</Text>
          </TouchableOpacity>
        </View>
      )
    } else {
      return null
    }
  }
  ReplyComment = () => {
    this.setState({focus:false})
  }
  Reply = () => {
    this.setState({focus:true},() => {
      this.refs.ReplyInput.focus()
    })
  }
  render() {
    return (
      <View style={{ flex: 1, position: 'relative', }}>
        <CommentDetailsItem item={this.state.com_item} Reply={() => this.Reply()}/>
        <View style={{ height: 10, backgroundColor: '#ddd' }}></View>
        <View style={{flex:1}}>
          <Text style={{ lineHeight: 40, paddingLeft: 20, backgroundColor: '#aaa' }}>更多回复</Text>
          <ScrollView style={{flex:1}}>
            {
              this.state.com_list.map((item,index) => {
                return(
                  <CommentDetailsItem key={index} item={item} Reply={() => this.Reply()}/>
                )
              })
            }
          </ScrollView>
        </View>
        {
          this.ReplyCom()
        }
        {/* <View style={{
          backgroundColor: '#fff', position: 'absolute',bottom: 0
          , left: 0, right: 0, flexDirection: 'row', alignItems: 'center'
        }}>
          <TextInput
            ref={"PublishInput"}
            style={{
              marginEnd: 10, marginTop: 4,
               height: 40, width: screenWidth - 70, backgroundColor: 'white',
              paddingLeft: 14, borderWidth: 1, borderColor: '#CCCCCC'
            }}
            placeholder={"请输入你的回复"}
            underlineColorAndroid='transparent' 
            onChangeText={(com_content) => this.setState({ com_content })}
          />
          <TouchableOpacity style={{ width: 70, alignItems: 'flex-start' }}
            onPress={() => this.PublishComment()}>
            <Text>发送</Text>
          </TouchableOpacity>
        </View> */}
      </View>
    )
  }
}
const styles = StyleSheet.create({
  Publish: {
    height: 80,
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    left: 0,
    borderColor: '#ddd',
    borderWidth: 1,
    bottom: 0,
  },
  PublishInput: {
    flex: 1,
    borderColor: '#169',
    borderWidth: 1,
    marginStart: 15,
    marginEnd: 15
  }
})
