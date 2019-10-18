import React, { Component } from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import { View, Text, ScrollView, StyleSheet, Image, ImageBackground, TouchableOpacity, TextInput, Dimensions, StatusBar, Modal, TouchableHighlight } from 'react-native';
import TipicTag from '../../../components/TipicTag'
import px from '../../../utils/px'

const { height, width } = Dimensions.get('window')

export default class BasicInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headerIndex: 0,
      isAttention: false,
      ReviewVisible: false,
      // images: null,
      commentTxtLength: 0,
      images: [],
    };
  }
  _activeDot(index) {
    if (this.state.headerIndex == index) {
      return (
        <View style={styles.active}></View>
      )
    }
  }
  _renderImage() {
    return (
      <View style={{ width: px(120), height: px(120), borderRadius: px(10) }}>
        <Image style={{ width: px(120), height: px(120), borderRadius: px(10) }} source={require('../../../assets/images/panda.jpg')} />
      </View>
    )
  }
  _reviewItem() {
    return (
      <TouchableOpacity activeOpacity={1} style={styles.reviewItem}>
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: px(30) }}>
            <Image style={{ width: px(69), height: px(60), borderRadius: px(30) }} />
            <Text style={{ color: '#303133', fontSize: px(28), marginStart: px(20) }}>房大师</Text>
          </View>
          <Text numberOfLines={2} style={{ color: '#303133', fontSize: px(24), }}>
            各地经常会举办房地产交易会，在房地产交易会上通常会开辟二手房专区。可通过查看网络或多留意报刊杂志等渠道获得信息。
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
  _randerModel() {
    return (
      <View style={styles.modelItem}>
        <ImageBackground
          style={styles.modelItemBg}
          source={require('../../../assets/images/panda.jpg')}>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.modelPlay}>
            <Image
              style={{ width: px(51), height: px(51) }}
              source={require('../../../assets/images/3d_play_s.png')} />
          </TouchableOpacity>
        </ImageBackground>
        <View>
          <Text style={{ marginTop: px(20) }}>3室2厅2卫89m</Text>
          <View style={{ flexDirection: 'row', marginTop: px(20) }}>
            <TipicTag text={"在售"} isStress={true} />
            <TipicTag text={"住宅"} />
          </View>
        </View>
      </View>
    )
  }
  
  closeImg(index){
    let newImages = this.state.images
    newImages.splice(index,1)
    this.setState({
      images:newImages
    })
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
        uri: image.path,
        width: image.width,
        height: image.height,
        mime: image.mime
      })
      this.setState({ images });
      console.log(this.state.images)
    }).catch(e => {
      // console.log(e);
      // Alert.alert(e.message ? e.message : e);
    });
  }
  _render_delImage(){
    return (
      <TouchableOpacity activeOpacity={1} style={{width:px(30),height:px(30),backgroundColor:'#FFF',justifyContent:'center',alignItems:'center'}}>
        <View style={{width:px(28),height:px(28),backgroundColor:'#EA4C4C'}}>
          <View style={{width:px(24),height:px(4),backgroundColor:'#FFF', transform: [{rotateX:'45deg'}]}}></View>
          <View style={{width:px(4),height:px(24),backgroundColor:'#FFF', transform: [{rotateX:'-45deg'}]}}></View>
        </View>
      </TouchableOpacity>
    )
  }
  render() {
    const { navigation } = this.props
    return (
      <View>
        <ScrollView contentContainerStyle={{ marginBottom: px(30) }}>
          <StatusBar
            animated={true}
            hidden={false}
            backgroundColor='transparent'
            translucent={true}
            barStyle='light-content'
          />
          <View style={styles.headerImg}>
            <View style={{ height: px(422) }}>
              <ImageBackground
                style={{ height: px(422) }}
                source={require('../../../assets/images/panda.jpg')}
              >
                <TouchableOpacity activeOpacity={1} style={styles.goBack} onPress={() => navigation.goBack()}>
                  <Image style={{ width: px(48), height: px(48) }} source={require('../../../assets/images/nav_icon_back2.png')} />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} style={styles.play}>
                  <Image style={{ width: px(80), height: px(80) }} source={require('../../../assets/images/video_play_1.png')} />
                </TouchableOpacity>
              </ImageBackground>
            </View>
          </View>
          <View style={styles.headerTab}>
            <TouchableOpacity
              activeOpacity={1}
              style={{ flex: 1, alignItems: 'center' }}
              onPress={() => this.setState({ headerIndex: 0 })}
            >
              <Image
                style={{ width: px(44), height: px(44) }}
                source={this.state.headerIndex == 0 ? require(`../../../assets/images/house_video_s.png`) : require(`../../../assets/images/house_video_n.png`)} />
              <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                {this._activeDot(0)}
                <Text
                  style={{ color: this.state.headerIndex == 0 ? '#EA4C4C' : '#666666' }}
                >视频</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              style={{
                flex: 1,
                alignItems: 'center'
              }}
              onPress={() => this.setState({ headerIndex: 1 })}
            >
              <Image
                style={{ width: px(44), height: px(44) }}
                source={this.state.headerIndex == 1 ? require('../../../assets/images/house_3d_s.png') : require('../../../assets/images/house_3d_n.png')} />
              <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                {this._activeDot(1)}
                <Text style={{ color: this.state.headerIndex == 1 ? '#EA4C4C' : '#666666' }}>三维</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              style={{ flex: 1, alignItems: 'center' }}
              onPress={() => this.setState({ headerIndex: 2 })}
            >
              <Image
                style={{ width: px(44), height: px(44) }}
                source={this.state.headerIndex == 2 ? require('../../../assets/images/house_quanjing_s.png') : require('../../../assets/images/house_quanjing_n.png')} />
              <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                {this._activeDot(2)}
                <Text style={{ color: this.state.headerIndex == 2 ? '#EA4C4C' : '#666666' }}>图片</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.info}>
            <View style={{ borderBottomWidth: px(2), borderBottomColor: '#E6E9F0' }}>
              <Text style={{ marginTop: px(30), color: '#333333', fontSize: px(44) }}>新府城</Text>
              <Text style={{ marginTop: px(20), color: '#A8ABB3', fontSize: px(24) }}>别名：VTANOV融创新府城</Text>
              <View style={{ marginVertical: px(40), flexDirection: 'row' }}>
                <TipicTag text={"新房"} />
                <TipicTag text={"别墅"} />
                <TipicTag text={"装修交付"} />
                <TipicTag text={"项目在建"} />
              </View>
            </View>
            <View>
              <View style={{ flexDirection: 'row', marginVertical: px(50) }}>
                <Text style={{ color: '#303133', flex: 1, fontSize: px(24) }}>住宅： 28800元/㎡</Text>
                <Text style={{ color: '#303133', flex: 1, fontSize: px(24) }}>开盘： 2019-05-07</Text>
              </View>
              <View style={{ flexDirection: 'row', marginBottom: px(50) }}>
                <Text style={{ color: '#303133', flex: 1, fontSize: px(24) }}>户型： 4室  2室</Text>
                <Text style={{ color: '#303133', flex: 1, fontSize: px(24) }}>建面： 34-144㎡</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                <Text style={{ color: '#303133', fontSize: px(24) }}>地址： 广东省广州市天河区棠下街道乐天大厦</Text>
                <TouchableOpacity activeOpacity={1} style={{ felx: 1 }}>
                  <Image style={{ width: px(44), height: px(44), marginStart: px(24) }} source={require('../../../assets/images/loupan_ditu.png')} />
                </TouchableOpacity>
              </View>
              <View style={{ height: px(68), justifyContent: 'center', alignItems: 'center', marginTop: px(76) }}>
                <TouchableOpacity activeOpacity={1} style={styles.detailsBtn} onPress={() => navigation.navigate('P_DetailsInfo')}>
                  <Text style={{ color: '#FFFFFF' }}>信息详情</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.model}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
              <Text style={{ color: '#303133', fontSize: px(28) }}>户型模型三维</Text>
              <Text style={{ color: '#A8ABB3', fontSize: px(24) }}>回收</Text>
            </View>
            <View style={styles.modelList}>
              {this._randerModel()}
              {this._randerModel()}
              {this._randerModel()}
              {this._randerModel()}
              {this._randerModel()}
              {this._randerModel()}
            </View>
          </View>
          <View style={styles.sandTable}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
              <Text style={{ color: '#303133', fontSize: px(28) }}>沙盘图</Text>
              <Text style={{ color: '#A8ABB3', fontSize: px(24) }}>楼盘详情</Text>
            </View>
            <ImageBackground
              style={{ height: px(387), marginTop: px(30), borderRadius: px(51) }}
              source={require('../../../assets/images/panda.jpg')}></ImageBackground>
          </View>
          <View style={styles.tD}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
              <Text style={{ color: '#303133', fontSize: px(28) }}>小区三维</Text>
              <Text style={{ color: '#A8ABB3', fontSize: px(24) }}>详情查看</Text>
            </View>
            <ImageBackground
              style={{ height: px(387), marginTop: px(30), borderRadius: px(51), justifyContent: 'center', alignItems: 'center' }}
              source={require('../../../assets/images/panda.jpg')}>
              <TouchableOpacity activeOpacity={1} style={{ width: px(102), height: px(102), borderRadius: px(51) }}>
                <Image
                  style={{ width: px(102), height: px(102) }}
                  source={require('../../../assets/images/3d_play_s.png')} />
              </TouchableOpacity>
            </ImageBackground>
          </View>
          <View style={styles.review}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
              <Text style={{ color: '#303133', fontSize: px(28) }}>用户点评（15）</Text>
              <Text style={{ color: '#A8ABB3', fontSize: px(24) }}>查看更多</Text>
            </View>
            <View>
              {this._reviewItem()}
              {this._reviewItem()}
            </View>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: px(50) }}>
            <TouchableHighlight
              onPress={() => this.setState({ ReviewVisible: true })}
              style={styles.publishBtn}>
              <Text style={{ color: '#FFFFFF', fontSize: px(24) }}>我来点评</Text>
            </TouchableHighlight>

            {
              this.state.ReviewVisible ?
                <TouchableHighlight
                  style={{ position: 'absolute', width: '100%', zIndex: 999, height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                >
                  <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.ReviewVisible}
                    onRequestClose={() => {
                      this.setState({ ReviewVisible: false,images: [] })
                    }}
                  >
                    <View style={{ height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                      <View style={{ height: px(580), backgroundColor: 'white', width, position: 'absolute', left: 0, bottom: 0 }}>
                        <View style={{ height: px(100), flexDirection: 'row', alignItems: 'center' }}>
                          <View style={{ height: px(100), flexDirection: 'row', alignItems: 'center', flex: 1, paddingLeft: px(30), justifyContent: 'space-between', marginRight: px(144) }}>
                            <Text
                              onPress={() => this.setState({ ReviewVisible: false, images: [] })}
                              style={{ lineHeight: px(40), color: '#303133', fontSize: px(32) }}>取消</Text>
                            <Text style={{ lineHeight: px(40), color: '#303133', fontSize: px(32) }}>点评</Text>
                          </View>
                          <TouchableHighlight style={{ width: px(200), height: px(100), backgroundColor: '#EA4C4C', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: px(32) }}>发表</Text>
                          </TouchableHighlight>
                        </View>
                        <View style={{ height: px(480), backgroundColor: '#F7F9FB', paddingHorizontal: px(30), paddingVertical: px(40) }}>
                          <TextInput
                            onChangeText={(t) => this.setState({ commentTxtLength: t.length })}
                            style={{ flex: 1, padding: 0, textAlignVertical: 'top', lineHeight: px(40), fontSize: px(24) }}
                            maxLength={100}
                            placeholder={' 对本楼盘本户型发表您的看法，不限环境、位置、三维图、全景 '}
                            multiline={true} />
                          <Text style={{ color: '#A8ABB3', fontSize: px(24) }}>{this.state.commentTxtLength}/100</Text>
                          <View style={{ marginVertical: px(30), flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
                            <ScrollView
                              showsHorizontalScrollIndicator={false}
                              horizontal={true}
                              contentContainerStyle={{ flexDirection: 'row', paddingVertical: px(20), flexWrap: 'wrap', alignItems: 'center', }}>
                              {
                                this.state.images.map((item, index) => {
                                  if (item.uri) {
                                    return (
                                      <View style={{ width: px(120), height: px(120), borderRadius: px(10), marginRight: px(20), }} key={index}>
                                        <Image style={{ width: px(120), height: px(120), borderRadius: px(10) }} source={{ uri: item.uri }} />
                                        <TouchableOpacity 
                                        onPress={() => this.closeImg(index)}
                                        activeOpacity={1} 
                                        style={styles.imgDel}>
                                          <View style={{width:px(22),height:px(22),backgroundColor:'#EA4C4C',borderRadius:px(11)}}>
                                            <View style={{width:px(16),height:px(3),backgroundColor:'#FFF', transform: [{rotateZ:'45deg'}],position:'absolute',left:'50%',top:'50%',marginTop:px(-1.5),marginLeft:px(-8)}}></View>
                                            <View style={{width:px(3),height:px(16),backgroundColor:'#FFF', transform: [{rotateZ:'45deg'}],position:'absolute',left:'50%',top:'50%',marginTop:px(-8),marginLeft:px(-1.5)}}></View>
                                          </View>
                                        </TouchableOpacity>
                                      </View>
                                    )
                                  } else {
                                    return null
                                  }
                                })
                              }
                              {
                                this.state.images.length > 2 ? null :
                                  <TouchableOpacity
                                    activeOpacity={1}
                                    onPress={() => this.pickSingle(false)}
                                  >
                                    <Image style={{ width: px(120), height: px(120), borderRadius: px(10) }} source={require('../../../assets/images/comment_add.png')} />
                                  </TouchableOpacity>
                              }
                            </ScrollView>
                          </View>
                        </View>
                      </View>
                    </View>
                  </Modal>
                </TouchableHighlight> : null
            }
          </View>
        </ScrollView>
        <View style={{ height: px(100), width: '100%', flexDirection: 'row', position: 'absolute', bottom: 0, left: 0, }}>
          <TouchableOpacity
            activeOpacity={1}
            style={{ backgroundColor: '#FFFFFF', flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Image
              style={{ width: px(44), height: px(44), marginEnd: px(12) }}
              source={this.state.isAttention ? require('../../../assets/images/tabbar_focus_s.png') : require('../../../assets/images/tabbar_focus_n.png')} />
            <Text >关注</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            style={{ backgroundColor: '#EA4C4C', width: px(488), flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Image
              style={{ width: px(44), height: px(44), marginEnd: px(12) }}
              source={require('../../../assets/images/tabbar_phone.png')} />
            <Text style={{ fontSize: px(32), color: '#FFFFFF' }}>电话资讯</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerImg: {
    flex: 1,
  },
  goBack: {
    position: 'absolute',
    top: px(60),
    left: px(30),
    width: px(48),
    height: px(48)
  },
  play: {
    width: px(80),
    height: px(80),
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginStart: -px(80),
    marginTop: -px(80),
  },
  headerTab: {
    height: px(98),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#E6E9F0',
    borderBottomWidth: px(2),
  },
  active: {
    width: px(8),
    height: px(8),
    backgroundColor: '#EA4C4C',
    borderRadius: px(4),
    marginEnd: px(9),
    marginStart: px(-9),
  },
  info: {
    paddingHorizontal: px(30)
  },
  detailsBtn: {
    width: px(360),
    height: px(68),
    backgroundColor: '#EA4C4C',
    borderRadius: px(34),
    justifyContent: 'center',
    alignItems: 'center',
  },
  model: {
    paddingHorizontal: px(30),
    marginTop: px(120)
  },
  modelItem: {
    marginTop: px(30),
    marginBottom: px(51)
  },
  modelItemBg: {
    width: px(218),
    height: px(128),
    borderRadius: px(51),
    justifyContent: 'center',
    alignItems: 'center'
  },
  modelPlay: {
    width: px(82),
    height: px(82),
    borderRadius: px(41),
    opacity: 0.8, backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modelList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  sandTable: {
    paddingHorizontal: px(30),
    marginTop: px(50)
  },
  tD: {
    paddingHorizontal: px(30),
    marginTop: px(50)
  },
  review: {
    paddingHorizontal: px(30),
    marginTop: px(50)
  },
  reviewItem: {
    marginTop: px(50),
    paddingBottom: px(30),
    borderBottomColor: '#E6E9F0',
    borderBottomWidth: px(2)
  },
  publishBtn: {
    width: px(360),
    height: px(68),
    backgroundColor: '#EA4C4C',
    borderRadius: px(34),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: px(190)
  },
  imgDel:{
    width:px(26),
    height:px(26),
    backgroundColor:'#FFF',
    justifyContent:'center',
    alignItems:'center',
    position:'absolute',
    borderRadius:px(13),
    right:px(-10),
    marginTop:px(-10)
  }
})