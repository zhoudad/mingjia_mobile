import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';
import px from '../../../utils/px'

export default class computeResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#F2F4F7' }}>
                <View style={styles.result}>
                    <ImageBackground
                        style={{ width: px(220), height: px(220), justifyContent: 'center', alignItems: 'center' }}
                        source={require('../../../assets/images/schedule_3.png')}
                    >
                        <ImageBackground
                            style={{ width: px(192), height: px(192), alignItems: 'center', justifyContent: 'center' }}
                            source={require('../../../assets/images/schedule_1.png')}>
                            <Text style={{ color: '#666666', fontWeight: 'bold', marginBottom: px(10), fontSize: px(32) }}>月供</Text>
                            <Text style={{ color: '#666666', fontWeight: 'bold', fontSize: px(44) }}>¥ 3888</Text>
                        </ImageBackground>
                    </ImageBackground>
                </View>
                <View style={styles.data}>
                    <View style={styles.dataItem}>
                        <Text>首付</Text>
                        <Text>20万</Text>
                    </View>
                    <View style={styles.dataItem}>
                        <Text>首付</Text>
                        <Text>20万</Text>
                    </View>
                    <View style={styles.dataItem}>
                        <Text>首付</Text>
                        <Text>20万</Text>
                    </View>
                    <View style={styles.dataItem}>
                        <Text>首付</Text>
                        <Text>20万</Text>
                    </View>
                </View>
                <TouchableOpacity style={{ marginTop: px(62), }} activeOpacity={1}>
                    <View style={styles.renewBtn}>
                        <Text style={{ color: '#FFB71A' }}>重新计算</Text>
                        <Image style={{ width: px(32), height: px(32), marginStart: px(6) }} source={require('../../../assets/images/common_new.png')} />
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    result: {
        height: px(350),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    data: {
        marginTop: px(20),
    },
    dataItem: {
        paddingHorizontal: px(30),
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: px(100),
        marginBottom: px(1)
    },
    renewBtn: {

        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    }
})