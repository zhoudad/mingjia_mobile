import React, { Component } from 'react';
<<<<<<< HEAD
import { Button, Text, Platform, View, TextInput, TouchableOpacity,Image } from 'react-native'
import px from '../utils/px'
=======
import { View, Text,Image } from 'react-native';
>>>>>>> ae4af7cc92f552875636025321b36cdadda85381
import {
    createAppContainer,
    createSwitchNavigator,
    createStackNavigator,
    createBottomTabNavigator
} from 'react-navigation'
const TITLE_OFFSET = Platform.OS === 'ios' ? 70 : 56;

import LoginPage from '../pages/Login'
import SelectPage from '../pages/Select'
import HomePage from '../pages/Home'
import MetPage from '../pages/Me'
import TdPage from '../pages/Td'
<<<<<<< HEAD
import Local from '../pages/Home/Local'
import Message from '../pages/Home/Message'
import msgDetails from '../pages/Home/Message/msgDetails'
import Mortgage from '../pages/Home/Mortgage'
import computeResult from '../pages/Home/Mortgage/computeResult'
import BuyHouse from '../pages/Home/buyHouse'
import HouseDetails from '../pages/Home/buyHouse/HouseDetails'
import CommentList from '../pages/Home/CommentList'
import CommentDetails from '../pages/Home/CommentList/CommentDetails'

=======
import BasicInfo from '../pages/Td/BasicInfo'
>>>>>>> ae4af7cc92f552875636025321b36cdadda85381
const TabNav = createBottomTabNavigator(
    {
        Home: {
            screen: HomePage,
            navigationOptions: ({ navigation }) => ({ header: null, gesturesEnable: true })
        },
        Td: {
            screen: TdPage,
            navigationOptions: ({ navigation }) => ({ header: null, gesturesEnable: true })
        },
        Me: {
            screen: MetPage,
            navigationOptions: ({ navigation }) => ({ header: null, gesturesEnable: true })
        }
    }, {
    tabBarOptions: {
        //当前选中的tab bar的文本颜色和图标颜色
        activeTintColor: '#EA4C4C',
        //当前未选中的tab bar的文本颜色和图标颜色
        inactiveTintColor: '#ddd',
        //是否显示tab bar的图标，默认是false
        showIcon: true,
        //showLabel - 是否显示tab bar的文本，默认是true
        showLabel: true,
        //是否将文本转换为大小，默认是true
        upperCaseLabel: false,
        //material design中的波纹颜色(仅支持Android >= 5.0)
        pressColor: '#788493',
        //按下tab bar时的不透明度(仅支持iOS和Android < 5.0).
        pressOpacity: 0.8,
        //tab bar的样式
        style: {
            backgroundColor: '#fff',
            paddingBottom: 1,
            borderTopWidth: 0.2,
            paddingTop: 1,
            borderTopColor: '#ccc',
        },
        //tab bar的文本样式
        labelStyle: {
            fontSize: 11,
            margin: 1,
        },
        //tab 页指示符的样式 (tab页下面的一条线).
        indicatorStyle: { height: 0 },
    },
    //tab bar的位置, 可选值： 'top' or 'bottom'
    tabBarPosition: 'bottom',
    //是否允许滑动切换tab页
    swipeEnabled: true,
    //是否在切换tab页时使用动画
    animationEnabled: false,
    //是否懒加载
    lazy: true,
    //返回按钮是否会导致tab切换到初始tab页？ 如果是，则设置为initialRoute，否则为none。 缺省为initialRoute。
    // backBehavior: 'none',
});
const LoginStack = createStackNavigator({
    Login: {
        screen: LoginPage,
        navigationOptions: {
            header: null
        }
    },
    Select: {
        screen: SelectPage,
        navigationOptions: {
            header: null
        }
    },
}, {
    initialRouteName: 'Login',
});
const MainStack = createStackNavigator({
    Main: {
        screen: TabNav,
        navigationOptions: {
            header: null
        }
    },
<<<<<<< HEAD
    Local: {
        screen: Local,
        navigationOptions: {
            header: null
        }
    },
    Message: {
        screen: Message,
        headerLayoutPreset: "center",
        navigationOptions :({navigation}) => ({
            title: '消息通知',
            headerTitleStyle: {
                textAlign: 'center',
                flex: 1,
                fontSize: px(36),
                color:'#333333'
            },
            headerRight: (
                <Text 
                style={{ fontSize: px(32), textAlign: 'center', marginEnd:px(30),color: '#EA4C4C', }}
                onPress={() => {
                    navigation.state.params.msManagement()
                    navigation.setParams({ mode: navigation.state.params.mode === 'edit' ? '' : 'edit' })
                  }}
                >管理</Text>
            ),
            headerLeft:(
                <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={1}>
                    <Image 
                    style={{ width: px(56), height: px(56), marginStart: px(3) }}
                    source={require('../assets/images/nav_icon_back.png')}/>
                </TouchableOpacity>
            )
        })
    },
    msgDetails:{
        screen: msgDetails,
        navigationOptions :({navigation}) =>({
            title: '消息详情',
            headerTitleStyle: {
                textAlign: 'center',
                flex: 1,
                fontSize: px(36),
                color:'#333333'
            },
            headerTitleContainerStyle: {
                left: TITLE_OFFSET,
                right: TITLE_OFFSET,
              },
            headerLeft:(
                <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={1}>
                    <Image 
                    style={{ width: px(56), height: px(56), marginStart: px(3) }}
                    source={require('../assets/images/nav_icon_back.png')}/>
                </TouchableOpacity>
            )
        })
    },
    Mortgage:{
        screen: Mortgage,
        navigationOptions :({navigation}) =>({
            title: '房贷计算器',
            headerTitleStyle: {
                textAlign: 'center',
                flex: 1,
                fontSize: px(36),
                color:'#333333'
            },
            headerTitleContainerStyle: {
                left: TITLE_OFFSET,
                right: TITLE_OFFSET,
              },
            headerLeft:(
                <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={1}>
                    <Image 
                    style={{ width: px(56), height: px(56), marginStart: px(3) }}
                    source={require('../assets/images/nav_icon_back.png')}/>
                </TouchableOpacity>
            )
        })
    },
    computeResult:{
        screen: computeResult,
        navigationOptions :({navigation}) =>({
            title: '房贷计算器',
            headerTitleStyle: {
                textAlign: 'center',
                flex: 1,
                fontSize: px(36),
                color:'#333333'
            },
            headerTitleContainerStyle: {
                left: TITLE_OFFSET,
                right: TITLE_OFFSET,
              },
            headerLeft:(
                <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={1}>
                    <Image 
                    style={{ width: px(56), height: px(56), marginStart: px(3) }}
                    source={require('../assets/images/nav_icon_back.png')}/>
                </TouchableOpacity>
            )
        })
    },
    BuyHouse:{
        screen: BuyHouse,
        navigationOptions :({navigation}) =>({
            title: '购房知识库',
            headerTitleStyle: {
                textAlign: 'center',
                flex: 1,
                fontSize: px(36),
                color:'#333333'
            },
            headerTitleContainerStyle: {
                left: TITLE_OFFSET,
                right: TITLE_OFFSET,
              },
            headerLeft:(
                <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={1}>
                    <Image 
                    style={{ width: px(56), height: px(56), marginStart: px(3) }}
                    source={require('../assets/images/nav_icon_back.png')}/>
                </TouchableOpacity>
            )
        })
    },
    HouseDetails:{
        screen: HouseDetails,
        navigationOptions :({navigation}) =>({
            headerLeft:(
                <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={1}>
                    <Image 
                    style={{ width: px(56), height: px(56), marginStart: px(3) }}
                    source={require('../assets/images/nav_icon_back.png')}/>
                </TouchableOpacity>
            )
        })
    },
    CommentList:{
        screen: CommentList,
        navigationOptions :({navigation}) =>({
            title: '评论专区',
            headerTitleStyle: {
                textAlign: 'center',
                flex: 1,
                fontSize: px(36),
                color:'#333333'
            },
            headerTitleContainerStyle: {
                left: TITLE_OFFSET,
                right: TITLE_OFFSET,
              },
            headerLeft:(
                <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={1}>
                    <Image 
                    style={{ width: px(56), height: px(56), marginStart: px(3) }}
                    source={require('../assets/images/nav_icon_back.png')}/>
                </TouchableOpacity>
            ),
            headerRight: (
                <Text 
                style={{ fontSize: px(32), textAlign: 'center', marginEnd:px(30),color: '#EA4C4C', }}
                // onPress={() => {
                //     navigation.state.params.msManagement()
                //     navigation.setParams({ mode: navigation.state.params.mode === 'edit' ? '' : 'edit' })
                //   }}
                >我也发布</Text>
            ),
        })
    },
    
=======
    BasicInfo: {
        screen: BasicInfo,
        navigationOptions: {
            header: null
        }
    }
>>>>>>> ae4af7cc92f552875636025321b36cdadda85381
}, {
    initialRouteName: 'CommentList',
});
export default createAppContainer(createSwitchNavigator(
    {
        Main: MainStack,
        Login: LoginStack,
    },
    {
        initialRouteName: 'Main',
    })
);