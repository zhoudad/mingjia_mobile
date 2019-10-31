import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import px from '../../../utils/px'
import { storage } from '../../../utils/storage'
import Axios from 'axios';

export default class BuyHouse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      content: [],
      user_id: '',
      account_id: '',
      know_name: ''
    };
  }
  async componentDidMount() {
    let self = this
    await storage.getBatchData([
      { key: 'userId', syncInBackground: false },
      { key: 'accountId', syncInBackground: false },
    ]).then(results => {
      self.setState({
        user_id: results[0].user_id,
        account_id: results[1].account_id,
      })
    })
    // Axios.all([this.getList(), this.getContent(),])
    //   .then(Axios.spread(function (list, content) {
    //     self.setState({
    //       list: list.data.result,
    //       content: content.data.result
    //     })
    //     console.log(list, content)
    //   }))
    this.getList()
  }

  getList() {
    Axios({ url: 'http://218.108.34.222:8080/mc_show' }).then(res => {
      console.log(res)
      this.setState({
        list : res.data.result
      })
     this.getContent()
    })
  }
  getContent(){
    Axios({
      url: `http://218.108.34.222:8080/know?account_id=` + this.state.account_id + '&know_name=' + this.state.list[0].know_name,
    }).then(res => {
      console.log(res.data.result)
      this.setState({
        content:res.data.result
      })
    })
  }

  render() {
    return (
      <View>
        <View style={styles.issueTit}>
          <Text style={{ fontSize: px(32), color: '#303133', fontWeight: 'bold' }}>新房指南</Text>
        </View>
        <View style={{ flexDirection: 'row', height: '100%' }}>
          <View style={{ width: px(220), backgroundColor: '#F2F4F7' }}>
            {
              this.state.list ? this.state.list.map((item, key) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({ know_name: item.know_name },() => {
                        this.getContent()
                      })
                    }}
                    key={key}
                    activeOpacity={1}
                    style={[styles.tabItem, { backgroundColor: this.state.know_name == item.know_name ? '#EA4C4C' : '#F2F4F7', }]} >
                    <Text style={{ color: this.state.know_name == item.know_name ? '#FFFFFF' : '#303133' }} >{item.know_name}</Text>
                  </TouchableOpacity>
                )
              }):null
            }
          </View>
          <ScrollView contentContainerStyle={{ flex: 1, alignItems: 'center', borderTopColor: '#E6E9F0', borderTopWidth: px(1), }}>
            {
              this.state.content ? this.state.content.map((item, key) => {
                return (
                  <TouchableOpacity
                  activeOpacity={0.8}
                    onPress={() => this.props.navigation.navigate('HouseDetails',{data:item})}
                    key={key}
                    style={styles.tabContItem}>
                    <View style={{ flex: 1, borderBottomColor: '#E6E9F0', borderBottomWidth: px(1), justifyContent: 'center', marginHorizontal: px(30), }}>
                      <Text style={{ color: '#606266', fontSize: px(24) }} >{item.know_name}</Text>
                    </View>
                  </TouchableOpacity>
                )
              }) : null
            }
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  issueTit: {
    paddingHorizontal: px(30),
    height: px(100),
    justifyContent: 'center',
    paddingTop: px(40),
    paddingBottom: px(30)
  },
  tabItem: {
    height: px(100),
    justifyContent: 'center',
    alignItems: 'center',
    width: px(220)
  },
  tabContItem: {
    height: px(100),
    width: '100%'
  }
})