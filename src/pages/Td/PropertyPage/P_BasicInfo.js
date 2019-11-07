import React, { Component } from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import {
  View, Text, ScrollView, StyleSheet, Image, ImageBackground,
  TouchableOpacity, TextInput, Dimensions, StatusBar, Modal, ToastAndroid,
  NativeModules, Alert
} from 'react-native';
import TipicTag from '../../../components/TipicTag'
import px from '../../../utils/px'
import Swiper from 'react-native-swiper';
import ActionSheet from 'react-native-general-actionsheet';
import Communications from 'react-native-communications';
import { BoxShadow } from 'react-native-shadow'
import Video from 'react-native-video';
import axios from 'axios'
import { storage } from '../../../utils/storage'
import Slider from '@react-native-community/slider';
const MyLocation = NativeModules.MyLocation

const { height, width } = Dimensions.get('window')

export default class BasicInfo extends Component {
  constructor(props) {
    super(props);
    this.player = null
    this.state = {
      headerIndex: 0,
      isAttention: false,
      ReviewVisible: false,
      commentTxt: '',
      images: [],
      index: 0,
      modelItemHeight: 0,
      modelEx: false,
      callVisible: false,
      tel: '',
      data: {},
      paused: true,
      isFullScreen: false,
      videoHeight: px(422),
      videoWidth: width,
      account_id: '',
      user_id: '',
      ReviewArr: [],
      duration: 0.0,
      slideValue: 0.00,
      currentTime: 0.00,
    };
  }
  async componentDidMount() {
    
    this.addFoot()
    this.getRemark()
    let self = this
    await storage.getBatchData([
      { key: 'userId', syncInBackground: false, autoSync: false, },
      { key: 'accountId', syncInBackground: false, autoSync: false, },
    ]).then(results => {
      self.setState({
        user_id: results[0].user_id,
        account_id: results[1].account_id
      },() => {
        self.getdata()
      })
    }).catch(err => {
      console.log(err)
    })
  }
  getRemark() {
    axios({
      url: `http://218.108.34.222:8080/remark?account_id=` + this.state.account_id,
    }).then(res => {
      this.setState({
        ReviewArr: res.data.result
      })
    }).catch(err => {
      console.log(err)
    })
  }
  addAttention() {
    const id = this.props.navigation.state.params.id
    this.setState({ isAttention: !this.state.isAttention }, () => {
      if (this.state.isAttention) {
        axios({
          method: 'post',
          url: `http://218.108.34.222:8080/attention`,
          data: {
            account_id: this.state.account_id,
            user_id: this.state.user_id,
            houses_id: id
          }
        }).then(res => {
          console.log(res)
        }).catch(err => {
          this.setState({ isAttention: false })
        })
      } else {
        axios({
          method: 'post',
          url: `http://218.108.34.222:8080/clear_attention`,
          data: {
            account_id: this.state.account_id,
            user_id: this.state.user_id,
            houses_id: id
          }
        }).then(res => {
          console.log(res)
        })
      }
    })

  }
  publicRev() {
    // console.log('发布')
    let { images } = this.state
    let nameArr = ['com_ffile', 'com_cfile', 'com_lfile']
    let formData = new FormData();
    for (var i = 0; i < images.length; i++) {
      let ary = images[i].path.split('/');
      let file = { uri: images[i].path, type: 'multipart/form-data', name: ary[ary.length - 1] };
      formData.append(nameArr[i], file);
    }
    formData.append("content", this.state.commentTxt);
    formData.append("user_id", this.state.user_id);
    axios({
      method: 'post',
      url: `http://218.108.34.222:8080/remark_do`,
      data: formData
    }).then(res => {
      this.refs.text.clear();
      this.setState({
        images: [],
        commentTxt: '',
        ReviewVisible: false,
      })
      console.log(res)
    })
  }
  addFoot() {
    const id = this.props.navigation.state.params.id
    axios({
      method: 'post',
      url: `http://218.108.34.222:8080/track`,
      data: {
        account_id: this.state.account_id,
        user_id: this.state.user_id,
        houses_id: id
      }
    }).then(res => {
      // console.log(res)
    })
  }
  getdata() {
    const id = this.props.navigation.state.params.id
    axios({
      method: 'post',
      url: `http://218.108.34.222:8080/visitor_once`,
      data: {
        houses_id: id,
        user_id:this.state.user_id,
        account_id:this.state.account_id,
      }
    }).then(res => {
      // console.log(res)
      this.setState({ 
        data: res.data.result['0'],
        isAttention:res.data.result.attention == 0 ? false : true
       })
    }).catch(err => {
      console.log(err)
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
  location(ad) {
    let lon = '116.38';
    let lat = '39.90';
    let name = '天安门广场';
    let array = []
    MyLocation.findEvents(lon, lat, name, (events) => {
      events.map((index, item) => {
        array.push(index.title);
      })
      if (array.length > 2) {
        ActionSheet.showActionSheetWithOptions({
          options: array,
          cancelButtonIndex: array.length - 1,
          maskClosable: true,
        },
          (buttonIndex) => {
            //跳到原生方法对应的app地图导航内
            MyLocation.addEvent(events[buttonIndex].title, events[buttonIndex].url, lon, lat, name);//lat是经度，，，log是维度
          });
      } else if (array.length == 2) {
        if (events.length == 2 && events[0].url == 'ios') {
          //只针对ios平台
          MyLocation.addEvent(events[0].title, events[0].url, lon, lat, name);
        } else {
          ActionSheet.showActionSheetWithOptions({
            options: array,
            cancelButtonIndex: array.length - 1,
            maskClosable: true,
          },
            (buttonIndex) => {
              //跳到原生方法对应的app地图导航内
              MyLocation.addEvent(events[buttonIndex].title, events[buttonIndex].url, lon, lat, name);//lat是经度，log是维度
            });
        }
      } else {//只适用于android平台
        ToastAndroid.show('没有可用的地图软件！', ToastAndroid.SHORT);
      }
    })
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
  _reviewItem(data) {
    const { navigation } = this.props
    // console.log(data)
    return (
      <TouchableOpacity activeOpacity={1} style={styles.reviewItem} onPress={() => navigation.navigate('ReviewDetails', { data })}>
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: px(30) }}>
            <Image
              source={{ uri: 'http://img3.duitang.com/uploads/item/201507/23/20150723115018_ma428.thumb.700_0.jpeg' }}
              style={{
                width: px(69), height: px(60), borderRadius: px(30)
              }} />
            <Text style={{ color: '#303133', fontSize: px(28), marginStart: px(20) }}>{data ? data.com_id : ''}</Text>
          </View>
          <Text numberOfLines={2} style={{ color: '#303133', fontSize: px(24), }}>{data ? data.com_content : ''}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
  _randerModel(item, index) {
    console.log()
    return (
      <View
        key={index}
        style={[styles.modelItem, { width: (width - px(60)) / 3 }]}
        onLayout={(event) => this.setState({ modelItemHeight: event.nativeEvent.layout.height })}>
        <ImageBackground
          imageStyle={{ borderRadius: px(10), }}
          style={styles.modelItemBg}
          source={require('../../../assets/images/panda.jpg')}>
          <TouchableOpacity
            onPress={() => { this.props.navigation.navigate('H_tD') }}
            activeOpacity={1}
            style={styles.modelPlay}>
            <Image
              style={{ width: px(51), height: px(51) }}
              source={require('../../../assets/images/3d_play_s.png')} />
          </TouchableOpacity>
        </ImageBackground>
        <View>
          <Text style={{ marginTop: px(20) }}>3室2厅2卫89m</Text>
          <View style={{ flexDirection: 'row', marginTop: px(20) }}>
            <TipicTag text={"在售"} isStress={true} />
            <TipicTag text={"住宅"} />
          </View>
        </View>
      </View>
    )
  }
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
  _render_delImage() {
    return (
      <TouchableOpacity activeOpacity={1} style={{ width: px(30), height: px(30), backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ width: px(28), height: px(28), backgroundColor: '#EA4C4C' }}>
          <View style={{ width: px(24), height: px(4), backgroundColor: '#FFF', transform: [{ rotateX: '45deg' }] }}></View>
          <View style={{ width: px(4), height: px(24), backgroundColor: '#FFF', transform: [{ rotateX: '-45deg' }] }}></View>
        </View>
      </TouchableOpacity>
    )
  }
  render() {
    const id = this.props.navigation.state.params.id
    const { navigation } = this.props
    const { data } = this.state
    const modelListSty = {}
    modelListSty.height = this.state.modelItemHeight
    return (
      <View>
        <ScrollView contentContainerStyle={{ marginBottom: px(30) }} showsVerticalScrollIndicator={false}>
          <View style={styles.headerImg}>
            <View style={{ height: px(422) }}>
              <TouchableOpacity activeOpacity={1} style={styles.goBack} onPress={() => navigation.goBack()}>
                <Image style={{ width: px(48), height: px(48) }} source={require('../../../assets/images/nav_icon_back2.png')} />
              </TouchableOpacity>
              <Swiper style={{ height: px(422), }}
                showsPagination={false}
                loop={false}
                onIndexChanged={(index) => this.setState({ headerIndex: index })}
                index={0}>
                <View style={{ height: px(422), borderRadius: px(10) }}>
                  <TouchableOpacity activeOpacity={1} onPress={() => this.setState({ paused: true })} style={{ flex: 1 }}>

                    <Video
                      playInBackground={false}
                      ref={ref => this.player = ref}
                      poster={'http://p1.music.126.net/OOWMRLJNs-gZEJzJIUbddw==/109951163573262585.jpg'}
                      // source={require('../../../assets/test.mp4')}
                      source={{ uri: 'http://vodkgeyttp9.vod.126.net/cloudmusic/e4b432c5fa70231f5cb07c3da6d19246.mp4?wsSecret=de8228b0a8eb71d52f3c17ad056166f6&wsTime=1573093441&ext=NnR5gMvHcZNcbCz592mDGUGuDOFN18isir07K1EOfL0gDbTkq4MgoPfxBJAtir%2F5Ut9RoZlf%2BEXpu1qh9BESkSxyvJcldUCNK9YLkLg1o9gNf0r8zfyqBmltYZ3kQF0w3hklSjJch6Bc4VgUcYVzqwaw4A6x5q1sYi3M8mhwWrxA8Gn%2BXImxBRcepgZG8i2QELIrGSIYtJ%2FuPHUIBmfvQA%3D%3D' }}
                      style={{ height: this.state.videoHeight, width: this.state.videoWidth }}
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
                    {
                      this.state.paused ?
                        <TouchableOpacity activeOpacity={1} style={styles.play} onPress={() => this.setState({ paused: false })}>
                          <Image style={{ width: px(80), height: px(80) }} source={require('../../../assets/images/video_play_1.png')} />
                        </TouchableOpacity>
                        : null
                    }
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
                    <TouchableOpacity activeOpacity={1} style={styles.play} onPress={() => navigation.navigate('P_tD')}>
                      <Image style={{ width: px(80), height: px(80) }} source={require('../../../assets/images/3d_play1.png')} />
                    </TouchableOpacity>
                  </ImageBackground>
                </View>
                <View style={{ height: px(422), borderRadius: px(10) }}>
                  <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('P_Album')}>
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
          <View style={styles.info}>
            <View style={{ borderBottomWidth: px(2), borderBottomColor: '#E6E9F0' }}>
              <Text style={{ marginTop: px(30), color: '#333333', fontSize: px(44) }}>{data.houses_name}</Text>
              <Text style={{ marginTop: px(20), color: '#A8ABB3', fontSize: px(24) }}>别名：{data.houses_alias}</Text>
              <View style={{ marginVertical: px(40), flexDirection: 'row' }}>
                <TipicTag text={"新房"} />
                <TipicTag text={"别墅"} />
                <TipicTag text={"装修交付"} />
                <TipicTag text={"项目在建"} />
              </View>
            </View>
            <View>
              <View style={{ flexDirection: 'row', marginVertical: px(50) }}>
                <Text style={{ color: '#303133', flex: 1, fontSize: px(24) }}>住宅： {data.houses_price}元/㎡</Text>
                <Text style={{ color: '#303133', flex: 1, fontSize: px(24) }}>开盘： {data.houses_new}</Text>
              </View>
              <View style={{ flexDirection: 'row', marginBottom: px(50) }}>
                <Text style={{ color: '#303133', flex: 1, fontSize: px(24) }}>户型： {data.houses_type}</Text>
                <Text style={{ color: '#303133', flex: 1, fontSize: px(24) }}>建面： {data.survey_area}㎡</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                <Text style={{ color: '#303133', fontSize: px(24) }}>地址： {data.houses_sell}</Text>
                <TouchableOpacity activeOpacity={1} style={{ felx: 1 }} onPress={() => this.location()}>
                  <Image style={{ width: px(44), height: px(44), marginStart: px(24) }} source={require('../../../assets/images/loupan_ditu.png')} />
                </TouchableOpacity>
              </View>
              <View style={{ height: px(68), justifyContent: 'center', alignItems: 'center', marginTop: px(76) }}>
                <TouchableOpacity activeOpacity={1} 
                style={styles.detailsBtn} 
                onPress={() => navigation.navigate('P_DetailsInfo', { id,isAttention:this.state.isAttention })}>
                  <Text style={{ color: '#FFFFFF' }}>信息详情</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.model}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
              <Text style={{ color: '#303133', fontSize: px(28) }}>户型模型三维</Text>
              {
                this.state.data.hou && this.state.data.hou.length > 3 ?
                  <Text style={{ color: '#A8ABB3', fontSize: px(24) }}
                    onPress={() => this.setState({ modelEx: !this.state.modelEx })}>
                    {this.state.modelEx ? '收回' : '展开'}
                  </Text>
                  : null
              }
            </View>
            <View style={this.state.modelEx ? [styles.modelList] : [styles.modelList, modelListSty]}>
              {
                this.state.data.hou ? this.state.data.hou.map((item, index) => {
                  return this._randerModel(item, index)
                }) : null
              }
            </View>
          </View>
          <View style={styles.tD}>
            <Text style={{ color: '#303133', fontSize: px(28) }}>小区三维</Text>
            <ImageBackground
              imageStyle={{ borderRadius: px(10), }}
              style={{ height: px(387), marginTop: px(30), justifyContent: 'center', alignItems: 'center' }}
              source={require('../../../assets/images/panda.jpg')}>
              <TouchableOpacity
                onPress={() => navigation.navigate('P_tD')}
                activeOpacity={1}
                style={{ width: px(102), height: px(102), }}>
                <Image
                  style={{ width: px(102), height: px(102), borderRadius: px(51) }}
                  source={require('../../../assets/images/3d_play_s.png')} />
              </TouchableOpacity>
            </ImageBackground>
          </View>
          <View style={styles.review}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
              <Text style={{ color: '#303133', fontSize: px(28) }}>用户点评（{this.state.ReviewArr.length}）</Text>
              <Text style={{ color: '#A8ABB3', fontSize: px(24) }} onPress={() => navigation.navigate('Review')}>查看更多</Text>
            </View>
            <View>
              {this._reviewItem(this.state.ReviewArr[0])}
              {this._reviewItem(this.state.ReviewArr[1])}
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
                <TouchableOpacity
                  activeOpacity={1}
                  style={{ position: 'absolute', width: '100%', zIndex: 999, height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                >
                  <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.ReviewVisible}
                    onRequestClose={() => {
                      this.setState({ ReviewVisible: false, images: [] })
                    }}
                  >
                    <View style={{ height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                      <View style={{ height: px(580), backgroundColor: 'white', width, position: 'absolute', left: 0, bottom: 0 }}>
                        <View style={{ height: px(100), flexDirection: 'row', alignItems: 'center' }}>
                          <View style={{ height: px(100), flexDirection: 'row', alignItems: 'center', flex: 1, paddingLeft: px(30), justifyContent: 'space-between', marginRight: px(144) }}>
                            <Text
                              onPress={() => this.setState({ ReviewVisible: false, images: [] })}
                              style={{ lineHeight: px(40), color: '#303133', fontSize: px(32) }}>取消</Text>
                            <Text style={{ lineHeight: px(40), color: '#303133', fontSize: px(32) }}>点评</Text>
                          </View>
                          <TouchableOpacity
                            onPress={() => this.publicRev()}
                            activeOpacity={1}
                            style={{ width: px(200), height: px(100), backgroundColor: '#EA4C4C', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: px(32) }}>发表</Text>
                          </TouchableOpacity>
                        </View>
                        <View style={{ height: px(480), backgroundColor: '#F7F9FB', paddingHorizontal: px(30), paddingVertical: px(40) }}>
                          <TextInput
                            ref={'text'}
                            onChangeText={(t) => this.setState({ commentTxt: t })}
                            style={{ flex: 1, padding: 0, textAlignVertical: 'top', lineHeight: px(40), fontSize: px(24) }}
                            maxLength={100}
                            placeholder={' 对本楼盘本户型发表您的看法，不限环境、位置、三维图、全景 '}
                            multiline={true} />
                          <Text style={{ color: '#A8ABB3', fontSize: px(24), lineHeight: px(40) }}>{this.state.commentTxt.length}/100</Text>
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
                </TouchableOpacity> : null
            }
          </View>
        </ScrollView>
        <View style={{ height: px(100), width: '100%', flexDirection: 'row', position: 'absolute', bottom: 0, left: 0, }}>
          <TouchableOpacity
            onPress={() => this.addAttention()}
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
  },
  active: {
    width: px(8),
    height: px(8),
    backgroundColor: '#EA4C4C',
    borderRadius: px(4),
    marginEnd: px(9),
    marginStart: px(-9),
  },
  info: {
    paddingHorizontal: px(30)
  },
  detailsBtn: {
    width: px(360),
    height: px(68),
    backgroundColor: '#EA4C4C',
    borderRadius: px(34),
    justifyContent: 'center',
    alignItems: 'center',
  },
  model: {
    paddingHorizontal: px(30),
    marginTop: px(120),
  },
  modelItem: {
    paddingTop: px(30),
    alignItems:'center'
  },
  modelItemBg: {
    width: px(218),
    height: px(128),
    borderRadius: px(51),
    justifyContent: 'center',
    alignItems: 'center'
  },
  modelPlay: {
    width: px(82),
    height: px(82),
    borderRadius: px(41),
    opacity: 0.8, backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modelList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // justifyContent: 'space-between',
  },
  sandTable: {
    paddingHorizontal: px(30),
    marginTop: px(50)
  },
  tD: {
    paddingTop: px(30),
    paddingHorizontal: px(30),
    backgroundColor: '#FFF'
  },
  review: {
    paddingHorizontal: px(30),
    marginTop: px(50)
  },
  reviewItem: {
    marginTop: px(50),
    paddingBottom: px(30),
    borderBottomColor: '#E6E9F0',
    borderBottomWidth: px(2)
  },
  publishBtn: {
    width: px(360),
    height: px(68),
    backgroundColor: '#EA4C4C',
    borderRadius: px(34),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: px(190)
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