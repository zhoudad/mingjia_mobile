import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import px from '../../../utils/px'
import MessageItem from './MessageItem'

var selectedArr = []
export default class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Management: false,
      isAllselect: false,
      arr: ['s', 'd', 'a', 'e', 'g',]
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({ msManagement: this.msManagement, mode: 'edit' })
    console.log(this.props.navigation.state)
  }
  msManagement = () => {
    this.setState({ Management: !this.state.Management })
    console.log(this.state.Management)
  }
  _renderManagement() {
    if (this.state.Management) {
      return (
        <View style={styles.MessageDel}>
          <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, backgroundColor: '#FFF', height: px(100), }}>
            <TouchableOpacity activeOpacity={1} onPress={() => this.selectAll()}>
              <Image
                style={{ width: px(56), height: px(56), marginStart: px(18) }}
                source={this.state.isAllselect ? require("../../../assets/images/common_select_s.png") : require("../../../assets/images/common_select_n.png")} />
            </TouchableOpacity>
            <Text style={{ color: '#303133', fontSize: px(32) }}>全选</Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => this.delSelect()}
            style={{ width: px(240), height: px(100), backgroundColor: '#EA4C4C', justifyContent: 'center', alignItems: 'center' }}

          >
            <Text style={{ color: '#fff', fontSize: px(32) }}>删除</Text>
          </TouchableOpacity>
        </View>
      )
    } else {
      return null
    }
  }

  selectAll(){
    this.setState({
      isAllselect:!this.state.isAllselect
    })
    this.state.arr.forEach(item => {
      selectedArr.push(item)
    })
  }

  delSelect(){
    let all = this.state.arr
    selectedArr.forEach(item => {
      this.state.arr.forEach(a =>{
        if(selectedArr.indexOf(a) != -1){
          all.splice(selectedArr.indexOf(a),1)
        }
      })
    })
    this.setState({
      arr:all,
      Management:false
    })
  }
  selectPress = (index) => {
    let { arr } = this.state
    if (selectedArr.indexOf(arr[index]) == -1) {
      selectedArr.push(arr[index])
      if (selectedArr.length == this.state.arr.length) {
        this.setState({
          isAllselect:true
        })
      } else {
        this.setState({
          isAllselect:false
        })
      }
    } else {
      selectedArr.splice(selectedArr.indexOf(arr[index]), 1)
      if (selectedArr.length == this.state.arr.length) {
        this.setState({
          isAllselect:true
        })
      } else {
        this.setState({
          isAllselect:false
        })
      }
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1, }} contentContainerStyle={{ paddingBottom: px(100) }}>
          {
            this.state.arr.map((item, index) => {
              return (
                <MessageItem
                  selectPress={this.selectPress}
                  key={index}
                  ref={item+index} 
                  Management={this.state.Management}
                  index={index}
                />
              )
            })
          }
        </ScrollView>
        {this._renderManagement()}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  header: {
    height: px(88),
    justifyContent: 'space-between',
    paddingEnd: px(30),
    flexDirection: 'row',
    alignItems: 'center',
  },
  msgItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: px(149),
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: px(1),
    marginHorizontal: px(30)
  },
  MessageDel: {
    width: '100%',
    height: px(100),
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    bottom: 0,
  }
})
