import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableHighlight } from 'react-native';
import px from '../../../utils/px'
import ReviewItem from './ReviewItem'
import { BoxShadow } from 'react-native-shadow'
import axios from 'axios'

export default class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      ReviewArr:[]
    };
  }

  componentDidMount(){
    this.getdata()
  }
  getdata(){
    axios({
      url:`http://218.108.34.222:8080/remark?account_id=${2}`,
    }).then(res => {
      console.log(res)
      this.setState({
        ReviewArr:res.data.result
      })
    })
  }
  _renderItem(data){
    return(
      <ReviewItem data={data.item}/>
    )
  }
  PublishCom = () => {
    const shadowDec = {
      height: px(100),
      width: '100%',
      color: "#000000",
      border: px(15),
      radius: px(0),
      opacity: 0.2,
      x: 0,
      y: 0,
      style: { position: 'absolute', left: 0, bottom: 0, }
    }
   
    return (
      // <BoxShadow setting={shadowDec}>
        <View style={styles.Publish}>
          <TextInput
            placeholder={'请输入你的回复'}
            ref={'PublishInput'}
            style={styles.PublishInput}
            onChangeText={(text) => this.CommentCont(text)}
          ></TextInput>
          <TouchableHighlight
            // onPress={() => this.PublishComment()}
            style={{ width: px(200), height: px(100), backgroundColor: '#EA4C4C', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ lineHeight: px(46), color: '#FFFFFF', fontSize: px(32), }}>发表评论</Text>
          </TouchableHighlight>
        </View>
      // </BoxShadow>
    )
  }
  render() {
    return (
      <View style={{ flex: 1, paddingBottom: px(100) }}>
        {/* <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ flex: 1, backgroundColor: '#F2F4F7', marginTop: px(30), }}>
          <ReviewItem />
          <ReviewItem />
          <ReviewItem />
          <ReviewItem />
          <ReviewItem />
        </ScrollView> */}
        <FlatList
        style={{ flex: 1, backgroundColor: '#F2F4F7', marginTop: px(30), }}
          showsVerticalScrollIndicator={false}
          data={this.state.ReviewArr}
          renderItem={(data) => this._renderItem(data)}
        />
        {this.PublishCom()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Publish: {
    height: px(100),
    width: '100%',
    backgroundColor: '#FFF',
    // alignItems: 'center',
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
