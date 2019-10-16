import React, { Component } from 'react';
import { View, Text, ScrollView, ImageBackground, Image, TouchableOpacity } from 'react-native';
import px from '../../../utils/px';

export default class Experience extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <ScrollView style={{ paddingHorizontal: px(30) }}>
        <View>
          <Text style={{ color: '#303133', fontSize: px(32), marginTop: px(40), marginBottom: px(30), fontWeight: 'bold' }}>小区模型三维</Text>
          <ImageBackground
            imageStyle={{ borderRadius: px(10) }}
            source={require('../../../assets/images/panda.jpg')}
            style={{ width: px(690), height: px(388), justifyContent: 'center', alignItems: 'center' }}>
            <Image
              source={require('../../../assets/images/3d_play1.png')}
              style={{ width: px(102), height: px(102), }}
            />
          </ImageBackground>
        </View>
        <View style={{ marginTop: px(50),marginBottom:px(10) }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: px(20) }}>
            <Text style={{ color: '#303133', fontSize: px(28), fontWeight: 'bold' }}>户型模型三维</Text>
            <Text style={{ color: '#A8ABB3', fontSize: px(24) }}>详情查看</Text>
          </View>
          <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap'}}>
            <View style={{width:px(218),marginBottom:px(30)}}>
              <ImageBackground
                imageStyle={{ borderRadius: px(10) }}
                style={{ height: px(128),width:px(218), justifyContent: 'center', alignItems: 'center' }}
                source={require('../../../assets/images/panda.jpg')}>
                <TouchableOpacity activeOpacity={1} style={{ width: px(86), height: px(86), borderRadius: px(43) }}>
                  <Image
                    style={{ width: px(86), height: px(86) }}
                    source={require('../../../assets/images/3d_play_s.png')} />
                </TouchableOpacity>
              </ImageBackground>
              <Text style={{color:'#303133',fontSize:px(28),marginTop:px(20)}}>3室2厅2卫89m</Text>
            </View>
            <View style={{width:px(218),marginBottom:px(30)}}>
              <ImageBackground
                imageStyle={{ borderRadius: px(10) }}
                style={{ height: px(128),width:px(218), justifyContent: 'center', alignItems: 'center' }}
                source={require('../../../assets/images/panda.jpg')}>
                <TouchableOpacity activeOpacity={1} style={{ width: px(86), height: px(86), borderRadius: px(43) }}>
                  <Image
                    style={{ width: px(86), height: px(86) }}
                    source={require('../../../assets/images/3d_play_s.png')} />
                </TouchableOpacity>
              </ImageBackground>
              <Text style={{color:'#303133',fontSize:px(28),marginTop:px(20)}}>3室2厅2卫89m</Text>
            </View>
            <View style={{width:px(218),marginBottom:px(30)}}>
              <ImageBackground
                imageStyle={{ borderRadius: px(10) }}
                style={{ height: px(128),width:px(218), justifyContent: 'center', alignItems: 'center' }}
                source={require('../../../assets/images/panda.jpg')}>
                <TouchableOpacity activeOpacity={1} style={{ width: px(86), height: px(86), borderRadius: px(43) }}>
                  <Image
                    style={{ width: px(86), height: px(86) }}
                    source={require('../../../assets/images/3d_play_s.png')} />
                </TouchableOpacity>
              </ImageBackground>
              <Text style={{color:'#303133',fontSize:px(28),marginTop:px(20)}}>3室2厅2卫89m</Text>
            </View>
            <View style={{width:px(218),marginBottom:px(30)}}>
              <ImageBackground
                imageStyle={{ borderRadius: px(10) }}
                style={{ height: px(128),width:px(218), justifyContent: 'center', alignItems: 'center' }}
                source={require('../../../assets/images/panda.jpg')}>
                <TouchableOpacity activeOpacity={1} style={{ width: px(86), height: px(86), borderRadius: px(43) }}>
                  <Image
                    style={{ width: px(86), height: px(86) }}
                    source={require('../../../assets/images/3d_play_s.png')} />
                </TouchableOpacity>
              </ImageBackground>
              <Text style={{color:'#303133',fontSize:px(28),marginTop:px(20)}}>3室2厅2卫89m</Text>
            </View>
          </View>
        </View>
        <View style={{paddingVertical:px(40),borderTopColor:'#E6E9F0',borderTopWidth:px(1)}}>
          <Text style={{color:'#606266',lineHeight:px(46)}}>
          各地经常会举办房地产交易会，在房地产交易会上通常会开辟二手房专区。可通过查看网络或多留意报刊杂志等渠道获得信息。
          </Text>
        </View>
      </ScrollView>
    );
  }
}
