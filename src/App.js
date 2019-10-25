import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Dimensions
} from 'react-native';
import configAppNavigator from './rootStack';
import { refreshToken } from './utils/request';
import { storage } from './utils/storage'

const height = Dimensions.get('window').height;
const paddingTop = StatusBar.currentHeight;

class App extends Component {
  state = {
    checkedLogin: false
  }
  componentDidMount() {
    const self = this;
    storage.load({
      key: 'accessToken',
    }).then(() => {
      self.setState({ checkedLogin: true, isLoggedIn: true })
    }).catch(err => {
      self.setState({
        checkedLogin: true,
        isLoggedIn: false
      });
    });
  }
  render() {
    const { checkedLogin, isLoggedIn } = this.state;
    if (!checkedLogin) {
      return null;
    }
    const AppNavigator = configAppNavigator(isLoggedIn);
    return (
      <View style={styles.container}>
        <AppNavigator />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    // height,
    // paddingTop,
    flex: 1
  }
});

export default App;