// import React, { Component } from 'react';
// import { StyleSheet, Text, View, SectionList, Dimensions } from 'react-native';   //引入js文件

// var { width } = Dimensions.get('window');

// // type Props = {};
// export default class App extends Component {
//   constructor(props) { //构造器
//     super(props);
//     this.state = {
//       refreshing: false,  //是否刷新,通过更改此属性来控制是否刷新
//       sections: [   //数据源
//         { key: "A", data: [{ title: "啊是啊" }, { title: "阿玛尼" }, { title: "爱你" }] },
//         { key: "B", data: [{ title: "婊子" }, { title: "贝贝" }, { title: "表弟" }, { title: "表姐" }, { title: "表叔" }] },
//         { key: "C", data: [{ title: "陈鑫" }, { title: "吃点饭是" }] },
//         { key: "D", data: [{ title: "大哥" }, { title: "地方" }, { title: "大大" }, { title: "大鸡鸡" }, { title: "大屌" }, { title: "大屌me干嘛" }] },
//       ]
//     };
//   }
//   /*刷新*/
//   refresh() {
//     this.setState({
//       refreshing: true,
//     });
//     setTimeout(() => {  //通过定时器来模拟刷新
//       this.setState({
//         refreshing: false,
//       });
//     }, 2000);
//   }

//   render() {
//     return (
//       <View style={{ flex: 1, }}>
//         <SectionList
//           style={{ marginTop: 20, width: width }}
//           renderSectionHeader={this._sectionComp} //区头
//           renderItem={this._renderItem}   //cell
//           sections={this.state.sections}     //数据源
//           ItemSeparatorComponent={() => <View style={{ backgroundColor: 'red', height: 1 }}></View>}  //分割线
//           stickySectionHeadersEnabled={true}  //设置区头是否悬浮在屏幕顶部,默认是true
//           ListEmptyComponent={() => <Text>没有数据哦</Text>} // 数据为空时调用
//           initialNumToRender={2} //指定一开始渲染的元素数量，最好刚刚够填满一个屏幕，这样保证了用最短的时间给用户呈现可见的内容
//           onEndReachedThreshold={0.001}  //0.5表示距离内容最底部的距离为当前列表可见长度的一半时触发。
//           onEndReached={() => { alert(123) }}  //当列表被滚动到距离内容最底部不足onEndReachedThreshold的距离时调用。
//           setVerticalScrollBarEnabled={false}
//           setFastScrollEnabled={false}
//           refreshing={this.state.refreshing} // 是否刷新 ，自带刷新控件
//           onRefresh={() => {
//             this.refresh();
//           }} // 刷新方法,写了此方法，下拉才会出现  刷新控件，使用此方法必须写 refreshing
//           ListHeaderComponent={() => <View style={{ backgroundColor: '#25B960', alignItems: 'center', height: 30 }}><Text style={{ fontSize: 18, color: '#ffffff', lineHeight: 30 }}>通讯录</Text></View>}
//           ListFooterComponent={() => <View style={{ backgroundColor: '#25B960', alignItems: 'center', height: 30 }}><Text style={{ fontSize: 18, color: '#ffffff', lineHeight: 30 }}>通讯录尾部</Text></View>}
//         />
//       </View>
//     );
//   }
//   _renderItem = (info) => {
//     var txt = '  ' + info.item.title;   //取到数据源中的title
//     return <Text
//       style={{ height: 60, lineHeight: 60, textAlign: 'center', backgroundColor: "#ffffff", color: '#5C5C5C', fontSize: 15 }}>{txt}</Text>
//   }

//   _sectionComp = (info) => {
//     var txt = info.section.key;
//     return <Text
//       style={{ height: 50, textAlign: 'center', lineHeight: 50, backgroundColor: '#9CEBBC', color: 'white', fontSize: 30 }}>{txt}</Text>
//   }
// }



import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import Video from 'react-native-video';
import px from '../../../utils/px'

export default class AwesomeProject extends Component {
  constructor(props) {
    super(props); //必须有这句代码 父组件向子组件传递属性, 比如styles属性等
    this.player = null
    this.state = {
      bigButtonPointerEvents: null, //状态机变量控制大按钮是否工作,
      rate: 1,
      volume: 1,
      muted: false,
      resizeMode: 'contain',
      duration: 0.0,
      slideValue: 0.00,
      currentTime: 0,
      controls: false,
      paused: false,
      ignoreSilentSwitch: null,
      isBuffering: false,
      flag: true,
    };
  }



  render() {
    return (
      <View style={{flex:1}}>
        <Video
          ref={ref => this.player = ref}
          // source={require('../../../assets/test.mp4')}
          source={{ uri: 'http://vodkgeyttp9c.vod.126.net/vodkgeyttp8/cvTDRkxa_1752729779_shd.mp4?ts=1571901013&rid=47115DC667964F5C42BDE925D7219E80&rl=3&rs=ZXJpmcvkRpdCEMlzEoAKsvgyjbNKHcFV&sign=f2491b300a8e136c18522a714cbce0bd&ext=NnR5gMvHcZNcbCz592mDGUGuDOFN18isir07K1EOfL1V5r37gpQOXOvgziBcPWoPZqh4EHhlnhkR0Eo%2B75YOUCKMFq73irE6qWuj0L7fbdQ7BeLMqBUcSyyoPcrbRdLnCX3DlV98nBRyVzeYDp01vzjz8yVK08TT5H27QzXanlJvUZ1qrj8Zfoq8zafTvY4f4a52Cad0Arhst2x%2BlokPog%3D%3D' }} //我用的是本地视频
          style={{ flex:1 }}
          rate={this.state.rate}//播放速率
          paused={this.state.paused}//暂停
          volume={this.state.volume}//调节音量
          muted={this.state.muted}//控制音频是否静音
          ignoreSilentSwitch={this.state.ignoreSilentSwitch}
          //resizeMode={this.state.resizeMode}//视频尺寸设置
          resizeMode="contain"
          //onLoad={this.onLoad}//加载媒体并准备播放时调用的回调函数。
          //onBuffer={this.onBuffer}
          //onProgress={this.onProgress}//视频播放过程中每个间隔进度单位调用的回调函数
          //onEnd={(data) => this.onEnd(data)}//视频播放结束时的回调函数
          repeat={true}//确定在到达结尾时是否重复播放视频。
          controls={this.state.controls}
        />
        <View style={{paddingVertical:px(50)}}>
          <Button title={'暂停'} onPress={() => this.setState({paused:!this.state.paused})}></Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {   //根View样式
    flex: 1
  },
  sButtonStyle: {      // 小按钮的样式
    fontSize: 20,
    left: 130,
    top: 50,
    width: 150,
    height: 35,
    backgroundColor: 'green'
  },
  bButtonStyle: {     //大按钮的样式
    left: 130,
    top: 50,
    width: 150,
    height: 70,
    backgroundColor: 'grey',
    alignItems: 'center',
  }
});