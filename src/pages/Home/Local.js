import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import px from '../../utils/px'

export default class Local extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city:['上海','重庆','武汉','西安','北京','成都','重庆','西安','武汉']
    };
  }

  _renderArea(text) {
    return (
      <TouchableOpacity style={styles.areaItem} activeOpacity={1}>
        <Text style={{ color: '#606266', fontSize: px(24) }}>{text}</Text>
      </TouchableOpacity>
    )
  }
  render() {
    const {navigation} = this.props
    return (
      <View>
        <View style={styles.header}>
         <TouchableOpacity activeOpacity={1} onPress={() => navigation.goBack()}>
         <Image
            style={{ width: px(56), height: px(56), marginHorizontal: px(8) }}
            source={require('../../assets/images/nav_icon_back.png')} />
         </TouchableOpacity>
          <View style={styles.searchBox}>
            <Image
              style={{ width: px(22), height: px(22), marginHorizontal: px(22) }}
              source={require('../../assets/images/search_icon.png')} />
            <TextInput style={{ flex: 1, height: px(60), lineHeight: px(60), padding: 0 }} placeholder={"搜索您想要的内容"} />
          </View>
        </View>
        <View style={{ marginHorizontal: px(30) }}>
          <View>
            <Text style={{ color: '#303233', fontSize: px(28), marginBottom: px(30) }}>定位/推荐</Text>
            <View style={styles.recItem}>
              <Image
                style={{ width: px(28), height: px(28), marginEnd: px(3), marginStart: px(13) }}
                source={require('../../assets/images/common_point.png')} />
              <Text style={{ color: '#606266', fontSize: px(24) }}>杭州</Text>
            </View>
          </View>
          <View>
            <Text style={{ color: '#303233', fontSize: px(28), marginBottom: px(30), marginTop: px(60) }}>服务地区</Text>
            <View style={{flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between'}}>
              {
                this.state.city.map(item => {
                 return this._renderArea(item)
                })
              }
            </View>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  header: {
    height: px(90),
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: px(15),
    paddingEnd: px(60),
    shadowColor: '#000000',
    shadowOffset: { w: 0, h: px(12) },
    shadowOpacity: 0.08,
    // shadowRadius:5,
    elevation: 2,
  },
  searchBox: {
    backgroundColor: '#F5F8FA',
    borderRadius: px(60),
    flex: 1,
    height: px(60),
    alignItems: 'center',
    flexDirection: 'row',
  },
  recItem: {
    width: px(120),
    height: px(56),
    backgroundColor: '#F2F4F7',
    borderRadius: px(5),
    alignItems: 'center',
    flexDirection: 'row',
  },
  areaItem: {
    width: px(180),
    height: px(72),
    borderRadius: px(5),
    backgroundColor: '#F5F7FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:px(30)
  }
})