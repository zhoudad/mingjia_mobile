import React, { Component } from 'react';
import {
  View, Text, ScrollView, StyleSheet, Image, ImageBackground, TouchableOpacity, TextInput, Dimensions,
  StatusBar, Modal, TouchableHighlight, ToastAndroid
} from 'react-native';
import px from '../../../utils/px'
import Swiper from 'react-native-swiper';
import Slider from '@react-native-community/slider';
import Communications from 'react-native-communications';
import ImagePicker from 'react-native-image-crop-picker';
import { BoxShadow } from 'react-native-shadow'
import Video from 'react-native-video';
const { height, width } = Dimensions.get('window')

export default class H_BasicInfo extends Component {
  constructor(props) {
    super(props);
    this.player = null
    this.state = {
      headerIndex: 0,
      ReviewVisible: false,
      callVisible: false,
      tel: '10086',
      duration: 0.0,
      slideValue: 0.00,
      currentTime: 0.00,
      paused: true,
      isFullScreen: false,
      videoHeight: px(422),
      videoWidth: width,
      commentTxt:'',
      images:[]
    };
  }
  publicRev() {
    let {images} = this.state
    let formData = new FormData();
    for (var i = 0; i < images.length; i++) {
      let ary = images[i].path.split('/');
      let file = { uri: images[i].path, type: 'multipart/form-data', name: ary[ary.length - 1] };
      formData.append("files", file);
    }
    formData.append("commentTxt", this.state.commentTxt);
    axios({
      method: 'post',
      url: ``,
      data: formData
    }).then(res => {
      console.log(res)
      this.refs.text.clear();
      this.setState({
        images:[],
        commentTxt:''
      })
    })
  }
  //格式化音乐播放的时间为0：00
  formatMediaTime(duration) {
    let min = Math.floor(duration / 60);
    let second = parseInt(duration) - min * 60;
    min = min >= 10 ? min : "0" + min;
    second = second >= 10 ? second : "0" + second;
    return min + ":" + second;
  }
  //设置进度条和播放时间的变化
  onProgress = (data) => {
    let sliderValue = parseInt(this.state.currentTime);
    this.setState({
      slideValue: sliderValue,
      currentTime: data.currentTime
    });
  }
  //设置总时长
  onLoad = (data) => {
    console.log(data)
    this.setState({ duration: data.duration });
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
      Communications.phonecall(this.state.tel, true)
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

  _onLayout = (event) => {
    //获取根View的宽高
    let {width, height} = event.nativeEvent.layout;
    console.log('通过onLayout得到的宽度：' + width);
    console.log('通过onLayout得到的高度：' + height);
    
    // 一般设备横屏下都是宽大于高，这里可以用这个来判断横竖屏
    let isLandscape = (width > height);
    if (isLandscape){
      this.setState({
        videoWidth: width,
        videoHeight: height,
        isFullScreen: true,
      })
    } else {
      this.setState({
        videoWidth: width,
        videoHeight: px(422),
        isFullScreen: false,
      })
    }
    // Orientation.unlockAllOrientations();
  };
  closeImg(index) {
    let newImages = this.state.images
    newImages.splice(index, 1)
    this.setState({
      images: newImages
    })
  }
  pickSingle(cropit, circular = false) {//选择，展示图片
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: cropit,
      cropperCircleOverlay: circular,
      compressImageMaxWidth: 640,
      compressImageMaxHeight: 480,
      compressImageQuality: 0.5,
      //   compressVideoPreset: 'MediumQuality',
      includeExif: true,
    }).then(image => {
      console.log(image.path);
      let images = this.state.images
      images.push({
        path: image.path,
        width: image.width,
        height: image.height,
        mime: image.mime
      })
      this.setState({ images });
      console.log(this.state.images)
    }).catch(e => {
      // console.log(e);
      // Alert.alert(e.message ? e.message : e);
    });
  }

  render() {
    const { navigation } = this.props
    const {data,name} = this.props.navigation.state.params
    console.log(data)
    return (
      <View style={{ flex: 1 }} onLayout={this._onLayout}>
        <View style={styles.headerImg}>
          <View style={{ height: px(422) }}>
            <TouchableOpacity activeOpacity={1} style={styles.goBack} onPress={() => navigation.goBack()}>
              <Image style={{ width: px(48), height: px(48) }} source={require('../../../assets/images/nav_icon_back2.png')} />
            </TouchableOpacity>
            <Swiper style={{ height: px(422), }}
              removeClippedSubviews={false}
              showsPagination={false}
              loop={false}
              onIndexChanged={(index) => this.setState({ headerIndex: index })}
              index={0}>
              <View style={[{ height: px(422), borderRadius: px(10) },]}>
                <TouchableOpacity activeOpacity={1} onPress={() => this.setState({ paused: true })}>
                  {
                    this.state.paused ?
                      <TouchableOpacity activeOpacity={1} style={styles.play} onPress={() => this.setState({ paused: false })}>
                        <Image style={{ width: px(80), height: px(80) }} source={require('../../../assets/images/video_play_1.png')} />
                      </TouchableOpacity>
                      : null
                  }
                  <Video
                    playInBackground={false}
                    ref={ref => this.player = ref}
                    // poster={'https://baconmockup.com/300/200/'}
                    // source={require('../../../assets/test.mp4')}
                    source={{ uri: 'http://vodkgeyttp9c.vod.126.net/vodkgeyttp8/cvTDRkxa_1752729779_shd.mp4?ts=1571901013&rid=47115DC667964F5C42BDE925D7219E80&rl=3&rs=ZXJpmcvkRpdCEMlzEoAKsvgyjbNKHcFV&sign=f2491b300a8e136c18522a714cbce0bd&ext=NnR5gMvHcZNcbCz592mDGUGuDOFN18isir07K1EOfL1V5r37gpQOXOvgziBcPWoPZqh4EHhlnhkR0Eo%2B75YOUCKMFq73irE6qWuj0L7fbdQ7BeLMqBUcSyyoPcrbRdLnCX3DlV98nBRyVzeYDp01vzjz8yVK08TT5H27QzXanlJvUZ1qrj8Zfoq8zafTvY4f4a52Cad0Arhst2x%2BlokPog%3D%3D' }} //我用的是本地视频
                    style={{ height:this.state.videoHeight,width:this.state.videoWidth }}
                    rate={1}//播放速率
                    paused={this.state.paused}// true代表暂停，默认为false
                    resizeMode="cover"
                    onLoad={this.onLoad}//加载媒体并准备播放时调用的回调函数。
                    onProgress={this.onProgress}
                    onEnd={(data) => () => {
                      this.player.seek(0)
                      this.setState({ paused: true })
                    }}//视频播放结束时的回调函数。
                    onError={() => {
                      ToastAndroid.show("加载视频失败", ToastAndroid.SHORT);

                    }}
                  />
                </TouchableOpacity>
                <View style={styles.controls}>
                  <Text>{this.formatMediaTime(this.state.currentTime)}</Text>
                  <Slider
                    style={styles.slider}
                    minimumValue={0}
                    thumbTintColor="#EA4C4C"
                    value={this.state.slideValue}
                    maximumValue={this.state.duration}
                    minimumTrackTintColor="#EA4C4C"
                    maximumTrackTintColor="#000000"
                    onValueChange={value => this.setState({ currentTime: value, })}
                  />
                  <Text>{this.formatMediaTime(this.state.duration)}</Text>
                  {/* <TouchableOpacity activeOpacity={1} onPress={() => this.player.presentFullscreenPlayer()}>
                    <Image style={{ width: px(28), height: px(28), marginStart: px(15) }} source={require('../../../assets/images/full_screen.png')} />
                  </TouchableOpacity> */}
                </View>
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
        <ScrollView
          contentContainerStyle={{ backgroundColor: '#F2F4F7', }}
          showsVerticalScrollIndicator={false}>
          <View style={{ paddingHorizontal: px(30), backgroundColor: '#FFF', marginTop: px(15) }}>
            <Text style={styles.tit}>户型信息</Text>
            <Text style={{ color: '#303133', fontSize: px(24), lineHeight: px(50) }}>
              <Text>{data.building_type}  </Text>
              <Text>  27888元/㎡  </Text>
              <Text>  {data.building_area}</Text>{'\n'}
              <Text>物业类型：住宅  </Text><Text>朝向：{data.building_qi} </Text>{'\n'}
              <Text>户型分布：{}</Text>{'\n'}
            </Text>
          </View>
          <View style={{ marginTop: px(2), height: px(100), justifyContent: 'space-between', paddingHorizontal: px(30), backgroundColor: '#FFF', flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: '#303133', fontSize: px(28) }} >所属楼盘</Text>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} activeOpacity={1}>
              <Text style={{ color: '#303133', fontSize: px(28) }} onPress={() => navigation.navigate('P_BasicInfo')}>{name}</Text>
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
              <TouchableOpacity
              activeOpacity={1}
                onPress={() => this.setState({ ReviewVisible: true })}
                style={styles.publishBtn}>
                <Text style={{ color: '#FFFFFF', fontSize: px(24) }}>我来点评</Text>
              </TouchableOpacity>

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
                                onPress={() => this.setState({ ReviewVisible: false,images:[],commentTxt:'' })}
                                style={{ lineHeight: px(40), color: '#303133', fontSize: px(32) }}>取消</Text>
                              <Text style={{ lineHeight: px(40), color: '#303133', fontSize: px(32) }}>点评</Text>
                            </View>
                            <TouchableOpacity 
                            activeOpacity={1}
                            onPress={() => publicRev}
                            style={{ width: px(200), height: px(100), backgroundColor: '#EA4C4C', justifyContent: 'center', alignItems: 'center' }}>
                              <Text style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: px(32) }}>发表</Text>
                            </TouchableOpacity>
                          </View>
                          <View style={{ height: px(480), backgroundColor: '#F7F9FB', paddingHorizontal: px(30), paddingVertical: px(40) }}>
                          <TextInput
                          ref={'text'}
                            onChangeText={(t) => this.setState({ commentTxt:t })}
                            style={{ flex: 1, padding: 0, textAlignVertical: 'top', lineHeight: px(40), fontSize: px(24) }}
                            maxLength={100}
                            placeholder={' 对本楼盘本户型发表您的看法，不限环境、位置、三维图、全景 '}
                            multiline={true} />
                          <Text style={{ color: '#A8ABB3', fontSize: px(24),lineHeight:px(40) }}>{this.state.commentTxt.length}/100</Text>
                          <View style={{ marginVertical: px(30), flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
                            <ScrollView
                              showsHorizontalScrollIndicator={false}
                              horizontal={true}
                              contentContainerStyle={{ flexDirection: 'row', paddingVertical: px(20), flexWrap: 'wrap', alignItems: 'center', }}>
                              {
                                this.state.images.map((item, index) => {
                                  if (item.path) {
                                    return (
                                      <View style={{ width: px(120), height: px(120), borderRadius: px(10), marginRight: px(20), }} key={index}>
                                        <Image style={{ width: px(120), height: px(120), borderRadius: px(10) }} source={{ uri: item.path }} />
                                        <TouchableOpacity
                                          onPress={() => this.closeImg(index)}
                                          activeOpacity={1}
                                          style={styles.imgDel}>
                                          <View style={{ width: px(22), height: px(22), backgroundColor: '#EA4C4C', borderRadius: px(11) }}>
                                            <View style={{ width: px(16), height: px(3), backgroundColor: '#FFF', transform: [{ rotateZ: '45deg' }], position: 'absolute', left: '50%', top: '50%', marginTop: px(-1.5), marginLeft: px(-8) }}></View>
                                            <View style={{ width: px(3), height: px(16), backgroundColor: '#FFF', transform: [{ rotateZ: '45deg' }], position: 'absolute', left: '50%', top: '50%', marginTop: px(-8), marginLeft: px(-1.5) }}></View>
                                          </View>
                                        </TouchableOpacity>
                                      </View>
                                    )
                                  } else {
                                    return null
                                  }
                                })
                              }
                              {
                                this.state.images.length > 2 ? null :
                                  <TouchableOpacity
                                    activeOpacity={1}
                                    onPress={() => this.pickSingle(false)}
                                  >
                                    <Image style={{ width: px(120), height: px(120), borderRadius: px(10) }} source={require('../../../assets/images/comment_add.png')} />
                                  </TouchableOpacity>
                              }
                            </ScrollView>
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
        <View style={{ height: px(100), width: '100%', flexDirection: 'row',  }}>
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
    // flex: 1,
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
    zIndex: 999,
  },
  headerTab: {
    height: px(98),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#E6E9F0',
    borderBottomWidth: px(1),
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
  },
  slider: {
    height: px(5),
    flex: 1
  },
  controls: {
    paddingHorizontal: px(30),
    flexDirection: 'row',
    alignItems: 'center',
    height: px(60),
    position: 'absolute',
    left: 0,
    bottom: 0,
    width,
    backgroundColor: 'rgba(255,255,255,0.2)',
    zIndex: 998,
  },
  imgDel: {
    width: px(26),
    height: px(26),
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    borderRadius: px(13),
    right: px(-10),
    marginTop: px(-10)
  }
})
