import React, { Component } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import px from '../../../utils/px'

export default class msgDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <ScrollView contentContainerStyle={{ paddingHorizontal: px(30),paddingBottom:px(80) }}>
                <View style={{ height: px(130), borderBottomColor: '#E6E9F0', borderBottomWidth: px(1) }}>
                    <Text style={{ color: '#333333', fontSize: px(32), marginTop: px(50), fontWeight: 'bold' }}>1.0.0版本新功能介绍</Text>
                </View>
                <View>
                    <Text style={{ lineHeight: px(105), color: '#333333', fontSize: px(28), fontWeight: 'bold' }}>消息直通车</Text>
                    <Text style={{ color: '#606266', fontSize: px(28), lineHeight: px(50), }}>
                        There are only a few sets of locations and defective houses are sold at low prices, using their prices as "minimum price" and "starting price"
                        2. "Average price" sounds very favorable, but when actually going to buy, it is basically a house with "average price" above the price, and the salesperson will tell the buyer that the "average price" below is sold out. Many cities have implemented an online contract and online publicity system.
                         Go to the website of the relevant government department for real information
            </Text>

                    <Image
                        style={{ height: px(387), borderRadius: px(10), marginTop: px(40) }}
                        source={{ uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571116087393&di=06eee4a01a254d6a84df02010ba876fb&imgtype=0&src=http%3A%2F%2Fqiniuimg.qingmang.mobi%2Fimage%2Forion%2Fbfabf2536bb332d84b73ea39e11aa8cf_1200_800.jpeg' }} />
                </View>
                <View>
                    <Text style={{ color: '#333333', fontSize: px(32), marginTop: px(50), fontWeight: 'bold' }}>新增功能二</Text>
                    <View>
                        <Text style={{ lineHeight: px(105), color: '#333333', fontSize: px(28), fontWeight: 'bold' }}>1.首页顶部有了消息直通车：</Text>
                        <Text style={{ color: '#606266', fontSize: px(28), lineHeight: px(50), }}>There are only a few sets of locations and defective houses are sold at low prices, using their prices as "minimum price" and "starting price" 2. "Average price" sounds very favorable, but when actually going to buy, it is basically a house with "average price" above the price, and the salesperson will tell the buyer that the "average price" below is sold out. Many cities have implemented an online contract and online publicity system. Go to the website of the relevant government department for real information</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Image
                                style={{ height: px(187), width: px(335), borderRadius: px(10), marginTop: px(40) }}
                                source={{ uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571116087393&di=06eee4a01a254d6a84df02010ba876fb&imgtype=0&src=http%3A%2F%2Fqiniuimg.qingmang.mobi%2Fimage%2Forion%2Fbfabf2536bb332d84b73ea39e11aa8cf_1200_800.jpeg' }} />
                            <Image
                                style={{ height: px(187), width: px(335), borderRadius: px(10), marginTop: px(40) }}
                                source={{ uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571116087393&di=06eee4a01a254d6a84df02010ba876fb&imgtype=0&src=http%3A%2F%2Fqiniuimg.qingmang.mobi%2Fimage%2Forion%2Fbfabf2536bb332d84b73ea39e11aa8cf_1200_800.jpeg' }} />
                        </View>
                    </View>
                </View>
                <View>
                    <Text style={{ color: '#333333', fontSize: px(32), marginTop: px(50), fontWeight: 'bold' }}>新增功能二</Text>
                    <View>
                        <Text style={{ lineHeight: px(105), color: '#333333', fontSize: px(28), fontWeight: 'bold' }}>1.首页顶部有了消息直通车：</Text>
                        <Text style={{ color: '#606266', fontSize: px(28), lineHeight: px(50), }}>There are only a few sets of locations and defective houses are sold at low prices, using their prices as "minimum price" and "starting price" 2. "Average price" sounds very favorable, but when actually going to buy, it is basically a house with "average price" above the price, and the salesperson will tell the buyer that the "average price" below is sold out. Many cities have implemented an online contract and online publicity system. Go to the website of the relevant government department for real information</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Image
                                style={{ height: px(187), width: px(335), borderRadius: px(10), marginTop: px(40) }}
                                source={{ uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571116087393&di=06eee4a01a254d6a84df02010ba876fb&imgtype=0&src=http%3A%2F%2Fqiniuimg.qingmang.mobi%2Fimage%2Forion%2Fbfabf2536bb332d84b73ea39e11aa8cf_1200_800.jpeg' }} />
                            <Image
                                style={{ height: px(187), width: px(335), borderRadius: px(10), marginTop: px(40) }}
                                source={{ uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571116087393&di=06eee4a01a254d6a84df02010ba876fb&imgtype=0&src=http%3A%2F%2Fqiniuimg.qingmang.mobi%2Fimage%2Forion%2Fbfabf2536bb332d84b73ea39e11aa8cf_1200_800.jpeg' }} />
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    }
}
