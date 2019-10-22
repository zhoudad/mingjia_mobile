import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, Dimensions, PermissionsAndroid, ToastAndroid} from 'react-native';
import px from '../../utils/px'
import Geolocation from '@react-native-community/geolocation';

export default class Local extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: '上海',
      key: '0b86bb00dfc1b69be7e033b1bef0e762',
      currentLongitude: '',
      currentLatitude: '',
      city:['上海','重庆','武汉','西安','北京','成都','重庆','西安','武汉']
    };
  }

  componentDidMount() {
    var that = this;
    if (Platform.OS === 'ios') {
      this.getPositions();
    } else {
      async function requestLocationPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            that.getPositions();
          } else {
            alert("没有权限");
          }
        } catch (err) {
          alert("err", err);
        }
      }
      requestLocationPermission();
    }
  }
  goBack = () => {
    console.log('back')
    this.props.navigation.state.params.getCity({ city: this.state.position });
    this.props.navigation.goBack()
  }
  _renderArea(text,key) {
    return (
      <TouchableOpacity key={key} style={styles.areaItem} activeOpacity={1} onPress={() => this.setState({position:text})}>
        <Text style={{ color: '#606266', fontSize: px(24) }}>{text}</Text>
      </TouchableOpacity>
    )
  }
  getPositions = () => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        location => {
          // console.log(location.coords.longitude)
          this.setState({
            currentLongitude: location.coords.longitude,//经度
            currentLatitude: location.coords.latitude,//纬度
          });
          fetch('http://restapi.amap.com/v3/geocode/regeo?key=' + this.state.key + '&location=' + this.state.currentLongitude + ',' + this.state.currentLatitude + '&radius=1000&extensions=all&batch=false&roadlevel=0', {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            body: ``
          })
            .then((response) => response.json())
            .then((jsonData) => {
              // console.log(jsonData.regeocode.addressComponent.city.substring(0,2))
              try {
                this.setState({
                  position: jsonData.regeocode.addressComponent.city.substring(0,2),
                });
              } catch (e) {

              }
            })
            .catch((error) => {
              console.error(error);
            });
        },
        error => {
          reject(error);
          if (error.code == 2) {
            ToastAndroid.show('定位失败，请查看手机是否开启GPS定位服务', ToastAndroid.SHORT);
          } else if (error.code == 3) {
            ToastAndroid.show("定位超时，请尝试重新获取定位", ToastAndroid.SHORT);
          } else {
            ToastAndroid.show("定位失败：" + error.message, ToastAndroid.SHORT);
          }
        }, {
          enableHighAccuracy: false,
          timeout: 5000,
          maximumAge: 10000
        }
      );

    })

  }
  render() {
    const {navigation} = this.props
    return (
      <View>
        <View style={styles.header}>
         <TouchableOpacity activeOpacity={1} onPress={() => this.goBack()}>
         <Image
            style={{ width: px(56), height: px(56), marginHorizontal: px(8) }}
            source={require('../../assets/images/nav_icon_back.png')} />
         </TouchableOpacity>
          <View style={styles.searchBox}>
            <Image
              style={{ width: px(22), height: px(22), marginHorizontal: px(22) }}
              source={require('../../assets/images/search_icon.png')} />
            <TextInput style={{ flex: 1, height: px(60), lineHeight: px(60), padding: 0 }} placeholder={"搜索您想要的内容"} />
          </View>
        </View>
        <View style={{ marginHorizontal: px(30) }}>
          <View>
            <Text style={{ color: '#303233', fontSize: px(28), marginBottom: px(30) }}>定位/推荐</Text>
            <View style={styles.recItem}>
              <Image
                style={{ width: px(28), height: px(28), marginEnd: px(3), marginStart: px(13) }}
                source={require('../../assets/images/common_point.png')} />
              <Text style={{ color: '#606266', fontSize: px(24) }}>{this.state.position}</Text>
            </View>
          </View>
          <View>
            <Text style={{ color: '#303233', fontSize: px(28), marginBottom: px(30), marginTop: px(60) }}>服务地区</Text>
            <View style={{flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between'}}>
              {
                this.state.city.map((item,key) => {
                 return this._renderArea(item,key)
                })
              }
            </View>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  header: {
    height: px(90),
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: px(15),
    paddingEnd: px(60),
    shadowColor: '#000000',
    shadowOffset: { w: 0, h: px(12) },
    shadowOpacity: 0.08,
    // shadowRadius:5,
    elevation: 2,
  },
  searchBox: {
    backgroundColor: '#F5F8FA',
    borderRadius: px(60),
    flex: 1,
    height: px(60),
    alignItems: 'center',
    flexDirection: 'row',
  },
  recItem: {
    width: px(120),
    height: px(56),
    backgroundColor: '#F2F4F7',
    borderRadius: px(5),
    alignItems: 'center',
    flexDirection: 'row',
  },
  areaItem: {
    width: px(180),
    height: px(72),
    borderRadius: px(5),
    backgroundColor: '#F5F7FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:px(30)
  }
})