import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import TipicTag from '../../../components/TipicTag'
import px from '../../../utils/px'
import Communications from 'react-native-communications';
import Axios from 'axios';
import { storage } from '../../../utils/storage'

export default class DetailsInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:{},
      isAttention:false,
      account_id:'',
      user_id:''
    };
  }

  componentDidMount(){
    this.setState({
      isAttention:this.props.navigation.state.params.isAttention
    })
    storage.getBatchData([
      { key: 'userId', syncInBackground: false, autoSync: false, },
      { key: 'accountId', syncInBackground: false, autoSync: false, },
    ]).then(results => {
      self.setState({
        user_id: results[0].user_id,
        account_id: results[1].account_id
      })
    }).catch(err => {
      console.log(err)
    })
    this.getdata()
  }
  getdata(){
    const id = this.props.navigation.state.params.id
    Axios({
      method:'post',
      url:`http://192.168.10.79:8080/visitor_once`,
      data:{
        houses_id:id
      }
    }).then(res => {
      console.log(res)
      this.setState({data:res.data.result['0']})
    })
  }
  addAttention() {
    const id = this.props.navigation.state.params.id
    this.setState({ isAttention: !this.state.isAttention }, () => {
      if (this.state.isAttention) {
        axios({
          method: 'post',
          url: `http://218.108.34.222:8080/attention`,
          data: {
            account_id: this.state.account_id,
            user_id: this.state.user_id,
            houses_id: id
          }
        }).then(res => {
          console.log(res)
        }).catch(err => {
          this.setState({ isAttention: false })
        })
      } else {
        axios({
          method: 'post',
          url: `http://218.108.34.222:8080/clear_attention`,
          data: {
            account_id: this.state.account_id,
            user_id: this.state.user_id,
            houses_id: id
          }
        })
      }
    })

  }

  render() {
    const {data} = this.state
    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ backgroundColor: '#F2F4F7', paddingBottom: px(100), marginBottom: px(20) }}>
          <View style={{ paddingVertical: px(15), backgroundColor: '#FFF', marginBottom: px(20), paddingHorizontal: px(30) }}>
            <Text style={styles.tit}>{data.houses_name}</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
              <TipicTag text={"在售"} newStyle={{ borderRadius: px(5), marginVertical: px(15), }} />
              <TipicTag text={"住宅"} newStyle={{ borderRadius: px(5), marginVertical: px(15), }} />
              <TipicTag text={"项目在建"} newStyle={{ borderRadius: px(5), marginVertical: px(15), }} />
              <TipicTag text={"装修交付"} newStyle={{ borderRadius: px(5), marginVertical: px(15), }} />
              <TipicTag text={"大型社交"} newStyle={{ borderRadius: px(5), marginVertical: px(15), }} />
              <TipicTag text={"复式"} newStyle={{ borderRadius: px(5), marginVertical: px(15), }} />
              <TipicTag text={"小户型"} newStyle={{ borderRadius: px(5), marginVertical: px(15), }} />
            </View>
          </View>
          <View style={{ paddingHorizontal: px(30), backgroundColor: '#FFF', marginBottom: px(20) }}>
            <Text style={styles.tit}>基本信息</Text>
            <Text style={{ color: '#606266', fontSize: px(24), lineHeight: px(50), marginTop: px(15) }}>
              <Text>别名：{data.houses_alias}</Text>{'\n'}
              <Text>状态：{data.houses_status == 0 ? '在售' : data.houses_status == 1 ? '待售' : '售罄'}</Text>{'\n'}
              <Text>最新开盘：{data.houses_new}</Text>{'\n'}
              <Text>交房时间：{data.houses_jtime} </Text>{'\n'}
              <Text>参考价：{data.houses_price}元/m</Text>{'\n'}
              <Text>在售户型：{data.houses_type}</Text>{'\n'}
              <Text>楼盘地址：{data.houses_lsite}</Text>{'\n'}
              <Text>售楼地址：{data.houses_sell}</Text>{'\n'}
            </Text>
          </View>
          <View style={{ paddingHorizontal: px(30), backgroundColor: '#FFF', marginBottom: px(20) }}>
            <Text style={styles.tit}>小区概况</Text>
            <Text style={{ color: '#606266', fontSize: px(24), lineHeight: px(50), marginTop: px(15) }}>
              <Text>建筑类型：{data.survey_type}</Text>{'\n'}
              <Text>产权年限：{data.survey_equity}</Text>{'\n'}
              <Text>装修标准：{data.survey_finish == 0 ? '带装修' : '毛胚'}</Text>{'\n'}
              <Text>开发商：{data.survey_dev}</Text>{'\n'}
              <Text>投资商：{data.survey_inv}</Text>{'\n'}
              <Text>容积率：{data.survey_volume}</Text>{'\n'}
              <Text>绿化率：{data.survey_green}</Text>{'\n'}
              <Text>占地面积：{data.survey_hold}㎡</Text>{'\n'}
              <Text>建筑面积：{data.survey_area}㎡</Text>{'\n'}
              <Text>工程进度：{data.survey_plan == 0 ? '在建中' : '已完工'}</Text>{'\n'}
            </Text>
          </View>
          <View style={{ paddingHorizontal: px(30), backgroundColor: '#FFF', marginBottom: px(20) }}>
            <Text style={styles.tit}>物业信息</Text>
            <Text style={{ color: '#606266', fontSize: px(24), lineHeight: px(50), marginTop: px(15) }}>
              <Text>物业费：{data.real_cost}元/平米/月</Text>{'\n'}
              <Text>物业公司：{data.real_firm}</Text>{'\n'}
              <Text>车位数：{data.real_stall}位</Text>{'\n'}
              <Text>车位比：{data.real_car}</Text>{'\n'}
            </Text>
          </View>
          <View style={{ paddingHorizontal: px(30), backgroundColor: '#FFF', marginBottom: px(40) }}>
            <Text style={styles.tit}>预售许可证</Text>
            {
              data.presell ? data.presell.map((item, index) => {
                return (
                  <Text style={{ color: '#606266', fontSize: px(24), lineHeight: px(50), marginTop: px(15) }} key={index}>
                    <Text>预售证号：{item.presell_num}</Text>{'\n'}
                    <Text>发证时间：{item.presell_time}</Text>{'\n'}
                    <Text>绑定楼栋：{item.presell_houses}</Text>{'\n'}
                  </Text>
                )
              }) : null
            }
          </View>
        </ScrollView>
        <View style={{ height: px(100), width: '100%', flexDirection: 'row', position: 'absolute', bottom: 0, left: 0, }}>
          <TouchableOpacity
          onPress={() => this.addAttention()}
            activeOpacity={1}
            style={{ backgroundColor: '#FFFFFF', flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Image
              style={{ width: px(44), height: px(44), marginEnd: px(12) }}
              source={this.state.isAttention ? require('../../../assets/images/tabbar_focus_s.png') : require('../../../assets/images/tabbar_focus_n.png')} />
            <Text >关注</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Communications.phonecall(data.houses_tel, true)}
            activeOpacity={1}
            style={{ backgroundColor: '#EA4C4C', width: px(488), flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Image
              style={{ width: px(44), height: px(44), marginEnd: px(12) }}
              source={require('../../../assets/images/tabbar_phone.png')} />
            <Text style={{ fontSize: px(32), color: '#FFFFFF' }}>电话资讯</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tit: {
    color: '#303133',
    fontSize: px(32),
    fontWeight: 'bold',
    // paddingTop:px(30)
    paddingVertical: px(15)

  }
})
