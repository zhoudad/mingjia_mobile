import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Keyboard, KeyboardAvoidingView, Dimensions, ScrollView } from 'react-native';
import storage from '../../../utils/storage'
import axios from 'axios'
import CommentItem from './CommentItem'
import px from '../../../utils/px'
var screenWidth = Dimensions.get('window').width;

export default class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      CommentList: [],
      focus: false,
      com_content: '',//评论内容
      account_id:'',
      toRep:false,
      rep_content:'',//回复内容
      rep_id:''
    };
  }
  componentDidMount() {
    // storage.load({
    //   key: 'accessToken',
    // }).then((token) => {
    //   this.setState({ token })
    // })
    // storage.load({
    //   key: 'Id',
    // }).then((data) => {
    //   this.setState({ account_id: data.account_id })
    // })
    this.props.navigation.setParams({ navigatePress: this.getFocus })
    axios({
      url: `http://218.108.34.222:8080/comment?account_id=${2}`,
      method: 'GET'
    }).then((res) => {
      console.log(res)
      this.setState({
        CommentList: res.data.result
      })
    })
  }

  getFocus = () => {
    this.setState({ focus: true }, () => {
      this.refs.PublishInput.focus();
    })
  }
  getRepId = (id) =>{
    console.log(id)
    this.setState({rep_id:id,toRep:true},() => {
      this.refs.repInput.focus();
    })
  }

  repCom = () => {
    if (this.state.toRep) {
      return (
        <View style={styles.Publish}>
          <TextInput
            placeholder={'请输入内容回复内容'}
            ref={'repInput'}
            style={styles.PublishInput}
            onChangeText={(text) => this.setState({ rep_content: text })}
            onEndEditing={() => this.setState({ toRep: false })}
          ></TextInput>
          <TouchableOpacity
            onPress={() => {
              Keyboard.dismiss()
              this.setState({
                toRep: false
              })
            }}
            style={{ width: px(200), height: px(100), backgroundColor: '#EA4C4C' }}>
            <Text style={{ textAlign: 'center', lineHeight: px(100), color: '#FFF' ,fontSize:px(32)}}>发表回复</Text>
          </TouchableOpacity>
        </View>
      )
    } else {
      return null
    }
  }

  PublishComment = () => {
    Keyboard.dismiss()
    let com_time = new Date()
    let com_content = this.state.com_content
    let user_id = 'newUser'
    this.setState({
      focus: false,
      CommentList: [...this.state.CommentList, { com_time, com_content, user_id }]
    })
  }

  PublishCom = () => {
    if (this.state.focus) {
      return (
        <View style={styles.Publish}>
          <TextInput
            placeholder={'请输入评论内容'}
            ref={'PublishInput'}
            style={styles.PublishInput}
            onChangeText={(text) => this.setState({ com_content: text })}
            onEndEditing={() => this.setState({ focus: false })}
          ></TextInput>
          <TouchableOpacity
            onPress={() => this.PublishComment()}
            style={{ width: px(200), height: px(100), backgroundColor: '#EA4C4C' }}>
            <Text style={{ textAlign: 'center', lineHeight: px(100), color: '#FFF' ,fontSize:px(32)}}>发表评论</Text>
          </TouchableOpacity>
        </View>
      )
    } else {
      return null
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, backgroundColor: '#F2F4F7', marginTop: px(30) }}>
          {
            this.state.CommentList.map((item,index) => {
              return(
                <CommentItem key={index} data={item} getRepId={(id) => this.getRepId(id)}/>
              )
            })
          }
        </ScrollView>
        {this.PublishCom()}
        {this.repCom()}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  Publish: {
    height: px(100),
    width: screenWidth,
    backgroundColor: '#FFF',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    left: 0,
    bottom: 0,
  },
  PublishInput: {
    padding: 0,
    flex: 1,
    paddingLeft: px(30),
    fontSize:px(28)
  }
})
