import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import px from '../utils/px';

export default class computeSelect extends Component {
    static propTypes = {
        data: PropTypes.object,
    }
    static defaultProps={
        data:['1','3','3','3','3']
    }
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  _renderItem(txt){
      return(
        <TouchableOpacity activeOpacity={1}>
            <Text>数据</Text>
        </TouchableOpacity>
      )
  }
  _renderGroup(arr){
    return (
        <ScrollView>
            {/* {this.props} */}
        </ScrollView>
    )
  }
  render() {
    return (
      <View style={styles.computeSelect}>
          <View>
              <Text style={{color:'#333333'}}>标题</Text>
          </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
    computeSelect:{
        paddingHorizontal:px(30),
        paddingVertical:px(40),
        backgroundColor:'#fff',
        borderTopRightRadius:px(10),
        borderTopLeftRadius:px(10)
    }
})