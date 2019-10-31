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
      img_name:[],
      focus: false,
      com_content: '',//评论内容
      account_id:'',
      toRep:false,
      rep_content:'',//回复内容
      rep_id:'',
      account_id:'',
      user_id:''
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
    this.props.navigation.setParams({ navigatePress: this.getFocus })
    axios({
      url: 'http://218.108.34.222:8080/comment?account_id=' + this.state.account_id,
    }).then((res) => {
      this.setState({
        CommentList: res.data.result
      })
      this.state.CommentList.forEach((item,index) => {
        console.log(item)
        axios({
          url:'http://218.108.34.222:8080/user_img',
          method:'post',
          data:{user_id:item.user_id}
        }).then(res =>{
          console.log(res)
          this.setState({
            // CommentList[index]:[...this.state.CommentList]
          })
          // res.data.result.img,
          // res.data.result.name,

        })
      })
    })
  }

  getFocus = () => {
    this.setState({ focus: true }, () => {
      this.refs.PublishInput.focus();
    })
  }
  getRepId = (id) =>{
    this.setState({rep_id:id,toRep:true},() => {
      this.refs.repInput.focus();
    })
  }

  publisRep(){
    Keyboard.dismiss()
    this.setState({  toRep: false })
    axios({
      url: `http://218.108.34.222:8080/reply_do`,
      method: 'post',
      data:{
        user_id:this.state.user_id,
        com_id:this.state.rep_id,
        rep_content:this.state.rep_content
      }
    }).then((res) => {
      console.log(res)
    })
  }
  repCom = () => {
    if (this.state.toRep) {
      return (
        <View style={styles.Publish}>
          <TextInput
            placeholder={'回复' + this.state.rep_id + ':'}
            ref={'repInput'}
            style={styles.PublishInput}
            onChangeText={(text) => this.setState({ rep_content: text })}
            onEndEditing={() => this.setState({ toRep: false })}
          ></TextInput>
          <TouchableOpacity 
            onPress={() => this.publisRep()}
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
    this.setState({
      focus: false,
    })
    axios({
      url: `http://218.108.34.222:8080/comment_do`,
      method: 'post',
      data:{
        user_id:this.state.user_id,
        com_content:this.state.com_content
      }
    }).then((res) => {
      console.log(res)
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
