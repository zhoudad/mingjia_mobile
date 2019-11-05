import React, { Component } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import px from '../../../utils/px'
import Swiper from 'react-native-swiper';

export default class Album extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgArr: []
    };
  }

  _renderImage() {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => this.setState({})}
        onLongPress={() => { console.log('长按') }}
        style={styles.imageItem}>
        <Image
          style={{ width: px(218), height: px(128), borderRadius: px(10), marginBottom: px(20) }}
          source={require('../../../assets/images/panda.jpg')}
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
            alert("Modal has been closed.");
          }}
        >
          <View style={{ flex: 1 }}>
            {
              this.state.slides == null ? <View style={{ flex: 1 }}></View> :
                <Swiper
                  style={{ height: px(296), paddingHorizontal: px(30), }}
                  dot={<View style={{ backgroundColor: '#D8DCE6', width: px(14), height: px(4), borderRadius: px(2), marginLeft: px(4), marginRight: px(4), marginTop: px(4), marginBottom: px(4) }} />}
                  activeDot={<View style={{ backgroundColor: '#606266', width: px(14), height: px(4), borderRadius: px(2), marginLeft: px(4), marginRight: px(4), marginTop: px(4), marginBottom: px(4) }} />}
                  loop={true}
                  paginationStyle={{ bottom: px(25), }}
                  index={0}>
                  {
                    this.state.slides.map((item, index) => {
                      return (
                        <View key={index} style={{ height: px(296), borderRadius: px(10) }} >
                          <Image style={{ height: px(296), borderRadius: px(10) }} source={{ uri: `http://218.108.34.222:8080/uploads/` + item.slide_file }} ></Image>
                        </View>
                      )
                    })
                  }
                </Swiper>
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
  }
})