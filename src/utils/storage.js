import { AsyncStorage } from 'react-native';
import Storage from 'react-native-storage';
import { refreshToken } from './request';

export const storage = new Storage({
  size: 1000,// 最大容量，默认值1000条数据循环存储
  storageBackend: AsyncStorage,// 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
  defaultExpires: null, // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
});

export function saveToken({ access_token, refresh_token, expires_in }) {
  storage.save({
    key: 'accessToken',
    data: access_token,
    expires: 1000 * 3600 * 24 * 30 
    // expires: 1000 * (expires_in - 120) // access_token 有效期 2 小时，保险起见客户端减少 2 分钟
  });

}

export function removeTokens() {
  storage.remove({
    key: 'accessToken'
  });
}