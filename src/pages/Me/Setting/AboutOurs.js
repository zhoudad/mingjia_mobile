import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import px from '../../../utils/px'

export default class AboutOurs extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <View style={styles.headerImg}>
          <Image />
        </View>
        <Text style={{ color: '#303133', fontSize: px(34), fontWeight: 'bold', marginTop: px(40) }}>明家</Text>
        <Text style={{ color: '#999999', fontSize: px(26), marginTop: px(20) }}>推荐扫一扫，让我们房子更透明</Text>
        <View style={styles.description}>
          <Text style={{ lineHeight: px(48), color: '#999999', fontSize: px(26) }}>
            文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描
            文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述
            </Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  headerImg: {
    width: px(128),
    height: px(128),
    borderRadius: px(64),
    elevation: 2,
    marginTop: px(97),
  },
  description: {
    width: px(500),
    height: px(500),
    borderRadius: px(20),
    paddingHorizontal: px(68),
    paddingTop: px(68),
    paddingBottom: px(79),
    elevation: 2,
    marginTop:px(50)
  }
}) 