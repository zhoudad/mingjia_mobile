import React, { Component } from 'react';
import { View, Text, TouchableHighlight, TextInput, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import px from '../../../utils/px'
import IntervalTime from '../../../utils/IntervalTime'

class DetailsItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Expand: false,
    };
  }
  render() {
    const { com_id, time, reply_content} = this.props.data
    return (
      <View style={styles.ReviewItem}>
        <View style={{ height: px(60), alignItems: 'center', paddingBottom: px(10), flexDirection: 'row', marginTop: px(30) }}>
          <Image
            source={{ uri: 'http://img3.duitang.com/uploads/item/201507/23/20150723115018_ma428.thumb.700_0.jpeg' }}
            style={{ width: px(60), height: px(60), borderRadius: px(30) }} />
          <Text style={{ color: '#303133', fontSize: px(28), marginStart: px(20) }}>{com_id}</Text>
          <Text style={{ color: '#A8ABB3', fontSize: px(20), flex: 1, textAlign: 'right' }}>{IntervalTime(time)}</Text>
        </View>
        <View style={{ flex: 1, marginTop: px(30), marginBottom: px(40) }}>
          <Text numberOfLines={999} style={{ color: '#303133', fontSize: px(24), lineHeight: px(46) }}>{reply_content}</Text>
        </View>
      </View>
    )
  }
}

export default class ReviewDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Expand: false,
      text: '',
      nolike: false
    };
  }
  PublishCom = () => {
    return (
      <View style={styles.Publish}>
        <TextInput
          placeholder={'请输入你的回复'}
          ref={'PublishInput'}
          style={styles.PublishInput}
          onChangeText={(text) => this.CommentCont(text)}
        ></TextInput>
        <TouchableHighlight
          // onPress={() => this.PublishComment()}
          style={{ width: px(200), height: px(100), backgroundColor: '#EA4C4C', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ lineHeight: px(46), color: '#FFFFFF', fontSize: px(32), }}>发表</Text>
        </TouchableHighlight>
      </View>
    )
  }
  render() {
    let { data } = this.props.navigation.state.params;
    const { user_id, com_content, com_like, com_nolike, son, time } = data
    return (
      <View style={{ flex: 1, backgroundColor: '#F2F4F7', }}>
        <View style={{ marginTop: px(30) }}>
          <View style={styles.ReviewItem}>
            <View style={{ height: px(60), alignItems: 'center', paddingBottom: px(10), flexDirection: 'row', marginTop: px(30) }}>
              <Image
                source={{ uri: 'http://img3.duitang.com/uploads/item/201507/23/20150723115018_ma428.thumb.700_0.jpeg' }}
                style={{ width: px(60), height: px(60), borderRadius: px(30) }} />
              <Text style={{ color: '#303133', fontSize: px(28), marginStart: px(20) }}>{user_id}</Text>
              <Text style={{ color: '#A8ABB3', fontSize: px(20), flex: 1, textAlign: 'right' }}>{IntervalTime(time)}</Text>
            </View>
            <View style={{ marginTop: px(30) }}>
              <Text style={{ color: '#303133', fontSize: px(24), lineHeight: px(46) }}>{com_content}</Text>
              {/* <View style={styles.ReviewItemExpand} >
                <Text
                  style={{ flex: 1, textAlign: 'right', color: '#A8ABB3', fontSize: px(24) }}
                  onPress={() => this.setState({ Expand: !this.state.Expand, })}>
                  {this.state.Expand ? '收回' : '展开>'}
                </Text>
              </View> */}
            </View>
            <View style={{ marginTop: px(30), flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginBottom: px(40) }}>
              <TouchableOpacity 
              onPress={() => this.setState({ nolike: !this.state.nolike })}
              activeOpacity={1} style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image style={{ width: px(40), height: px(40) }} 
                source={this.state.nolike ? require('../../../assets/images/comment_gle.png') : require('../../../assets/images/comment_gle_n.png')} />
                <Text style={{ marginStart: px(7) }}>123</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{ flex: 1, paddingBottom: px(100) }}>
          <View style={{ height: px(100), paddingStart: px(30), backgroundColor: '#fff', justifyContent: 'center', }}>
            <Text style={{ color: '#303133', fontWeight: 'bold', fontSize: px(32) }}>全部回复</Text>
          </View>
          <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, marginTop: px(2) }}>
            {
              son ? son.map((item, index) => {
                return (
                  <DetailsItem data={item} key={index} />
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
  ReviewItemExpand: {
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
  ReviewItem: {
    paddingHorizontal: px(30),
    marginBottom: px(30),
    backgroundColor: '#FFFFFF',
  }
})
