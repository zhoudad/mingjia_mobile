import { createIconSetFromIcoMoon } from 'react-native-vector-icons'
import icoMoonConfig from '../assets/fonts/selection.json'

const Icon = createIconSetFromIcoMoon(icoMoonConfig, 'Icomoon', 'icomoon.ttf')
export default Icon

export const Button = Icon.Button
export const TabBarItem = Icon.TabBarItem
export const TabBarItemIOS = Icon.TabBarItemIOS
export const ToolbarAndroid = Icon.ToolbarAndroid
export const getImageSource = Icon.getImageSource