import React, { Component } from 'react';
import { Button, Text, Platform, View, TextInput, TouchableOpacity, Image } from 'react-native'
import px from './utils/px'
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation'
const TITLE_OFFSET = Platform.OS === 'ios' ? 70 : 56;

import LoginPage from './pages/Login'
import SelectPage from './pages/Select'
//Home
import HomePage from './pages/Home'
import MetPage from './pages/Me'
import TdPage from './pages/Td'
import Local from './pages/Home/Local'
import Message from './pages/Home/Message'
import msgDetails from './pages/Home/Message/msgDetails'
import Mortgage from './pages/Home/Mortgage'
import computeResult from './pages/Home/Mortgage/computeResult'
import BuyHouse from './pages/Home/buyHouse'
import HouseDetails from './pages/Home/buyHouse/HouseDetails'
import Developer from './pages/Home/Developer'
import Experience from './pages/Home/Experience'
import CommentList from './pages/Home/CommentList'
import CommentDetails from './pages/Home/CommentList/CommentDetails'
//3D
import P_BasicInfo from './pages/Td/PropertyPage/P_BasicInfo'
import P_DetailsInfo from './pages/Td/PropertyPage/P_DetailsInfo'
import P_Album from './pages/Td/PropertyPage/P_Album'
import P_tD from './pages/Td/PropertyPage/P_tD'
import Review from './pages/Td/PropertyPage/Review'
import ReviewDetails from './pages/Td/PropertyPage/ReviewDetails'
import H_BasicInfo from './pages/Td/HousetypePage/H_BasicInfo'
import Owner from './pages/Td/Owner'
import H_tD from './pages/Td/HousetypePage/H_tD'
import H_Album from './pages/Td/HousetypePage/H_Album'
//Me
import Me from './pages/Me'
import Info from './pages/Me/Info';
import NickName from './pages/Me/Info/NickName'
import Setting from './pages/Me/Setting';
import QRcode from './pages/Me/Setting/QRcode';
import AboutOurs from './pages/Me/Setting/AboutOurs';
import Footprint from './pages/Me/Footprint'
import Attention from './pages/Me/Attention'
import callRecords from './pages/Me/callRecords'
import Notification from './pages/Me/Notification'


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
    inactiveTintColor: '#666666',
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
      height: px(100),
      paddingTop: px(10)
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
  Owner: {
    screen: Owner,
    navigationOptions: {
      header: null
    }
  },
  Me: {
    screen: Me,
    navigationOptions: {
      header: null
    }
  },
  Local: {
    screen: Local,
    navigationOptions: {
      header: null
    }
  },
  Message: {
    screen: Message,
    headerLayoutPreset: "center",
    navigationOptions: ({ navigation }) => ({
      title: '消息通知',
      headerTitleStyle: {
        textAlign: 'center',
        flex: 1,
        fontSize: px(36),
        color: '#333333'
      },
      headerRight: (
        <Text
          style={{ fontSize: px(30), textAlign: 'center', marginEnd: px(30), color: '#EA4C4C', }}
          onPress={() => {
            console.log(navigation.state.params.mode)
            navigation.state.params.msManagement()
            navigation.setParams({ mode: navigation.state.params.mode == 'edit' ? '' : 'edit' })
          }}
        >{'管理'}</Text>
      ),
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={1}>
          <Image
            style={{ width: px(56), height: px(56), marginStart: px(3) }}
            source={require('./assets/images/nav_icon_back.png')} />
        </TouchableOpacity>
      )
    })
  },
  msgDetails: {
    screen: msgDetails,
    navigationOptions: ({ navigation }) => ({
      title: '消息详情',
      headerTitleStyle: {
        textAlign: 'center',
        flex: 1,
        fontSize: px(36),
        color: '#333333'
      },
      headerTitleContainerStyle: {
        left: TITLE_OFFSET,
        right: TITLE_OFFSET,
      },
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={1}>
          <Image
            style={{ width: px(56), height: px(56), marginStart: px(3) }}
            source={require('./assets/images/nav_icon_back.png')} />
        </TouchableOpacity>
      )
    })
  },
  Mortgage: {
    screen: Mortgage,
    navigationOptions: ({ navigation }) => ({
      title: '房贷计算器',
      headerTitleStyle: {
        textAlign: 'center',
        flex: 1,
        fontSize: px(36),
        color: '#333333'
      },
      headerTitleContainerStyle: {
        left: TITLE_OFFSET,
        right: TITLE_OFFSET,
      },
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={1}>
          <Image
            style={{ width: px(56), height: px(56), marginStart: px(3) }}
            source={require('./assets/images/nav_icon_back.png')} />
        </TouchableOpacity>
      )
    })
  },
  computeResult: {
    screen: computeResult,
    navigationOptions: ({ navigation }) => ({
      title: '房贷计算器',
      headerTitleStyle: {
        textAlign: 'center',
        flex: 1,
        fontSize: px(36),
        color: '#333333'
      },
      headerTitleContainerStyle: {
        left: TITLE_OFFSET,
        right: TITLE_OFFSET,
      },
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={1}>
          <Image
            style={{ width: px(56), height: px(56), marginStart: px(3) }}
            source={require('./assets/images/nav_icon_back.png')} />
        </TouchableOpacity>
      )
    })
  },
  BuyHouse: {
    screen: BuyHouse,
    navigationOptions: ({ navigation }) => ({
      title: '购房知识库',
      headerTitleStyle: {
        textAlign: 'center',
        flex: 1,
        fontSize: px(36),
        color: '#333333'
      },
      headerTitleContainerStyle: {
        left: TITLE_OFFSET,
        right: TITLE_OFFSET,
      },
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={1}>
          <Image
            style={{ width: px(56), height: px(56), marginStart: px(3) }}
            source={require('./assets/images/nav_icon_back.png')} />
        </TouchableOpacity>
      )
    })
  },
  HouseDetails: {
    screen: HouseDetails,
    navigationOptions: ({ navigation }) => ({
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={1}>
          <Image
            style={{ width: px(56), height: px(56), marginStart: px(3) }}
            source={require('./assets/images/nav_icon_back.png')} />
        </TouchableOpacity>
      )
    })
  },
  CommentList: {
    screen: CommentList,
    navigationOptions: ({ navigation }) => ({
      title: '评论专区',
      headerTitleStyle: {
        textAlign: 'center',
        flex: 1,
        fontSize: px(36),
        color: '#333333'
      },
      headerTitleContainerStyle: {
        left: TITLE_OFFSET,
        right: TITLE_OFFSET,
      },
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={1}>
          <Image
            style={{ width: px(56), height: px(56), marginStart: px(3) }}
            source={require('./assets/images/nav_icon_back.png')} />
        </TouchableOpacity>
      ),
      headerRight: (
        <Text
          style={{ fontSize: px(30), textAlign: 'center', marginEnd: px(30), color: '#EA4C4C', }}
          onPress={() => navigation.state.params.navigatePress()}
        >我也发布</Text>
      ),
    })
  },
  CommentDetails: {
    screen: CommentDetails,
    navigationOptions: ({ navigation }) => ({
      title: '评论详情',
      headerTitleStyle: {
        textAlign: 'center',
        flex: 1,
        fontSize: px(36),
        color: '#333333'
      },
      headerTitleContainerStyle: {
        left: TITLE_OFFSET,
        right: TITLE_OFFSET,
      },
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={1}>
          <Image
            style={{ width: px(56), height: px(56), marginStart: px(3) }}
            source={require('./assets/images/nav_icon_back.png')} />
        </TouchableOpacity>
      )
    })
  },
  Developer: {
    screen: Developer,
    navigationOptions: ({ navigation }) => ({
      title: '开发商专栏',
      headerTitleStyle: {
        textAlign: 'center',
        flex: 1,
        fontSize: px(36),
        color: '#333333'
      },
      headerTitleContainerStyle: {
        left: TITLE_OFFSET,
        right: TITLE_OFFSET,
      },
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={1}>
          <Image
            style={{ width: px(56), height: px(56), marginStart: px(3) }}
            source={require('./assets/images/nav_icon_back.png')} />
        </TouchableOpacity>
      )
    })
  },
  Experience: {
    screen: Experience,
    navigationOptions: ({ navigation }) => ({
      title: '3D体验区',
      headerTitleStyle: {
        textAlign: 'center',
        flex: 1,
        fontSize: px(36),
        color: '#333333'
      },
      headerTitleContainerStyle: {
        left: TITLE_OFFSET,
        right: TITLE_OFFSET,
      },
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={1}>
          <Image
            style={{ width: px(56), height: px(56), marginStart: px(3) }}
            source={require('./assets/images/nav_icon_back.png')} />
        </TouchableOpacity>
      )
    })
  },
  P_BasicInfo: {
    screen: P_BasicInfo,
    navigationOptions: {
      header: null
    }
  },
  Info: {
    screen: Info,
    navigationOptions: ({ navigation }) => ({
      title: '个人资料',
      headerTitleStyle: {
        textAlign: 'center',
        flex: 1,
        fontSize: px(36),
        color: '#333333'
      },
      headerTitleContainerStyle: {
        left: TITLE_OFFSET,
        right: TITLE_OFFSET,
      },
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={1}>
          <Image
            style={{ width: px(56), height: px(56), marginStart: px(3) }}
            source={require('./assets/images/nav_icon_back.png')} />
        </TouchableOpacity>
      )
    })
  },
  P_DetailsInfo: {
    screen: P_DetailsInfo,
    navigationOptions: ({ navigation }) => ({
      title: '信息详情',
      headerTitleStyle: {
        textAlign: 'center',
        flex: 1,
        fontSize: px(36),
        color: '#333333'
      },
      headerTitleContainerStyle: {
        left: TITLE_OFFSET,
        right: TITLE_OFFSET,
      },
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={1}>
          <Image
            style={{ width: px(56), height: px(56), marginStart: px(3) }}
            source={require('./assets/images/nav_icon_back.png')} />
        </TouchableOpacity>
      )
    })
  },
  P_tD: {
    screen: P_tD,
    navigationOptions: {
      header: null
    }
  },
  P_Album: {
    screen: P_Album,
    navigationOptions: ({ navigation }) => ({
      title: '楼盘相册',
      headerTitleStyle: {
        textAlign: 'center',
        flex: 1,
        fontSize: px(36),
        color: '#333333'
      },
      headerTitleContainerStyle: {
        left: TITLE_OFFSET,
        right: TITLE_OFFSET,
      },
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={1}>
          <Image
            style={{ width: px(56), height: px(56), marginStart: px(3) }}
            source={require('./assets/images/nav_icon_back.png')} />
        </TouchableOpacity>
      )
    })
  },
  Review: {
    screen: Review,
    navigationOptions: ({ navigation }) => ({
      title: '楼盘点评',
      headerTitleStyle: {
        textAlign: 'center',
        flex: 1,
        fontSize: px(36),
        color: '#333333'
      },
      headerTitleContainerStyle: {
        left: TITLE_OFFSET,
        right: TITLE_OFFSET,
      },
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={1}>
          <Image
            style={{ width: px(56), height: px(56), marginStart: px(3) }}
            source={require('./assets/images/nav_icon_back.png')} />
        </TouchableOpacity>
      )
    })
  },
  ReviewDetails: {
    screen: ReviewDetails,
    navigationOptions: ({ navigation }) => ({
      title: '回复详情',
      headerTitleStyle: {
        textAlign: 'center',
        flex: 1,
        fontSize: px(36),
        color: '#333333'
      },
      headerTitleContainerStyle: {
        left: TITLE_OFFSET,
        right: TITLE_OFFSET,
      },
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={1}>
          <Image
            style={{ width: px(56), height: px(56), marginStart: px(3) }}
            source={require('./assets/images/nav_icon_back.png')} />
        </TouchableOpacity>
      )
    })
  },
  H_BasicInfo: {
    screen: H_BasicInfo,
    navigationOptions: {
      header: null
    }
  },
  H_tD: {
    screen: H_tD,
    navigationOptions: {
      header: null
    }
  },
  H_Album:{
    screen: H_Album,
    navigationOptions: ({ navigation }) => ({
      title: '户型相册',
      headerTitleStyle: {
        textAlign: 'center',
        flex: 1,
        fontSize: px(36),
        color: '#333333'
      },
      headerTitleContainerStyle: {
        left: TITLE_OFFSET,
        right: TITLE_OFFSET,
      },
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={1}>
          <Image
            style={{ width: px(56), height: px(56), marginStart: px(3) }}
            source={require('./assets/images/nav_icon_back.png')} />
        </TouchableOpacity>
      )
    })
  },
  NickName: {
    screen: NickName,
    navigationOptions: ({ navigation }) => ({
      title: '昵称',
      headerTitleStyle: {
        textAlign: 'center',
        flex: 1,
        fontSize: px(36),
        color: '#333333'
      },
      headerTitleContainerStyle: {
        left: TITLE_OFFSET,
        right: TITLE_OFFSET,
      },
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={1}>
          <Image
            style={{ width: px(56), height: px(56), marginStart: px(3) }}
            source={require('./assets/images/nav_icon_back.png')} />
        </TouchableOpacity>
      ),
      headerRight: (
        <Text
          style={{ fontSize: px(30), textAlign: 'center', marginEnd: px(30), }}
          onPress={() => {
            navigation.goBack()
            navigation.state.params.setName({ nickname: navigation.state.params.newName })
          }}
        >保存</Text>
      ),
    })
  },
  Setting: {
    screen: Setting,
    navigationOptions: ({ navigation }) => ({
      title: '设置',
      headerTitleStyle: {
        textAlign: 'center',
        flex: 1,
        fontSize: px(36),
        color: '#333333'
      },
      headerTitleContainerStyle: {
        left: TITLE_OFFSET,
        right: TITLE_OFFSET,
      },
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={1}>
          <Image
            style={{ width: px(56), height: px(56), marginStart: px(3) }}
            source={require('./assets/images/nav_icon_back.png')} />
        </TouchableOpacity>
      )
    })
  },
  QRcode: {
    screen: QRcode,
    navigationOptions: ({ navigation }) => ({
      title: '推荐二维码',
      headerTitleStyle: {
        textAlign: 'center',
        flex: 1,
        fontSize: px(36),
        color: '#333333'
      },
      headerTitleContainerStyle: {
        left: TITLE_OFFSET,
        right: TITLE_OFFSET,
      },
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={1}>
          <Image
            style={{ width: px(56), height: px(56), marginStart: px(3) }}
            source={require('./assets/images/nav_icon_back.png')} />
        </TouchableOpacity>
      )
    })
  },
  AboutOurs: {
    screen: AboutOurs,
    navigationOptions: ({ navigation }) => ({
      title: '推荐二维码',
      headerTitleStyle: {
        textAlign: 'center',
        flex: 1,
        fontSize: px(36),
        color: '#333333'
      },
      headerTitleContainerStyle: {
        left: TITLE_OFFSET,
        right: TITLE_OFFSET,
      },
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={1}>
          <Image
            style={{ width: px(56), height: px(56), marginStart: px(3) }}
            source={require('./assets/images/nav_icon_back.png')} />
        </TouchableOpacity>
      ),
    })
  },
  Footprint: {
    screen: Footprint,
    navigationOptions: ({ navigation }) => ({
      title: '我的足迹',
      headerTitleStyle: {
        textAlign: 'center',
        flex: 1,
        fontSize: px(36),
        color: '#333333'
      },
      headerTitleContainerStyle: {
        left: TITLE_OFFSET,
        right: TITLE_OFFSET,
      },
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={1}>
          <Image
            style={{ width: px(56), height: px(56), marginStart: px(3) }}
            source={require('./assets/images/nav_icon_back.png')} />
        </TouchableOpacity>
      ),
      headerRight: (
        <Text
          style={{ fontSize: px(30), textAlign: 'center', marginEnd: px(30), }}
        // onPress={() => {
        //   navigation.state.params.msManagement()
        //   navigation.setParams({ mode: navigation.state.params.mode === 'edit' ? '' : 'edit' })
        // }}
        >清除足迹</Text>
      ),
    })
  },
  Attention: {
    screen: Attention,
    navigationOptions: ({ navigation }) => ({
      title: '我的关注',
      headerTitleStyle: {
        textAlign: 'center',
        flex: 1,
        fontSize: px(36),
        color: '#333333'
      },
      headerTitleContainerStyle: {
        left: TITLE_OFFSET,
        right: TITLE_OFFSET,
      },
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={1}>
          <Image
            style={{ width: px(56), height: px(56), marginStart: px(3) }}
            source={require('./assets/images/nav_icon_back.png')} />
        </TouchableOpacity>
      ),
    })
  },
  callRecords: {
    screen: callRecords,
    navigationOptions: ({ navigation }) => ({
      title: '联系记录',
      headerTitleStyle: {
        textAlign: 'center',
        flex: 1,
        fontSize: px(36),
        color: '#333333'
      },
      headerTitleContainerStyle: {
        left: TITLE_OFFSET,
        right: TITLE_OFFSET,
      },
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={1}>
          <Image
            style={{ width: px(56), height: px(56), marginStart: px(3) }}
            source={require('./assets/images/nav_icon_back.png')} />
        </TouchableOpacity>
      ),
    })
  },
  Notification: {
    screen: Notification,
    navigationOptions: ({ navigation }) => ({
      title: '消息通知',
      headerTitleStyle: {
        textAlign: 'center',
        flex: 1,
        fontSize: px(36),
        color: '#333333'
      },
      headerTitleContainerStyle: {
        left: TITLE_OFFSET,
        right: TITLE_OFFSET,
      },
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={1}>
          <Image
            style={{ width: px(56), height: px(56), marginStart: px(3) }}
            source={require('./assets/images/nav_icon_back.png')} />
        </TouchableOpacity>
      ),
    })
  },

}, {
  initialRouteName: 'Main',
});
export default function configAppNavigator(isLoggedIn) {
  return createAppContainer(createSwitchNavigator(
    {
      Main: MainStack,
      Login: LoginStack,
    },
    {
      initialRouteName: isLoggedIn ? 'Main' : 'Login',
    })
  );
}