import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, RefreshControl, ActivityIndicator, TouchableOpacity } from 'react-native';
import TipicTag from '../../../components/TipicTag'
import axios from 'axios'
import px from '../../../utils/px';

export default class Footprint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      FootprintArr: []
    };
  }

  componentDidMount() {
    this.getdata()
  }
  getdata() {
    console.log
    axios({
      method: 'post',
      url: 'http://218.108.34.222:8080/track_show',
      data: {
        account_id: 2,
        user_id: 2
      }
    }).then(res => {
      console.log(res)
      this.setState({
        FootprintArr: res.data.result
      })
    })
  }
  _renderItem(data) {
    const { navigation } = this.props
    return (
      <TouchableOpacity
        style={styles.item}
        activeOpacity={1}
        onPress={() => navigation.navigate('BasicInfo', { id: data.item.houses_id })}>
        <View style={styles.itemContent}>
          <View style={{ width: px(200), height: px(200), backgroundColor: '#ddd' }}></View>
          <View style={{ flex: 1, marginStart: px(30), height: px(200), }}>
            <Text style={{ color: '#333333', fontWeight: "bold", fontSize: px(28) }}>{data.item.houses_name}</Text>
            <Text style={{ fontSize: px(24), color: '#B3B3B3', marginTop: px(9) }}>
              <Text style={{ paddingEnd: px(35) }}>{data.item.houses_ssite}</Text>
              <Text style={{ paddingEnd: px(35) }}>&emsp;{data.item.houses_csite}</Text>
              <Text style={{ paddingEnd: px(35) }}>&emsp;{data.item.survey_area}㎡</Text>
            </Text>
            <Text style={{ color: '#ea4c4c', fontSize: px(32), fontWeight: "bold", marginTop: px(24) }}>{data.item.houses_price}元/㎡</Text>
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
          data={this.state.FootprintArr}
          renderItem={(data) => this._renderItem(data)}
          refreshControl={
            <RefreshControl
              title={'loading'}
              colors={['green']}
              refreshing={this.state.isLoading}
            />
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
})
