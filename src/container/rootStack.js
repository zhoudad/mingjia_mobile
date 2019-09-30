import React, { Component } from 'react';
import {
    View,
    Text,
} from 'react-native';
import {
    createAppContainer,
    createSwitchNavigator,
    createStackNavigator,
    createBottomTabNavigator
} from 'react-navigation'

import LoginPage from '../pages/Login'
import SelectPage from '../pages/Select'
import HomePage from '../pages/Home'
import MetPage from '../pages/Me'
import TdPage from '../pages/Td'
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
        activeTintColor: '#ffe1e1',
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
            margin: 1
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
}, {
    initialRouteName: 'Main',
});
export default createAppContainer(createSwitchNavigator(
    {
        Main: MainStack,
        Login: LoginStack,
    },
    {
        initialRouteName: 'Login',
    })
);