import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import ActionBar from '../../components/test'
import px from '../../utils/px'
import CustomTabBar from '../../components/CustomTabBar'
import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view';
import PropertyPage from './PropertyPage'
import HousetypePage from './HousetypePage'

export default class Td extends Component {
  static navigationOptions = {
    tabBarLabel: '3D房',
    tabBarIcon: ({ focused }) => {
      if (focused) {
        return (
          <Image style={{ width: px(56), height: px(56) }} source={require('../../assets/images/tabbar_3d.png')} />
        );
      }
      return (
        <Image style={{ width: px(56), height: px(56) }} source={require('../../assets/images/3d_play_s.png')} />
      );
    },
  };
  constructor(props) {
    super(props);
    this.state = {
      priceActive: false,
      text: ''
    };
  }

  render() {
    var data = [
      ["区域", "第一项目", "第一项目", "第一项目",],
      ["价格", "第二项目", "第二项目", "第二项目"],
      ["户型", "第二项目", "第二项目", "第二项目"]
    ];
    return (
      <View style={{ flex: 1, }}>
        <View style={styles.drop}>
          <ActionBar
            style={{ flex: 1 }}
            bgColor={"white"}
            tintColor={"#000000"}
            activityTintColor={"red"}
            // arrowImg={}
            // checkImage={}
            optionTextStyle={{ color: "red" }}
            titleStyle={{ color: '#3BB4F2' }}
            maxHeight={300}
            handler={(selection, row) =>
              this.setState({ text: data[selection][row] })
            }
            data={data}
          >
          </ActionBar>
        </View>
        <View style={styles.header}>
          <Text style={{ marginRight: px(20), color: '#303133', fontSize: px(32) }}>新房</Text>
          <TouchableOpacity style={styles.search}>
            <Image
              style={{ width: px(22), height: px(22) }}
              source={require('../../assets/images/search_icon.png')} />
            <Text style={{ paddingStart: 8, color: "#606466", fontSize: px(24) }}>搜索你想要的内容</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.9}>
            <View style={{ flexDirection: 'row', paddingStart: 12, alignItems: 'center' }}>
              <Image
                style={{ width: px(40), height: px(40) }}
                source={require('../../assets/images/nav_horizontal.png')} />
              <Text style={{ paddingStart: 8, color: '#303133', fontSize: px(32) }}>游客</Text>
            </View>
          </TouchableOpacity>
        </View>
      <View style={{ flex: 1, position: 'relative', zIndex: 5 }}>
        <ScrollableTabView
          renderTabBar={() => (<CustomTabBar
            backgroundColor={'#FFF'}
            tabUnderlineDefaultWidth={px(55)} 
            tabUnderlineScaleX={3} 
            activeColor={"#303133"}
            inactiveColor={"#A8ABB3"}
          />)}>
          <View tabLabel='楼盘' style={{ flex: 1, backgroundColor: '#fff' }}>
            <PropertyPage />
          </View>
          <View tabLabel='户型' style={{ flex: 1, backgroundColor: '#fff' }}>
            <HousetypePage />
          </View>
        </ScrollableTabView>
      </View>
      </View >
    );
  }
}
const styles = StyleSheet.create({
  header: {
    height: px(90),
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    paddingHorizontal: px(15),
    backgroundColor: '#fff',
    // zIndex: 99,
    position: 'relative',
    top: px(-90),
  },
  search: {
    backgroundColor: '#F5F8FA',
    borderRadius: px(30),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    flex:1,
    height: px(60),
  },
  drop: {
    flexDirection: 'row',
    position: 'relative',
    zIndex: 6,
    height: px(90),
    top: px(90),
  }
})
