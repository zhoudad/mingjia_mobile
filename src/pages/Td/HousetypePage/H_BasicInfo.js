import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, ImageBackground, TouchableOpacity, TextInput, Dimensions, StatusBar, Modal, TouchableHighlight } from 'react-native';
import px from '../../../utils/px'
import Swiper from 'react-native-swiper';
// import ActionSheet from 'react-native-general-actionsheet';
import Communications from 'react-native-communications';
import { BoxShadow } from 'react-native-shadow'
const { height, width } = Dimensions.get('window')

export default class H_BasicInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headerIndex: 0,
      ReviewVisible: false,
      callVisible: false,
      tel: ''
    };
  }
  callProperty() {
    let thef = this
    if (!this.state.tel) {
      this.setState({ callVisible: true }, () => {
        thef.timer = setTimeout(
          () => { thef.setState({ callVisible: false }) },
          1000
        )
      })
    } else {
      Communications.phonecall(tel, true)
    }
  }
  Toast() {
    const frame_right = require('../../../assets/images/frame_right.png')
    const shadowOpt = {
      height: px(280),
      width: px(280),
      x: px(-12),
      y: px(-1),
      border: px(75),
      radius: px(26),
      opacity: 0.4,
      color: "#EAEAEA",
      // style:{}
    }
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.callVisible}
        onRequestClose={() => {
          // this.setState({ askVisible: false })
        }}
      >
        <View style={{ height, justifyContent: 'center', alignItems: 'center', }}>
          <BoxShadow setting={shadowOpt}>
            <View style={{ height: px(280), width: px(280), backgroundColor: 'white', borderRadius: px(10) }}>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: px(333), paddingHorizontal: px(45), }}>
                <Image style={{ width: px(96), height: px(96) }} source={frame_right} />
                <Text style={{ color: '#999999', fontSize: px(24), lineHeight: px(36), textAlign: 'center' }}>暂无售楼电话号码 请等待</Text>
              </View>
            </View>
          </BoxShadow>
        </View>
      </Modal>
    )
  }
  _activeDot(index) {
    if (this.state.headerIndex == index) {
      return (
        <View style={styles.active}></View>
      )
    }
  }
  _renderImage() {
    return (
      <View style={{ width: px(120), height: px(120), borderRadius: px(10) }}>
        <Image style={{ width: px(120), height: px(120), borderRadius: px(10) }} source={require('../../../assets/images/panda.jpg')} />
      </View>
    )
  }
  _reviewItem() {
    const { navigation } = this.props
    return (
      <TouchableOpacity activeOpacity={1} style={styles.reviewItem} onPress={() => navigation.navigate('ReviewDetails')}>
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: px(30) }}>
            <Image
              source={require('../../../assets/images/home_yezhu.png')}
              style={{ width: px(69), height: px(60), borderRadius: px(30) }} />
            <Text style={{ color: '#303133', fontSize: px(28), marginStart: px(20) }}>房大师</Text>
          </View>
          <Text numberOfLines={2} style={{ color: '#303133', fontSize: px(24), }}>
            各地经常会举办房地产交易会，在房地产交易会上通常会开辟二手房专区。可通过查看网络或多留意报刊杂志等渠道获得信息。
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    const { navigation } = this.props
    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ backgroundColor: '#F2F4F7', paddingBottom: px(100) }}
          showsVerticalScrollIndicator={false}>
          {/* <StatusBar
            animated={true}
            hidden={false}
            backgroundColor='transparent'
            translucent={true}
            barStyle='light-content'
          /> */}
          <View style={styles.headerImg}>
            <View style={{ height: px(422) }}>
              <ImageBackground
                style={{ height: px(422) }}
                source={require('../../../assets/images/panda.jpg')}
              >
                <TouchableOpacity activeOpacity={1} style={styles.goBack} onPress={() => navigation.goBack()}>
                  <Image style={{ width: px(48), height: px(48) }} source={require('../../../assets/images/nav_icon_back2.png')} />
                </TouchableOpacity>
                <Swiper style={{ height: px(422), }}
                  showsPagination={false}
                  loop={false}
                  onIndexChanged={(index) => this.setState({ headerIndex: index })}
                  index={0}>
                  <View style={{ height: px(422), borderRadius: px(10) }}>
                    <ImageBackground
                      style={{ height: px(422) }}
                      source={require('../../../assets/images/panda.jpg')}
                    >
                      <TouchableOpacity activeOpacity={1} style={styles.play}>
                        <Image style={{ width: px(80), height: px(80) }} source={require('../../../assets/images/video_play_1.png')} />
                      </TouchableOpacity>
                    </ImageBackground>
                  </View>
                  <View style={{ height: px(422), borderRadius: px(10) }}>
                    <ImageBackground
                      style={{ height: px(422) }}
                      source={require('../../../assets/images/panda.jpg')}
                    >
                      <TouchableOpacity activeOpacity={1} style={styles.play} onPress={() => navigation.navigate('H_tD')}>
                        <Image style={{ width: px(80), height: px(80) }} source={require('../../../assets/images/3d_play1.png')} />
                      </TouchableOpacity>
                    </ImageBackground>
                  </View>
                  <View style={{ height: px(422), borderRadius: px(10) }}>
                    <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('H_Album')}>
                      <ImageBackground
                        style={{ height: px(422) }}
                        source={require('../../../assets/images/panda.jpg')}
                      >
                      </ImageBackground>
                    </TouchableOpacity>
                  </View>
                </Swiper>
              </ImageBackground>
            </View>
          </View>
          <View style={styles.headerTab}>
            <TouchableOpacity
              activeOpacity={1}
              style={{ flex: 1, alignItems: 'center' }}
            // onPress={() => this.setState({ headerIndex: 0 })}
            >
              <Image
                style={{ width: px(44), height: px(44) }}
                source={this.state.headerIndex == 0 ? require(`../../../assets/images/house_video_s.png`) : require(`../../../assets/images/house_video_n.png`)} />
              <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                {this._activeDot(0)}
                <Text
                  style={{ color: this.state.headerIndex == 0 ? '#EA4C4C' : '#666666' }}
                >视频</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              style={{
                flex: 1,
                alignItems: 'center'
              }}
            // onPress={() => this.setState({ headerIndex: 1 })}
            >
              <Image
                style={{ width: px(44), height: px(44) }}
                source={this.state.headerIndex == 1 ? require('../../../assets/images/house_3d_s.png') : require('../../../assets/images/house_3d_n.png')} />
              <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                {this._activeDot(1)}
                <Text style={{ color: this.state.headerIndex == 1 ? '#EA4C4C' : '#666666' }}>三维</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              style={{ flex: 1, alignItems: 'center' }}
            // onPress={() => this.setState({ headerIndex: 2 })}
            >
              <Image
                style={{ width: px(44), height: px(44) }}
                source={this.state.headerIndex == 2 ? require('../../../assets/images/house_quanjing_s.png') : require('../../../assets/images/house_quanjing_n.png')} />
              <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                {this._activeDot(2)}
                <Text style={{ color: this.state.headerIndex == 2 ? '#EA4C4C' : '#666666' }}>图片</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ paddingHorizontal: px(30), backgroundColor: '#FFF', marginTop: px(15) }}>
            <Text style={styles.tit}>户型信息</Text>
            <Text style={{ color: '#303133', fontSize: px(24), lineHeight: px(50) }}>
              <Text>3室2厅2卫</Text>
              <Text>27888元/㎡</Text>
              <Text>89㎡</Text>{'\n'}
              <Text>物业类型：住宅</Text><Text>朝向：南 </Text>{'\n'}
              <Text>户型分布：3#，2#</Text>{'\n'}
            </Text>
          </View>
          <View style={{ marginTop: px(2), height: px(100), justifyContent: 'space-between', paddingHorizontal: px(30), backgroundColor: '#FFF', flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: '#303133', fontSize: px(28) }} >所属楼盘</Text>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} activeOpacity={1}>
              <Text style={{ color: '#303133', fontSize: px(28) }} onPress={() => navigation.navigate('P_BasicInfo')}>3#</Text>
              <Image style={{ width: px(48), height: px(48) }} source={require('../../../assets/images/common_arrow.png')} />
            </TouchableOpacity>
          </View>
          <View style={{ backgroundColor: '#FFF', marginVertical: px(20), }}>
            <View style={styles.review}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                <Text style={{ color: '#303133', fontSize: px(28), fontWeight: 'bold' }}>用户点评（15）</Text>
                <Text style={{ color: '#A8ABB3', fontSize: px(24) }} onPress={() => navigation.navigate('Review')}>查看更多</Text>
              </View>
              <View>
                {this._reviewItem()}
                {this._reviewItem()}
              </View>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: px(50) }}>
              <TouchableHighlight
                onPress={() => this.setState({ ReviewVisible: true })}
                style={styles.publishBtn}>
                <Text style={{ color: '#FFFFFF', fontSize: px(24) }}>我来点评</Text>
              </TouchableHighlight>

              {
                this.state.ReviewVisible ?
                  <TouchableHighlight
                    style={{ position: 'absolute', width: '100%', zIndex: 999, height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                  >
                    <Modal
                      animationType="fade"
                      transparent={true}
                      visible={this.ReviewVisible}
                      onRequestClose={() => {
                        this.setState({ ReviewVisible: false })
                      }}
                    >
                      <View style={{ height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <View style={{ height: px(580), backgroundColor: 'white', width, position: 'absolute', left: 0, bottom: 0 }}>
                          <View style={{ height: px(100), flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ height: px(100), flexDirection: 'row', alignItems: 'center', flex: 1, paddingLeft: px(30), justifyContent: 'space-between', marginRight: px(144) }}>
                              <Text
                                onPress={() => this.setState({ ReviewVisible: false })}
                                style={{ lineHeight: px(40), color: '#303133', fontSize: px(32) }}>取消</Text>
                              <Text style={{ lineHeight: px(40), color: '#303133', fontSize: px(32) }}>点评</Text>
                            </View>
                            <TouchableHighlight style={{ width: px(200), height: px(100), backgroundColor: '#EA4C4C', justifyContent: 'center', alignItems: 'center' }}>
                              <Text style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: px(32) }}>发表</Text>
                            </TouchableHighlight>
                          </View>
                          <View style={{ height: px(480), backgroundColor: '#F7F9FB', paddingHorizontal: px(30), paddingVertical: px(40) }}>
                            <TextInput
                              style={{ flex: 1, padding: 0, textAlignVertical: 'top', lineHeight: px(40), fontSize: px(24) }}
                              maxLength={100}
                              placeholder={' 对本楼盘本户型发表您的看法，不限环境、位置、三维图、全景 '}
                              multiline={true} />
                            <View style={{ marginVertical: px(30), height: px(120), flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
                              <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }}>
                                {/* {this._renderImage()}  */}
                                <View style={{ width: px(120), height: px(120), borderRadius: px(10) }}>
                                  <Image style={{ width: px(120), height: px(120), borderRadius: px(10) }} source={require('../../../assets/images/panda.jpg')} />
                                </View>
                              </View>
                              <TouchableHighlight style={{ marginStart: px(20) }}>
                                <Image style={{ width: px(120), height: px(120), borderRadius: px(10) }} source={require('../../../assets/images/comment_add.png')} />
                              </TouchableHighlight>
                            </View>
                          </View>
                        </View>
                      </View>
                    </Modal>
                  </TouchableHighlight> : null
              }
            </View>
          </View>
        </ScrollView>
        <View style={{ height: px(100), width: '100%', flexDirection: 'row', position: 'absolute', bottom: 0, left: 0, }}>
          <TouchableOpacity
            activeOpacity={1}
            style={{ backgroundColor: '#FFFFFF', flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Image
              style={{ width: px(44), height: px(44), marginEnd: px(12) }}
              source={this.state.isAttention ? require('../../../assets/images/tabbar_focus_s.png') : require('../../../assets/images/tabbar_focus_n.png')} />
            <Text >关注</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.callProperty()}
            activeOpacity={1}
            style={{ backgroundColor: '#EA4C4C', width: px(488), flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Image
              style={{ width: px(44), height: px(44), marginEnd: px(12) }}
              source={require('../../../assets/images/tabbar_phone.png')} />
            <Text style={{ fontSize: px(32), color: '#FFFFFF' }}>电话资讯</Text>
          </TouchableOpacity>
        </View>
        {this.Toast()}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  headerImg: {
    flex: 1,
  },
  goBack: {
    position: 'absolute',
    top: px(30),
    left: px(30),
    width: px(48),
    height: px(48),
    zIndex: 999,
  },
  play: {
    width: px(80),
    height: px(80),
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginStart: -px(40),
    marginTop: -px(40),
  },
  headerTab: {
    height: px(98),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#E6E9F0',
    borderBottomWidth: px(2),
    backgroundColor: '#FFF'
  },
  active: {
    width: px(8),
    height: px(8),
    backgroundColor: '#EA4C4C',
    borderRadius: px(4),
    marginEnd: px(9),
    marginStart: px(-9),
  },
  tit: {
    color: '#303133',
    fontSize: px(32),
    fontWeight: 'bold',
    paddingTop: px(30),
    paddingBottom: px(20),
  },
  review: {
    paddingHorizontal: px(30),
    backgroundColor: '#FFF',
    paddingTop: px(40),
  },
  reviewItem: {
    marginTop: px(40),
    paddingBottom: px(30),
    borderBottomColor: '#E6E9F0',
    borderBottomWidth: px(1)
  },
  publishBtn: {
    width: px(360),
    height: px(68),
    backgroundColor: '#EA4C4C',
    borderRadius: px(34),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: px(40),
    marginTop: px(40)
  }
})
