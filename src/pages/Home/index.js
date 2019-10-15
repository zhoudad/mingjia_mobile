import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import Icon from '../../components/Icon'
import { unitWidth, width } from '../../AdapterUtil'
import DropdownMenu from '../../components/DropdownMenu'

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

  render() {
    let conditionData = [
      ["地区", "广州", "深圳", "北京", "上海", "西安"],
      ["面积", "100平以内", "100-200平"],
      ["类型", "五星酒店", "四星酒店", "三星酒店", "二星酒店", "会展中心", "餐厅"],
    ];
    return (
      <View style={{ flex: 1 }}>
        {/* <View style={{height:30,backgroundColor:'red'}}></View> */}
        <DropdownMenu
          style={{ height:60}}
          bgColor={'white'}
          tintColor={'#666666'} 
          activityTintColor={'green'}
          // arrowImg={}
          // checkImage={}
          // optionTextStyle={{color: '#f00'}}
          // titleStyle={{color: '#0f0'}}
          // maxHeight={300}
          handler={(selection, row) =>
            console.log(selection, row)
          }
          data={conditionData}
        // selectIndex={[0,2,0]}
        />
        {/* <View style={{height:420,backgroundColor:'red'}}></View> */}
      </View>
    );
  }
}
