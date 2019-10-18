import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, } from 'react-native';
import px from '../../../utils/px'

export default class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
            style={{ flexDirection: 'row', alignItems: 'center',width:px(100),justifyContent:'center' }}>
              <Image style={{ width: px(48), height: px(48) }} source={require('../../../assets/images/common_arrow.png')} />
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: px(2), height: px(100), justifyContent: 'space-between', paddingHorizontal: px(30), backgroundColor: '#FFF', flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: '#303133', fontSize: px(28) }}>清理缓存</Text>
            <TouchableOpacity 
             activeOpacity={1}
            style={{ flexDirection: 'row', alignItems: 'center',width:px(100),justifyContent:'center' }}>
              <Image style={{ width: px(48), height: px(48) }} source={require('../../../assets/images/common_arrow.png')} />
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: px(2), height: px(100), justifyContent: 'space-between', paddingHorizontal: px(30), backgroundColor: '#FFF', flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: '#303133', fontSize: px(28) }}>检查更新</Text>
            <TouchableOpacity  activeOpacity={1} style={{ flexDirection: 'row', alignItems: 'center',width:px(100),justifyContent:'center' }}>
              <Image style={{ width: px(48), height: px(48) }} source={require('../../../assets/images/common_arrow.png')} />
            </TouchableOpacity>
          </View>
          <View style={{marginTop:px(20)}}>
          <View style={{ marginTop: px(2), height: px(100), justifyContent: 'space-between', paddingHorizontal: px(30), backgroundColor: '#FFF', flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: '#303133', fontSize: px(28) }}>关于我们</Text>
            <TouchableOpacity 
             activeOpacity={1}
            onPress={() => navigation.navigate('AboutOurs')} 
            style={{ flexDirection: 'row', alignItems: 'center',width:px(100),justifyContent:'center' }}>
              <Image style={{ width: px(48), height: px(48) }} source={require('../../../assets/images/common_arrow.png')} />
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: px(2), height: px(100), justifyContent: 'space-between', paddingHorizontal: px(30), backgroundColor: '#FFF', flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: '#303133', fontSize: px(28) }}>隐私政策</Text>
            <TouchableOpacity  activeOpacity={1} style={{ flexDirection: 'row', alignItems: 'center',width:px(100),justifyContent:'center' }}>
              <Image style={{ width: px(48), height: px(48) }} source={require('../../../assets/images/common_arrow.png')} />
            </TouchableOpacity>
          </View>
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