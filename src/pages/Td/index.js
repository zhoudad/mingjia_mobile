import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from '../../components/Icon'
<<<<<<< HEAD
import ActionBar from '../../components/new'
=======
import ActionBar from '../../components/test'
import { unitWidth, width } from '../../AdapterUtil'
import CustomTabBar from '../../components/CustomTabBar'
import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view';
import PropertyPage from './PropertyPage'
>>>>>>> ae4af7cc92f552875636025321b36cdadda85381

export default class Td extends Component {
  static navigationOptions = {
    tabBarLabel: '3D房',
    tabBarIcon: ({ focused }) => {
      if (focused) {
        return (
          // <Icon name='wode' size={18} color="#ea4c4c" />
          <Image style={{ width: 56 * unitWidth, height: 56 * unitWidth }} source={require('../../assets/images/tabbar_3d.png')} />
        );
      }
      return (
        // <Icon name='wode' size={18} />
        <Image style={{ width: 56 * unitWidth, height: 56 * unitWidth }} source={require('../../assets/images/3d_play_s.png')} />
      );
    },
  };
  constructor(props) {
    super(props);
    this.state = {
<<<<<<< HEAD
      isActive: false,
      text:''
=======
      priceActive: false,
      text: ''
>>>>>>> ae4af7cc92f552875636025321b36cdadda85381
    };
  }

  render() {
<<<<<<< HEAD
    var data = [["第一项目项目项目", "第二项目","1111111111"], ["第三项目", "第四项目","22222222222222"]];
    return (
      <View style={{ height: '100%' }}>
        <View style={{  position:'relative',height: 60,backgroundColor: "#green",}}>
          <View style={styles.header}>
            <Text style={{ paddingEnd: 12, }}>新房</Text>
            <View style={styles.search}>
              <Icon name='wode' color="#666" size={15} />
              <Text style={{ paddingStart: 8, color: "#666", fontSize: 12 }}>搜索你想要的内容</Text>
=======
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
          <Text style={{ marginRight: 20 * unitWidth, color: '#303133', fontSize: 32 * unitWidth }}>新房</Text>
          <TouchableOpacity style={styles.search}>
            <Image
              style={{ width: 22 * unitWidth, height: 22 * unitWidth }}
              source={require('../../assets/images/search_icon.png')} />
            <Text style={{ paddingStart: 8, color: "#606466", fontSize: 24 * unitWidth }}>搜索你想要的内容</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.9}>
            <View style={{ flexDirection: 'row', paddingStart: 12, alignItems: 'center' }}>
              <Image
                style={{ width: 40 * unitWidth, height: 40 * unitWidth }}
                source={require('../../assets/images/nav_horizontal.png')} />
              <Text style={{ paddingStart: 8, color: '#303133', fontSize: 32 * unitWidth }}>游客</Text>
>>>>>>> ae4af7cc92f552875636025321b36cdadda85381
            </View>
            <TouchableOpacity activeOpacity={0.9}>
              <View style={{ flexDirection: 'row', paddingStart: 12 }}>
                <Icon name='wode' size={18} />
                <Text style={{ paddingStart: 8, }}>游客</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
<<<<<<< HEAD
        {/* <View style={styles.drop}> */}
          {/* <ActionBar
            isActive={this.state.isActive}
            // bannerAction={(obj) => this.setState({ isActive: obj })}
          /> */}
          <ActionBar
          style={{ flex: 1 }}
          bgColor={"white"}
          tintColor={"#000000"}
          activityTintColor={"#3BB4F2"}
          // arrowImg={}
          // checkImage={}
          optionTextStyle={{ color: "#333333" }}
          titleStyle={{color: '#3BB4F2'}}
          // maxHeight={300}
          handler={(selection, row) =>
            this.setState({ text: data[selection][row] })
            // (HomeStore.firstName = data[selection][row])
          }
          data={data}
          // data={HomeStore.dataTest}
        >
          <View style={{ flex: 1 }}>
            <Text>{HomeStore.firstName} -------这里是选择的内容</Text>
          </View>
        </ActionBar>
        {/* </View> */}
=======
        <View style={{ flex: 1,position:'relative',zIndex:5 }}>
          <ScrollableTabView
            renderTabBar={() => (<CustomTabBar
              backgroundColor={'#FFF'}
              tabUnderlineDefaultWidth={20} // default containerWidth / (numberOfTabs * 4)
              tabUnderlineScaleX={3} // default 3
              activeColor={"#303133"}
              inactiveColor={"#A8ABB3"}
            />)}>
            <View tabLabel='楼盘' style={{flex:1,backgroundColor:'#fff'}}>
              <PropertyPage />
            </View>
            <View tabLabel='户型' style={{flex:1,backgroundColor:'#fff'}}>
              
            </View>
          </ScrollableTabView>
        </View>
>>>>>>> ae4af7cc92f552875636025321b36cdadda85381
      </View>
    );
  }
}
const styles = StyleSheet.create({
  header: {
    height: 90 * unitWidth,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
<<<<<<< HEAD
    paddingHorizontal: 15,
    backgroundColor: '#fff',
   

=======
    paddingHorizontal: 15 * unitWidth,
    backgroundColor: '#fff',
    // zIndex: 99,
    position: 'relative',
    top: -90 * unitWidth,
>>>>>>> ae4af7cc92f552875636025321b36cdadda85381
  },
  search: {
    backgroundColor: '#F5F8FA',
    borderRadius: 30 * unitWidth,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    width: 480 * unitWidth,
    height: 60 * unitWidth,
  },
  drop: {
    flexDirection: 'row',
<<<<<<< HEAD
    zIndex:4,
    position: 'absolute',
    top:60,left:0,bottom:0,right:0,height:60,
    // backgroundColor:'red'
=======
    position: 'relative',
    zIndex: 6,
    height: 90 * unitWidth,
    top: 90 * unitWidth,
>>>>>>> ae4af7cc92f552875636025321b36cdadda85381
  }
})
