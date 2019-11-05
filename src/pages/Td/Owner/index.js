import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, Dimensions, CameraRoll } from 'react-native';
import CustomTabBar from '../../../components/CustomTabBar'
import RNFS from 'react-native-fs';
import { BoxShadow } from 'react-native-shadow'
import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view';
import px from '../../../utils/px'
// import Toast from '../../../components/Toast'
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Communications from 'react-native-communications';
import TipicTag from '../../../components/TipicTag'
import { storage } from '../../../utils/storage'

export default class Owner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      url: require('../../../assets/images/frame_right.png'),
      tip: '',
      cont: '',
      progressNum: '',
      timer: '',
      beginDown: false,
      drawings: []
    };
  }

  async componentDidMount() {
    let self = this
    await storage.load(
      { key: 'drawings', syncInBackground: false },
    ).then(results => {
      console.log(results)
      self.setState({
        drawings: results.drawings
      })
    }).catch(err => {
      console.log(err)
    })
  }
  downloadFile() {
    console.log(111)
    let self = this
    // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)

    // 图片
    const downloadDest = `${RNFS.DocumentDirectoryPath}/${((Math.random() * 1000) | 0)}.jpg`;
    const formUrl = 'http://img.kaiyanapp.com/c7b46c492261a7c19fa880802afe93b3.png?imageMogr2/quality/60/format/jpg';

    // 文件
    // const downloadDest = `${RNFS.DocumentDirectoryPath}/${((Math.random() * 1000) | 0)}.zip`;
    // const formUrl = 'http://files.cnblogs.com/zhuqil/UIWebViewDemo.zip';

    // 视频
    // const downloadDest = `${RNFS.DocumentDirectoryPath}/${((Math.random() * 1000) | 0)}.mp4`;
    // http://gslb.miaopai.com/stream/SnY~bbkqbi2uLEBMXHxGqnNKqyiG9ub8.mp4?vend=miaopai&
    // https://gslb.miaopai.com/stream/BNaEYOL-tEwSrAiYBnPDR03dDlFavoWD.mp4?vend=miaopai&
    // const formUrl = 'https://gslb.miaopai.com/stream/9Q5ADAp2v5NHtQIeQT7t461VkNPxvC2T.mp4?vend=miaopai&';

    // 音频
    //const downloadDest = `${RNFS.DocumentDirectoryPath}/${((Math.random() * 1000) | 0)}.mp3`;
    // http://wvoice.spriteapp.cn/voice/2015/0902/55e6fc6e4f7b9.mp3
    //const formUrl = 'http://wvoice.spriteapp.cn/voice/2015/0818/55d2248309b09.mp3';
    const frame_n = require('../../../assets/images/frame_n.png')
    const frame_right = require('../../../assets/images/frame_right.png')
    const frame_no = require('../../../assets/images/frame_no.png')
    const options = {
      fromUrl: formUrl,
      toFile: downloadDest,
      background: true,
      begin: (res) => {
        // console.log('begin', res);
        // console.log('contentLength:', res.contentLength / 1024 / 1024, 'M');
        this.setState({
          visible: true,
          tip: '正在下载',
          cont: '请在个人中心查看',
          url: frame_n,
          beginDown: true
        })
      },
      progress: (res) => {
        let pro = res.bytesWritten / res.contentLength;
        this.setState({
          progressNum: pro,
        });
      }
    };
    try {
      const ret = RNFS.downloadFile(options);
      ret.promise.then(res => {
        this.changeToast('下载成功', '请在个人中心查看', frame_right)
        this.setState({ progressNum: 1, beginDown: false })
        // 例如保存图片
        CameraRoll.saveToCameraRoll('file://' + downloadDest)
          .then((res) => {
            let newDrawings = []
            newDrawings.push('file://' + downloadDest)
            storage.save({
              key: 'drawings',
              data: {
                drawings: [...newDrawings, ...self.state.drawings]
              }
            })
            console.log('图片已保存到相册')
          }).catch(() => {
            // console.log('图片保存失败')
          })

      }).catch(err => {
        // console.log('err', err);
      });
    }
    catch (e) {
      console.log(error);
      this.changeToast('下载成功', '请稍后再试', frame_no)
    }

  }
  changeToast(tip, cont, url) {
    let thef = this
    this.setState({ tip, cont, url }, () => {
      thef.timer = setTimeout(
        () => { thef.setState({ visible: false }) },
        1000
      );
    })
  }
  callSales(tel) {
    const frame_phone = require('../../../assets/images/frame_phone.png')
    if (!tel) {
      this.setState({ visible: true })
      this.changeToast('', '暂无物业电话号码 请等待', frame_phone)
    } else {
      Communications.phonecall(tel, true)
    }
  }
  callProperty(tel) {
    const frame_phone = require('../../../assets/images/frame_phone.png')
    if (!tel) {
      this.setState({ visible: true })
      this.changeToast('', '暂无售楼电话号码 请等待', frame_phone)
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
        visible={this.state.visible}
        onRequestClose={() => {
          // this.setState({ askVisible: false })
        }}
      >
        <View style={{ height: Dimensions.get('window').height, justifyContent: 'center', alignItems: 'center', }}>
          <BoxShadow setting={shadowOpt}>
            <View style={{ height: px(280), width: px(280), backgroundColor: 'white', borderRadius: px(10) }}>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: px(333), paddingHorizontal: px(45), }}>
                {
                  this.state.beginDown ?
                    this.state.progressNum == 1 ? <Image style={{ width: px(96), height: px(96) }} source={frame_right} /> :
                      <AnimatedCircularProgress
                        size={px(96)}
                        width={px(8)}
                        fill={this.state.progressNum * 100}
                        tintColor="#58D77F"
                        // onAnimationComplete={() => {}}
                        backgroundColor="#F5F5F5" /> :
                    <Image style={{ width: px(96), height: px(96) }} source={this.state.url} />
                }
                {this.state.tip ? <Text style={{ color: '#333333', fontSize: px(28), textAlign: 'center', lineHeight: px(36), marginTop: px(25), fontWeight: 'bold' }}>{this.state.tip}</Text> : null}
                <Text style={{ color: '#999999', fontSize: px(24), lineHeight: px(36), textAlign: 'center' }}>{this.state.cont}</Text>
              </View>
            </View>
          </BoxShadow>
        </View>
      </Modal>
    )
  }
  _renderItem_H(data) {
    const { navigation } = this.props
    return (
      <TouchableOpacity
        style={styles.H_item}
        activeOpacity={1}
        onPress={() => navigation.navigate('H_BasicInfo')}>
        <View style={styles.H_itemContent}>
          <View style={{ width: px(218), height: px(128) }}>
            <Image style={{ width: px(218), height: px(128), borderRadius: px(10) }} source={require('../../../assets/images/panda.jpg')} />
          </View>
          <View style={{ marginTop: px(20) }}>
            <Text style={{ color: '#333333', fontWeight: "bold", fontSize: px(24), fontFamily: 'PingFang-SC-Medium' }}>3室2厅2卫89m</Text>
            <Text style={{ color: '#ea4c4c', fontSize: px(26), fontWeight: "bold", }}>58600 元/㎡</Text>
            <View style={{ flexDirection: 'row', marginTop: px(8) }}>
              <TipicTag text={"主推"} isStress={true} />
              <TipicTag text={"在售"} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
  _renderItem_P(data) {
    const { navigation } = this.props
    return (
      <TouchableOpacity
        style={styles.P_item}
        activeOpacity={1}
        onPress={() => navigation.navigate('P_BasicInfo')}>
        <View style={styles.P_itemContent}>
          <View style={{ width: px(200), height: px(200), }}>
            <Image
              style={{ width: px(200), height: px(200), borderRadius: px(10) }}
              source={require('../../../assets/images/panda.jpg')} />
          </View>
          <View style={{ flex: 1, marginStart: px(30), height: px(200), }}>
            <Text style={{ color: '#333333', fontWeight: "bold", fontSize: px(28), fontFamily: 'PingFang-SC-Bold', fontWeight: 'bold' }}>广州珠江新城</Text>
            <Text style={{ fontSize: px(24), color: '#B3B3B3', marginTop: px(9), fontFamily: 'PingFang-SC-Medium' }}>
              <Text style={{ paddingEnd: px(35) }}>萧山</Text>
              <Text style={{ paddingEnd: px(35) }}>钱江世界城</Text>
              <Text style={{ paddingEnd: px(35) }}>建面积</Text>
            </Text>
            <Text style={{ color: '#ea4c4c', fontSize: px(32), fontWeight: "bold", marginTop: px(24) }}>58600 元/㎡</Text>
            <View style={{ flexDirection: 'row', marginTop: px(8) }}>
              <TipicTag text={"在售"} isStress={true} />
              <TipicTag text={"住宅"} />
              <TipicTag text={"装修交付"} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
  render() {
    const { navigation } = this.props
    const shadowOpt = {
      height: px(100),
      width: px(750),
      color: "#000000",
      border: px(25),
      opacity: 0.05,
      x: 0,
      y: px(-4),
    }

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <Text style={{ marginRight: px(20), color: '#303133', fontSize: px(32), fontFamily: 'PingFang-SC-Medium' }}>新房</Text>
          {/* <TouchableOpacity style={styles.search} activeOpacity={1}>
            <Image
              style={{ width: px(22), height: px(22) }}
              source={require('../../../assets/images/search_icon.png')} />
            <Text style={{ paddingStart: 8, color: "#606466", fontSize: px(24) }}>搜索你想要的内容</Text>
          </TouchableOpacity> */}
          <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.replace('Home')}>
            <View style={{ flexDirection: 'row', paddingStart: 12, alignItems: 'center' }}>
              <Image
                style={{ width: px(40), height: px(40) }}
                source={require('../../../assets/images/nav_horizontal.png')} />
              {/* <Text style={{ paddingStart: 8, color: '#303133', fontSize: px(32), fontFamily: 'PingFang-SC-Medium', fontWeight: '500' }}></Text> */}
            </View>
          </TouchableOpacity>
        </View>
        <ScrollableTabView
          renderTabBar={() => (<CustomTabBar
            backgroundColor={'#FFF'}
            tabUnderlineDefaultWidth={px(55)}
            tabUnderlineScaleX={3}
            activeColor={"#303133"}
            inactiveColor={"#A8ABB3"}
          />)}>
          <View tabLabel='楼盘' style={{ flex: 1, backgroundColor: '#fff', paddingHorizontal: px(30), }}>
            {this._renderItem_P()}
          </View>
          <View tabLabel='户型' style={{ flex: 1, backgroundColor: '#fff', paddingHorizontal: px(30), }}>
            {this._renderItem_H()}
          </View>
        </ScrollableTabView>
        <BoxShadow setting={shadowOpt}>
          <View style={styles.tab}>
            {this.Toast()}
            <TouchableOpacity
              onPress={() => this.downloadFile()}
              activeOpacity={1}
              style={{ alignItems: 'center' }}>
              <Image style={{ width: px(56), height: px(56) }}
                source={require('../../../assets/images/tabbar_icon_xiazai.png')} />
              <Text style={{ color: '#333333', fontSize: px(20) }}>下载图纸</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1} style={{ alignItems: 'center' }} onPress={() => this.callSales('')}>
              <Image style={{ width: px(56), height: px(56) }}
                source={require('../../../assets/images/tabbar_icon_shoulou.png')} />
              <Text style={{ color: '#333333', fontSize: px(20) }}>呼叫售楼处</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1} style={{ alignItems: 'center' }} onPress={() => this.callProperty('')}>
              <Image style={{ width: px(56), height: px(56) }}
                source={require('../../../assets/images/tabbar_icon_wuye.png')} />
              <Text style={{ color: '#333333', fontSize: px(20) }}>呼叫物业</Text>
            </TouchableOpacity>
          </View>
        </BoxShadow>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: px(100),
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    paddingHorizontal: px(15),
    backgroundColor: '#fff',
  },
  search: {
    backgroundColor: '#F5F8FA',
    borderRadius: px(30),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    flex: 1,
    height: px(60),
  },
  tab: {
    height: px(100),
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: px(70),
    backgroundColor: '#FFF'
  },
  P_item: {
    height: px(270),
    paddingHorizontal: px(30),
    paddingTop: px(40),
  },
  P_itemContent: {
    borderBottomColor: '#E6E9F0',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: px(30)
  },
  H_item: {
    height: px(270),
    paddingTop: px(30),
    paddingBottom: px(20)
  },
  itemContent: {
    paddingBottom: px(30)
  },
})