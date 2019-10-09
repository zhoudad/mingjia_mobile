import React, { Component } from 'react';
import { View, Text, StyleSheet, Modal, Image } from 'react-native';
import Icon from '../../components/Icon'
import ActionBar from '../../components/test'
import { unitWidth, width } from '../../AdapterUtil'
import Touchable from '../../components/Touchable';
import ScrollableTabView,
{
  DefaultTabBar,
  ScrollableTabBar
} from 'react-native-scrollable-tab-view';

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
      priceActive: false,
      text: ''
    };
  }

  render() {
    var data = [
      ["第一项目", "第二项目", "第二项目", "第二项目", "第二项目", "第二项目", "第二项目", "第一项目", "第二项目", "第一项目", "第二项目", "第二项目", "第一项目", "第一项目"], ["第二项目", "第二项目", "第二项目"]];
    return (
      <View style={{ flex: 1, }}>
        <View style={styles.drop}>
          {/* <View style={{ flex: 1, flexDirection: 'row', }}> */}
          {/* <ActionBar
            isActive={this.state.priceActive}
            bannerAction={(priceActive) => this.setState({ priceActive })}
          /> */}
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
              // (HomeStore.firstName = data[selection][row])
            }
            data={data}
          // data={HomeStore.dataTest}
          >
            {/* <View style={{ flex: 1 }}>
                <Text>{HomeStore.firstName} -------这里是选择的内容</Text>
                <Text>{this.state.text}</Text>
              </View> */}
          </ActionBar>
          {/* </View> */}
        </View>
        <View style={styles.header}>
          <Text style={{ marginRight: 20 * unitWidth, color: '#303133', fontSize: 32 * unitWidth }}>新房</Text>
          <View style={styles.search}>
            {/* <Icon name='wode' color="#666" size={15} /> */}
            <Image
              style={{ width: 22 * unitWidth, height: 22 * unitWidth }}
              source={require('../../assets/images/search_icon.png')} />
            <Text style={{ paddingStart: 8, color: "#606466", fontSize: 24 * unitWidth }}>搜索你想要的内容</Text>
          </View>
          <Touchable activeOpacity={0.9}>
            <View style={{ flexDirection: 'row', paddingStart: 12, alignItems: 'center' }}>
              {/* <Icon name='wode' size={18} /> */}
              <Image
                style={{ width: 40 * unitWidth, height: 40 * unitWidth }}
                source={require('../../assets/images/nav_horizontal.png')} />
              <Text style={{ paddingStart: 8, color: '#303133', fontSize: 32 * unitWidth }}>游客</Text>
            </View>
          </Touchable>
        </View>
        <View style={{flex:1}}>
          {/* <Text style={{color:'green'}}>1111111</Text> */}
          <ScrollableTabView
            style={styles.container}
            renderTabBar={() => <DefaultTabBar />}
            tabBarUnderlineStyle={styles.lineStyle}
            tabBarActiveTextColor='#FF0000'
          >
            <Text style={styles.textStyle} tabLabel='娱乐'>娱乐</Text>
            <Text style={styles.textStyle} tabLabel='科技'>科技</Text>
            <Text style={styles.textStyle} tabLabel='军事'>军事</Text>
            <Text style={styles.textStyle} tabLabel='体育'>体育</Text>
          </ScrollableTabView>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#F5FCFF',
  },
  lineStyle: {
    width: width / 4,
    height: 2,
    backgroundColor:'red'
  },
  textStyle: {
    flex: 1,
    fontSize: 20,
    marginTop: 20,
    textAlign:'center'
  },
  header: {
    height: 60,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    // zIndex: 99,
    position: 'relative',
    top: -60,
  },
  search: {
    height: 40,
    backgroundColor: '#F5F8FA',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    width: 480 * unitWidth,
    height: 60 * unitWidth,
  },
  drop: {
    height: 60,
    flexDirection: 'row',
    position: 'relative',
    // zIndex: 1,
    height: 60,
    top: 60,
  }
})
