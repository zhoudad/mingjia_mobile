import React, { Component } from 'react';
import {
  View, Text, FlatList, StyleSheet, TextInput, TouchableHighlight, Image, ScrollView,
  TouchableOpacity
} from 'react-native';
import px from '../../../utils/px'
import ReviewItem from './ReviewItem'
import { BoxShadow } from 'react-native-shadow'
import axios from 'axios'
import ImagePicker from 'react-native-image-crop-picker';

export default class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      ReviewArr: [],
      images: []
    };
  }

  componentDidMount() {
    this.getdata()
  }
  getdata() {
    axios({
      url: `http://218.108.34.222:8080/remark?account_id=${2}`,
    }).then(res => {
      console.log(res)
      this.setState({
        ReviewArr: res.data.result
      })
    })
  }

  _renderItem(data) {
    return (
      <ReviewItem data={data.item} />
    )
  }
  pickSingle(cropit, circular = false) {//选择，展示图片
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: cropit,
      cropperCircleOverlay: circular,
      compressImageMaxWidth: 640,
      compressImageMaxHeight: 480,
      compressImageQuality: 0.5,
      //   compressVideoPreset: 'MediumQuality',
      includeExif: true,
    }).then(image => {
      console.log(image.path);
      let images = this.state.images
      images.push({
        path: image.path,
        width: image.width,
        height: image.height,
        mime: image.mime
      })
      this.setState({ images });
    }).catch(e => {
      // console.log(e);
      // Alert.alert(e.message ? e.message : e);
    });
  }
  closeImg(index) {
    let newImages = this.state.images
    newImages.splice(index, 1)
    this.setState({
      images: newImages
    })
  }
  PublishData(){
    let {images} = this.state
    let nameArr=['com_ffile','com_cfile','com_lfile']
    let formData = new FormData();
    for (var i = 0; i < images.length; i++) {
      let ary = images[i].path.split('/');
      let file = { uri: images[i].path, type: 'multipart/form-data', name: ary[ary.length - 1] };
      formData.append(nameArr[i], file);
    }
    formData.append("content", this.state.commentTxt);
    formData.append("user_id", 2);
    axios({
      method: 'post',
      url:'http://218.108.34.222:8080/remark_do',
      data: formData
    }).then(res => {
      console.log(res)
      this.setState({
        images:[],
        commentTxt:''
      })
      this.refs.PublishInput.clear();
    })
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
          multiline={true}
          onChangeText={(text) => this.setState({ text })}
        ></TextInput>
        <View style={{ width: px(100), marginRight: px(15), justifyContent: 'center' }}>
          <ScrollView
            showsVerticalScrollIndicator={false}>
            {
              this.state.images.map((item, index) => {
                if (item.path) {
                  return (
                    <View style={{ width: px(100), height: px(100), borderRadius: px(10),marginBottom: px(10), }} key={index}>
                      <Image style={{ width: px(100), height: px(100), borderRadius: px(10), }} source={{ uri: item.path }} />
                      <TouchableOpacity
                        onPress={() => this.closeImg(index)}
                        activeOpacity={1}
                        style={styles.imgDel}>
                        <View style={{ width: px(18), height: px(18), backgroundColor: '#EA4C4C', borderRadius: px(9) }}>
                          <View style={{ width: px(14), height: px(2), backgroundColor: '#FFF', transform: [{ rotateZ: '45deg' }], position: 'absolute', left: '50%', top: '50%', marginTop: px(-1), marginLeft: px(-7) }}></View>
                          <View style={{ width: px(2), height: px(14), backgroundColor: '#FFF', transform: [{ rotateZ: '45deg' }], position: 'absolute', left: '50%', top: '50%', marginTop: px(-7), marginLeft: px(-1) }}></View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  )
                } else {
                  return null
                }
              })
            }
          </ScrollView>
        </View>
        {
          this.state.images.length > 2 ? null :
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => this.pickSingle(false)}
            >
              <Image style={{ width: px(100), height: px(100), borderRadius: px(10), marginRight: px(10) }} source={require('../../../assets/images/comment_add.png')} />
            </TouchableOpacity>
        }
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => this.PublishData()}
          style={{ width: px(150), height: px(100), backgroundColor: '#EA4C4C', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ lineHeight: px(46), color: '#FFFFFF', fontSize: px(32), }}>发表</Text>
        </TouchableOpacity>
      </View>
      // </BoxShadow>
    )
  }
  render() {
    return (
      <View style={{ flex: 1, paddingBottom: px(100) }}>
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
    // justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    bottom: 0,
    elevation:1
  },
  PublishInput: {
    padding: 0,
    flex: 1,
    paddingStart: px(30),
    backgroundColor: '#FFF',
  },
  imgDel: {
    width: px(22),
    height: px(22),
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    borderRadius: px(11),
    right: 0,
    marginTop: 0
  }
})
