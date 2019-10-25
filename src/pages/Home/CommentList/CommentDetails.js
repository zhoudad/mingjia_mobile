import React, { Component } from 'react';
import { View, Text, TouchableHighlight, TextInput, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import CommentItem from './CommentItem'
import px from '../../../utils/px'

export default class ReviewDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Expand: false,
      num: '',
      awesome: false,
      nolike: false
    };
  }
  PublishCom = () => {
    // if (this.state.focus) {
    return (
      <View style={styles.Publish}>
        <TextInput
          placeholder={'请输入你的回复'}
          ref={'PublishInput'}
          style={styles.PublishInput}
        // onChangeText={(text) => this.CommentCont(text)}
        // onEndEditing={() => this.setState({ focus: false })}
        ></TextInput>
        <TouchableHighlight
          onPress={() => this.PublishComment()}
          style={{ width: px(200), height: px(100), backgroundColor: '#EA4C4C', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ lineHeight: px(46), color: '#FFFFFF', fontSize: px(32), }}>发表评论</Text>
        </TouchableHighlight>
      </View>
    )
    // } else {
    //   return null
    // }
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#F2F4F7', }}>
        <View style={{ marginTop: px(30), }}>
          <View style={styles.CommentItem}>
            <View style={{ height: px(60), alignItems: 'center', paddingBottom: px(10), flexDirection: 'row', marginTop: px(30) }}>
              <Image
                style={{ backgroundColor: '#EA4C4C', width: px(60), height: px(60), borderRadius: px(30) }} />
              <Text style={{ color: '#303133', fontSize: px(28), marginStart: px(20) }}>周大大</Text>
              <Text style={{ color: '#A8ABB3', fontSize: px(20), flex: 1, textAlign: 'right' }}>10分钟前</Text>
            </View>
            <View style={{ marginTop: px(30), }}>
              <Text style={{ color: '#303133', fontSize: px(24), lineHeight: px(46) }}>
                各地经常会举办房地产交易会，在房地产交易会上通常会开辟二手房专区。可通过查看网络或多留意报刊杂志等渠道获得信息。
              各地经常会举办房地产交易会，在房地产交易会上通常会开辟二手房专区。可通过查看网络或多留意报刊杂志等渠道获得信息。
                </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: px(30),marginBottom:px(40) }}>
              <TouchableOpacity activeOpacity={1} style={styles.replyBtn} onPress={() => this.refs.PublishInput.focus()}>
                <Text style={{ color: '#A8ABB3', fontSize: px(20) }}>回复TA</Text>
              </TouchableOpacity>
              <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'flex-end' }}>
                <TouchableOpacity activeOpacity={1} onPress={() => this.setState({ awesome: !this.state.awesome })} style={{ flexDirection: 'row', alignItems: 'center', marginEnd: px(30) }}>
                  <Image
                    style={{ width: px(40), height: px(40) }}
                    source={this.state.awesome ? require('../../../assets/images/comment_gle.png') : require('../../../assets/images/comment_gle_n.png')} />
                  <Text style={{ marginStart: px(7) }}>{this.state.awesome ? 2 + 1 : 2}</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => this.setState({ nolike: !this.state.nolike })}>
                  <Image
                    style={{ width: px(40), height: px(40) }}
                    source={this.state.nolike ? require('../../../assets/images/comment_ugle.png') : require('../../../assets/images/comment_ugle_n.png')} />
                  <Text style={{ marginStart: px(7) }}>{this.state.nolike ? 1 + 1 : 1}</Text>
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
            <CommentItem />
            <CommentItem />
            <CommentItem />
            <CommentItem />
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
  }
})
