import React, { Component } from 'react';
import px from '../../../utils/px'
import TipicTag from '../../../components/TipicTag'
import axios from 'axios'
import { withNavigation } from 'react-navigation';
import { View, Text, Image, FlatList, StyleSheet, RefreshControl, ActivityIndicator, TouchableOpacity } from 'react-native';

class PropertyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      data: []
    };
  }
componentDidMount(){
  this.getdata()
}
  getdata(){
    axios({
      method:'post',
      url:`http://218.108.34.222:8080/visitor_houses`,
      data:{
        account_id:2
      }
    }).then(res => {
      this.setState({data:res.data.result})
    })
  }


  _renderItem(data) {
    const { navigation, } = this.props
    return (
      <TouchableOpacity
        style={styles.item}
        activeOpacity={1}
        onPress={() => navigation.navigate('P_BasicInfo',{id:data.item.houses_id})}>
        <View style={styles.itemContent}>
          <View style={{ width: px(200), height: px(200), }}>
            <Image
              style={{ width: px(200), height: px(200), borderRadius: px(10) }}
              source={require('../../../assets/images/panda.jpg')} />
          </View>
          <View style={{ flex: 1, marginStart: px(30), height: px(200), }}>
            <Text style={{ color: '#333333', fontWeight: "bold", fontSize: px(28), fontFamily: 'PingFang-SC-Bold', fontWeight: 'bold' }}>{data.item.houses_name}</Text>
            <Text style={{ fontSize: px(24), color: '#B3B3B3', marginTop: px(9), fontFamily: 'PingFang-SC-Medium' }}>
              <Text style={{ marginRight: px(35) }}>{data.item.houses_ssite}</Text>
              <Text style={{ paddingRight: px(35) }}>&emsp;{data.item.houses_csite}</Text>
              <Text style={{ paddingRight: px(35) }}>&emsp;{data.item.survey_area}㎡</Text>
            </Text>
            <Text style={{ color: '#ea4c4c', fontSize: px(32), fontWeight: "bold", marginTop: px(24) }}>{data.item.houses_price} <Text style={{ fontSize: px(24) }}>元/㎡</Text></Text>
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
    return (
      <View style={styles.container}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={this.state.data}
          renderItem={(data) => this._renderItem(data)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: px(100)
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
  Text: {
    color: '#fff'
  }
})
export default withNavigation(PropertyPage);