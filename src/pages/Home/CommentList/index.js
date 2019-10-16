import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Keyboard, KeyboardAvoidingView, Dimensions } from 'react-native';
var screenWidth = Dimensions.get('window').width;
// import axios from 'axios'
import CommentItem from './CommentItem'

export default class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      CommentList: [],
      focus: false,
      keyBoardHeight: '',
      com_content: ''
    };
  }

  getFocus = () => {
    this.setState({ focus: true }, () => {
      this.refs.PublishInput.focus();
    })
  }
  CommentCont = (text) => {
    this.setState({ com_content: text })
  }
  PublishComment = () => {
    // console.log(this.CommentCont())
    Keyboard.dismiss()
    let com_time = new Date()
    let com_content = this.state.com_content
    let user_id = 'newUser'
    this.setState({
      focus: false,
      CommentList: [...this.state.CommentList, { com_time, com_content, user_id }]
    })
  }

  renderCommentInput() {
    if (this.state.focus) {
      return (
        <View style={{
          backgroundColor: '#ddd', position: 'absolute',
          ...Platform.select({
            android: {
              bottom: 0,
            },
            ios: {
              bottom: this.state.keyboardOffset,
            }
          })
          , left: 0, right: 0, flexDirection: 'row', alignItems: 'center'
        }}>
          <TextInput
            ref={"PublishInput"}
            style={{
              marginStart: 15, marginEnd: 10, marginTop: 4,
              marginBottom: 4, height: 40, width: screenWidth - 70, backgroundColor: 'white',
              paddingLeft: 14, borderWidth: 1, borderRadius: 22, borderColor: '#CCCCCC'
            }}
            placeholder={"inputPlaceHold"}
            underlineColorAndroid='transparent' //设置下划线背景色透明 达到去掉下划线的效果
            onChangeText={(com_content) => this.setState({ com_content })}
          />
          <TouchableOpacity style={{ width: 70, marginRight: 0, marginBottom: 0, justifyContent: 'center', alignItems: 'center' }}
            onPress={() => this.PublishComment()}>
            <Text >发送</Text>
          </TouchableOpacity>
        </View>
      )
    } else {
      return null;
    }
  }

  PublishCom = () => {
    if (this.state.focus) {
      return (
        <View style={[styles.Publish]}>
          <TextInput
            placeholder={'请输入你的回复'}
            ref={'PublishInput'}
            style={styles.PublishInput}
            onChangeText={(text) => this.CommentCont(text)}
            onEndEditing={() => this.setState({ focus: false })}
          ></TextInput>
          <TouchableOpacity
            onPress={() => this.PublishComment()}
            style={{ width: 80, height: 50, borderColor: '#ddd', borderWidth: 1, marginRight: 15, }}>
            <Text style={{ textAlign: 'center', lineHeight: 50, }}>发表评论</Text>
          </TouchableOpacity>
        </View>
      )
    } else {
      return null
    }
  }
//   componentDidMount() {
//     this.props.navigation.setParams({ navigatePress: this.getFocus })
//     that = this
//     axios({
//       url: 'http://192.168.10.79:8080/comment',
//       method: 'GET'
//     }).then((res) => {
//       that.setState({
//         CommentList: res.data.result
//       })
//     }).catch((err) => {
//       console.log(err)
//     }
//     )
//   }
  changeExpand = () => {
    this.setState({
      Expand: !this.state.Expand
    })
  }
  toDetails = (son,item) => {
    if(son){
      this.props.navigation.navigate('CommentDetails',{son,item})
    }
  }
  render() {
    return (
      <View style={{ paddingVertical: 10, position: 'relative', flex: 1 }}>
        {
          this.state.CommentList.map((item, index) => {
            return (
              <CommentItem item={item} key={index} toDetails={(son,item) => this.toDetails(son,item)}></CommentItem>
            )
          })
        }
        {
          this.PublishCom()
        }
      </View>
    );
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
