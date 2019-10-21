import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Dimensions
} from 'react-native';
import configAppNavigator from './rootStack';
import { refreshToken } from './utils/request';

const height = Dimensions.get('window').height;
const paddingTop = StatusBar.currentHeight;

class App extends Component {
  state = {
    checkedLogin: false
  }
  componentDidMount() {
    const self = this;
    console.log(self.checkedLogin)
    refreshToken()
      .then(() => self.setState({ checkedLogin: true, isLoggedIn: true }))
      .catch(err => {
        console.log(err);
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
    const AppNavigator = configAppNavigator(true);
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
    flex:1
  }
});

export default App;