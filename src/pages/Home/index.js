import React, { Component } from 'react';
import {
  View, Text, ScrollView, StyleSheet, Image, ImageBackground, TouchableOpacity, TextInput,
  ToastAndroid
} from 'react-native';
import { unitWidth, width } from '../../AdapterUtil'
import px from '../../utils/px'
import Swiper from 'react-native-swiper';
import axios from 'axios'
import { storage } from '../../utils/storage'
import TipicTag from '../../components/TipicTag'

export default class Home extends Component {
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
      city: '上海',
      slides: null,
      token: '',
      account_id: ''
    };
  }
  componentDidMount() {
    storage.load({
      key: 'accessToken',
    }).then((token) => {
      this.setState({ token })
    })
    storage.load({
      key: 'Id',
    }).then((data) => {
      this.setState({ account_id: data.account_id })
    })
    this.getData()
  }
  async getData() {
    axios({
      url: `http://218.108.34.222:8080/slide?account_id=${2}`
    }).then((res) => {
      this.setState({
        slides: res.data.result
      })
    })
  }
  getCity = (city) => {
    this.setState({ city: city.city })
  }
  _renderHousr(index) {
    if (index <= 0) {
      return (
        <View style={{ height: px(450), justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: '#B3B3B3', fontSize: px(28) }}>亲，暂时没您想要的哦，请重新输入吧</Text>
        </View>
      )
    } else {
      return (
        <View>
          {this._renderItem()}
          {this._renderItem()}
          {this._renderItem()}
          {this._renderItem()}
        </View>
      )
    }
  }

  _renderItem(data) {
    const { navigation } = this.props
    return (
      <TouchableOpacity
        style={styles.item}
        activeOpacity={1}
        onPress={() => navigation.navigate('P_BasicInfo')}>
        <View style={styles.itemContent}>
          <View style={{ width: px(200), height: px(200), }}>
            <Image
              style={{ width: px(200), height: px(200), borderRadius: px(10) }}
              source={require('../../assets/images/panda.jpg')} />
          </View>
          <View style={{ flex: 1, marginStart: px(30), height: px(200), }}>
            <Text style={{ color: '#333333', fontWeight: "bold", fontSize: px(28), fontFamily: 'PingFang-SC-Bold', fontWeight: 'bold' }}>广州珠江新城</Text>
            <Text style={{ fontSize: px(24), color: '#B3B3B3', marginTop: px(9), fontFamily: 'PingFang-SC-Medium' }}>
              <Text style={{ paddingEnd: px(35) }}>萧山</Text>
              <Text style={{ paddingEnd: px(35) }}>钱江世界城</Text>
              <Text style={{ paddingEnd: px(35) }}>建面积</Text>
            </Text>
            <Text style={{ color: '#ea4c4c', fontSize: px(32), fontWeight: "bold", marginTop: px(24) }}>58600 <Text style={{ fontSize: px(24) }}>元/㎡</Text></Text>
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
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.search}>
          <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('Local', { getCity: this.getCity })}>
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
              <Text style={{ fontSize: px(32), color: '#333333' }}>{this.state.city}</Text>
              <Image
                style={{ width: px(24), height: px(24), marginEnd: px(10) }}
                source={require('../../assets/images/home_arrow_down.png')} />
            </View>
          </TouchableOpacity>
          <View style={styles.searchBox}>
            <Image
              style={{ width: px(40), height: px(40), marginHorizontal: px(10) }}
              source={require('../../assets/images/search_icon.png')} />
            {/* <Text style={{ color: '#909399', fontSize: px(28) }}>请输入楼盘、户型、地址名称</Text> */}
            <TextInput style={{ flex: 1, color: '#909399', fontSize: px(28), padding: 0 }} placeholder={"请输入楼盘、户型、地址名称"}></TextInput>
          </View>
        </View>
        <View style={{ paddingHorizontal: px(30), height: px(350), }}>

          {
            this.state.slides == null ? <View style={{flex:1}}></View> :
              <Swiper
                style={{ height: px(296), paddingHorizontal: px(30), }}
                dot={<View style={{ backgroundColor: '#D8DCE6', width: px(14), height: px(4), borderRadius: px(2), marginLeft: px(4), marginRight: px(4), marginTop: px(4), marginBottom: px(4) }} />}
                activeDot={<View style={{ backgroundColor: '#606266', width: px(14), height: px(4), borderRadius: px(2), marginLeft: px(4), marginRight: px(4), marginTop: px(4), marginBottom: px(4) }} />}
                loop={true}
                paginationStyle={{ bottom: px(25), }}
                index={0}>
                {
                  this.state.slides.map((item, index) => {
                    return (
                      <View key={index} style={{ height: px(296), borderRadius: px(10) }} >
                        <Image style={{ height: px(296), borderRadius: px(10) }} source={{ uri: `http://218.108.34.222/:8080/uploads/${item.slide_file}` }} ></Image>
                      </View>
                    )
                  })
                }
              </Swiper>
          }
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
            {/* <TouchableOpacity style={{ width: px(128), alignItems: 'center' }} activeOpacity={1} onPress={() => navigation.navigate('Mortgage')}>
              <Image
                style={{ width: px(128), height: px(128) }}
                source={require('../../assets/images/home_fangdai.png')}
              />
              <Text style={{ color: '#333333', fontSize: px(24) }}>房贷计算</Text>
            </TouchableOpacity> */}
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
            <TouchableOpacity style={{ width: px(128), alignItems: 'center' }} activeOpacity={1} onPress={() => navigation.navigate('Developer')}>
              <Image
                style={{ width: px(128), height: px(128) }}
                source={require('../../assets/images/home_bigui.png')}
              />
              <Text style={{ color: '#333333', fontSize: px(24) }}>碧桂园</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: px(15) }}>
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
                style={{ color: '#333333', fontSize: px(24), lineHeight: px(40) }}>
                房大师：随着前几年房价的飙涨，很多手里握着几套或几百套 房的炒房客可谓是赚得盆满钵满...
                </Text>
            </View>
            <View style={[styles.commentItem, { borderTopColor: '#E1E6F0', borderTopWidth: 1 }]}>
              <Text
                onPress={() => navigation.navigate('CommentDetails')}
                style={{ color: '#333333', fontSize: px(24), lineHeight: px(40) }}>
                房大师：随着前几年房价的飙涨，很多手里握着几套或几百套 房的炒房客可谓是赚得盆满钵满...
                </Text>
            </View>
          </View>
        </View>
        <View style={{ marginHorizontal: px(30), marginTop: px(20), }}>
          <Text style={{ color: '#333333', fontSize: px(32), }}>新房专区</Text>
          {this._renderHousr(1)}
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
  },
  itemContent: {
    borderBottomColor: '#E6E9F0',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: px(30)
  },
  item: {
    height: px(270),
    paddingTop: px(40),
  },
})
