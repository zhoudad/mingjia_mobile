import React, { Component } from 'react';
import { View, Text, ScrollView, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import px from '../../utils/px'
import TipicTag from '../../components/TipicTag'
import axios from 'axios'
import {storage} from '../../utils/storage'

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      data: [],
      account_id:''
    };
  }
  componentDidMount(){
    storage.getBatchData([
      { key: 'accountId', syncInBackground: false },
    ]).then(results => {
      self.setState({
        account_id: results[0].account_id,
      })
    })
  }

  search(){
    axios({
      url:'http://218.108.34.222:8080/search',
      method:'post',
      data:{
        houses_name:this.state.content,
        account_id:this.state.account_id
      }
    }).then(res => {
      console.log(res)
      this.setState({
        data:res.data.results
      })
    })
  }

  _renderItem(data, key) {
    const { navigation, } = this.props
    return (
      <TouchableOpacity
        key={key}
        style={styles.item}
        activeOpacity={1}
        onPress={() => navigation.navigate('P_BasicInfo')}>
        <View style={styles.itemContent}>
          <View style={{ width: px(200), height: px(200), }}>
            <Image
              style={{ width: px(200), height: px(200), borderRadius: px(10) }}
              source={require('../../assets/images/panda.jpg')} />
          </View>
          <View style={{ flex: 1, marginStart: px(30), height: px(200), }}>
            <Text style={styles.tit}>{data.houses_name}</Text>
            <Text style={{ fontSize: px(24), color: '#B3B3B3', marginTop: px(9), fontFamily: 'PingFang-SC-Medium' }}>
              <Text style={{ marginRight: px(35) }}>{data.houses_ssite}</Text>
              <Text style={{ paddingRight: px(35) }}>&emsp;{data.houses_csite}</Text>
              <Text style={{ paddingRight: px(35) }}>&emsp;{data.survey_area}㎡</Text>
            </Text>
            <Text style={{ color: '#ea4c4c', fontSize: px(32), fontWeight: "bold", marginTop: px(24) }}>{data.houses_price}
            <Text style={{ fontSize: px(24) }}>元/㎡</Text></Text>
            <View style={{ flexDirection: 'row', marginTop: px(8) }}>
              <TipicTag text={"在售"} isStress={true} />
              <TipicTag text={"住宅"} />
              <TipicTag text={"装修交付"} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    const { navigation } = this.props
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.search}>
          <TouchableOpacity
            style={{ marginEnd: px(20) }}
            onPress={() => navigation.goBack()} activeOpacity={1}>
            <Image
              style={{ width: px(56), height: px(56), marginStart: px(3) }}
              source={require('../../assets/images/nav_icon_back.png')}
            />
          </TouchableOpacity>
          <TextInput
            placeholder={'请输入验证码'}
            placeholderTextColor={'#A8ABB3'}
            underlineColorAndroid='transparent'
            onChangeText={(content) => this.setState({ content })}
            style={{ flex: 1, borderRadius: px(35), height: px(70), backgroundColor: '#F5F7FA', paddingLeft: px(20) }} />
          <TouchableOpacity
            style={{ marginLeft: px(20) }}
            onPress={() => this.search()} activeOpacity={1}>
            <Image
              style={{ width: px(45), height: px(45), marginStart: px(3) }}
              source={require('../../assets/images/map_icon_1.png')}
            />
          </TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {
            this.state.data?this.state.data.map((item, index) => {
              return (
                this._renderItem(item, index)
              )
            }):null
          }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    height: px(100),
    paddingHorizontal: px(30),
    borderBottomColor: '#EEE',
    borderBottomWidth: px(1),
  },
  item: {
    height: px(270),
    paddingHorizontal: px(30),
    paddingTop: px(40),
  },
  itemContent: {
    borderBottomColor: '#E6E9F0',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: px(30)
  },
  tit: {
    color: '#333333',
    fontWeight: "bold",
    fontSize: px(28),
    fontFamily: 'PingFang-SC-Bold',
    fontWeight: 'bold',
  }
})
