import React from 'react';
import {
  Animated, Text, View, StyleSheet, Dimensions, Button, ScrollView,TouchableHighlight
} from 'react-native';
import px from '../../../utils/px';

const { width, height } = Dimensions.get('window');
export default class FadeInView extends React.Component {
  state = {
    rotationAnim: new Animated.Value(0),  // 透明度初始值设为0
    fadeIn: false
  }
  openPanel() {
    console.log('openPanel')
    const { rotationAnim } = this.state;
    // rotationAnim.setValue(0);
    Animated.spring(
      rotationAnim,
      {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }
    ).start();
  }
  closePanel() {
    console.log('closePanel')
    const { rotationAnim } = this.state;
    // rotationAnim.setValue(1);
    Animated.spring(
      rotationAnim,
      {
        toValue: 0,
        duration: 300,
        useNativeDriver: true
      }
    ).start();
  };
  renderActivityPanel() {
    const { rotationAnim } = this.state;
    return (
      <Animated.View
        style={[styles.ActivityPanel, {
          transform: [
            {
              translateY: rotationAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, px(450)+px(100)]
              })
            },
          ]
        }]}
      >
        
      </Animated.View>
    )
  }
  render() {


    return (
      <View style={{ flex: 1 }}>
        <View style={{ height: px(100), justifyContent: 'space-around', flexDirection: 'row',position:'absolute',top:0 ,left:0,zIndex:100}}>
          <Button title={'打开'} onPress={() => this.openPanel()} style={{marginBottom:px(20)}}></Button>
          <Button title={'关闭'} onPress={() => this.closePanel()}></Button>
        </View>
        {this.renderActivityPanel()}
        <ScrollView style={{ flex: 1 }}>
          <View style={{ height: px(200), backgroundColor: '#EEE', marginBottom: px(20) }}></View>
          <View style={{ height: px(200), backgroundColor: '#EEE', marginBottom: px(20) }}></View>
          <View style={{ height: px(200), backgroundColor: '#EEE', marginBottom: px(20) }}></View>
          <View style={{ height: px(200), backgroundColor: '#EEE', marginBottom: px(20) }}></View>
          <View style={{ height: px(200), backgroundColor: '#EEE', marginBottom: px(20) }}></View>
          <View style={{ height: px(200), backgroundColor: '#EEE', marginBottom: px(20) }}></View>
          <View style={{ height: px(200), backgroundColor: '#EEE', marginBottom: px(20) }}></View>
          <View style={{ height: px(200), backgroundColor: '#EEE', marginBottom: px(20) }}></View>
          <View style={{ height: px(200), backgroundColor: '#EEE', marginBottom: px(20) }}></View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  ActivityPanel: {
    height: px(450),
    position: 'absolute',
    width,
    backgroundColor: 'green',
    left: 0,
    top: -px(450),
    zIndex: px(99)
  }
})