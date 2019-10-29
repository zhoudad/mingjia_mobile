import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import px from '../../../utils/px'
import { BoxShadow } from 'react-native-shadow'

export default class AboutOurs extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const shadowImg = {
      height: px(128),
      width: px(128),
      color: "#DCDCDC",
      border: px(29),
      radius: px(6),
      opacity: 0.1,
      x: -px(2),
      y: px(22),
      style: { marginTop: px(97), }
    }
    const shadowDec = {
      height: px(1200),
      width: px(500),
      color: "#DCDCDC",
      border: px(51),
      radius: px(19),
      opacity: 0.2,
      x: -px(1),
      y: px(17),
      style: { marginTop: px(50) }
    }
    return (
      <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
        <BoxShadow setting={shadowImg}>
          <View style={styles.headerImg}>
            <Image
              source={{ uri: 'http://img3.duitang.com/uploads/item/201507/23/20150723115018_ma428.thumb.700_0.jpeg' }}
              style={{ width: px(128), height: px(128), borderRadius: px(64), }} />
          </View>
        </BoxShadow>
        <Text style={{ color: '#303133', fontSize: px(34), fontWeight: 'bold', marginTop: px(40) }}>明家</Text>
        <Text style={{ color: '#999999', fontSize: px(26), marginTop: px(20) }}>推荐扫一扫，让我们房子更透明</Text>
        <BoxShadow setting={shadowDec}>
          <View style={styles.description}>
            <Text style={{ lineHeight: px(48), color: '#999999', fontSize: px(26) }}>
              明家是基于浙江永拓信息科技有限公司自主研发的场景可视化（SVE）编辑工具开发的房屋信息平台，
              立志通过SVE工具升级把传统建筑图快速生成3D户型图和管线分布图外，在可视化三维场景中查看房屋各类信息、房产证信息、
              土地使用信息、权利人情况、房屋所有权情况、建设单位信息、开发商信息、物业信息，管线、插座、防水、配送设备等各类建筑结构信息外，
              您还可以拖拽沙发、电视，测量，移除非承重墙改造房屋结构等操作来可视化编辑您的房屋，并在后期为各类用户提供针对性的需求。
            </Text>
          </View>
        </BoxShadow>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  headerImg: {
    width: px(128),
    height: px(128),
    borderRadius: px(64),
    // elevation: 2,
    // marginTop: px(97),
  },
  description: {
    width: px(500),
    // height: px(500),
    borderRadius: px(20),
    paddingHorizontal: px(68),
    paddingTop: px(68),
    paddingBottom: px(79),
    backgroundColor: '#FFF'

  }
}) 