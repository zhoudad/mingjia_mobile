import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  Animated,
  StyleSheet,
  Platform ,
  Dimensions, BackHandler
} from 'react-native';
import PropTypes from 'prop-types';
// import AntDesign from 'react-native-vector-icons/AntDesign'; 
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import GlobalStyles from '../../../res/styles/GlobalStyles';
import { itemData } from './Data';
import Touchable from './Touchable';
import Couverture from './Couverture';
import Icon from './Icon'

const { width, height } = Dimensions.get('window');

let self = {};

class ActionBarItem extends Component {

  static propTypes = {
    /**
     * 传递进来的对象
     */
    data: PropTypes.object,
    /**
     * 弹窗的高度
     */
    maxHeight: PropTypes.number,
    /**
     * 主题颜色
     */
    themeColor: PropTypes.string,
    /**
     * 确认按钮的回调
     */
    handleSubmit: PropTypes.func,
    /**
     * 点击的回调
     */
    bannerAction: PropTypes.func,
    /**
     * 是否展开
     */
    isActive: PropTypes.bool,
    /**
     * 单选还是多选
     */
    isSelect: PropTypes.bool
  };

  static defaultProps = {
    themeColor: '#ff8f26',
    maxHeight: 200,
    handleSubmit: obj => console.log(obj),
    bannerAction: obj => console.log(obj),
    data: itemData,
    isActive: false,
    isSelect: true
  };

  constructor(props) {
    super(props);
    this.state = {
      // 展开还是收起
      isActive: false,
      // 下标数组
      selectKeys: [],
      // 被选中的项
      selectItems: [],
      rotationAnim: new Animated.Value(0),
      fadeAnim: new Animated.Value(0), // 透明度初始值设为0
    };
    // 是否展示遮罩层
    this.isShowCouver = false;
    self = this;
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  shouldComponentUpdate(nextProps) {
    const { isActive } = nextProps;
    // 如果要关闭
    // console.log(isActive)
    if (!isActive) {
      if (this.isShowCouver) {
        this.closePanel();
      }
    } else if (!this.isShowCouver) {
      this.openPanel();
    }
    return true;
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  // 安卓返回键关闭APP
  onBackPress = () => {
    const { isActive, bannerAction } = this.props;
    if (isActive) {
      bannerAction('close');
      return true;
    }
    return false;
  };

  // 渲染每一项
  renderChcek = (item, themeColor) => {
    const { selectKeys } = this.state;
    let itemIndex = -1;
    if (selectKeys) {
      // 获取对应的标识
      itemIndex = selectKeys.indexOf(item.id);
    }
    // 获取对应的icon
    return (
      <React.Fragment>
        <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15, flexDirection: 'row', }} >
          <View style={{ alignItems: 'center', flexDirection: 'row' }}>
            <View style={{ opacity: 1, width: 16, height: 16, marginRight: 5, }} />
            <Text>{item.text}</Text>
          </View>
          {itemIndex > -1 && (//等同于if语句
            <Icon
              name="wode"
              size={16}
              style={{
                marginRight: 10,
                alignSelf: 'center',
                color: this.themeColor,
              }}
            />
          )}
        </View>
        {itemIndex > -1 && (
          <View style={{ backgroundColor: themeColor }} />
        )}
      </React.Fragment>
    );
  };

  // 提交操作
  handleSubmit = (type) => {
    // 关闭
    this.openOrClosePanel('close');
    const { handleSubmit } = this.props;
    const { selectItems } = this.state;
    handleSubmit(selectItems, type);
  };

  /**
   * 说明：生成下拉菜单
   */
  renderActivityPanel = () => {

    // 得到数据
    const { data: { items } } = this.props;

    // 得到最大高度
    const { maxHeight, themeColor } = this.props;

    const { rotationAnim } = this.state;

    return (
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 38,
          bottom: 0,
          // zIndex: -3,
          zIndex: 30,
        }}
      >
        <Animated.View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: -(maxHeight + 50),
            width,
            // zIndex: -3,
            transform: [
              {
                translateY: rotationAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, maxHeight + 50]
                })
              },
            ]
          }}
        >
          <View style={{ height: maxHeight,flexDirection:'row' }}>
            <View style={{ flex: 1 }}>
              <ScrollView
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  backgroundColor: '#fff',
                }}
              >
                <View style={{ height: 40, backgroundColor: '#eee', }}>
                  <Text style={{ lineHeight: 40, textAlign: 'center' }}>区域</Text>
                </View>
              </ScrollView>
            </View>
            <View style={{ flex: 1 }}>
              <ScrollView
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  backgroundColor: '#fff',
                }}
              >
                {items.map(item => (
                <Touchable
                  key={item.id}
                  style={{ flex: 1, height: 39,borderBottomColor: '#ddd',borderBottomWidth: 1,borderLeftColor:'#ddd',borderLeftWidth:1 }}
                  onPress={() => this.itemOnPress(item)}
                >
                  {this.renderChcek(item, themeColor)}
                </Touchable>
              ))}
              </ScrollView>
            </View>
            <View style={{ flex: 1 ,}}>
              <ScrollView
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  backgroundColor: '#fff',
                }}
              >
                {items.map(item => (
                <Touchable
                  key={item.id}
                  style={{ flex: 1, height: 39,borderBottomColor: '#ddd',borderBottomWidth: 1,borderLeftColor:'#ddd',borderLeftWidth:1 }}
                  onPress={() => this.itemOnPress(item)}
                >
                  {this.renderChcek(item, themeColor)}
                </Touchable>
              ))}
              </ScrollView>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <Touchable style={styles.cancel_button} onPress={() => this.handleSubmit('cancel')}>
              <View style={styles.button_text_view}>
                <Text style={styles.cancel_button_text}>重置</Text>
              </View>
            </Touchable>
            <Touchable style={styles.warning_button} onPress={this.handleSubmit}>
              <View style={styles.button_text_view}>
                <Text style={styles.warning_button_text}>确定</Text>
              </View>
            </Touchable>
          </View>

        </Animated.View>
      </View>
    );
  };

  openPanel = () => {
    const { rotationAnim, fadeAnim } = this.state;
    this.isShowCouver = true;
    rotationAnim.setValue(0);
    Animated.parallel([
      // 使用宽松函数让数值随时间动起来。
      Animated.spring( // 随时间变化而执行动画
        rotationAnim, // 动画中的变量值
        {
          toValue: 1, // 透明度最终变为1，即完全不透明
          duration: 300, // 让动画持续一段时间
          useNativeDriver: true // <-- 加上这一行
        }
      ),
      // 使用宽松函数让数值随时间动起来。
      Animated.spring( // 随时间变化而执行动画
        fadeAnim, // 动画中的变量值
        {
          toValue: 0.5, // 透明度最终变为1，即完全不透明
          duration: 300, // 让动画持续一段时间
          useNativeDriver: true // <-- 加上这一行
        }
      )
    ]).start();
  };

  // 关闭动画
  closePanel = () => {
    const { rotationAnim } = this.state;
    this.isShowCouver = false;
    rotationAnim.setValue(1);
    // 这里只执行弹窗的动画，是因为遮罩层组件在切换的时候，已经被卸载了
    Animated.spring(
      rotationAnim,
      {
        toValue: 0,
        duration: 300,
        useNativeDriver: true // <-- 加上这一行
      }
    ).start();
  };

  // 格式化字符串
  split = data => (data.length > 4 ? data.substring(0, 4) + '...' : data);

  // 对应的项点击
  itemOnPress = (item) => {
    const { selectItems, selectKeys } = this.state;
    const { isSelect } = this.props;
    if (isSelect) {
      // 点击之后，我们判断是否是被选中了的
      if (selectKeys.indexOf(item.id) > -1) {
        // 被选中了 取消选中
        const itemIndex = selectKeys.indexOf(item.id);
        // 移除这一项
        selectItems.splice(itemIndex, 1);
        selectKeys.splice(itemIndex, 1);
      } else {
        // 没有选中，就选中它
        selectItems.push(item);
        selectKeys.push(item.id);
      }
    } else {
      // 如果当前被选中了，取消
      // 点击之后，我们判断是否是被选中了的
      if (selectKeys.indexOf(item.id) > -1) {
        // 移除这一项
        selectItems.length = 0;
        selectKeys.length = 0;
      } else {
        // 没有选中，就选中它
        selectItems.push(item);
        selectKeys.push(item.id);
      }
    }
    // 更新数据
    this.setState({
      selectItems,
      selectKeys
    });
  };

  /**
   * 说明：展开或者收起列表
   * @param flag 展开还是收起
   */
  openOrClosePanel = (flag) => {
    const { bannerAction } = this.props;
    if (flag === 'close') {
      // 关闭
      bannerAction(false);
      return;
    }
    bannerAction(true);
  };

  render() {

    const { data, themeColor, isActive } = this.props;
    const { selectItems, fadeAnim } = this.state;

    // 选中的文字
    let itemNames = '';
    selectItems.forEach((item) => { itemNames += item.text; });

    return (
      <React.Fragment>
<<<<<<< HEAD
       
       
=======
        <Couverture
          onPress={() => this.openOrClosePanel('close')}
          isShow={isActive}
          opacity={fadeAnim}
        />
        {this.renderActivityPanel()}
>>>>>>> ae4af7cc92f552875636025321b36cdadda85381
        <View style={{ flex: 1,}}>
          <View
            style={{
              flexDirection: 'row',
              height: 40,
              zIndex: 30,
            }}
          >
            <Touchable
              activeOpacity={1}
              onPress={this.openOrClosePanel}
              style={{
                flex: 1,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: themeColor
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text
                  style={[
                    styles.title_style,
                    {
                      color: '#fff'
                    }
                  ]}
                >
                  {/* 结果的展示 */}
                  {selectItems.length === 0 ? data.title : this.split(itemNames)}
                </Text>
                <Icon
                  // name={isActive ? 'ios-arrow-up' : 'ios-arrow-down'}
                  name={'wode'}
                  size={16}
                  style={{
                    marginRight: 10,
                    alignSelf: 'center',
                    color: '#fff',
                  }}
                />
              </View>
            </Touchable>
          </View>
        </View>
<<<<<<< HEAD
        {this.renderActivityPanel()}
        {/* 遮罩 */}
        <Couverture
          onPress={() => this.openOrClosePanel('close')}
          isShow={isActive}
          opacity={fadeAnim}
          zIndex={5}
        />
=======
>>>>>>> ae4af7cc92f552875636025321b36cdadda85381
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  title_style: {
    fontSize: 16,
    paddingLeft: 5,
    paddingRight: 5
  },
  item_text_style: {
    color: '#333333',
    fontSize: 16
  },
  item_button_style: {

  },
  warning_button: {
    flex: 1,
    backgroundColor: '#ff4428',
    height: 50,
  },
  cancel_button: {
    flex: 1,
    backgroundColor: '#eee',
    height: 50,
  },
  warning_button_text: {
    color: '#fff',
    fontSize: 18,
  },
  cancel_button_text: {
    color: '#848484',
    fontSize: 18,
  },
  button_text_view: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 40,
    right: 40,
    top: 0,
    bottom: 0
  },
});

export default ActionBarItem;