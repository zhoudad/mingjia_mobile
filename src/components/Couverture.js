import React from 'react';
import { Animated, Dimensions, StyleSheet, View } from 'react-native';
import Touchable from './Touchable';

export default function ({ isShow, opacity, onPress, zIndex }) {
  const { height } = Dimensions.get('window');
  if (isShow) {
    return (
      <Touchable
        onPress={onPress}
        activeOpacity={1}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          height,
          zIndex: zIndex || 0,
        }}
      >
        <Animated.View
          style={{ opacity, backgroundColor: 'black', flex: 1 }}
        >
          <View />
        </Animated.View>
      </Touchable>
    );
  }
  return null;
}