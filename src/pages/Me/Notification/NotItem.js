import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import px from '../../../utils/px'

export default class NotItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
        num: '',
      awesome: false,
      nolike: false
    };
  }

  render() {
    return (
      <View style={styles.CommentItem}>
            <View style={{ height: px(60), alignItems: 'center', paddingBottom: px(10), flexDirection: 'row', marginTop: px(30) }}>
              <Image
                style={{ backgroundColor: '#EA4C4C', width: px(60), height: px(60), borderRadius: px(30) }} />
              <Text style={{ color: '#303133', fontSize: px(28), marginStart: px(20) }}>周大大</Text>
              <Text style={{ color: '#A8ABB3', fontSize: px(20), flex: 1, textAlign: 'right' }}>10分钟前</Text>
            </View>
            <View style={{ marginTop: px(30), }}>
                <Text style={{fontSize: px(24), lineHeight: px(46)}}>
                    <Text style={{ color: '#303133',}}>
                        各地经常会举办房地产交易会，在房地产交易会上通常会开辟二手房专区。可通过查看网络或多留意报刊杂志等渠道获得信息。
                        </Text>
                        <Text style={{color:'#EA4C4C'}}>//@125**121</Text>
                </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: px(30),marginBottom:px(40) }}>
              <TouchableOpacity activeOpacity={1} style={styles.replyBtn}>
                <Text style={{ color: '#A8ABB3', fontSize: px(20) }}>删除</Text>
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
    );
  }
}

const styles = StyleSheet.create({
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
  }
})