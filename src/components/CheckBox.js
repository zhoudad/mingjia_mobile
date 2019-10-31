import React, { Component } from 'react';
import { View, Text, TouchableHighlight, StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';
import px from '../utils/px'

export default class CheckBox extends Component {
  static defaultProps = {
    checked: false
  };
  static PropTypes = {
    checked: PropTypes.bool,
    onChange: PropTypes.func
  };
  constructor(props) {
    super(props);
    this.state = {
      checked: props.checked,
    };
  }
  // componentWillReceiveProps(nextProps) {
  //   this.setState({
  //     checked: nextProps.checked
  //   });
  // }
  onChange(checked) {
    this.setState({ checked });
  }
  toggle() {
    this.setState({ checked: !this.state.checked });
    this.props.onChange(this.state.checked);
  }
  render() {
    var source = require("../assets/images/common_select_n.png");
    if (this.state.checked) {
      source = require("../assets/images/common_select_s.png");
    }
    var container = (
      <View style={styles.container}>
        <Image
          style={{ width: px(56), height: px(56), }}
          source={source} />
      </View>
    );
    return (
      <TouchableHighlight ref="checkbox" onPress={() => this.toggle()} underlayColor='white'>
        {container}
      </TouchableHighlight>
    )
  }

}
const styles = StyleSheet.create({
  container: {
    width: px(56),
    height: px(56)
  }
})
