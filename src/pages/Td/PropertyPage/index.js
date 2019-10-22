import React, { Component } from 'react';
import px from '../../../utils/px'
import TipicTag from '../../../components/TipicTag'
import { withNavigation } from 'react-navigation';
import { View, Text,Image , FlatList, StyleSheet, RefreshControl, ActivityIndicator, TouchableOpacity } from 'react-native';

const City = ['北京', '上海', '深圳', '武汉', '广州', '杭州', '重庆', '天津', '香港', '福建', '郑州', '四川',]
class PropertyPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			cityData: City
		};
	}

	// Loading = (ref) => {
	// 	if (ref) {
	// 		this.setState({ isLoading: true })
	// 	}
	// 	setTimeout(() => {
	// 		let newCityData = []
	// 		if (ref) {
	// 			for (let i = this.state.cityData.length - 1; i >= 0; i--) {
	// 				newCityData.push(this.state.cityData[i])
	// 			}
	// 		} else {
	// 			newCityData = this.state.cityData.concat(City)
	// 		}
	// 		this.setState({
	// 			cityData: newCityData,
	// 			isLoading: false,
	// 		})
	// 	}, 1500)
	// }

	_renderItem(data) {
		const {navigation} = this.props
		return (
			<TouchableOpacity 
			style={styles.item} 
			activeOpacity={1} 
			onPress={() => navigation.navigate('P_BasicInfo')}>
				<View style={styles.itemContent}>
					<View style={{ width: px(200), height: px(200), }}>
						<Image 
						style={{width: px(200), height: px(200),borderRadius:px(10)}}
						source={require('../../../assets/images/panda.jpg')}/>
					</View>
					<View style={{flex:1, marginStart: px(30),height: px(200), }}>
						<Text style={{ color: '#333333', fontWeight: "bold", fontSize: px(28),fontFamily:'PingFang-SC-Bold',fontWeight:'bold' }}>广州珠江新城</Text>
						<Text style={{ fontSize: px(24), color: '#B3B3B3',marginTop:px(9),fontFamily:'PingFang-SC-Medium' }}>
							<Text style={{ paddingEnd: px(35) }}>萧山</Text>
							<Text style={{ paddingEnd: px(35) }}>钱江世界城</Text>
							<Text style={{ paddingEnd: px(35) }}>建面积</Text>
						</Text>
						<Text style={{ color: '#ea4c4c', fontSize: px(32),fontWeight: "bold",marginTop:px(24)}}>58600 元/㎡</Text>
						<View style={{flexDirection:'row',marginTop:px(8)}}>
							<TipicTag text={"在售"} isStress={true}/>
							<TipicTag text={"住宅"} />
							<TipicTag text={"装修交付"} />
						</View>
					</View>
				</View>
			</TouchableOpacity>
		)
	}

	more = () => {
		return (
			<View style={{ alignItems: 'center' }}>
				<ActivityIndicator
					size={'large'}
					animating={true}
					style={{ margin: 10 }}
					color={'green'}
				/>
				<Text>正在加载更多</Text>
			</View>
		)
	}

	render() {
		return (
			<View style={styles.container}>
				<FlatList
					data={this.state.cityData}
					renderItem={(data) => this._renderItem(data)}
					// refreshControl={
					// 	<RefreshControl
					// 		title={'loading'}
					// 		colors={['green']}
					// 		refreshing={this.state.isLoading}
					// 		onRefresh={() => {
					// 			this.Loading(true)
					// 		}}
					// 	/>
					// }
					// ListFooterComponent={() => this.more()}
					// onEndReached={() => this.Loading()}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	item: {
		height: px(270),
		paddingHorizontal: px(30),
		paddingTop: px(40),
	},
	itemContent:{
		borderBottomColor:'#E6E9F0',
		borderBottomWidth:1,
		flexDirection: 'row',
		alignItems:'center',
		paddingBottom:px(30)
	},
	Text: {
		color: '#fff'
	}
})
export default withNavigation(PropertyPage);