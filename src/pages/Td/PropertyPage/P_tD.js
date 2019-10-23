import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { WebView } from 'react-native-webview';

export default class P_tD extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <WebView
          source={{ uri: 'http://192.168.31.83/' }}
          style={{ }}
        />
      </View>
    );
  }
}
