import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import px from '../../../utils/px'
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';

class MessageItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelect: false,
      isShowBtn: false,
    };
    this.changeSelect = this.changeSelect.bind(this)
  }
  static propTypes = {
    selectPress: PropTypes.func,
    index: PropTypes.number,
    Management:PropTypes.bool,
  }

  static defaultProps = {
    selectPress: i => console.log('select'),
    index:-1,
    Management:false
  }

  changeSelect() {
    const { selectPress, index } = this.props
    this.setState({ isSelect: !this.state.isSelect }, () => {
      selectPress(index)
    })
  }
  _selectItem() {
    if (this.props.Management) {
      return <TouchableOpacity
        style={{ width: px(56), height: px(56), justifyContent: 'center', alignItems: 'center', marginTop: px(-8) }}
        activeOpacity={1}
        onPress={() => this.changeSelect()}
      >
        <Image
          style={{ width: px(56), height: px(56), marginTop: px(-20) }}
          source={this.state.isSelect ? require("../../../assets/images/common_select_s.png") : require("../../../assets/images/common_select_n.png")} />
      </TouchableOpacity>

    } else {
      return null
    }
  }

  toDet(){
    const { navigation, Management } = this.props
    if(!Management){
      navigation.navigate('msgDetails')
    }
  }
  render() {
    
    return (
      <TouchableOpacity activeOpacity={1}  onPress={() => this.toDet()}>
        <View style={[styles.msgItem,{paddingHorizontal:this.props.Management ? px(18) : px(30)}]}>
          {this._selectItem()}
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ height: px(149) }}>
              <Text style={{ color: '#303233', fontSize: px(24), marginTop: px(40) }}>系统通知：明家app全面临来UI2.0升级</Text>
              <Text style={{ color: '#A8AFB3', fontSize: px(20), marginTop: px(30) }}>2019-02-03   08：30 </Text>
            </View>
            <Image
              style={{ width: px(48), height: px(48) }}
              source={require('../../../assets/images/common_arrow.png')} />
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}
const styles = StyleSheet.create({
  msgItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: px(149),
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: px(1),
  },
})

export default withNavigation(MessageItem);