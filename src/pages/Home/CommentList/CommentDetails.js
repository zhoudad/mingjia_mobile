import React, { Component } from 'react';
import { View, Text, TouchableHighlight, TextInput, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
// import CommentItem from './CommentItem'
import px from '../../../utils/px'
import IntervalTime from '../../../utils/IntervalTime'
import axios from 'axios'
import {storage} from '../../../utils/storage'

class DetailsItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      awesome: false,
      nolike: false,
    };
  }

  render() {
    const { repContent } = this.props
    const { com_id, time, reply_content, reply_like, reply_nolike } = this.props.data

    return (
      <View style={styles.detItem}>
        <View style={{ height: px(60), alignItems: 'center', paddingBottom: px(10), flexDirection: 'row', marginTop: px(30) }}>
          <Image
            source={{ uri: 'http://img3.duitang.com/uploads/item/201507/23/20150723115018_ma428.thumb.700_0.jpeg' }}
            style={{ width: px(60), height: px(60), borderRadius: px(30) }} />
          <Text style={{ color: '#303133', fontSize: px(28), marginStart: px(20) }}>{com_id}</Text>
          <Text style={{ color: '#A8ABB3', fontSize: px(20), flex: 1, textAlign: 'right' }}>{IntervalTime(time)}</Text>
        </View>
        <View style={{ flex: 1, marginTop: px(30), marginBottom: px(40) }}>
          <Text numberOfLines={999} style={{ color: '#303133', fontSize: px(24), lineHeight: px(46) }}>{reply_content} </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: px(30), marginBottom: px(40) }}>
          {/* <TouchableOpacity activeOpacity={1} style={styles.replyBtn} onPress={(com_id) => repContent(com_id)}>
            <Text style={{ color: '#A8ABB3', fontSize: px(20) }}>回复TA</Text>
          </TouchableOpacity> */}
          <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'flex-end' }}>
            <TouchableOpacity activeOpacity={1} onPress={() => this.setState({ awesome: !this.state.awesome })} style={{ flexDirection: 'row', alignItems: 'center', marginEnd: px(30) }}>
              <Image
                style={{ width: px(40), height: px(40) }}
                source={this.state.awesome ? require('../../../assets/images/comment_gle.png') : require('../../../assets/images/comment_gle_n.png')} />
              <Text style={{ marginStart: px(7) }}>{this.state.awesome ? reply_like + 1 : reply_like}</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1} style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => this.setState({ nolike: !this.state.nolike })}>
              <Image
                style={{ width: px(40), height: px(40) }}
                source={this.state.nolike ? require('../../../assets/images/comment_ugle.png') : require('../../../assets/images/comment_ugle_n.png')} />
              <Text style={{ marginStart: px(7) }}>{this.state.nolike ? reply_nolike + 1 : reply_nolike}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

export default class CommentDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Expand: false,
      num: '',
      awesome: false,
      nolike: false,
      com_content: '',
      user_id:'',
      account_id:''
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
  }
  repContent = (id) => {
    this.refs.ComInput.focus();
    console.log(id)
  }
  PublishComment() {
    axios({
      url: `http://218.108.34.222:8080/comment_do`,
      method: 'post',
      data: {
        user_id: this.state.user_id,
        com_content: this.state.com_content
      }
    }).then((res) => {
      this.refs.ComInput.clear();
      this.setState({com_content:''})
    })
  }
  PublishCom = () => {
    return (
      <View style={styles.Publish}>
        <TextInput
          placeholder={'请输入你的内容'}
          ref={'ComInput'}
          style={styles.PublishInput}
          onChangeText={(text) => this.setState({ com_content: text })}
        ></TextInput>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => this.PublishComment()}
          style={{ width: px(200), height: px(100), backgroundColor: '#EA4C4C', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ lineHeight: px(46), color: '#FFFFFF', fontSize: px(32), }}>发表评论</Text>
        </TouchableOpacity>
      </View>
    )
  }
  render() {
    let { data } = this.props.navigation.state.params;
    const { user_id, com_content, com_like, com_nolike, son, time } = data
    return (
      <View style={{ flex: 1, backgroundColor: '#F2F4F7', }}>
        <View style={{ marginTop: px(30), }}>
          <View style={styles.CommentItem}>
            <View style={{ height: px(60), alignItems: 'center', paddingBottom: px(10), flexDirection: 'row', marginTop: px(30) }}>
              <Image
                source={{ uri: 'http://img3.duitang.com/uploads/item/201507/23/20150723115018_ma428.thumb.700_0.jpeg' }}
                style={{ backgroundColor: '#EA4C4C', width: px(60), height: px(60), borderRadius: px(30) }} />
              <Text style={{ color: '#303133', fontSize: px(28), marginStart: px(20) }}>{user_id}</Text>
              <Text style={{ color: '#A8ABB3', fontSize: px(20), flex: 1, textAlign: 'right' }}>{IntervalTime(time)}</Text>
            </View>
            <View style={{ marginTop: px(30), }}>
              <Text style={{ color: '#303133', fontSize: px(24), lineHeight: px(46) }}>{com_content}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: px(30), marginBottom: px(40) }}>
              <TouchableOpacity activeOpacity={1} style={styles.replyBtn} onPress={() => this.refs.ComInput.focus()}>
                <Text style={{ color: '#A8ABB3', fontSize: px(20) }}>回复TA</Text>
              </TouchableOpacity>
              <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'flex-end' }}>
                <TouchableOpacity activeOpacity={1} onPress={() => this.setState({ awesome: !this.state.awesome })} style={{ flexDirection: 'row', alignItems: 'center', marginEnd: px(30) }}>
                  <Image
                    style={{ width: px(40), height: px(40) }}
                    source={this.state.awesome ? require('../../../assets/images/comment_gle.png') : require('../../../assets/images/comment_gle_n.png')} />
                  <Text style={{ marginStart: px(7) }}>{this.state.awesome ? com_like + 1 : com_like}</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => this.setState({ nolike: !this.state.nolike })}>
                  <Image
                    style={{ width: px(40), height: px(40) }}
                    source={this.state.nolike ? require('../../../assets/images/comment_ugle.png') : require('../../../assets/images/comment_ugle_n.png')} />
                  <Text style={{ marginStart: px(7) }}>{this.state.nolike ? com_nolike + 1 : com_nolike}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View style={{ flex: 1, paddingBottom: px(100) }}>
          <View style={{ height: px(100), paddingStart: px(30), backgroundColor: '#fff', justifyContent: 'center', }}>
            <Text style={{ color: '#303133', fontWeight: 'bold', fontSize: px(32) }}>全部回复</Text>
          </View>
          <ScrollView style={{ flex: 1, marginTop: px(1) }} showsVerticalScrollIndicator={false}>
            {
              son ? son.map((item, index) => {
                return (
                  <DetailsItem data={item} key={index} repContent={(id) => this.repContent(id)} />
                )
              }) : null
            }
          </ScrollView>
        </View>
        {
          this.PublishCom()
        }
      </View>
    );
  }
}
const styles = StyleSheet.create({
  Publish: {
    height: px(100),
    width: '100%',
    backgroundColor: '#fff',
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
    backgroundColor: '#F2F4F7',
    paddingStart: px(30),
    backgroundColor: '#FFF'
  },
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
    backgroundColor: '#FFFFFF',
    // flex: 1,
    // minHeight: px(400)
  },
  detItem: {
    paddingHorizontal: px(30),
    marginBottom: px(30),
    backgroundColor: '#FFFFFF',
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
})
