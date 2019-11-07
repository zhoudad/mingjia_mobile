import React, { Component } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, Modal, 
  Dimensions
} from 'react-native';
import px from '../../../utils/px'
import Swiper from 'react-native-swiper';
const { height, width } = Dimensions.get('window');

export default class Album extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgArr: [],
      modalVisible:false
    };
  }

  _renderImage() {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => this.setState({modalVisible: true})}
        onLongPress={() => { console.log('长按') }}
        style={styles.imageItem}>
        <Image
          style={{ width: px(218), height: px(128), borderRadius: px(10), marginBottom: px(20) }}
          source={{uri:'http://photocdn.sohu.com/20120209/Img334155491.jpg'}}
        />
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Modal
          animationType="fade"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setState({ modalVisible: false })
          }}
        >
          <View style={{ flex: 1 }}>
            {
              // this.state.slides == null ? <View style={{ flex: 1 }}></View> :
              <View style={{ width, height, }}>
              <TouchableOpacity activeOpacity={1} style={styles.goBack} onPress={() => this.setState({ modalVisible: false })}>
                <Image style={{ width: px(48), height: px(48) }} source={require('../../../assets/images/nav_icon_back2.png')} />
              </TouchableOpacity>
              <Swiper
                showsPagination={false}
                loop={false}
                style={{ flex: 1, }}
                index={0}>
                {
                  // this.state.drawings.map((item, index) => {
                  //   return (
                      <View style={{ backgroundColor: 'red',width, height, }}>
                        <Image style={{ width, height,}} source={{ uri: 'http://photocdn.sohu.com/20120209/Img334155491.jpg' }} ></Image>
                      </View>
                  //   )
                  // })
                }
              </Swiper>
            </View>
            }
          </View>
        </Modal>
        <ScrollView contentContainerStyle={{ backgroundColor: '#F2F4F7' }}>
          <View style={{ paddingHorizontal: px(30), backgroundColor: '#FFF' }}>
            <Text style={styles.tit}>楼盘图</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
              {this._renderImage()}
              {this._renderImage()}
              {this._renderImage()}
              {this._renderImage()}
            </View>
          </View>
          <View style={{ paddingHorizontal: px(30), backgroundColor: '#FFF', marginTop: px(20) }}>
            <Text style={styles.tit}>3室2厅2卫  89m²朝南  在售</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
              {this._renderImage()}
              {this._renderImage()}
              {this._renderImage()}
              {this._renderImage()}
            </View>
          </View>
          <View style={{ paddingHorizontal: px(30), backgroundColor: '#FFF', marginTop: px(20) }}>
            <Text style={styles.tit}>4室2厅2卫  144m²朝南  在售</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
              {this._renderImage()}
              {this._renderImage()}
              {this._renderImage()}
              {this._renderImage()}
            </View>
          </View>
          <View style={{ paddingHorizontal: px(30), backgroundColor: '#FFF', marginTop: px(20) }}>
            <Text style={styles.tit}>周边图 </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
              {this._renderImage()}
              {this._renderImage()}
              {this._renderImage()}
              {this._renderImage()}
            </View>
          </View>
          <View style={{ paddingHorizontal: px(30), backgroundColor: '#FFF', marginTop: px(20) }}>
            <Text style={styles.tit}>楼盘证件照</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
              {this._renderImage()}
              {this._renderImage()}
              {this._renderImage()}
              {this._renderImage()}
            </View>
          </View>
          <View style={{ paddingHorizontal: px(30), backgroundColor: '#FFF', marginTop: px(20) }}>
            <Text style={styles.tit}>现场图</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
              {this._renderImage()}
              {this._renderImage()}
              {this._renderImage()}
              {this._renderImage()}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  tit: {
    color: '#303133',
    fontSize: px(28),
    fontWeight: 'bold',
    marginVertical: px(30)
  },
  imageItem: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  goBack: {
    position: 'absolute',
    top: px(30),
    left: px(30),
    width: px(48),
    height: px(48),
    zIndex: 999,
  },
})