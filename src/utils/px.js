<<<<<<< HEAD
import { Dimensions, Platform, PixelRatio } from 'react-native';

const deviceWidth = Dimensions.get('window').width;

export default function px(size) {
    if (PixelRatio.get() >= 3 && Platform.Os === 'ios' && size === 1) {
        return size;
    }
    return deviceWidth / 750 * size;
=======
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
>>>>>>> ae4af7cc92f552875636025321b36cdadda85381
}