import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, ImageBackground, TouchableOpacity, StatusBar } from 'react-native';
import { unitWidth, width } from '../../AdapterUtil'
import TipicTag from '../../components/TipicTag'

export default class BasicInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headerIndex: 0
    };
  }
  _activeDot(index) {
    if (this.state.headerIndex == index) {
      return (
        <View style={styles.active}></View>
      )
    }
  }
  _randerModel() {
    return (
      <View style={styles.modelItem}>
        <ImageBackground
          style={styles.modelItemBg}
          source={require('../../assets/images/panda.jpg')}>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.modelPlay}>
            <Image
              style={{ width: 51 * unitWidth, height: 54 * unitWidth }}
              source={require('../../assets/images/3d_play_s.png')} />
          </TouchableOpacity>
        </ImageBackground>
        <View>
          <Text style={{ marginTop: 20 * unitWidth }}>3室2厅2卫89m</Text>
          <View style={{ flexDirection: 'row', marginTop: 20 * unitWidth }}>
            <TipicTag text={"在售"} isStress={true} />
            <TipicTag text={"住宅"} />
          </View>
        </View>
      </View>
    )
  }
  render() {
    return (
      <ScrollView>
        <StatusBar
          animated={true} //指定状态栏的变化是否应以动画形式呈现。目前支持这几种样式：backgroundColor, barStyle和hidden
          hidden={false}  //是否隐藏状态栏。
          backgroundColor='transparent' //状态栏的背景色
          translucent={true}//指定状态栏是否透明。设置为true时，应用会在状态栏之下绘制（即所谓“沉浸式”——被状态栏遮住一部分）。常和带有半透明背景色的状态栏搭配使用。
          barStyle='light-content'
        />
        <View style={styles.headerImg}>
          <View style={{ height: 422 * unitWidth }}>
            <ImageBackground
              style={{ height: 422 * unitWidth }}
              // source={{ uri: 'https://facebook.github.io/react-native/img/tiny_logo.png' }}
              source={require('../../assets/images/panda.jpg')}
            >
              <TouchableOpacity activeOpacity={1} style={styles.goBack}>
                <Image source={require('../../assets/images/nav_icon_back2.png')} />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={1} style={styles.play}>
                <Image source={require('../../assets/images/video_play_1.png')} />
              </TouchableOpacity>
            </ImageBackground>
          </View>
        </View>
        <View style={styles.headerTab}>
          <TouchableOpacity
            activeOpacity={1}
            style={{ flex: 1, alignItems: 'center' }}
            onPress={() => this.setState({ headerIndex: 0 })}
          >
            <Image
              style={{ width: 44 * unitWidth, height: 44 * unitWidth }}
              source={require(`../../assets/images/house_video.png`)} />
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
              {this._activeDot(0)}
              <Text
                style={{ color: this.state.headerIndex == 0 ? '#EA4C4C' : '#666666' }}
              >视频</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            style={{ flex: 1, alignItems: 'center' }}
            onPress={() => this.setState({ headerIndex: 1 })}
          >
            <Image
              style={{ width: 44 * unitWidth, height: 44 * unitWidth }}
              source={require('../../assets/images/house_quanjing.png')} />
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
              {this._activeDot(1)}
              <Text style={{ color: this.state.headerIndex == 1 ? '#EA4C4C' : '#666666' }}>全景</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            style={{
              flex: 1,
              alignItems: 'center'
            }}
            onPress={() => this.setState({ headerIndex: 2 })}
          >
            <Image
              style={{ width: 44 * unitWidth, height: 44 * unitWidth }}
              source={require('../../assets/images/house_3d.png')} />
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
              {this._activeDot(2)}
              <Text style={{ color: this.state.headerIndex == 2 ? '#EA4C4C' : '#666666' }}>三维</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            style={{ flex: 1, alignItems: 'center' }}
            onPress={() => this.setState({ headerIndex: 3 })}
          >
            <Image
              style={{ width: 44 * unitWidth, height: 44 * unitWidth }}
              source={require('../../assets/images/house_tupian.png')} />
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
              {this._activeDot(3)}
              <Text style={{ color: this.state.headerIndex == 3 ? '#EA4C4C' : '#666666' }}>图片</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.info}>
          <View style={{ borderBottomWidth: 2 * unitWidth, borderBottomColor: '#E6E9F0' }}>
            <Text style={{ marginTop: 30 * unitWidth, color: '#333333', fontSize: 44 * unitWidth }}>新府城</Text>
            <Text style={{ marginTop: 20 * unitWidth, color: '#A8ABB3', fontSize: 24 * unitWidth }}>别名：VTANOV融创新府城</Text>
            <View style={{ marginVertical: 40 * unitWidth, flexDirection: 'row' }}>
              <TipicTag text={"新房"} />
              <TipicTag text={"别墅"} />
              <TipicTag text={"装修交付"} />
              <TipicTag text={"项目在建"} />
            </View>
          </View>
          <View>
            <View style={{ flexDirection: 'row', marginVertical: 50 * unitWidth }}>
              <Text style={{ color: '#303133', flex: 1, fontSize: 24 * unitWidth }}>住宅： 28800元/㎡</Text>
              <Text style={{ color: '#303133', flex: 1, fontSize: 24 * unitWidth }}>开盘： 2019-05-07</Text>
            </View>
            <View style={{ flexDirection: 'row', marginBottom: 50 * unitWidth }}>
              <Text style={{ color: '#303133', flex: 1, fontSize: 24 * unitWidth }}>户型： 4室  2室</Text>
              <Text style={{ color: '#303133', flex: 1, fontSize: 24 * unitWidth }}>建面： 34-144㎡</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
              <Text style={{ color: '#303133', fontSize: 24 * unitWidth }}>地址： 广东省广州市天河区棠下街道乐天大厦</Text>
              <TouchableOpacity activeOpacity={1} style={{ felx: 1 }}>
                <Image style={{ width: 44 * unitWidth, height: 44 * unitWidth, marginStart: 24 * unitWidth }} source={require('../../assets/images/loupan_ditu.png')} />
              </TouchableOpacity>
            </View>
            <View style={{ height: 68 * unitWidth, justifyContent: 'center', alignItems: 'center', marginTop: 76 * unitWidth }}>
              <TouchableOpacity activeOpacity={1} style={styles.detailsBtn}>
                <Text style={{ color: '#FFFFFF' }}>信息详情</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.model}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
            <Text style={{ color: '#303133', fontSize: 28 * unitWidth }}>户型模型三维</Text>
            <Text style={{ color: '#A8ABB3', fontSize: 24 * unitWidth }}>回收</Text>
          </View>
          <View style={styles.modelList}>
            {this._randerModel()}
            {this._randerModel()}
            {this._randerModel()}
            {this._randerModel()}
            {this._randerModel()}
            {this._randerModel()}
          </View>
        </View>
        <View style={styles.sandTable}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
            <Text style={{ color: '#303133', fontSize: 28 * unitWidth }}>沙盘图</Text>
            <Text style={{ color: '#A8ABB3', fontSize: 24 * unitWidth }}>楼盘详情</Text>
          </View>
          <ImageBackground
            style={{ height: 387 * unitWidth, marginTop: 30 * unitWidth, borderRadius: 10 * unitWidth }}
            source={require('../../assets/images/panda.jpg')}></ImageBackground>
        </View>
        <View style={styles.tD}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
            <Text style={{ color: '#303133', fontSize: 28 * unitWidth }}>沙盘图</Text>
            <Text style={{ color: '#A8ABB3', fontSize: 24 * unitWidth }}>详情查看</Text>
          </View>
          <ImageBackground
            style={{ height: 387 * unitWidth, marginTop: 30 * unitWidth, borderRadius: 10 * unitWidth, justifyContent: 'center', alignItems: 'center' }}
            source={require('../../assets/images/panda.jpg')}>
            <TouchableOpacity activeOpacity={1} style={{ width: 102 * unitWidth, height: 102 * unitWidth, borderRadius: 54 * unitWidth }}>
              <Image
                style={{ width: 65 * unitWidth, height: 68 * unitWidth }}
                source={require('../../assets/images/3d_play_s.png')} />
            </TouchableOpacity>
          </ImageBackground>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  headerImg: {
    flex: 1,
  },
  goBack: {
    position: 'absolute',
    top: 60 * unitWidth,
    left: 30 * unitWidth,
    width: 48 * unitWidth,
    height: 48 * unitWidth
  },
  play: {
    width: 80 * unitWidth,
    height: 80 * unitWidth,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginStart: -80 * unitWidth,
    marginTop: -80 * unitWidth,
  },
  headerTab: {
    height: 98 * unitWidth,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#E6E9F0',
    borderBottomWidth: 2 * unitWidth,
  },
  active: {
    width: 8 * unitWidth,
    height: 8 * unitWidth,
    backgroundColor: '#EA4C4C',
    borderRadius: 4 * unitWidth,
    marginEnd: 9 * unitWidth,
    marginStart: -9 * unitWidth,
  },
  info: {
    paddingHorizontal: 30 * unitWidth
  },
  detailsBtn: {
    width: 360 * unitWidth,
    height: 68 * unitWidth,
    backgroundColor: '#EA4C4C',
    borderRadius: 34 * unitWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  model: {
    paddingHorizontal: 30 * unitWidth,
    marginTop: 120 * unitWidth
  },
  modelItem: {
    marginTop: 30 * unitWidth,
    marginBottom: 10 * unitWidth
  },
  modelItemBg: {
    width: 218 * unitWidth,
    height: 128 * unitWidth,
    borderRadius: 10 * unitWidth,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modelPlay: {
    width: 82 * unitWidth,
    height: 82 * unitWidth,
    borderRadius: 41 * unitWidth,
    opacity: 0.8, backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modelList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  sandTable: {
    paddingHorizontal: 30 * unitWidth,
    marginTop: 120 * unitWidth
  },
  tD: {
    paddingHorizontal: 30 * unitWidth,
    marginTop: 120 * unitWidth
  }
})