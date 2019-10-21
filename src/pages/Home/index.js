import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, ImageBackground, TouchableOpacity } from 'react-native';
import Icon from '../../components/Icon'
import { unitWidth, width } from '../../AdapterUtil'
import px from '../../utils/px'
import Swiper from 'react-native-swiper';

export default class index extends Component {
  static navigationOptions = {
    tabBarLabel: '首页',
    tabBarIcon: ({ focused }) => {
      if (focused) {
        return (
          <Image style={{ width: 56 * unitWidth, height: 56 * unitWidth }} source={require('../../assets/images/tabbar_home_s.png')} />
        );
      }
      return (
        <Image style={{ width: 56 * unitWidth, height: 56 * unitWidth }} source={require('../../assets/images/tabbar_home_n.png')} />
      );
    },
  };
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  _renderHousr(index) {
    if (index <= 0) {
      return (
        <View style={{ height: px(450), justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: '#B3B3B3', fontSize: px(28) }}>亲，暂时没您想要的哦，请重新输入吧</Text>
        </View>
      )
    } else {

    }
  }

  render() {
    const { navigation } = this.props
    return (
      <ScrollView>
        <View style={styles.search}>
          <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('Local')}>
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
              <Text style={{ fontSize: px(32), color: '#333333' }}>杭州</Text>
              <Image
                style={{ width: px(24), height: px(24),marginEnd:px(10) }}
                source={require('../../assets/images/home_arrow_down.png')} />
            </View>
          </TouchableOpacity>
          <View style={styles.searchBox}>
            <Image
              style={{ width: px(40), height: px(40), marginHorizontal: px(10) }}
              source={require('../../assets/images/search_icon.png')} />
            <Text style={{ color: '#909399', fontSize: px(28) }}>请输入楼盘、户型、地址名称</Text>
          </View>
        </View>
        <View style={{ paddingHorizontal: px(30), height: px(350), }}>
          <Swiper
            style={{ height: px(296),paddingHorizontal: px(30), }}
            dot={<View style={{ backgroundColor: '#D8DCE6', width: px(14), height: px(4), borderRadius: px(2), marginLeft: px(4), marginRight: px(4), marginTop: px(4), marginBottom: px(4) }} />}
            activeDot={<View style={{ backgroundColor: '#606266', width: px(14), height: px(4), borderRadius: px(2), marginLeft: px(4), marginRight: px(4), marginTop: px(4), marginBottom: px(4) }} />}
            loop={true}
            paginationStyle={{ bottom: px(25), }}
            index={0}>
            <View style={{ height: px(296), borderRadius: px(10) }} key={index}>
              <Image style={{ height: px(296), borderRadius: px(10) }} source={{ uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571116087393&di=06eee4a01a254d6a84df02010ba876fb&imgtype=0&src=http%3A%2F%2Fqiniuimg.qingmang.mobi%2Fimage%2Forion%2Fbfabf2536bb332d84b73ea39e11aa8cf_1200_800.jpeg' }} ></Image>
            </View>
            <View style={{ height: px(296), borderRadius: px(10) }} key={index}>
              <Image style={{ height: px(296), borderRadius: px(10) }} source={{ uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571116087393&di=06eee4a01a254d6a84df02010ba876fb&imgtype=0&src=http%3A%2F%2Fqiniuimg.qingmang.mobi%2Fimage%2Forion%2Fbfabf2536bb332d84b73ea39e11aa8cf_1200_800.jpeg' }} ></Image>
            </View>
            <View style={{ height: px(296), borderRadius: px(10) }} key={index}>
              <Image style={{ height: px(296), borderRadius: px(10) }} source={{ uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571116087393&di=06eee4a01a254d6a84df02010ba876fb&imgtype=0&src=http%3A%2F%2Fqiniuimg.qingmang.mobi%2Fimage%2Forion%2Fbfabf2536bb332d84b73ea39e11aa8cf_1200_800.jpeg' }} ></Image>
            </View>
          </Swiper>
        </View>
        <TouchableOpacity style={styles.msgNotice} activeOpacity={1} onPress={() => navigation.navigate('Message')}>
          <Image
            style={{ width: px(34), height: px(34), marginHorizontal: px(8) }}
            source={require('../../assets/images/home_icon_message.png')} />
          <Text style={{ color: '#333333', fontSize: px(24) }}>通知：广州陈家祠地铁口房价上涨</Text>
        </TouchableOpacity>
        <View style={styles.service}>
          <Text style={{ color: '#333333', fontSize: px(32) }}>服务专区</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: px(15) }}>
            <TouchableOpacity style={{ width: px(128), alignItems: 'center' }} activeOpacity={1} onPress={() => navigation.navigate('Mortgage')}>
              <Image
                style={{ width: px(128), height: px(128) }}
                source={require('../../assets/images/home_fangdai.png')}
              />
              <Text style={{ color: '#333333', fontSize: px(24) }}>房贷计算</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ width: px(128), alignItems: 'center' }} activeOpacity={1} onPress={() => navigation.navigate('')}>
              <Image
                style={{ width: px(128), height: px(128) }}
                source={require('../../assets/images/home_yezhu.png')}
              />
              <Text style={{ color: '#333333', fontSize: px(24) }}>业主专栏</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ width: px(128), alignItems: 'center' }} activeOpacity={1} onPress={() => navigation.navigate('')}>
              <Image
                style={{ width: px(128), height: px(128) }}
                source={require('../../assets/images/home_xinfang.png')}
              />
              <Text style={{ color: '#333333', fontSize: px(24) }}>新房专题</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: px(15) }}>
            <TouchableOpacity style={{ width: px(128), alignItems: 'center' }} activeOpacity={1} onPress={() => navigation.navigate('')}>
              <Image
                style={{ width: px(128), height: px(128) }}
                source={require('../../assets/images/home_bigui.png')}
              />
              <Text style={{ color: '#333333', fontSize: px(24) }}>碧桂园</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ width: px(128), alignItems: 'center' }} activeOpacity={1} onPress={() => navigation.navigate('Experience')}>
              <Image
                style={{ width: px(128), height: px(128) }}
                source={require('../../assets/images/home_3d.png')}
              />
              <Text style={{ color: '#333333', fontSize: px(24) }}>3D体验</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ width: px(128), alignItems: 'center' }} activeOpacity={1} onPress={() => navigation.navigate('BuyHouse')}>
              <Image
                style={{ width: px(128), height: px(128) }}
                source={require('../../assets/images/home_goufang.png')}
              />
              <Text style={{ color: '#333333', fontSize: px(24) }}>购房百科</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ marginHorizontal: px(30), marginTop: px(25) }}>
          <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
            <Text style={{ color: '#333333', fontSize: px(32) }}>评论专区</Text>
            <Text style={{ color: '#B3B3B3', fontSize: px(24) }} onPress={() => navigation.navigate('CommentList')}>点击更多></Text>
          </View>
          <View style={styles.comment}>
            <View style={styles.commentItem}>
              <Text 
              onPress={() => navigation.navigate('CommentDetails')}
              style={{color:'#333333',fontSize:px(24),lineHeight:px(40)}}>
                房大师：随着前几年房价的飙涨，很多手里握着几套或几百套 房的炒房客可谓是赚得盆满钵满...
                </Text>
            </View>
            <View style={[styles.commentItem, { borderTopColor: '#E1E6F0', borderTopWidth: 1 }]}>
              <Text 
              onPress={() => navigation.navigate('CommentDetails')}
              style={{color:'#333333',fontSize:px(24),lineHeight:px(40)}}>
                房大师：随着前几年房价的飙涨，很多手里握着几套或几百套 房的炒房客可谓是赚得盆满钵满...
                </Text>
            </View>
          </View>
        </View>
        <View style={{ marginHorizontal: px(30), marginTop: px(20), }}>
          <Text style={{ color: '#333333', fontSize: px(32) }}>新房专区</Text>
          {this._renderHousr(0)}
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  search: {
    height: px(70),
    flexDirection: 'row',
    margin: px(30),
    alignItems: 'center'
  },
  searchBox: {
    width: px(585),
    height: px(70),
    backgroundColor: '#F5F7FA',
    borderRadius: px(10),
    alignItems: 'center',
    flexDirection: 'row'
  },
  msgNotice: {
    height: px(68),
    borderRadius: px(10),
    backgroundColor: '#F2F4F7',
    marginHorizontal: px(30),
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: px(15),
  },
  service: {
    marginHorizontal: px(30),
    marginTop: px(50),
  },
  comment: {
    height: px(288),
    borderRadius: px(10),
    backgroundColor: '#F5F7FA',
    marginVertical: px(30),
    paddingVertical: px(20),
    paddingHorizontal: px(15),
  },
  commentItem: {
    flex: 1,
    justifyContent: 'center'
  }
})
