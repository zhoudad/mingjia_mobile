import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity,Image } from 'react-native';
import TipicTag from '../../../components/TipicTag'
import px from '../../../utils/px'
import Communications from 'react-native-communications';

export default class DetailsInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={{flex:1}}>

        <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ backgroundColor: '#F2F4F7',paddingBottom:px(100),marginBottom:px(20)}}>
          <View style={{ paddingVertical: px(15),backgroundColor:'#FFF',marginBottom:px(20),paddingHorizontal:px(30)}}>
            <Text style={styles.tit}>新城府</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent:'space-between' }}>
              <TipicTag text={"在售"} newStyle={{borderRadius:px(5),marginVertical: px(15),}}/>
              <TipicTag text={"住宅"} newStyle={{borderRadius:px(5),marginVertical: px(15),}}/>
              <TipicTag text={"项目在建"} newStyle={{borderRadius:px(5),marginVertical: px(15),}}/>
              <TipicTag text={"装修交付"} newStyle={{borderRadius:px(5),marginVertical: px(15),}}/>
              <TipicTag text={"大型社交"} newStyle={{borderRadius:px(5),marginVertical: px(15),}}/>
              <TipicTag text={"复式"} newStyle={{borderRadius:px(5),marginVertical: px(15),}}/>
              <TipicTag text={"小户型"} newStyle={{borderRadius:px(5),marginVertical: px(15),}}/>
            </View>
          </View>
          <View style={{paddingHorizontal:px(30),backgroundColor:'#FFF',marginBottom:px(20)}}>
            <Text style={styles.tit}>基本信息</Text>
            <Text style={{color:'#606266',fontSize:px(24),lineHeight:px(50),marginTop:px(15)}}>
              <Text>别名：资融创新府城</Text>{'\n'}
              <Text>状态：在售</Text>{'\n'}
              <Text>最新开盘：2019-09-10</Text>{'\n'}
              <Text>交房时间：预计2020年中旬交付 </Text>{'\n'}
              <Text>参考价：28800元/m</Text>{'\n'}
              <Text>在售户型：2室型</Text>{'\n'}
              <Text>楼盘地址：广东省 广州市 天河区 棠下街道乐天大厦</Text>{'\n'}
              <Text>售楼地址：广东省 广州市 天河区 棠下街道乐天大厦</Text>{'\n'}
            </Text>
          </View>
          <View style={{paddingHorizontal:px(30),backgroundColor:'#FFF',marginBottom:px(20)}}>
            <Text style={styles.tit}>小区概况</Text>
            <Text style={{color:'#606266',fontSize:px(24),lineHeight:px(50),marginTop:px(15)}}>
              <Text>建筑类型：住宅</Text>{'\n'}
              <Text>产权年限：70年</Text>{'\n'}
              <Text>装修标准：带装修</Text>{'\n'}
              <Text>开发商：碧桂园</Text>{'\n'}
              <Text>投资商：碧桂园</Text>{'\n'}
              <Text>容积率：2.6</Text>{'\n'}
              <Text>绿化率：30%</Text>{'\n'}
              <Text>占地面积：28899㎡</Text>{'\n'}
              <Text>建筑面积：29888㎡</Text>{'\n'}
              <Text>工程进度：在建中</Text>{'\n'}
            </Text>
          </View>
          <View style={{paddingHorizontal:px(30),backgroundColor:'#FFF',marginBottom:px(20)}}>
            <Text style={styles.tit}>物业信息</Text>
            <Text style={{color:'#606266',fontSize:px(24),lineHeight:px(50),marginTop:px(15)}}>
              <Text>物业费：3.2元/平米/月</Text>{'\n'}
              <Text>物业公司：碧桂园</Text>{'\n'}
              <Text>车位数：333位</Text>{'\n'}
              <Text>车位比：1 : 1.3</Text>{'\n'}
            </Text>
          </View>
          <View style={{paddingHorizontal:px(30),backgroundColor:'#FFF',marginBottom:px(40)}}>
            <Text style={styles.tit}>预售许可证</Text>
            <Text style={{color:'#606266',fontSize:px(24),lineHeight:px(50),marginTop:px(15)}}>
              <Text>预售证号：92832363653</Text>{'\n'}
              <Text>发证时间：2019-09-09</Text>{'\n'}
              <Text>绑定楼栋：2-3#</Text>{'\n'}
            </Text>
            <Text style={{color:'#606266',fontSize:px(24),lineHeight:px(50),marginTop:px(15)}}>
              <Text>预售证号：92832363653</Text>{'\n'}
              <Text>发证时间：2019-09-09</Text>{'\n'}
              <Text>绑定楼栋：2-3#</Text>{'\n'}
            </Text>
          </View>
        </ScrollView>
        <View style={{ height: px(100),width:'100%', flexDirection: 'row', position: 'absolute', bottom: 0, left: 0, }}>
          <TouchableOpacity
            activeOpacity={1}
            style={{ backgroundColor: '#FFFFFF',flex:1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Image
              style={{ width: px(44), height: px(44), marginEnd: px(12) }}
              source={this.state.isAttention ? require('../../../assets/images/tabbar_focus_s.png') : require('../../../assets/images/tabbar_focus_n.png')} />
            <Text >关注</Text>
          </TouchableOpacity>
          <TouchableOpacity
          onPress={() => Communications.phonecall('10086', true)}
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

const styles =  StyleSheet.create({
  tit:{
    color:'#303133',
    fontSize:px(32),
    fontWeight:'bold',
    // paddingTop:px(30)
    paddingVertical:px(15)
    
  }
})
