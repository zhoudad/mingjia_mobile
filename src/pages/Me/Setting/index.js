import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, Modal } from 'react-native';
import px from '../../../utils/px'
const { width, height } = Dimensions.get('window')
import { removeTokens } from '../../../utils/storage'

export default class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      askVisible: false
    };
  }

  render() {
    const { navigation } = this.props
    return (
      <View style={{ flex: 1, backgroundColor: '#F2F4F7', justifyContent: 'space-between' }}>
        <View>
          <View style={{ marginTop: px(2), height: px(100), justifyContent: 'space-between', paddingHorizontal: px(30), backgroundColor: '#FFF', flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: '#303133', fontSize: px(28) }}>推荐二维码</Text>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => navigation.navigate('QRcode')}
              style={{ flexDirection: 'row', alignItems: 'center', width: px(100), justifyContent: 'center' }}>
              <Image style={{ width: px(48), height: px(48) }} source={require('../../../assets/images/common_arrow.png')} />
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: px(2), height: px(100), justifyContent: 'space-between', paddingHorizontal: px(30), backgroundColor: '#FFF', flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: '#303133', fontSize: px(28) }}>清理缓存</Text>
            <TouchableOpacity
              activeOpacity={1}
              style={{ flexDirection: 'row', alignItems: 'center', width: px(100), justifyContent: 'center' }}>
              <Image style={{ width: px(48), height: px(48) }} source={require('../../../assets/images/common_arrow.png')} />
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: px(2), height: px(100), justifyContent: 'space-between', paddingHorizontal: px(30), backgroundColor: '#FFF', flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: '#303133', fontSize: px(28) }}>检查更新</Text>
            <TouchableOpacity activeOpacity={1} style={{ flexDirection: 'row', alignItems: 'center', width: px(100), justifyContent: 'center' }}>
              <Image style={{ width: px(48), height: px(48) }} source={require('../../../assets/images/common_arrow.png')} />
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: px(20) }}>
            <View style={{ marginTop: px(2), height: px(100), justifyContent: 'space-between', paddingHorizontal: px(30), backgroundColor: '#FFF', flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: '#303133', fontSize: px(28) }}>关于我们</Text>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => navigation.navigate('AboutOurs')}
                style={{ flexDirection: 'row', alignItems: 'center', width: px(100), justifyContent: 'center' }}>
                <Image style={{ width: px(48), height: px(48) }} source={require('../../../assets/images/common_arrow.png')} />
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: px(2), height: px(100), justifyContent: 'space-between', paddingHorizontal: px(30), backgroundColor: '#FFF', flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: '#303133', fontSize: px(28) }}>隐私政策</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Policy')}
                activeOpacity={1} style={{ flexDirection: 'row', alignItems: 'center', width: px(100), justifyContent: 'center' }}>
                <Image style={{ width: px(48), height: px(48) }} source={require('../../../assets/images/common_arrow.png')} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ height: px(90), justifyContent: 'center', flexDirection: 'row', marginTop: px(120) }}>
            <TouchableOpacity
              onPress={() => this.setState({ askVisible: true })}
              activeOpacity={1}
              style={{ width: px(540), height: px(90), justifyContent: 'center', alignItems: 'center', backgroundColor: '#EA4C4C', borderRadius: px(90) }}>
              <Text style={{ color: '#FFFFFF', fontSize: px(32) }}>退出登录</Text>
            </TouchableOpacity>
            <Modal
              animationType="fade"
              transparent={true}
              visible={this.state.askVisible}
              onRequestClose={() => {
                this.setState({ askVisible: false })
              }}
            >
              <View style={{ height: Dimensions.get('window').height, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <View style={{ height: px(300), width: px(400), backgroundColor: 'white', borderRadius: px(10) }}>
                  <Text style={{ color: '#333333', fontWeight: 'bold', fontSize: px(30), textAlign: 'center', marginTop: px(60) }}>是否退出</Text>
                  <View style={{ height: px(80), justifyContent: 'center', alignItems: 'center', flexDirection: 'row',marginTop:px(80) }}>
                    <TouchableOpacity
                      activeOpacity={1}
                      onPress={() => this.setState({ askVisible: false })}
                      style={{ height: px(80), justifyContent: 'center', alignItems: 'center', flex: 1 }}
                    >
                      <Text style={{ fontSize: px(26), color: '#999999' }}>取消</Text>
                    </TouchableOpacity>
                    {/* <View style={{ height: px(30), width: px(2), backgroundColor: '#E6E6E6' }}></View> */}
                    <TouchableOpacity
                      activeOpacity={1}
                      onPress={() => {
                        this.setState({ askVisible: false, })
                        navigation.navigate('Login')
                        removeTokens()
                      }}
                      style={{ height: px(80), justifyContent: 'center', alignItems: 'center', flex: 1 }}
                    >
                      <Text style={{ fontSize: px(26), color: '#333333' }}>确定</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  setItem: {
    height: 50,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    // borderBottomColor: '#333',
    // borderBottomWidth: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginTop: 5
  }
})