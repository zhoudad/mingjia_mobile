import React, { Component } from 'react';
import px from '../../../utils/px'
import TipicTag from '../../../components/TipicTag'
import { withNavigation } from 'react-navigation';
import { View, Text, FlatList, StyleSheet, RefreshControl, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import Axios from 'axios';
import {storage} from '../../../utils/storage'

class RenderItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Expand: false,
      itemHeight: 0
    };
  }

  _renderItem_H(data, index) {
    const { navigation } = this.props
    return (
      <TouchableOpacity
        key={index}
        style={[styles.H_item,
          // {marginRight:index+1 % 3 == 0 ? 0 : px(12) }
        ]}
        activeOpacity={1}
        onPress={() => navigation.navigate('H_BasicInfo', { data, name: data.building_name })}>
        <View style={styles.itemContent} onLayout={(e) => {
          this.setState({ itemHeight: e.nativeEvent.layout.height })
        }}>
          <View style={{ width: px(218), height: px(128) }}>
            <Image style={{ width: px(218), height: px(128), borderRadius: px(10) }} source={require('../../../assets/images/panda.jpg')} />
          </View>
          <View style={{ marginTop: px(20) }}>
            <Text style={{ color: '#333333', fontWeight: "bold", fontSize: px(24), fontFamily: 'PingFang-SC-Medium' }}>{data.building_type}{data.building_area}㎡</Text>
            <Text style={{ color: '#ea4c4c', fontSize: px(26), fontWeight: "bold", }}>58600 元/㎡</Text>
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
    const { data } = this.props
    return (
      <View style={{ paddingTop: px(40), }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', backgroundColor: '#FFF' }}>
          <Text style={styles.tit}>{data.item.building_name} </Text>
          {
            data.item.type && data.item.type.length > 6 ?
              <TouchableOpacity
                onPress={() => this.setState({ Expand: !this.state.Expand })}
                activeOpacity={1} style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: '#A8ABB3', fontSize: px(24) }}>{this.state.Expand ? '收回全部' : '展开全部'}</Text>
                <Image style={{ width: px(24), height: px(24) }}
                  source={this.state.Expand ? require('../../../assets/images/fangke_arrow_up.png') : require('../../../assets/images/fangke_arrow_down.png')} />
              </TouchableOpacity>
              : null
          }

        </View>
        <View
          style={[{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', },
          this.state.Expand ? null : { height: this.state.itemHeight }]}>
          {
            data.item.type ? data.item.type.map((item, index) => {
              return (
                this._renderItem_H(item, index)
              )
            }) : null
          }
        </View>
      </View>
    )
  }
}

class HousetypePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      user_id:'',
      account_id:''
    };
  }

  async componentDidMount() {
    let self = this
    await storage.getBatchData([
      { key: 'userId', syncInBackground: false, autoSync: false, },
      { key: 'accountId', syncInBackground: false, autoSync: false, },
    ]).then(results => {
      self.setState({
        user_id: results[0].user_id,
        account_id: results[1].account_id
      },() => {
        self.getdata()
      })
    }).catch(err => {
      console.log(err)
    })
    
  }

  getdata() {
    Axios({
      url: `http://218.108.34.222:8080/visitor_type`,
      data: {
        account_id: this.state.account_id
      },
      method: 'post'
    }).then(res => {
      console.log(res)
      this.setState({ data: res.data.result.building })
    })
  }
  _renderItem(data) {
    const { navigation } = this.props
    return (
      <RenderItem data={data} navigation={navigation} />
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
    paddingHorizontal: px(30),
    paddingBottom: px(100),
  },
  H_item: {
    // height: px(300),
    // width:px(218),
    // paddingTop: px(30),
    // paddingBottom: px(20),
    // backgroundColor:'red'
    // marginTop:px(30)
  },
  itemContent: {
    paddingBottom: px(30),
    paddingTop: px(30),
  },
  Text: {
    color: '#fff'
  },
  tit: {
    color: '#303133',
    fontSize: px(28),
    fontWeight: 'bold',
    fontFamily: 'PingFang-SC-Bold',
  }
})
export default withNavigation(HousetypePage);
