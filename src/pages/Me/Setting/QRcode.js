import React, { Component } from 'react';
import { View, Text } from 'react-native';
import px from '../../../utils/px'

export default class QRcode extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center' }}>
                <View style={{ marginTop: px(162), alignItems: 'center', flex: 1 }}>
                    <Text style={{ fontSize: px(34), color: '#303133' }}>明家</Text>
                    <Text style={{ marginTop: px(20) }}>推荐扫一扫，让我们房子更透明</Text>
                    <View style={{ backgroundColor: '#eee', width: px(360), height: px(360), marginTop: px(70) }}></View>
                </View>
                <Text style={{ color: '#999999', fontSize: px(26), marginBottom: px(110) }}> 版本号:1.0.1 </Text>
            </View>
        );
    }
}