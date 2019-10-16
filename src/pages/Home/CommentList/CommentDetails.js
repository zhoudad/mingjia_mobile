import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Dimensions, ScrollView } from 'react-native';
var screenWidth = Dimensions.get('window').width;
import IntervalTime from '../../../utils/IntervalTime'
import CommentItem from './CommentItem'
import px from '../../../utils/px'

export default class CommentDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      com_content: '',
      com_list: [],
      com_item: '',
      focus: false,
    };
  }
  // componentDidMount() {
  //   let { son, item } = this.props.navigation.state.params;
  //   console.log(item, son)
  //   this.setState({
  //     com_list: [...son],
  //     com_item: item
  //   })
  // }
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
    this.setState({ focus: false })
  }
  Reply = () => {
    this.setState({ focus: true }, () => {
      this.refs.ReplyInput.focus()
    })
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#F2F4F7', }}>
        <View style={{marginTop:px(30)}}>
        <CommentItem />
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ height: px(100), paddingStart: px(30),backgroundColor:'#fff',justifyContent:'center', }}>
            <Text style={{ color: '#303133', fontWeight: 'bold', fontSize: px(32) }}>全部回复</Text>
          </View>
          <ScrollView style={{ flex: 1,marginTop:px(1) }}>
            <CommentItem />
            <CommentItem />
            <CommentItem />
            <CommentItem />
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
    height: px(100),
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    left: 0,
    bottom: 0,
    paddingStart:px(30)
  },
  PublishInput: {
    flex: 1,
  }
})
