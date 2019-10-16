import { Dimensions, Platform, PixelRatio } from 'react-native';

const deviceWidth = Dimensions.get('window').width;

export default function px(size) {
    if (PixelRatio.get() >= 3 && Platform.Os === 'ios' && size === 1) {
        return size;
    }
    return deviceWidth / 750 * size;
}