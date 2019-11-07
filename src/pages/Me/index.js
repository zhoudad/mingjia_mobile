import React, { Component } from 'react';
import {
  View, Text, StyleSheet, Image, StatusBar, TouchableOpacity, ScrollView, ImageBackground, TouchableHighlight,
  Modal, Dimensions
} from 'react-native';
import px from '../../utils/px'
import axios from 'axios'
import { storage } from '../../utils/storage'
import Swiper from 'react-native-swiper';
const { height, width } = Dimensions.get('window');

export default class index extends Component {
  static navigationOptions = {
    tabBarLabel: '我的',
    tabBarIcon: ({ focused }) => {
      if (focused) {
        return (
          <Image style={{ width: px(56), height: px(56) }} source={require('../../assets/images/tabbar_mine_s.png')} />
        );
      }
      return (
        <Image style={{ width: px(56), height: px(56) }} source={require('../../assets/images/tabbar_mine_n.png')} />
      );
    },
  };
  constructor(props) {
    super(props);
    this.state = {
      tabnum: 0,
      user_id: '',
      uri: '',
      nickname: '',
      drawings: null,
      modalVisible: false,
      
    };
  }

  async componentDidMount() {
    let self = this
    // await storage.getBatchData([
    //   { key: 'userId', syncInBackground: false,autoSync: false, },
    //   { key: 'drawings', syncInBackground: false,autoSync: false, },
    // ]).then(results => {
    //   console.log(results)
    //   self.setState({
    //     user_id: results[0].user_id,

    //   })
    // }).catch(err => {
    //   console.log(err)
    // })

    await storage.load({
      key: 'userId',
    }).then(res => {
      self.setState({
        user_id: res.user_id,
      })
    }).catch(err => {
      console.log(err)
    })
    await storage.load({
      key: 'drawings',
    }).then(res => {
      console.log(res)
      self.setState({
        drawings: res.drawings,
      })
    }).catch(err => {
      console.log(err)
    })
    axios({
      url: 'http://218.108.34.222:8080/datum',
      method: 'post',
      data: { user_id: this.state.user_id }
    }).then(res => {
      console.log(res)
      this.setState({
        nickname: res.data.result.user_name,
        uri: res.data.result.user_file
      })
    })
  }


  _renderDown() {
    let { drawings } = this.state
    if (this.state.drawings.length) {
      return (
        <View style={{ height: px(313), marginVertical: px(40) }}>
          <Modal
            animationType="fade"
            // transparent={true}

            visible={this.state.modalVisible}
            onRequestClose={() => {
              this.setState({ modalVisible: false })
            }}
          >
            <View style={{ width, height, }}>
              <TouchableOpacity activeOpacity={1} 
              style={styles.goBack} 
              onPress={() => this.setState({ modalVisible: false })}>
                <Image style={{ width: px(48), height: px(48) }} source={require('../../assets/images/nav_icon_back2.png')} />
              </TouchableOpacity>
              <Swiper
                showsPagination={false}
                loop={false}
                style={{ flex: 1, }}
                index={0}>
                {
                  this.state.drawings.map((item, index) => {
                    return (
                      <View key={index} style={{ backgroundColor: 'red',width, height, }}>
                        <Image style={{ width, height,}} source={{ uri: item }} ></Image>
                      </View>
                    )
                  })
                }
              </Swiper>
            </View>
          </Modal>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            style={{ flex: 1 }}
            horizontal={true}
            contentContainerStyle={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-around' }}>
            {
              drawings.map((item, index) => {
                return (
                  <TouchableOpacity
                    onLongPress={() => { console.log('长按') }}
                    onPress={() => this.setState({ modalVisible: !this.state.modalVisible })}
                    activeOpacity={1}
                    style={{ marginEnd: px(30) }}
                    key={index}>
                    {/* <View style={{ width: px(240), height: px(313), }}> */}
                    <Image style={{ width: px(240), height: px(313), borderRadius: px(20) }} source={{ uri: item }} />
                    {/* </View> */}
                  </TouchableOpacity>
                )
              })
            }
          </ScrollView>
        </View>
      )
    } else {
      return (
        <View style={{ height: px(330), justifyContent: 'center', alignItems: 'center' }}>
          <Image style={{ width: px(339), height: px(190) }} source={require('../../assets/images/loupan_bg.png')} />
          <Text style={{ color: '#999999', fontSize: px(24), marginTop: px(42) }}>您还没有下载内容！</Text>
        </View>
      )
    }
  }
  _renderSave() {
    return (
      <View style={{ height: px(330), justifyContent: 'center', alignItems: 'center' }}>
        <Image style={{ width: px(339), height: px(190) }} source={require('../../assets/images/loupan_bg.png')} />
        <Text style={{ color: '#999999', fontSize: px(24), marginTop: px(42) }}>您还没保存您编辑的相关房屋哦！</Text>
      </View>
    )
  }
  _renderTab() {
    if (this.state.tabnum) {
      return this._renderDown()
    } else {
      return this._renderSave()
    }
  }

  render() {
    const { navigation } = this.props
    return (
      <ScrollView contentContainerStyle={{ backgroundColor: '#FFF', }} showsVerticalScrollIndicator={false}>
         {/* <StatusBar
          animated={true}
          hidden={false}
          backgroundColor='#F9F9F9'
          translucent={true}
          barStyle='dark-content'
        /> */}
        <View style={{ paddingTop: px(110), height: px(380),backgroundColor: '#F9F9F9', }}>
          <View style={styles.header}>
            <TouchableHighlight
              activeOpacity={1}
              onPress={() => navigation.navigate('Info')}
              style={{ width: px(108), height: px(108), borderRadius: px(54), marginEnd: px(20) }}>
              <Image
                style={{ width: px(108), height: px(108), }}
                source={{ uri: this.state.uri }} />
            </TouchableHighlight>
            <View style={{ flex: 1, justifyContent: 'space-around' }}>
              <Text style={{ color: '#323232', fontSize: px(32) }}>{this.state.nickname}</Text>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => navigation.navigate('Info')}
                style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: '#323232', fontSize: px(24) }}>编辑个人资料</Text>
                <Image
                  style={{ width: px(40), height: px(40), }}
                  source={require('../../assets/images/mine_icon_editor.png')} />
              </TouchableOpacity>
            </View>
            <TouchableHighlight activeOpacity={1} onPress={() => navigation.navigate('Setting')}>
              <Image
                style={{ width: px(56), height: px(56), }}
                source={require('../../assets/images/mine_install.png')} />
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.entrance}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Footprint')}
            activeOpacity={1} style={{ alignItems: 'center', flex: 1 }}>
            <Image
              style={{ width: px(80), height: px(80), }}
              source={require('../../assets/images/mine_icon_zuji.png')} />
            <Text style={{ color: '#333333', marginTop: px(20), fontSize: px(24) }}>我的足迹</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Attention')}
            activeOpacity={1} style={{ alignItems: 'center', flex: 1 }}>
            <Image
              style={{ width: px(80), height: px(80), }}
              source={require('../../assets/images/mine_icon_guanzhu.png')} />
            <Text style={{ color: '#333333', marginTop: px(20), fontSize: px(24) }}>我的关注</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('callRecords')}
            activeOpacity={1} style={{ alignItems: 'center', flex: 1 }}>
            <Image
              style={{ width: px(80), height: px(80), }}
              source={require('../../assets/images/mine_icon_lianxi.png')} />
            <Text style={{ color: '#333333', marginTop: px(20), fontSize: px(24) }}>联系记录</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Notification')}
            activeOpacity={1} style={{ alignItems: 'center', flex: 1 }}>
            <Image
              style={{ width: px(80), height: px(80), }}
              source={require('../../assets/images/mine_icon_message.png')} />
            <Text style={{ color: '#333333', marginTop: px(20), fontSize: px(24) }}>消息通知</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, backgroundColor: '#FFFFFF', paddingStart: px(55), borderRadius: px(20) }}>
          <View>
            <View style={{ flexDirection: 'row', height: px(40), alignItems: 'center', marginTop: px(155) }}>
              <View>
                <Text style={{
                  fontSize: this.state.tabnum ? px(24) : px(34),
                  color: this.state.tabnum ? '#666666' : '#333333',
                  fontWeight: this.state.tabnum ? 'normal' : 'bold'
                }}
                  onPress={() => this.setState({ tabnum: 0 })}>我保存的</Text>
                <View style={[styles.texBeg, { backgroundColor: this.state.tabnum ? '#FFFFFF' : '#FF7786' }]}></View>
              </View>
              <View style={{ marginStart: px(30), }}>
                <Text style={{
                  fontSize: this.state.tabnum ? px(34) : px(24),
                  color: this.state.tabnum ? '#333333' : '#666666',
                  fontWeight: this.state.tabnum ? 'bold' : 'normal'
                }}
                  onPress={() => this.setState({ tabnum: 1 })}>我下载的</Text>
                <View style={[styles.texBeg, { backgroundColor: this.state.tabnum ? '#FF7786' : '#FFFFFF' }]}></View>
              </View>
            </View>
            {this._renderTab()}
          </View>
          <TouchableOpacity activeOpacity={1} style={[styles.option, { borderTopColor: '#FFFFFF' }]}>
            <Text style={{ color: '#303233', fontSize: px(28) }}>问卷调查</Text>
            <Image style={{ width: px(48), height: px(48), }} source={require('../../assets/images/common_arrow.png')} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} style={styles.option} onPress={() => navigation.navigate('meSelect')}>
            <Text style={{ color: '#303233', fontSize: px(28) }}>进入 APP</Text>
            <Image style={{ width: px(48), height: px(48), }} source={require('../../assets/images/common_arrow.png')} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: px(30),
    flexDirection: 'row',
    alignItems: 'center',
  },
  goBack: {
    position: 'absolute',
    top: px(30),
    left: px(30),
    width: px(48),
    height: px(48),
    zIndex: 999,
  },
  entrance: {
    height: px(203),
    width: px(690),
    borderRadius: px(20),
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    position: 'absolute',
    top: px(270),
    left: px(30),
    right: px(30),
    elevation: 2,
    shadowOffset: { w: 0, h: 2 },
  },
  texBeg: {
    width: px(16),
    height: px(16),
    position: 'absolute',
    zIndex: -1,
    bottom: px(4),
    left: 0
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingEnd: px(55),
    borderTopColor: '#EBEBEB',
    borderTopWidth: px(1),
    paddingVertical: px(40)
  },
});

