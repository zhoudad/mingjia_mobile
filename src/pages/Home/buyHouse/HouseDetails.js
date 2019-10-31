import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import px from '../../../utils/px'

export default class HouseDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    let {data} = this.props.navigation.state.params
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.issueTit}>
          <Text style={{ fontSize: px(32), color: '#333333', fontWeight: 'bold' }}>{data.know_problem}</Text>
        </View>
        <ScrollView contentContainerStyle={{ paddingHorizontal: px(30), paddingVertical: px(37) }}>
          <Text style={{ fontSize: px(28), color: '#606266' }}>{data.know_answer}</Text>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  issueTit: {
    marginHorizontal: px(30),
    height: px(100),
    justifyContent: 'center',
    paddingTop: px(40),
    paddingBottom: px(30),
    borderBottomColor: '#E6E9F0',
    borderBottomWidth: px(1),
  },
})
