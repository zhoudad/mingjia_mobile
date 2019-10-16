import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import Icon from '../../components/Icon'
import ActionBar from '../../components/new'

export default class Td extends Component {
  static navigationOptions = {
    tabBarLabel: '3D房',
    tabBarIcon: ({ focused }) => {
      if (focused) {
        return (
          <Icon name='wode' size={18} color="#ea4c4c" />
        );
      }
      return (
        <Icon name='wode' size={18} />
      );
    },
  };
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
      text:''
    };
  }

  render() {
    var data = [["第一项目项目项目", "第二项目","1111111111"], ["第三项目", "第四项目","22222222222222"]];
    return (
      <View style={{ height: '100%' }}>
        <View style={{  position:'relative',height: 60,backgroundColor: "#green",}}>
          <View style={styles.header}>
            <Text style={{ paddingEnd: 12, }}>新房</Text>
            <View style={styles.search}>
              <Icon name='wode' color="#666" size={15} />
              <Text style={{ paddingStart: 8, color: "#666", fontSize: 12 }}>搜索你想要的内容</Text>
            </View>
            <TouchableOpacity activeOpacity={0.9}>
              <View style={{ flexDirection: 'row', paddingStart: 12 }}>
                <Icon name='wode' size={18} />
                <Text style={{ paddingStart: 8, }}>游客</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
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
      </View>
    );
  }
}
const styles = StyleSheet.create({
  header: {
    height: 60,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
   

  },
  search: {
    flex: 1,
    height: 40,
    backgroundColor: '#eee',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  drop: {
    height: 60,
    flexDirection: 'row',
    zIndex:4,
    position: 'absolute',
    top:60,left:0,bottom:0,right:0,height:60,
    // backgroundColor:'red'
  }
})
