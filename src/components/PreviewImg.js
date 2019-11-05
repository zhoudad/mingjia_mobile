import React, { Component } from 'react';
import { View, Text, Image, Dimensions, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import px from '../utils/px'
const { deviceWidth, deviceHeight } = Dimensions.get('window');

export default class PreviewImg extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  static propTypes = {
   imgArr:[]
};
static defaultProps = {
  imgArr:[]
};

  _renderImage() {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onLongPress={() => { console.log('长按') }}
        style={styles.imageItem}>
        <Image
          style={{ width: px(218), height: px(128), borderRadius: px(10), marginBottom: px(20) }}
          source={require('../../../assets/images/panda.jpg')}
        />
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View>
        <Text> PreviewImg </Text>
      </View>
    );
  }
}
