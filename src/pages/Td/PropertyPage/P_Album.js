import React, { Component } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, } from 'react-native';
import px from '../../../utils/px'

export default class Album extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  //   _renderImage(){
  //       return (
  //           <
  //       )
  //   }
  render() {
    return (
      <ScrollView contentContainerStyle={{backgroundColor: '#F2F4F7'}}>
        <View style={{ paddingHorizontal: px(30), backgroundColor:'#FFF'}}>
          <Text style={styles.tit}>楼盘图</Text>
          <View style={{ flexDirection: 'row',flexWrap:'wrap',justifyContent:'space-between' }}>
            <Image 
              style={{width:px(218),height:px(128),borderRadius:px(10),marginBottom:px(20)}}
              source={require('../../../assets/images/panda.jpg')}
            />
            <Image 
              style={{width:px(218),height:px(128),borderRadius:px(10),marginBottom:px(20)}}
              source={require('../../../assets/images/panda.jpg')}
            />
            <Image 
              style={{width:px(218),height:px(128),borderRadius:px(10),marginBottom:px(20)}}
              source={require('../../../assets/images/panda.jpg')}
            />
            <Image 
              style={{width:px(218),height:px(128),borderRadius:px(10),marginBottom:px(20)}}
              source={require('../../../assets/images/panda.jpg')}
            />
          </View>
        </View>
        <View style={{ paddingHorizontal: px(30), backgroundColor:'#FFF',marginTop:px(20)}}>
          <Text style={styles.tit}>3室2厅2卫  89m²朝南  在售</Text>
          <View style={{ flexDirection: 'row',flexWrap:'wrap',justifyContent:'space-between' }}>
            <Image 
              style={{width:px(218),height:px(128),borderRadius:px(10),marginBottom:px(20)}}
              source={require('../../../assets/images/panda.jpg')}
            />
            <Image 
              style={{width:px(218),height:px(128),borderRadius:px(10),marginBottom:px(20)}}
              source={require('../../../assets/images/panda.jpg')}
            />
            <Image 
              style={{width:px(218),height:px(128),borderRadius:px(10),marginBottom:px(20)}}
              source={require('../../../assets/images/panda.jpg')}
            />
            <Image 
              style={{width:px(218),height:px(128),borderRadius:px(10),marginBottom:px(20)}}
              source={require('../../../assets/images/panda.jpg')}
            />
          </View>
        </View>
        <View style={{ paddingHorizontal: px(30), backgroundColor:'#FFF',marginTop:px(20)}}>
          <Text style={styles.tit}>4室2厅2卫  144m²朝南  在售</Text>
          <View style={{ flexDirection: 'row',flexWrap:'wrap',justifyContent:'space-between' }}>
            <Image 
              style={{width:px(218),height:px(128),borderRadius:px(10),marginBottom:px(20)}}
              source={require('../../../assets/images/panda.jpg')}
            />
            <Image 
              style={{width:px(218),height:px(128),borderRadius:px(10),marginBottom:px(20)}}
              source={require('../../../assets/images/panda.jpg')}
            />
            <Image 
              style={{width:px(218),height:px(128),borderRadius:px(10),marginBottom:px(20)}}
              source={require('../../../assets/images/panda.jpg')}
            />
            <Image 
              style={{width:px(218),height:px(128),borderRadius:px(10),marginBottom:px(20)}}
              source={require('../../../assets/images/panda.jpg')}
            />
          </View>
        </View>
        <View style={{ paddingHorizontal: px(30), backgroundColor:'#FFF',marginTop:px(20)}}>
          <Text style={styles.tit}>周边图 </Text>
          <View style={{ flexDirection: 'row',flexWrap:'wrap',justifyContent:'space-between' }}>
            <Image 
              style={{width:px(218),height:px(128),borderRadius:px(10),marginBottom:px(20)}}
              source={require('../../../assets/images/panda.jpg')}
            />
            <Image 
              style={{width:px(218),height:px(128),borderRadius:px(10),marginBottom:px(20)}}
              source={require('../../../assets/images/panda.jpg')}
            />
            <Image 
              style={{width:px(218),height:px(128),borderRadius:px(10),marginBottom:px(20)}}
              source={require('../../../assets/images/panda.jpg')}
            />
            <Image 
              style={{width:px(218),height:px(128),borderRadius:px(10),marginBottom:px(20)}}
              source={require('../../../assets/images/panda.jpg')}
            />
          </View>
        </View>
        <View style={{ paddingHorizontal: px(30), backgroundColor:'#FFF',marginTop:px(20)}}>
          <Text style={styles.tit}>楼盘证件照</Text>
          <View style={{ flexDirection: 'row',flexWrap:'wrap',justifyContent:'space-between' }}>
            <Image 
              style={{width:px(218),height:px(128),borderRadius:px(10),marginBottom:px(20)}}
              source={require('../../../assets/images/panda.jpg')}
            />
            <Image 
              style={{width:px(218),height:px(128),borderRadius:px(10),marginBottom:px(20)}}
              source={require('../../../assets/images/panda.jpg')}
            />
            <Image 
              style={{width:px(218),height:px(128),borderRadius:px(10),marginBottom:px(20)}}
              source={require('../../../assets/images/panda.jpg')}
            />
            <Image 
              style={{width:px(218),height:px(128),borderRadius:px(10),marginBottom:px(20)}}
              source={require('../../../assets/images/panda.jpg')}
            />
          </View>
        </View>
        <View style={{ paddingHorizontal: px(30), backgroundColor:'#FFF',marginTop:px(20)}}>
          <Text style={styles.tit}>现场图</Text>
          <View style={{ flexDirection: 'row',flexWrap:'wrap',justifyContent:'space-between' }}>
            <Image 
              style={{width:px(218),height:px(128),borderRadius:px(10),marginBottom:px(20)}}
              source={require('../../../assets/images/panda.jpg')}
            />
            <Image 
              style={{width:px(218),height:px(128),borderRadius:px(10),marginBottom:px(20)}}
              source={require('../../../assets/images/panda.jpg')}
            />
            <Image 
              style={{width:px(218),height:px(128),borderRadius:px(10),marginBottom:px(20)}}
              source={require('../../../assets/images/panda.jpg')}
            />
            <Image 
              style={{width:px(218),height:px(128),borderRadius:px(10),marginBottom:px(20)}}
              source={require('../../../assets/images/panda.jpg')}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  tit: {
    color: '#303133',
    fontSize: px(28),
    fontWeight: 'bold',
    marginVertical: px(30)
  }
})