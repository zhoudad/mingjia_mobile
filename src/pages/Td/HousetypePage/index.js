import React, { Component } from 'react';
import px from '../../../utils/px'
import TipicTag from '../../../components/TipicTag'
import { withNavigation } from 'react-navigation';
import { View, Text, FlatList, StyleSheet, RefreshControl, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
const City = ['北京', '上海', '深圳', '武汉', '广州', '杭州', '重庆', '天津', '香港', '福建', '郑州', '四川',]

class HousetypePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      cityData: City
    };
  }
  more = () => {
    return (
      <View style={{ alignItems: 'center' }}>
        <ActivityIndicator
          size={'large'}
          animating={true}
          style={{ margin: 10 }}
          color={'green'}
        />
        <Text>正在加载更多</Text>
      </View>
    )
  }

  _renderItem() {
    return (
      <View style={{paddingTop:px(40),}}>
        <View style={{ flexDirection: 'row', alignItems: 'center',justifyContent:'space-between',flexDirection:'row' }}>
          <Text style={styles.tit}>珠江帝景新府 </Text>
          <TouchableOpacity activeOpacity={1} style={{flexDirection:'row',alignItems:'center'}}>
            <Text style={{ color: '#A8ABB3', fontSize: px(24) }}>展开全部</Text>
            <Image style={{ width: px(24), height: px(24) }} source={require('../../../assets/images/fangke_arrow_down.png')} />
          </TouchableOpacity>
        </View>
        <View style={{flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between'}}>
          {this._renderItem_H()}
          {this._renderItem_H()}
          {this._renderItem_H()}
          {this._renderItem_H()}
        </View>
      </View>
    )
  }

  _renderItem_H(data) {
    const { navigation } = this.props
    return (
      <TouchableOpacity
        style={styles.H_item}
        activeOpacity={1}
        onPress={() => navigation.navigate('H_BasicInfo')}>
        <View style={styles.itemContent}>
          <View style={{ width: px(218), height: px(128) }}>
            <Image style={{ width: px(218), height: px(128),borderRadius:px(10) }} source={require('../../../assets/images/panda.jpg')} />
          </View>
          <View style={{ marginTop: px(20) }}>
            <Text style={{ color: '#333333', fontWeight: "bold", fontSize: px(24),fontFamily:'PingFang-SC-Medium' }}>3室2厅2卫89m</Text>
            <Text style={{ color: '#ea4c4c', fontSize: px(26), fontWeight: "bold",}}>58600 元/㎡</Text>
            <View style={{ flexDirection: 'row', marginTop: px(8) }}>
              <TipicTag text={"主推"} isStress={true} />
              <TipicTag text={"在售"} />
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
          data={this.state.cityData}
          renderItem={(data) => this._renderItem(data)}
          refreshControl={
            <RefreshControl
              title={'loading'}
              colors={['green']}
              refreshing={this.state.isLoading}
              onRefresh={() => {
                this.Loading(true)
              }}
            />
          }
          ListFooterComponent={() => this.more()}
          onEndReached={() => this.Loading()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal:px(30),
  },
  H_item: {
    height: px(270),
    paddingTop: px(30),
    paddingBottom:px(20)
  },
  itemContent: {
    paddingBottom: px(30)
  },
  Text: {
    color: '#fff'
  },
  tit: {
    color: '#303133',
    fontSize: px(28),
    fontWeight:'bold',
    fontFamily:'PingFang-SC-Bold',
  }
})
export default withNavigation(HousetypePage);
