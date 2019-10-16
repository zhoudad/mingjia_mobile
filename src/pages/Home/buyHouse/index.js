import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import px from '../../../utils/px'

export default class BuyHouse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index:'0',
      tab: [
        '准备买房',
        '看房/选房',
        '认购新房',
        '签约/约定',
        '全款/贷款',
        '收房/验房',
        '装修/入住',
        '退房/维权'
      ],
      tabCont: [
        [
          '买新房什么1111',
          '买新房什么2222',
          '买新房什么333',
          '买新房什么4444',
          '买新房什么555',
          '买新房什么666',
          '买新房什么777',
        ], [
          '买新房2什么1111',
          '买新房2什么2222',
          '买新房2什么333',
          '买新房2什么4444',
          '买新房2什么555',
          '买新房2什么666',
          '买新房2什么777',
        ], [
          '买新房3什么1111',
          '买新房42什么2222',
          '买新房42什么333',
          '买新房32什么4444',
          '买新房32什么555',
          '买新房32什么666',
          '买新房32什么777',
        ], [
          '买新房42什么1111',
          '买新房42什么2222',
          '买新房2什么333',
          '买新房2什么4444',
          '买新房2什么555',
          '买新房2什么666',
          '买新房2什么777',
        ], [
          '买新房52什么1111',
          '买新房2什么2222',
          '买新房2什么333',
          '买新房2什么4444',
          '买新房2什么555',
          '买新房2什么666',
          '买新房2什么777',
        ], [
          '买新房62什么1111',
          '买新房2什么2222',
          '买新房2什么333',
          '买新房2什么4444',
          '买新房2什么555',
          '买新房2什么666',
          '买新房2什么777',
        ], [
          '买新房72什么1111',
          '买新房2什么2222',
          '买新房2什么333',
          '买新房2什么4444',
          '买新房2什么555',
          '买新房2什么666',
          '买新房2什么777',
        ], [
          '买新房28什么1111',
          '买新房2什么2222',
          '买新房2什么333',
          '买新房2什么4444',
          '买新房2什么555',
          '买新房2什么666',
          '买新房2什么777',
        ]
      ]
    };
  }
  tabIndex = (key) => {
    console.log(key)
    this.setState({
      index:key
    })
  }

  render() {
    return (
      <View>
        <View style={styles.issueTit}>
          <Text style={{ fontSize: px(32),color:'#303133',fontWeight:'bold' }}>新房指南</Text>
        </View>
        <View style={{ flexDirection: 'row',height:'100%' }}>
          <View style={{ width: px(220),backgroundColor:'#F2F4F7' }}>
            {
              this.state.tab.map((item, key) => {
                return (
                  <TouchableOpacity 
                  onPress={() => {this.tabIndex(key)}}
                  key={key} 
                  activeOpacity={1}
                  style={[styles.tabItem,{backgroundColor:this.state.index == key ? '#EA4C4C' : '#F2F4F7',}]} >
                    <Text style={{ color:this.state.index == key ? '#FFFFFF' :'#303133' }} >{item}</Text>
                  </TouchableOpacity>
                )
              })
            }
          </View>
          <ScrollView contentContainerStyle={{ flex: 1, alignItems: 'center', borderTopColor: '#E6E9F0', borderTopWidth: px(1),  }}>
            {
              this.state.tabCont[this.state.index].map((item, key) => {
                return (
                  <TouchableOpacity 
                  onPress={() => this.props.navigation.navigate('HouseDetails')}
                  key={key} 
                  style={styles.tabContItem}>
                      <View style={{flex:1,borderBottomColor: '#E6E9F0', borderBottomWidth: px(1),justifyContent: 'center',marginHorizontal:px(30), }}>
                        <Text style={{ color:'#606266',fontSize:px(24) }} >{item}</Text>
                      </View>
                  </TouchableOpacity>
                )
              })
            }
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    issueTit:{
        paddingHorizontal:px(30),
        height: px(100),
         justifyContent: 'center', 
         paddingTop: px(40),
        paddingBottom: px(30)
    },
    tabItem:{
        height: px(100), 
        justifyContent: 'center', 
        alignItems:'center',
        width:px(220)
    },
    tabContItem:{
        height: px(100), 
        width:'100%'
    }
})