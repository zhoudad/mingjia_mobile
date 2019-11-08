import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Keyboard, TextInput, Image, Dimensions } from 'react-native';
import IntervalTime from '../../../utils/IntervalTime'
import px from '../../../utils/px'
import { storage } from '../../../utils/storage'
import { withNavigation } from 'react-navigation';
import axios from 'axios'
var screenWidth = Dimensions.get('window').width;

class CommentItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Expand: false,//展开
      shouExpandBtn: false,//是否展示按钮
      num: '',
      awesome: false,
      nolike: false,
    };
  }

  componentDidMount() {
    let self = this
    storage.getBatchData([
      { key: 'userId', syncInBackground: false },
    ]).then(results => {
      self.setState({
        user_id: results[0].user_id,
      })
    })
  }

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

  toLike() {
    const { com_id, } = this.props.data
    this.setState({ awesome: !this.state.awesome }, () => {
      if (this.state.awesome) {
        axios({
          url: 'http://218.108.34.222:8080/com_like',
          method: 'post',
          data: {
            com_id: com_id,
            user_id: this.state.user_id,
          }
        })
      } else {
        axios({
          url: 'http://218.108.34.222:8080/com_offlike',
          method: 'post',
          data: {
            com_id: com_id,
            user_id: this.state.user_id,
          }
        })
      }
    })

  }
  noLike() {
    const { com_id, } = this.props.data
    this.setState({ nolike: !this.state.nolike }, () => {
      if (this.state.nolike) {
        axios({
          url: 'http://218.108.34.222:8080/com_nolike',
          method: 'post',
          data: {
            com_id: com_id,
            user_id: this.state.user_id,
          }
        })
      } else {
        axios({
          url: 'http://218.108.34.222:8080/com_offnolike',
          method: 'post',
          data: {
            com_id: com_id,
            user_id: this.state.user_id,
          }
        })
      }
    })

  }

  render() {
    const { navigation, getRepId, data, } = this.props
    const { user_id, com_content, com_like, com_nolike, son, time, com_id, inf } = data
    return (
      <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('CommentDetails', { data })}>
        <View style={styles.CommentItem}>
          <View style={{ height: px(60), alignItems: 'center', paddingBottom: px(10), flexDirection: 'row', marginTop: px(30) }}>
            <Image
              source={{ uri: 'http://img3.duitang.com/uploads/item/201507/23/20150723115018_ma428.thumb.700_0.jpeg' }}
              style={{ backgroundColor: '#EA4C4C', width: px(60), height: px(60), borderRadius: px(30) }} />
            <Text style={{ color: '#303133', fontSize: px(28), marginStart: px(20) }}>{inf.user_name}</Text>
            <Text style={{ color: '#A8ABB3', fontSize: px(20), flex: 1, textAlign: 'right' }}>
              {IntervalTime(time)}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <View style={{ marginTop: px(30), }}>
              <Text
                onLayout={(event) => {
                  if (event.nativeEvent.layout.height > 50) {
                    this.setState({ shouExpandBtn: true })
                  }
                }}
                numberOfLines={this.state.Expand ? 999 : 2}
                style={{ color: '#303133', fontSize: px(24), lineHeight: px(46) }}>
                {com_content}
              </Text>
              <View>{this.shouExpandCom()}</View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: px(30), marginBottom: px(40) }}>
              <TouchableOpacity activeOpacity={1} style={styles.replyBtn} onPress={() => getRepId(inf.user_name,com_id)}>
                <Text style={{ color: '#A8ABB3', fontSize: px(20) }}>回复TA</Text>
              </TouchableOpacity>
              <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'flex-end' }}>
                <TouchableOpacity activeOpacity={1} onPress={() => this.toLike()} style={{ flexDirection: 'row', alignItems: 'center', marginEnd: px(30) }}>
                  <Image
                    style={{ width: px(40), height: px(40) }}
                    source={this.state.awesome ? require('../../../assets/images/comment_gle.png') : require('../../../assets/images/comment_gle_n.png')} />
                  <Text style={{ marginStart: px(7) }}>{this.state.awesome ? com_like + 1 : com_like}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={1}
                  style={{ flexDirection: 'row', alignItems: 'center' }}
                  onPress={() => this.noLike()}>
                  <Image
                    style={{ width: px(40), height: px(40) }}
                    source={this.state.nolike ? require('../../../assets/images/comment_ugle.png') : require('../../../assets/images/comment_ugle_n.png')} />
                  <Text style={{ marginStart: px(7) }}>{this.state.nolike ? com_nolike + 1 : com_nolike}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {
            son ? <View style={{ padding: px(30), backgroundColor: '#F2F4F7', borderRadius: px(10), marginBottom: px(20) }}>
              <Text style={{ color: '#303133', fontSize: px(20), lineHeight: px(46) }}>
                <Text>{son[0].reply_id}:</Text>
                <Text>{son[0].reply_content}</Text>
              </Text>
            </View> : null
          }
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
    backgroundColor: '#FFFFFF',
  },
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
    fontSize: px(28)
  }
})
export default withNavigation(CommentItem);