import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import px from '../../../utils/px'

export default class Mortgage extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	render() {
		return (
			<View style={{ flex: 1, backgroundColor: '#F2F4F7' }}>
				<View style={styles.upperPart}>
					<View style={styles.firSelect}>
						<Text style={styles.firSelectTxt}>总价（万）</Text>
						<View style={styles.firSelectIup}>
							<Text>120</Text>
						</View>
					</View>
					<View style={styles.secSelect}>
						<Text style={styles.firSelectTxt}>首付选择</Text>
						<View style={styles.secSelectIup}>
							<Text style={{ color: '#303233' }}>120</Text>
						</View>
						<Text style={{ color: '#303233', marginHorizontal: px(20) }}>万</Text>
						<View style={styles.secSelectIup}>
							<Text style={{ color: '#303233' }}>120</Text>
						</View>
					</View>
					<Text style={{ color: '#303233', marginTop: px(40), textAlign: 'right', fontWeight: 'bold' }}>贷款总额60万</Text>
				</View>
				<View style={styles.nextPart}>
					<View style={styles.firSelect}>
						<Text style={styles.firSelectTxt}>商业贷款</Text>
						<View style={styles.firSelectIup}>
							<Text>60万年限28年</Text>
						</View>
					</View>
					<View style={styles.firSelect}>
						<Text style={styles.firSelectTxt}>商贷利率</Text>
						<View style={styles.firSelectIup}>
							<Text>最新基准利率（4.90%）</Text>
						</View>
					</View>
					<View style={styles.firSelect}>
						<Text style={styles.firSelectTxt}>公积金贷款</Text>
						<View style={styles.firSelectIup}>
							<Text>10万年限20年</Text>
						</View>
					</View>
					<View style={styles.firSelect}>
						<Text style={styles.firSelectTxt}>公积金利率</Text>
						<View style={styles.firSelectIup}>
							<Text>最新基准利率（3.25%）</Text>
						</View>
					</View>
				</View>
				<View style={{alignItems:'center'}}>
				<TouchableOpacity style={styles.computeBtn}>
					<Text style={{color:'#FFFFFF',fontSize:px(32)}}>开始计算</Text>
				</TouchableOpacity>
				</View>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	upperPart: {
		height: px(310),
		backgroundColor: '#FFFFFF',
		marginTop: px(20),
		paddingHorizontal: px(30)
	},
	firSelect: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: px(30)
	},
	secSelect: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: px(20)
	},
	firSelectTxt: {
		width: px(150),
		color: '#303233',
		fontSize: px(28),
		marginEnd: px(60)
	},
	firSelectIup: {
		width: px(380),
		height: px(72),
		borderRadius: px(10),
		backgroundColor: '#F2F4F7',
		justifyContent: 'center',
		alignItems: 'center'
	},
	secSelectIup: {
		width: px(200),
		height: px(72),
		borderRadius: px(10),
		backgroundColor: '#F2F4F7',
		justifyContent: 'center',
		alignItems: 'center'
	},
	nextPart: {
		height: px(428),
		marginTop: px(20),
		paddingHorizontal: px(30),
		backgroundColor: '#FFFFFF',
	},
	computeBtn:{
		width:px(540),
		height:px(90),
		backgroundColor:'#EA4C4C',
		borderRadius:px(45),
		marginTop:px(148),
		justifyContent:'center',
		alignItems:'center'
	}
})