import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated, BackHandler, Dimensions, ScrollView, Easing, } from 'react-native';
import Touchable from '../../components/Touchable'
import px from '../../utils/px'
import CustomTabBar from '../../components/CustomTabBar'
import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view';
import PropertyPage from './PropertyPage'
import HousetypePage from './HousetypePage'
import ActionBar from '../../components/test'
const { width, height } = Dimensions.get('window');
const data = [
  ["区域", "第一项目", "第一项目", "第一项目",],
  ["价格", "第二项目", "第二项目", "第二项目"],
  ["户型", "第二项目", "第二项目", "第二项目"],

]
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
    var selectIndex = new Array(data.length);
    for (var i = 0; i < selectIndex.length; i++) {
      selectIndex[i] = 0;
    }
    super(props);
    this.state = {
      sortActivity: false,
      maxHeight: px(450),
      priceActive: false,
      text: '',
      activityIndex: -1,
      selectIndex: selectIndex,
      rotationAnims: data.map(() => new Animated.Value(0)),
      sortIndex: 0,
      sortArr: [
        {
          title: '默认排序',
          data: ['默认排序']
        }, {
          title: '均价',
          data: ['从低到高', '从高到低']
        }, {
          title: '开盘时间',
          data: ['未来一个月', '未来三个月', '未来半年', '过去一个月', '过去三个月']
        }
      ],
      dataArr: ['默认排序']
    };
  }

  split(data) {
    return data.length > 6 ? data.substring(0, 6) + '...' : data
  }
  renderDropDownArrow(index) {
    return (
      <Animated.Image
        source={require("../../assets/images/nav_arrow_down1.png")}
        style={{
          width: px(24), height: px(24), marginLeft: 8,
          tintColor:
            index === this.state.activityIndex ? "#EA4C4C" : "#C0C4CC",
          transform: [
            {
              rotateZ: this.state.rotationAnims[index].interpolate({
                inputRange: [0, 1],
                outputRange: ["0deg", "360deg"]
              })
            }
          ]
        }}
      />
    );
  }

  openOrClosePanel(index) {
    if (this.state.activityIndex == index) {
      this.closePanel(index);
      this.setState({
        activityIndex: -1,
        sortActivity: false
      });
    } else {
      if (this.state.activityIndex == 3) {
        this.openPanel(index);
        this.setState({
          activityIndex: index,
          sortActivity: true
        });
      }
      if (this.state.activityIndex > -1) {
        this.closePanel(this.state.activityIndex);
      }
      this.openPanel(index);
      this.setState({
        activityIndex: index
      });
    }
  }

  openPanel(index) {
    if (this.state.rotationAnims[index]) {
      Animated.timing(this.state.rotationAnims[index], {
        toValue: 0.5,
        duration: 300,
        easing: Easing.linear
      }).start();
    } else {
      return
    }
  }

  closePanel(index) {
    if (this.state.rotationAnims[index]) {
      Animated.timing(this.state.rotationAnims[index], {
        toValue: 0,
        duration: 300,
        easing: Easing.linear
      }).start();
    } else {
      return
    }
  }

  renderChcek(index, title) {
    var activityIndex = this.state.activityIndex;
    if (this.state.selectIndex[activityIndex] == index) {
      return (
        <View style={{ flex: 1, justifyContent: "space-between", alignItems: "center", paddingHorizontal: px(30), flexDirection: "row", height: px(90), }} >
          <Text style={{ color: '#303133', fontSize: px(28) }}>{title}</Text>
          <Image
            source={require('../../assets/images/nav_right1.png')}
            style={{ width: px(24), height: px(16), }}
          />
        </View>
      );
    } else {
      return (
        <View
          style={{ flex: 1, justifyContent: "space-between", alignItems: "center", paddingHorizontal: px(30), flexDirection: "row" }} >
          <Text style={{ color: '#303133', fontSize: px(28) }} >{title} </Text>
        </View>
      );
    }
  }

  renderActivityPanel() {
    if (this.state.activityIndex >= 0) {
      var currentTitles = data[this.state.activityIndex] ? data[this.state.activityIndex] : [];
      var heightStyle = {};
      if (this.state.maxHeight && this.state.maxHeight < currentTitles.length * px(45)) {
        heightStyle.height = this.state.maxHeight;
      }
      return (
        <View style={{ position: "absolute", left: 0, right: 0, top: px(90), bottom: 0, width, height, }} >
          <TouchableOpacity
            onPress={() => this.openOrClosePanel(this.state.activityIndex)}
            activeOpacity={1}
            style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0 }} >
            <View style={{ opacity: 0.4, backgroundColor: "black", flex: 1 }} />
          </TouchableOpacity>
          {/* {
            this.state.activityIndex == 0 ?
              <View style={[styles.ActivityPanel, heightStyle, { flexDirection: 'row', }]}>
                <View style={{ flex: 1 }}>
                  <View style={{ height: px(90), backgroundColor: '#F7F7F7', paddingHorizontal: px(30), justifyContent: 'center' }}>
                    <Text style={{ color: '#303133', fontSize: px(28) }}>区域</Text>
                  </View>
                </View>
                <ScrollView style={{ flex: 1, borderLeftWidth: px(1), borderLeftColor: '#E6E9F0' }}>
                  {currentTitles.map((title, index) => (
                    <TouchableOpacity
                      key={index}
                      activeOpacity={1}
                      style={{ flex: 1, height: px(89), borderBottomColor: '#E6E9F0', borderBottomWidth: px(1) }}
                      onPress={() => this.itemOnPress(index)}
                    >
                      {this.renderChcek(index, title)}
                      <View style={{ backgroundColor: "red ", height: 1, marginLeft: px(10) }} />
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
              : this.state.activityIndex == 3 ?
                <View style={[styles.ActivityPanel, heightStyle, { flexDirection: 'row', }]}>
                  <View style={{ flex: 1 }}>
                    {
                      this.state.sortArr.map((item, index) => {
                        return (
                          <TouchableOpacity
                            onPress={() => this.setState({ dataArr: this.state.sortArr[index], sortIndex: index })}
                            activeOpacity={1}
                            key={index}
                            style={{ height: px(90), backgroundColor: this.state.sortIndex == index ? '#F7F7F7' : '#FFF', paddingHorizontal: px(30), justifyContent: 'center' }}>
                            <Text style={{ color: '#303133', fontSize: px(28) }}>{item.title}</Text>
                          </TouchableOpacity>
                        )
                      })
                    }
                  </View>
                  <ScrollView style={{ flex: 1, borderLeftWidth: px(1), borderLeftColor: '#E6E9F0' }}>
                    {this.state.dataArr.map((data, index) => (
                      <TouchableOpacity
                        key={index}
                        activeOpacity={1}
                        style={{ flex: 1, height: px(89), borderBottomColor: '#E6E9F0', borderBottomWidth: px(1) }}
                        onPress={() => this.itemOnPress(index)}
                      >
                        {this.renderChcek(index, data)}
                        <View style={{ backgroundColor: "red ", height: 1, marginLeft: px(10) }} />
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
                :
                <ScrollView
                  style={[styles.ActivityPanel, heightStyle]}>
                  {currentTitles.map((title, index) => (
                    <TouchableOpacity
                      key={index}
                      activeOpacity={1}
                      style={{ flex: 1, height: px(90) }}
                      onPress={() => this.itemOnPress(index)}
                    >
                      {this.renderChcek(index, title)}
                      <View style={{ backgroundColor: "red ", height: 1, marginLeft: px(10) }} />
                    </TouchableOpacity>
                  ))}
                </ScrollView>
          } */}

        </View>
      );
    } else {
      return null;
    }
  }

  itemOnPress(index) {
    console.log(index)
    if (this.state.activityIndex > -1) {
      var selectIndex = this.state.selectIndex;
      selectIndex[this.state.activityIndex] = index;
      this.setState({
        selectIndex: selectIndex
      });
      if (this.props.handler) {
        this.props.handler(this.state.activityIndex, index);
      }
    }
    this.openOrClosePanel(this.state.activityIndex);
  }

  render() {
    const { navigation } = this.props
    return (
      <View style={{ flex: 1, }}>
        <View style={styles.header}>
          <Text style={{ marginRight: px(20), color: '#303133', fontSize: px(32) }}>新房</Text>
          <TouchableOpacity style={styles.search} activeOpacity={1}>
            <Image
              style={{ width: px(22), height: px(22) }}
              source={require('../../assets/images/search_icon.png')} />
            <Text style={{ paddingStart: 8, color: "#606466", fontSize: px(24) }}>搜索你想要的内容</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.replace('Owner')}>
            <View style={{ flexDirection: 'row', paddingStart: 12, alignItems: 'center' }}>
              <Image
                style={{ width: px(40), height: px(40) }}
                source={require('../../assets/images/nav_horizontal.png')} />
              <Text style={{ paddingStart: 8, color: '#303133', fontSize: px(32) }}>业主</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, position: 'absolute', top: px(180), left: 0, width, height: height - px(180), }}>
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
        <View style={styles.drop}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
            {data.map((item, index) => (
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => this.openOrClosePanel(index)}
                key={index}
                style={{ height: px(90), alignItems: "center", justifyContent: "center", }} >
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", }} >
                  <Text style={{ fontSize: px(28), color: '#303133', fontFamily: 'PingFang-SC-Medium' }}  >
                    {this.split(item[this.state.selectIndex[index]])}
                  </Text>
                  {this.renderDropDownArrow(index)}
                </View>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              activeOpacity={1} onPress={() => this.openOrClosePanel(3)}>
              <Image style={{ width: px(30), height: px(25) }}
                source={this.state.sortActivity ? require('../../assets/images/nav_vertical_s.png') : require('../../assets/images/nav_vertical.png')} />
            </TouchableOpacity>
          </View>
          {this.renderActivityPanel()}
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
    borderBottomColor: '#E6E9F0',
    borderBottomWidth: px(1),
    paddingHorizontal: px(30),
    backgroundColor: '#fff',
  },
  search: {
    backgroundColor: '#F5F8FA',
    borderRadius: px(30),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    flex: 1,
    height: px(60),
  },
  drop: {
    flexDirection: 'row',
    height: px(90),
    width,
    borderBottomColor: '#E6E9F0',
    borderBottomWidth: px(1),
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: px(30),
    position: 'absolute',
    top: px(90),
    left: 0,
    zIndex: 19,
    // elevation: 1,
  },
  ActivityPanel: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    borderBottomColor: '#E6E9F0',
    borderBottomWidth: px(1),
    backgroundColor: '#FFF',
  }
})
