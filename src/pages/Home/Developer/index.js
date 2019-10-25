import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, Image, ScrollView } from 'react-native';
import px from '../../../utils/px'

export default class Developer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={{ flex: 1, }}>
        <ScrollView style={{ flex: 1, paddingHorizontal: px(30) }} showsVerticalScrollIndicator={false}>
          <Text style={{ fontSize: px(28), color: '#606266', marginVertical: px(40), lineHeight: px(40) }}>
            When the sun reached the 165th degree of the Yellow Sutra, it was the White dew solar term and was handed over on September 07-09 of the Gregorian calendar.
            Even if the White dew is really autumn, white dew basically ended the hot heat of the summer day.
            The White dew season, the sky is high, the air is cool, the temperature difference between the morning and evening is large, the night will feel cool, obviously feel that the cool autumn has come
          </Text>
          <Image
            style={{ width: px(690), height: px(388), borderRadius: px(10), borderRadius: px(10) }}
            source={require('../../../assets/images/panda.jpg')}></Image>
          <Text style={{ fontSize: px(28), color: '#606266', marginVertical: px(40), lineHeight: px(40) }}>
            When the sun reached the 165th degree of the Yellow Sutra, it was the White dew solar term and was handed over on September 07-09 of the Gregorian calendar.
            Even if the White dew is really autumn, white dew basically ended the hot heat of the summer day.
            The White dew season, the sky is high, the air is cool, the temperature difference between the morning and evening is large, the night will feel cool, obviously feel that the cool autumn has come
          </Text>
          <Image
            style={{ width: px(690), height: px(388), borderRadius: px(10), borderRadius: px(10) }}
            source={require('../../../assets/images/panda.jpg')}></Image>
          <Text style={{ fontSize: px(28), color: '#606266', marginVertical: px(40), lineHeight: px(40) }}>
            When the sun reached the 165th degree of the Yellow Sutra, it was the White dew solar term and was handed over on September 07-09 of the Gregorian calendar.
            Even if the White dew is really autumn, white dew basically ended the hot heat of the summer day.
            The White dew season, the sky is high, the air is cool, the temperature difference between the morning and evening is large, the night will feel cool, obviously feel that the cool autumn has come
          </Text>
          <Image
            style={{ width: px(690), height: px(388), borderRadius: px(10), borderRadius: px(10) }}
            source={require('../../../assets/images/panda.jpg')}></Image>
        </ScrollView>
        <View style={{ height: px(100), flexDirection: 'row' }}>
          <TouchableOpacity activeOpacity={1} style={{ backgroundColor: '#EFFFCC', flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            <Text style={{ color: '#303133', fontSize: px(28) }}>进入碧桂园农业</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} style={{ backgroundColor: '#FFF1D3', flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            <Text style={{ color: '#303133', fontSize: px(28) }}>进入碧桂园酒店</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
