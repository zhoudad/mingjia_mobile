import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableHighlight } from 'react-native';
import px from '../../../utils/px'
import ReviewItem from './ReviewItem'

export default class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  PublishCom = () => {
    // if (this.state.focus) {
    return (
      <View style={styles.Publish}>
        <TextInput
          placeholder={'请输入你的回复'}
          ref={'PublishInput'}
          style={styles.PublishInput}
        // onChangeText={(text) => this.CommentCont(text)}
        // onEndEditing={() => this.setState({ focus: false })}
        ></TextInput>
        <TouchableHighlight
          // onPress={() => this.PublishComment()}
          style={{ width: px(200), height: px(100), backgroundColor: '#EA4C4C', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ lineHeight: px(46), color: '#FFFFFF', fontSize: px(32), }}>发表评论</Text>
        </TouchableHighlight>
      </View>
    )
    // } else {
    //   return null
    // }
  }
  render() {
    return (
      <View style={{ flex: 1 ,paddingBottom: px(120)}}>
        <ScrollView style={{ flex: 1, backgroundColor: '#F2F4F7', marginTop: px(30),  }}>
          <ReviewItem />
          <ReviewItem />
          <ReviewItem />
          <ReviewItem />
          <ReviewItem />
        </ScrollView>
        {this.PublishCom()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Publish: {
    height: px(100),
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    left: 0,
    bottom: 0,
  },
  PublishInput: {
    padding: 0,
    flex: 1,
    backgroundColor: '#F2F4F7',
    paddingStart: px(30),
    backgroundColor: '#FFF'
  }
})
