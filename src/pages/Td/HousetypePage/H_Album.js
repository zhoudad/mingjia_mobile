import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import px from '../../../utils/px'

export default class H_Album extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={{ paddingHorizontal: px(30), backgroundColor: '#FFF' }}>
        <Text style={{ color: '#303133', fontSize: px(28),  fontWeight: 'bold', marginVertical: px(30)}}>楼盘图</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <Image
            style={{ width: px(218), height: px(128), borderRadius: px(10), marginBottom: px(20) }}
            source={require('../../../assets/images/panda.jpg')}
          />
          <Image
            style={{ width: px(218), height: px(128), borderRadius: px(10), marginBottom: px(20) }}
            source={require('../../../assets/images/panda.jpg')}
          />
          <Image
            style={{ width: px(218), height: px(128), borderRadius: px(10), marginBottom: px(20) }}
            source={require('../../../assets/images/panda.jpg')}
          />
          <Image
            style={{ width: px(218), height: px(128), borderRadius: px(10), marginBottom: px(20) }}
            source={require('../../../assets/images/panda.jpg')}
          />
        </View>
      </View>
    );
  }
}
