import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, Animated, Dimensions, Modal, TouchableHighlight, StatusBar } from 'react-native';
import px from '../../../utils/px'
import Couverture from '../../../components/Couverture';
import { BoxShadow } from 'react-native-shadow'
import ActionSheet from 'react-native-general-actionsheet';
import ImagePicker from 'react-native-image-crop-picker';
import { removeTokens } from '../../../utils/storage'
// import {NavigationActions} from 'react-navigation'
import configAppNavigator from '../../../rootStack'
import axios from 'axios'

export default class Info extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0),
      rotationAnim: new Animated.Value(0),
      isShowCouver: false,
      askVisible: false,
      sureVisible: false,
      sex: '选择性别',
      nickname: '周大大',
      uri: 'http://img3.duitang.com/uploads/item/201507/23/20150723115018_ma428.thumb.700_0.jpeg',
      user_id:''
    };
  }
  async componentDidMount() {
    storage.getBatchData([
      { key: 'userId', syncInBackground: false },
    ]).then(results => {
      self.setState({
        user_id: results[0].user_id,
      })
    })
    this.props.navigation.setParams({ isSave: false })
    axios({
      url: 'http://218.108.34.222:8080/datum',
      method: 'post',
      data: { user_id: this.state.user_id }
    }).then(res => {
      // console.log(res)
      this.setState({
        sex: res.data.result.user_sex == 1 ? '男' : '女',
        nickname: res.data.result.user_name,
        // url:res.data.result.user_file
      })
    })
  }

  openPanel = () => {
    const { rotationAnim, fadeAnim } = this.state;
    this.isShowCouver = true;
    console.log(this.isShowCouver)
    rotationAnim.setValue(0);
    Animated.parallel([
      Animated.spring(
        rotationAnim,
        {
          toValue: 1,
          duration: 100,
          useNativeDriver: true
        }
      ),
      Animated.spring(
        fadeAnim,
        {
          toValue: 0.5,
          duration: 100,
          useNativeDriver: true
        }
      )
    ]).start();
  };
  closePanel = () => {
    const { rotationAnim } = this.state;
    this.setState({
      isShowCouver: false
    })
    rotationAnim.setValue(1);
    Animated.spring(
      rotationAnim,
      {
        toValue: 0,
        duration: 300,
        useNativeDriver: true
      }
    ).start();
  };

  uploadImage = (path) => {
    var ary = path.split('/');
    let formData = new FormData();
    let file = { uri: path, type: 'multipart/form-data', name: ary[ary.length - 1] };
    formData.append("user_file", file);
    formData.append("user_id", 2)
    axios({
      url: 'http://218.108.34.222:8080/upd_datum_once',
      method: 'post',
      data: formData
    }).then(res => {
      console.log(res)
    })
  };

  // uploadImage(url, params) {
  //   return new Promise(function (resolve, reject) {
  //     let formData = new FormData();
  //     for (var key in params) {
  //       formData.append(key, params[key]);
  //     }
  //     let file = { uri: params.path, type: 'application/octet-stream', name: 'image.jpg' };
  //     formData.append("file", file);
  //     fetch(common_url + url, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'multipart/form-data;charset=utf-8',
  //       },
  //       body: formData,
  //     }).then((response) => response.json())
  //       .then((responseData) => {
  //         console.log('uploadImage', responseData);
  //         resolve(responseData);
  //       })
  //       .catch((err) => {
  //         console.log('err', err);
  //         reject(err);
  //       });
  //   });
  // }

  openCamera() {
    ImagePicker.openCamera({
      width: 476,
      height: 476,
      cropping: true,
      // multiple:true
    }).then(image => {
      // console.log(image)
      let user_file = image.path;
      let params = {
        user_id:'2',   
        user_file   //本地文件地址
    }
      // this.uploadImage(params)
      this.setState({
        uri: user_file
      });
    }, err => {
      console.log('err= ' + err);
    }).catch(err => {
      console.log('image catch err= ' + err);
    });
  }
  openPicker() {
    ImagePicker.openPicker({
      width: 476,
      height: 476,
      cropping: true,  //是否裁剪
      // multiple:true
    }).then(image => {
      // console.log(image)
      let user_file = image.path;
      this.uploadImage(user_file)
      this.setState({
        uri: user_file
      });
      // this.uploadAvatar(path);
    }, err => {
      console.log('err= ' + err);
    }).catch(err => {
      console.log('image catch err= ' + err);
    });
  }

  loginOut(){
    axios({
      url: 'http://218.108.34.222:8080/logout',
      method: 'post',
      data: {user_id:2}
    }).then(res => {
      console.log(res)
    })
  }

  changeImg() {
    let that = this
    ActionSheet.showActionSheetWithOptions({
      options: [
        '从手机选择',
        '拍照',
        '取消',
      ],
      cancelButtonIndex: 2,
    }, function (index) {
      if (index == 0) {
        that.openPicker()
      } else if (index == 1) {
        that.openCamera()
      }
    })
  }
  selectSex() {
    let that = this
    ActionSheet.showActionSheetWithOptions({
      options: [
        '男',
        '女',
        '取消',
      ],
      cancelButtonIndex: 2,
    }, function (index) {
      if (index == 0) {
        that.setState({ sex: '男' })
      } else if (index == 1) {
        that.setState({ sex: '女' })
      }
      axios({
        url:'http://218.108.34.222:8080/upd_datum_three',
        data:{
          user_id:2,
          user_sex:index == 1 ? 2 : 1
        },
        method:'post'
      }).then(res => {
        console.log(res)
      })
    })
  }
  setName = (data) => {
    this.setState(data)
    axios({
      url:'http://218.108.34.222:8080/upd_datum_two',
      method:'post',
      data:{
        user_id:2,
        user_name:data.nickname
      }
    }).then(res => {
      console.log(res)
    })
  }
  render() {
    const { navigation } = this.props
    const shadowOpt = {
      height: px(90),
      width: px(540),
      color: "#EA4C4C",
      border: px(25),
      radius: px(0),
      opacity: 0.5,
      x: 0,
      y: px(8),
      // style: { borderRadius: 3, }
    }
    return (
      <View style={{ flex: 1, backgroundColor: '#F2F4F7' }}>
        <View style={{ height: px(140), justifyContent: 'space-between', paddingHorizontal: px(30), backgroundColor: '#FFF', flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: '#303133', fontSize: px(28) }}>头像</Text>
          <TouchableOpacity
            onPress={() => this.changeImg()}
            style={{ flexDirection: 'row', alignItems: 'center' }}
            activeOpacity={1}>
            <Image style={{ width: px(80), height: px(80), borderRadius: px(40) }} source={{ uri: this.state.uri }} />
            <Image style={{ width: px(48), height: px(48) }} source={require('../../../assets/images/common_arrow.png')} />
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: px(2), height: px(100), justifyContent: 'space-between', paddingHorizontal: px(30), backgroundColor: '#FFF', flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: '#303133', fontSize: px(28) }}>昵称</Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('NickName', { setName: this.setName, nickname: this.state.nickname })}
            style={{ flexDirection: 'row', alignItems: 'center' }} activeOpacity={1}>
            <Text>{this.state.nickname}</Text>
            <Image style={{ width: px(48), height: px(48) }} source={require('../../../assets/images/common_arrow.png')} />
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: px(2), height: px(100), justifyContent: 'space-between', paddingHorizontal: px(30), backgroundColor: '#FFF', flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: '#303133', fontSize: px(28) }}>性别</Text>
          <TouchableOpacity
            onPress={() => this.selectSex()}
            style={{ flexDirection: 'row', alignItems: 'center' }} activeOpacity={1}>
            <Text>{this.state.sex}</Text>
            <Image style={{ width: px(48), height: px(48) }} source={require('../../../assets/images/common_arrow.png')} />
          </TouchableOpacity>
        </View>
        <View style={{ height: px(90), justifyContent: 'center', flexDirection: 'row', marginTop: px(120) }}>
          {/* <BoxShadow setting={shadowOpt}> */}
          <TouchableOpacity
            onPress={() => this.setState({ askVisible: true })}
            activeOpacity={1}
            style={{ width: px(540), height: px(90), justifyContent: 'center', alignItems: 'center', backgroundColor: '#EA4C4C', borderRadius: px(90) }}>
            <Text style={{ color: '#FFFFFF', fontSize: px(32) }}>注销账号</Text>
          </TouchableOpacity>
          {/* </BoxShadow> */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.askVisible}
            onRequestClose={() => {
              this.setState({ askVisible: false })
            }}
          >
            <View style={{ height: Dimensions.get('window').height, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
              <View style={{ height: px(415), width: px(560), backgroundColor: 'white', borderRadius: px(10) }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: px(333), paddingHorizontal: px(60), borderBottomColor: '#E6E6E6', borderBottomWidth: px(2) }}>
                  <Text style={{ color: '#333333', fontSize: px(26), lineHeight: px(44) }}>
                    提示：注销账号，您的历史数据包括您的个人资料、浏览记录、您的关注、联系记录、
                    消息通知、您保存的和您下载的均将消失。请谨慎操作！
                  </Text>
                </View>
                <View style={{ height: px(80), justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => this.setState({ askVisible: false })}
                    style={{ height: px(80), justifyContent: 'center', alignItems: 'center', flex: 1 }}
                  >
                    <Text style={{ fontSize: px(30), color: '#999999' }}>取消</Text>
                  </TouchableOpacity>
                  <View style={{ height: px(30), width: px(2), backgroundColor: '#E6E6E6' }}></View>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                      this.setState({ askVisible: false, sureVisible: true })
                      removeTokens()
                      this.loginOut()
                    }}
                    style={{ height: px(80), justifyContent: 'center', alignItems: 'center', flex: 1 }}
                  >
                    <Text style={{ fontSize: px(30), color: '#333333' }}>确定</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.sureVisible}
            onRequestClose={() => {
              this.setState({ sureVisible: false })
            }}
          >
            <View style={{ height: Dimensions.get('window').height, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
              <View style={{ height: px(315), width: px(300), backgroundColor: 'white', borderRadius: px(10) }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: px(236), paddingHorizontal: px(60), borderBottomColor: '#E6E6E6', borderBottomWidth: px(2) }}>
                  <Image
                    style={{ width: px(56), height: px(56) }}
                    source={require('../../../assets/images/mine_frame_right.png')} />
                  <Text style={{ color: '#333333', fontSize: px(26), lineHeight: px(44) }}>注销成功</Text>
                </View>
                <View style={{ height: px(80), justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                  <TouchableHighlight
                    onPress={() => this.setState({ sureVisible: false })}
                    style={{ height: px(80), justifyContent: 'center', alignItems: 'center', flex: 1 }}
                  >
                    <Text style={{ fontSize: px(30), color: '#999999' }}>取消</Text>
                  </TouchableHighlight>
                  <View style={{ height: px(30), width: px(2), backgroundColor: '#E6E6E6' }}></View>
                  <TouchableHighlight
                    onPress={() => {
                      this.setState({ sureVisible: false })
                      configAppNavigator(false)
                      // navigation.reset([NavigationActions.navigate({ routeName: 'login' })], 0);
                    }}
                    style={{ height: px(80), justifyContent: 'center', alignItems: 'center', flex: 1 }}
                  >
                    <Text style={{ fontSize: px(30), color: '#333333' }}>确定</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </View>
          </Modal>
        </View>
        {/* {this._renderUpimg(this.state.isShowCouver)} */}
      </View>
    );
  }
}
