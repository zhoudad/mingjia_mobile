import React, { Component } from 'react';
import {
  View, Text, StyleSheet, Image, TouchableOpacity, Animated, BackHandler, Dimensions, ScrollView, Easing,
  Button
} from 'react-native';
import Touchable from '../../components/Touchable'
import px from '../../utils/px'
import CustomTabBar from '../../components/CustomTabBar'
import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view';
import PropertyPage from './PropertyPage'
import HousetypePage from './HousetypePage'
// import ActionBar from '../../components/ActionBar'
import Couverture from '../../components/Couverture'
const { width, height } = Dimensions.get('window');
const data = [
  [["区域"], ["第一项目", "第一项目", "第一项目", "第二项目", "第二项目", "第二项目", "第二项目", "第二项目", "第二项目"]],
  [["单价"], ["1万以下", "1-1.5万", "1.5-2万", "2-3万", "3-5万", "5万以上"]],
  [["不限", "一室", "两室", "三室", "四室", "五室", "六室", "七室", "八室", "九室"]],

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
    for (var i = 0; i < data.length; i++) {
      selectIndex[i] = 0;
    }
    super(props);
    this.state = {
      sortActivity: false,
      maxHeight: px(500),
      priceActive: false,
      text: '',
      activityIndex: -1,
      selectIndex: selectIndex,
      isCouver: false,
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
      dataArr: ['默认排序'],
      rotationAnim: new Animated.Value(0),
      DownArrowArr: data.map(() => new Animated.Value(0)),
      titleArr: ['区域', '单价', '户型']
    };
  }

  split(data) {
    return data.length > 6 ? data.substring(0, 6) + '...' : data
  }

  sort() {
    let self = this
    this.setState({
      sortActivity: !this.state.sortActivity,
      activityIndex: -1
    }, () => {
      if (this.state.sortActivity) {
        self._openPanel()
      } else {
        self._closePanel()
      }
    })
  }
  _renderDropDownArrow(index) {
    return (
      <Animated.Image
        source={require("../../assets/images/nav_arrow_down1.png")}
        style={{
          width: px(24), height: px(24), marginLeft: 8,
          tintColor: index === this.state.activityIndex ? "#EA4C4C" : "#C0C4CC",
          transform: [
            {
              rotateZ: this.state.DownArrowArr[index].interpolate({
                inputRange: [0, 1],
                outputRange: ["0deg", "360deg"]
              })
            }
          ]
        }}
      />
    );
  }
  _itemOnPress(index) {
    var { selectIndex, titleArr, activityIndex } = this.state;
    if (activityIndex > -1) {
      selectIndex[activityIndex] = index;
      titleArr[activityIndex] = data[activityIndex].length > 1 ? data[activityIndex][1][index] : data[activityIndex][0][index]
      this.setState({ selectIndex, titleArr });
    }
    this._openOrClosePanel(this.state.activityIndex);
  }
  _renderChcek(title, index) {
    var activityIndex = this.state.activityIndex;
    if (this.state.selectIndex[activityIndex] == index) {
      return (
        <View style={styles.Check} >
          <Text style={{ color: '#303133', fontSize: px(28) }}>{title}</Text>
          <Image
            source={require('../../assets/images/nav_right1.png')}
            style={{ width: px(24), height: px(16), }}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.Check} >
          <Text style={{ color: '#303133', fontSize: px(28) }} >{title} </Text>
        </View>
      );
    }
  }
  _renderActivityPanel() {
    const { rotationAnim, maxHeight } = this.state;
    return (
      <Animated.View
        style={[styles.ActivityPanel, {
          transform: [
            {
              translateY: rotationAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, maxHeight + px(200)]
              })
            },
          ]
        }]}
      >
        <View style={{ height: maxHeight, flexDirection: 'row', }}>
          {
            data[this.state.activityIndex] ?
              data[this.state.activityIndex].length > 1 ? data[this.state.activityIndex].map((arr, i) => {
                if (i == 0) {
                  return (
                    <View style={{ flex: 1 }} key={i}>
                      <TouchableOpacity style={{ height: px(90), backgroundColor: '#F7F7F7', justifyContent: 'center', paddingLeft: px(30) }}>
                        <Text style={{ fontSize: px(28), color: '#303133' }}>{arr[0]}</Text>
                      </TouchableOpacity>
                    </View>
                  )
                } else {
                  return (
                    <View style={{ flex: 1 }} key={i}>
                      <ScrollView
                        contentContainerStyle={{ borderLeftWidth: px(1), borderLeftColor: '#E6E9F0' }}
                        showsVerticalScrollIndicator={false}>
                        {arr ? arr.map((item, index) => (
                          <Touchable
                            key={index}
                            style={{ flex: 1, height: px(90) }}
                            onPress={() => this._itemOnPress(index)}
                          >
                            {this._renderChcek(item, index)}
                          </Touchable>
                        )) : null}
                      </ScrollView>
                    </View>
                  )
                }
              })
                : <View style={{ flex: 1 }}>
                  <ScrollView
                    contentContainerStyle={{ borderLeftWidth: px(1), borderLeftColor: '#E6E9F0' }}
                    showsVerticalScrollIndicator={false}>
                    {data[this.state.activityIndex][0] ? data[this.state.activityIndex][0].map((item, index) => (
                      <Touchable
                        key={index}
                        style={{ flex: 1, height: px(90) }}
                        onPress={() => this._itemOnPress(index)}
                      >
                        {this._renderChcek(item, index)}
                      </Touchable>
                    )) : null}
                  </ScrollView>
                </View>
              : <View style={{ flex: 1, flexDirection: 'row' }}>

                <View style={{ width: px(410) }}>
                  {
                    this.state.sortArr.map((item, index) => {
                      return (
                        <TouchableOpacity
                          key={index}
                          activeOpacity={1}
                          onPress={() => this.setState({ sortIndex: index })}
                          style={{ height: px(90), paddingLeft: px(30), justifyContent: 'center', borderBottomColor: '#EEE', borderBottomWidth: px(1) }}>
                          <Text style={{ color: '#303133', fontSize: px(28) }}>{item.title}</Text>
                        </TouchableOpacity>
                      )
                    })
                  }
                </View>
                <View style={{ flex: 1, borderLeftWidth: px(1), borderLeftColor: '#E6E9F0' }}>
                  <ScrollView>
                    {
                      this.state.sortArr[this.state.sortIndex].data.map((item, index) => {
                        return (
                          <View style={styles.Check} key={index}>
                            <Text style={{ color: '#303133', fontSize: px(28) }} >{item} </Text>
                          </View>
                        )
                      })
                    }
                  </ScrollView>
                </View>
              </View>
          }
        </View>
        <View style={{ height: px(90), flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FAFAFA', height: px(90) }}
            activeOpacity={1}>
            <Text style={{ fontSize: px(30), color: '#999999' }}>重置</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#EA4C4C', height: px(90) }}
            activeOpacity={1}>
            <Text style={{ color: '#FFF', fontSize: px(30), }}>确定</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    )
  }
  _openOrClosePanel(index) {
    if (this.state.activityIndex == index) {
      this._closePanel(index);
      this.setState({
        activityIndex: -1,
        sortActivity: false
      });
    } else {
      if (this.state.activityIndex > -1) {
        this._closePanel(index);
        this.setState({ sortActivity: false })
      }
      this._openPanel(index);
      this.setState({
        activityIndex: index,
        sortActivity: false
      });
    }
  }
  _openPanel(index) {
    console.log('openPanel')
    const { rotationAnim } = this.state;
    // rotationAnim.setValue(0);
    if (this.state.DownArrowArr[index]) {
      Animated.timing(this.state.DownArrowArr[index], {
        toValue: 1,
        duration: 300,
        // easing: Easing.linear,
        // useNativeDriver: true,
      }).start();
    }
    Animated.spring(
      rotationAnim,
      {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }
    ).start();
    this.setState({ isCouver: false })
  }
  _closePanel(index) {
    console.log('closePanel')
    const { rotationAnim } = this.state;
    // rotationAnim.setValue(1);
    if (this.state.DownArrowArr[index]) {
      Animated.timing(this.state.DownArrowArr[index], {
        toValue: 0,
        duration: 300,
        // easing: Easing.linear,
        // useNativeDriver: true,
      }).start();
    }
    Animated.spring(
      rotationAnim,
      {
        toValue: 0,
        duration: 300,
        useNativeDriver: true
      }
    ).start();
    this.setState({ isCouver: true })
  };

  render() {
    const { navigation } = this.props
    return (
      <View style={{ flex: 1, }}>
        <View style={{ position: 'absolute', top: px(190), left: 0, width, height: height - px(190), zIndex: 1 }}>
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
        <Couverture
          isShow={this.state.isCouver}
          onPress={() => this._closePanel()}
          opacity={this.state.rotationAnim}
          zIndex={25}
        />
        {this._renderActivityPanel()}
        <View style={{ height: px(100), width, position: 'absolute', top: 0, left: 0, zIndex: 100 }}>
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
        </View>
        <View style={styles.drop}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
            {this.state.titleArr.map((item, index) => {
              return (
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => this._openOrClosePanel(index)}
                  key={index}
                  style={{ height: px(90), alignItems: "center", justifyContent: "center", }} >
                  <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", }} >
                    <Text style={{ fontSize: px(28), color: '#303133', fontFamily: 'PingFang-SC-Medium' }}  >
                      {/* {this.split(item[0][this.state.selectIndex[index]])} */}
                      {this.split(item)}
                    </Text>
                    {this._renderDropDownArrow(index)}
                  </View>
                </TouchableOpacity>
              )
            })}
            <TouchableOpacity
              activeOpacity={1} onPress={() => this.sort()}>
              <Image style={{ width: px(30), height: px(25) }}
                source={this.state.sortActivity ? require('../../assets/images/nav_vertical_s.png') : require('../../assets/images/nav_vertical.png')} />
            </TouchableOpacity>
          </View>
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
    backgroundColor: '#FFF',
    height: px(90),
    width,
    justifyContent: 'space-around',
    flexDirection: 'row',
    position: 'absolute',
    top: px(90),
    left: 0,
    zIndex: 100,
    padding: px(30)
    // elevation: 1,
  },
  // ActivityPanel: {
  //   position: "absolute",
  //   top: 0,
  //   left: 0,
  //   right: 0,
  //   borderBottomColor: '#E6E9F0',
  //   borderBottomWidth: px(1),
  //   backgroundColor: '#FFF',
  //   zIndex: 99
  // },
  btn: {
    height: px(100),
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    width,
    bottom: 120,
    left: 0,
    // zIndex:39
  },
  ActivityPanel: {
    height: px(500),
    position: 'absolute',
    width,
    backgroundColor: '#FFF',
    left: 0,
    top: px(-499),
    zIndex: px(9)
  },
  Check: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: px(30),
    flexDirection: "row",
    height: px(90),
    borderBottomColor: '#E6E9F0',
    borderBottomWidth: px(1)
  }
})
