import React, { Component } from 'react';
import { unitWidth, width } from '../../AdapterUtil'
import TipicTag from '../../components/TipicTag'
import { withNavigation } from 'react-navigation';
import { View, Text, FlatList, StyleSheet, RefreshControl, ActivityIndicator, TouchableOpacity } from 'react-native';

const City = ['北京', '上海', '深圳', '武汉', '广州', '杭州', '重庆', '天津', '香港', '福建', '郑州', '四川',]
class PropertyPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			cityData: City
		};
	}

	// _TipicTag = (text, isStress) => {
	// 	return (
	// 		<View
	// 			style={{
	// 				height: 32 * unitWidth,
	// 				backgroundColor: isStress ? "#A1D76C" : "#F2F4F7",
	// 				marginRight:10*unitWidth,
	// 				justifyContent:'center',
	// 				alignItems:'center',
	// 			}}>
	// 			<Text
	// 				style={{
	// 					color: isStress ? "#FFFFFF" : "#606266",
	// 					fontSize: 20 * unitWidth,
	// 					// paddingVertical:6*unitWidth,
	// 					paddingHorizontal:14*unitWidth,
	// 				}}>{text}</Text>
	// 		</View>
	// 	)
	// }

	Loading = (ref) => {
		if (ref) {
			this.setState({ isLoading: true })
		}
		setTimeout(() => {
			let newCityData = []
			if (ref) {
				for (let i = this.state.cityData.length - 1; i >= 0; i--) {
					newCityData.push(this.state.cityData[i])
				}
			} else {
				newCityData = this.state.cityData.concat(City)
			}
			this.setState({
				cityData: newCityData,
				isLoading: false,
			})
		}, 1500)
	}

	_renderItem(data) {
		const {navigation} = this.props
		return (
			<TouchableOpacity 
			style={styles.item} 
			activeOpacity={1} 
			onPress={() => navigation.navigate('BasicInfo')}>
				<View style={styles.itemContent}>
					<View style={{ width: 200 * unitWidth, height: 200 * unitWidth, backgroundColor: '#ddd' }}></View>
					<View style={{flex:1, marginStart: 30 * unitWidth,height: 200 * unitWidth, }}>
						<Text style={{ color: '#333333', fontWeight: "bold", fontSize: 28*unitWidth }}>广州珠江新城</Text>
						<Text style={{ fontSize: 24 * unitWidth, color: '#B3B3B3',marginTop:9*unitWidth }}>
							<Text style={{ paddingEnd: 35 * unitWidth }}>萧山</Text>
							<Text style={{ paddingEnd: 35 * unitWidth }}>钱江世界城</Text>
							<Text style={{ paddingEnd: 35 * unitWidth }}>建面积</Text>
						</Text>
						<Text style={{ color: '#ea4c4c', fontSize: 32*unitWidth,fontWeight: "bold",marginTop:24*unitWidth}}>58600 元/㎡</Text>
						<View style={{flexDirection:'row',marginTop:8*unitWidth}}>
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
					refreshControl={
						<RefreshControl
							title={'loading'}
							colors={['green']}
							refreshing={this.state.isLoading}
							onRefresh={() => {
								this.Loading(true)
							}}
						/>
					}
					ListFooterComponent={() => this.more()}
					onEndReached={() => this.Loading()}
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
		height: 270 * unitWidth,
		paddingHorizontal: 30 * unitWidth,
		paddingTop: 40 * unitWidth,
	},
	itemContent:{
		borderBottomColor:'#E6E9F0',
		borderBottomWidth:1,
		flexDirection: 'row',
		alignItems:'center',
		paddingBottom:30*unitWidth
	},
	Text: {
		color: '#fff'
	}
})
export default withNavigation(PropertyPage);