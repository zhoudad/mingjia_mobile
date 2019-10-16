import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, StatusBar, TouchableOpacity, ScrollView,ImageBackground } from 'react-native';
import Icon from '../../components/Icon'
// import { unitWidth } from '../../AdapterUtil'
import px from '../../utils/px'

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
      tabnum: 0
    };
  }


  _renderTab(){
    if(false){
      return (
        <ScrollView
            showsHorizontalScrollIndicator={false}
            style={{ height: px(313), marginVertical: px(40) }}
            horizontal={true}
            contentContainerStyle={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-around' }}>
            <View style={{ marginEnd: px(30) }}>
              <View style={{ width: px(240), height: px(313), }}>
                <Image style={{ width: px(240), height: px(313), borderRadius: px(20) }} source={require('../../assets/images/panda.jpg')} />
              </View>
            </View>
            <View style={{ marginEnd: px(30) }}>
              <View style={{ width: px(240), height: px(313), }}>
                <Image style={{ width: px(240), height: px(313), borderRadius: px(20) }} source={require('../../assets/images/panda.jpg')} />
              </View>
            </View>
            <View style={{ marginEnd: px(30) }}>
              <View style={{ width: px(240), height: px(313), }}>
                <Image style={{ width: px(240), height: px(313), borderRadius: px(20) }} source={require('../../assets/images/panda.jpg')} />
              </View>
            </View>
          </ScrollView>
      )
    }else{
      return (
        <View style={{height: px(330),justifyContent:'center',alignItems:'center'}}>
          <Image style={{width:px(339),height:px(190)}} source={require('../../assets/images/loupan_bg.png')}/>
          <Text style={{color:'#999999',fontSize:px(24),marginTop:px(42)}}>您还没保存您编辑的相关房屋哦！</Text>
        </View>
      )
    }
  }

  render() {
    return (
      <ScrollView contentContainerStyle={{ flex: 1, backgroundColor: '#F9F9F9', }}>
        <StatusBar
          animated={true}
          hidden={false}
          backgroundColor='transparent'
          translucent={true}
          barStyle='light-content'
        />
        <View style={{ paddingTop: px(110), height: px(380), }}>
          <View style={styles.header}>
            <View style={{ width: px(108), height: px(108), borderRadius: px(54), marginEnd: px(20) }}>
              <Image
                style={{ width: px(108), height: px(108), }}
                source={require('../../assets/images/mine_use.png')} />
            </View>
            <View style={{ flex: 1, justifyContent: 'space-around' }}>
              <Text style={{ color: '#323232', fontSize: px(32) }}>点击登录</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: '#323232', fontSize: px(24) }}>编辑个人资料</Text>
                <Image
                  style={{ width: px(40), height: px(40), }}
                  source={require('../../assets/images/mine_icon_editor.png')} />
              </View>
            </View>
            <View>
              <Image
                style={{ width: px(56), height: px(56), }}
                source={require('../../assets/images/mine_install.png')} />
            </View>
          </View>
        </View>
        <View style={styles.entrance}>
          <TouchableOpacity activeOpacity={1} style={{ alignItems: 'center', flex: 1 }}>
            <Image
              style={{ width: px(80), height: px(80), }}
              source={require('../../assets/images/mine_icon_zuji.png')} />
            <Text style={{ color: '#333333', marginTop: px(20), fontSize: px(24) }}>我的足迹</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} style={{ alignItems: 'center', flex: 1 }}>
            <Image
              style={{ width: px(80), height: px(80), }}
              source={require('../../assets/images/mine_icon_guanzhu.png')} />
            <Text style={{ color: '#333333', marginTop: px(20), fontSize: px(24) }}>我的关注</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} style={{ alignItems: 'center', flex: 1 }}>
            <Image
              style={{ width: px(80), height: px(80), }}
              source={require('../../assets/images/mine_icon_lianxi.png')} />
            <Text style={{ color: '#333333', marginTop: px(20), fontSize: px(24) }}>联系记录</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} style={{ alignItems: 'center', flex: 1 }}>
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
          <TouchableOpacity activeOpacity={1} style={[styles.option,{borderTopColor:'#FFFFFF'}]}>
            <Text style={{ color: '#303233', fontSize: px(28) }}>问卷调查</Text>
            <Image style={{ width: px(48), height: px(48), }} source={require('../../assets/images/common_arrow.png')} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} style={styles.option}>
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
  option:{
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingEnd:px(55),
    borderTopColor:'#EBEBEB',
    borderTopWidth:px(1),
    paddingVertical:px(40)
  },
});

