import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import px from '../../../utils/px'
import { storage } from '../../../utils/storage'
import CheckBox from '../../../components/CheckBox'
import axios from 'axios'

var selectedArr = []
var CheckBoxData = []
export default class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Management: false,
      isAllselect: false,
      arr: []
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({ msManagement: this.msManagement, mode: 'edit' })
    axios({url:'http://218.108.34.222:8080/alert'}).then(res => {
      this.setState({
        arr:res.data.result
      })
    })
  }
  msManagement = () => {
    this.setState({ Management: !this.state.Management })
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

  selectAll() {
    this.setState({
      isAllselect: !this.state.isAllselect
    }, () => {
      for (var i = 0; i < CheckBoxData.length; i++) {
        if (CheckBoxData[i] != null) {
          CheckBoxData[i].onChange(this.state.isAllselect);
        }
      }
      if (this.state.isAllselect) {
        this.state.arr.forEach((item, index) => {
          selectedArr.push(item)
        })
      } else {
        selectedArr = []
      }
    })
    for (var i = 0; i < CheckBoxData.length; i++) {
      if (CheckBoxData[i] != null) {
        CheckBoxData[i].onChange(this.state.isAllselect);
      }
    }
  }

  getArrDifference(arr1, arr2) {
    return arr1.concat(arr2).filter(function (item, index, arr) {
      return arr.indexOf(item) === arr.lastIndexOf(item);
    });
  }
  delSelect() {
    let newArr = this.getArrDifference(selectedArr, this.state.arr)
    this.setState({
      arr: newArr,
      Management: false
    })
  }
  selectPress = (checked, index) => {
    let { arr } = this.state
    if (selectedArr.indexOf(arr[index]) == -1) {
      selectedArr.push(arr[index])
      if (selectedArr.length == this.state.arr.length) {
        this.setState({
          isAllselect: true
        })
      } else {
        this.setState({
          isAllselect: false
        })
      }
    } else {
      selectedArr.splice(selectedArr.indexOf(arr[index]), 1)
      if (selectedArr.length == this.state.arr.length) {
        this.setState({
          isAllselect: true
        })
      } else {
        this.setState({
          isAllselect: false
        })
      }
    }
    console.log(selectedArr)
  }

  _renderItem(data) {

    return (
      <View style={{ height: px(150), flexDirection: 'row', alignItems: 'center' }}>
        {
          this.state.Management ? <CheckBox
            ref={(c) => this.initCheckBoxData(c)}
            checked={false}
            value={data.index}
            style={{ marginRight: px(15), }}
            onChange={(checked) => this.selectPress(checked, data.index)}
          /> : null
        }
        <TouchableOpacity activeOpacity={1} style={{ flex: 1 }}
          onPress={() => this.state.Management ? false : this.props.navigation.navigate('msgDetails',{data:data.item.son,title:data.item.version_title})}>
          <View style={[styles.msgItem, { paddingHorizontal: this.state.Management ? px(20) : px(30) }]}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <View style={{ height: px(149) }}>
                <Text style={{ color: '#303233', fontSize: px(24), marginTop: px(40) }}>{data.item.version_title}</Text>
                <Text style={{ color: '#A8AFB3', fontSize: px(20), marginTop: px(30) }}>2019-02-03   08：30 </Text>
              </View>
              <Image
                style={{ width: px(48), height: px(48) }}
                source={require('../../../assets/images/common_arrow.png')} />
            </View>
          </View>
        </TouchableOpacity>

      </View>
    )
  }

  initCheckBoxData(checkbox) {
    if (checkbox != null) {
      CheckBoxData.push(checkbox);
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <FlatList
            style={{ flex: 1 }}
            data={this.state.arr}
            renderItem={(data) => this._renderItem(data)}
          />
        </View>
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
    // marginHorizontal: px(30)
  },
  MessageDel: {
    width: '100%',
    height: px(100),
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    bottom: 0,
  },
  msgItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: px(149),
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: px(1),
  },
})
