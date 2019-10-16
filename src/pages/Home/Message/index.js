import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import px from '../../../utils/px'

class MessageItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isSelect: false,
			isShowBtn: false,
		};
	}
	componentDidMount() {
		console.log(this.state.isSelect)
	}
	// selectItem = (callBack) => {
	//   this.setState({ isSelect: !this.state.isSelect }, () => {
	//     callBack(this.props.index, this.state.isSelect)
	//   })
	// }
	_selectItem() {
		if (true) {
			return <TouchableOpacity
				style={{ width: px(56), height: px(56), justifyContent: 'center', alignItems: 'center', marginLeft: px(5) }}
				activeOpacity={1}
				onPress={() => this.selectItem(callBack)}>
				<Image
					style={{ width: px(56), height: px(56), marginTop: px(-20) }}
					source={this.state.isSelect ? require("../../../assets/images/common_select_s.png") : require("../../../assets/images/common_select_n.png")} />
			</TouchableOpacity>

		} else {
			return null
		}
	}
	render() {
		const { navigation } = this.props
		return (
			<TouchableOpacity activeOpacity={1}>
				<View style={styles.msgItem}>
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

export default class Message extends Component {
	constructor(props) {
		super(props);
		this.state = {
			Management: true,
			isAllselect: false,
		};
	}

	_renderManagement() {
		if (this.state.Management) {
			return (
				<View style={styles.MessageDel}>
					<TouchableOpacity
						activeOpacity={1}
						style={{flex:1,}}
						onPress={() => this.selectAll()}
					>
						<View style={{flexDirection:'row',alignItems:'center'}}>
							<Image
								style={{  width:px(56),height:px(56),marginStart:px(18)}}
								source={this.state.isAllselect ? require("../../../assets/images/common_select_s.png") : require("../../../assets/images/common_select_n.png")} />
							<Text style={{ color:'#303133',fontSize:px(32) }}>全选</Text>

						</View>
					</TouchableOpacity>
					<TouchableOpacity
						activeOpacity={0.8}
						style={{ width: px(240), height: px(100), backgroundColor:'#EA4C4C',justifyContent:'center',alignItems:'center'}}
					
					>
						<Text style={{ color:'#fff',fontSize:px(32) }}>删除</Text>
					</TouchableOpacity>
				</View>
			)
		} else {
			return null
		}
	}

	render() {
		return (
			<ScrollView>
				{/* <View>
					<MessageItem />
					<MessageItem />
					<MessageItem />
					<MessageItem />
				</View> */}
				{this._renderManagement()}
			</ScrollView>
		);
	}
}
const styles = StyleSheet.create({
	header: {
		height: px(88),
		justifyContent: 'space-between',
		paddingEnd: px(30),
		flexDirection: 'row',
		alignItems: 'center',
	},
	msgItem: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: px(149),
		borderBottomColor: '#EBEBEB',
		borderBottomWidth: px(1),
		marginHorizontal: px(30)
	},
	MessageDel:{
		height:px(100),
		flexDirection:'row',
		alignItems:'center'
	}
})
