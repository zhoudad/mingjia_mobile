// const deviceWidth = Dimensions.get('window').width;
//手机屏幕的宽度
export const width = Dimensions.get('window').width;
//手机屏幕的高度
export const height = Dimensions.get('window').height;
export default function px(size) {
    if (PixelRatio.get() >= 3 && Platform.Os === 'ios' && size === 1) {
        return size;
    }
    return width / 750 * size;
}