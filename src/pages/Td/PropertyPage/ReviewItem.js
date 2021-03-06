import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Keyboard, TextInput, Image, } from 'react-native';
import IntervalTime from '../../../utils/IntervalTime'
import px from '../../../utils/px'
import { withNavigation } from 'react-navigation';
import { storage } from '../../../utils/storage'

class ReviewItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Expand: false,//展开
      shouExpandBtn: false,//是否展示按钮
      num: '',
      nolike: false
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

  toLike() {
    const { com_id, } = this.props.data
    this.setState({ nolike: !this.state.nolike }, () => {
      if (this.state.nolike) {
        axios({
          url: 'http://218.108.34.222:8080/remark_like',
          method: 'post',
          data: {
            com_id: com_id,
            user_id: this.state.user_id,
          }
        })
      } else {
        axios({
          url: 'http://218.108.34.222:8080/remark_nolike',
          method: 'post',
          data: {
            com_id: com_id,
            user_id: this.state.user_id,
          }
        })
      }
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
  render() {
    const { navigation, data, } = this.props
    return (
      <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('ReviewDetails',{ data })}>
        <View style={styles.CommentItem}>
          <View style={{ height: px(60), alignItems: 'center', paddingBottom: px(10), flexDirection: 'row', marginTop: px(30) }}>
            <Image
              source={{ uri: 'http://img3.duitang.com/uploads/item/201507/23/20150723115018_ma428.thumb.700_0.jpeg' }}
              style={{ backgroundColor: '#EA4C4C', width: px(60), height: px(60), borderRadius: px(30) }} />
            <Text style={{ color: '#303133', fontSize: px(28), marginStart: px(20) }}>{data.com_id}</Text>
            <Text style={{ color: '#A8ABB3', fontSize: px(20), flex: 1, textAlign: 'right' }}>{IntervalTime(data.time)}</Text>
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
                style={{ color: '#303133', fontSize: px(24), lineHeight: px(46) }}>{data.com_content}</Text>
              <View>{this.shouExpandCom()}</View>
              <View style={{ marginTop: px(20), flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
                <Image
                  style={{ width: px(120), height: px(120), borderRadius: px(10), marginEnd: px(20) }}
                  source={{ uri: 'http://img.pconline.com.cn/images/upload/upc/tx/itbbs/1412/12/c7/577115_1418395060436_mthumb.jpg' }} />
                <Image
                  style={{ width: px(120), height: px(120), borderRadius: px(10), marginEnd: px(20) }}
                  source={{ uri: 'http://img.pconline.com.cn/images/upload/upc/tx/itbbs/1412/12/c7/577115_1418395060436_mthumb.jpg' }} />

              </View>
            </View>
            <View style={{ marginTop: px(30), marginBottom: px(40) }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'flex-end' }}>
                <TouchableOpacity 
                activeOpacity={1} 
                style={{ flexDirection: 'row', alignItems: 'center', marginEnd: px(30) }}>
                  <Image style={{ width: px(40), height: px(40) }} source={require('../../../assets/images/comment_talk.png')} />
                  <Text style={{ marginStart: px(7) }}>{data.reply_num}</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                 onPress={() => this.toLike()}
                activeOpacity={1} 
                style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image 
                  style={{ width: px(40), height: px(40) }} 
                  source={this.state.nolike ? require('../../../assets/images/comment_gle.png') : require('../../../assets/images/comment_gle_n.png')} />
                  <Text style={{ marginStart: px(7) }}>{data.com_like}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
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
  }
})
export default withNavigation(ReviewItem);