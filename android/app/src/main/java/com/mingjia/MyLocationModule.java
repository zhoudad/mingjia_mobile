package com.mingjia; 

import android.util.Log;


import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import com.facebook.react.bridge.ReactApplicationContext;
import android.content.pm.PackageInfo;
import com.facebook.react.bridge.ReactContext;
import com.amap.api.location.AMapLocation;
import com.amap.api.location.AMapLocationClient;
import com.amap.api.location.AMapLocationClientOption;
import com.amap.api.location.AMapLocationListener;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class MyLocationModule extends ReactContextBaseJavaModule implements AMapLocationListener {
    private final ReactApplicationContext reactContext;
    private DeviceEventManagerModule.RCTDeviceEventEmitter eventEmitter;
    private static AMapLocationClient locationClient;
    private  static  Callback callback;

    MyLocationModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "MyLocation";
    }

    @Override
    public void onLocationChanged(AMapLocation location) {
        if (location != null) {
            if (location.getErrorCode() == 0) {
                locationClient.stopLocation();
                callback.invoke(null, toReadableMap(location));
            }
            // TODO: 返回定位错误信息
        }
    }



    @ReactMethod
    public void init(String key, Promise promise) {
        if (locationClient != null) {
            locationClient.onDestroy();
        }

        AMapLocationClient.setApiKey(key);
        locationClient = new AMapLocationClient(reactContext);
        locationClient.setLocationListener(this);
        eventEmitter = reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class);
        promise.resolve(null);
    }

    @ReactMethod
    public void setOptions(ReadableMap options) {
        AMapLocationClientOption option = new AMapLocationClientOption();
        if (options.hasKey("interval")) {
            option.setInterval(options.getInt("interval"));
        }
        if (options.hasKey("reGeocode")) {
            option.setNeedAddress(options.getBoolean("reGeocode"));
        }
        locationClient.setLocationOption(option);
    }

    @ReactMethod
    public void start() {
        locationClient.startLocation();
    }

    @ReactMethod
    public void stop() {
        locationClient.stopLocation();
    }

    @ReactMethod
    public void addEventCrood(String name, Callback callback) {
        locationClient.startLocation();
        this.callback = callback;

    }

    @ReactMethod
    public void getLastLocation(Promise promise) {
        promise.resolve(toReadableMap(locationClient.getLastKnownLocation()));
    }

    private ReadableMap toReadableMap(AMapLocation location) {
        if (location != null) {
            WritableMap map = Arguments.createMap();
            map.putDouble("timestamp", location.getTime());
            map.putDouble("accuracy", location.getAccuracy());
            map.putDouble("latitude", location.getLatitude());
            map.putDouble("longitude", location.getLongitude());
            map.putDouble("altitude", location.getAltitude());
            map.putDouble("speed", location.getSpeed());
            if (!location.getAddress().isEmpty()) {
                map.putString("address", location.getAddress());
                map.putString("description", location.getDescription());
                map.putString("poiName", location.getPoiName());
                map.putString("country", location.getCountry());
                map.putString("province", location.getProvince());
                map.putString("city", location.getCity());
                map.putString("cityCode", location.getCityCode());
                map.putString("district", location.getDistrict());
                map.putString("street", location.getStreet());
                map.putString("streetNumber", location.getStreetNum());
                map.putString("adCode", location.getAdCode());
            }
            return map;
        }
        return null;
    }





    /*
    检测手机是否安装了相应的地图app。返回的数据格式为:[{title:'dadasda'url:app地图URL},{title:'dadasda'url:app地图URL},{title:'dadasda'url:app地图URL}]
     */
    @ReactMethod
    public void findEvents(
            String lon,
            String lat,
            String address,
            Callback successCallback) throws Exception {

        WritableArray array = new WritableNativeArray();

        //百度地图app检测
        if (isAppInstalled(getReactApplicationContext(), "com.baidu.BaiduMap")) {
            WritableNativeMap ob = new WritableNativeMap();
            ob.putString("title", "百度地图");
            ob.putString("url", "baidumap://map/direction?origin=我的位置&destination=name=" + address + "&mode=driving&coord_type=gcj02");
            array.pushMap(ob);
        }

        //高德地图app检测
        if (isAppInstalled(getReactApplicationContext(), "com.autonavi.minimap")) {
            WritableNativeMap ob = new WritableNativeMap();
            ob.putString("title", "高德地图");
            ob.putString("url", "androidamap://navi?sourceApplication=导航功能&backScheme=nav123456&lat=" + lat + "&lon=" + lon + "&dev=0&style=2");
            array.pushMap(ob);
        }



        //腾讯地图app检测
        if (isAppInstalled(getReactApplicationContext(), "com.tencent.map")) {
            WritableNativeMap ob = new WritableNativeMap();
            ob.putString("title", "腾讯地图");
            ob.putString("url", "qqmap://map/routeplan?from=我的位置&type=drive&tocoord=" + lat + "," + lon + "&to=" + address + "&coord_type=1&policy=0");
            array.pushMap(ob);
        }

        WritableNativeMap ob = new WritableNativeMap();
        ob.putString("title", "取消");
        ob.putString("url", "");
        array.pushMap(ob);

        successCallback.invoke(array);

    }

    @ReactMethod
    public void addEvent(String title,
                         String url,
                         String lon,
                         String lag,
                         String address) {
        //打开对应的app
        if(!url.equals("")){
            Intent i1 = new Intent();
            i1.setData(Uri.parse(url));
            getReactApplicationContext().startActivity(i1);
        }

    }

    /**
     * 查看是否安装了这个导航软件
     * 高德地图 com.autonavi.minimap
     * 百度地图 com.baidu.BaiduMap
     * 腾讯地图 com.tencent.map
     *
     * @param context
     * @param packagename
     * @return
     */
    public boolean isAppInstalled(Context context, String packagename) {
        PackageInfo packageInfo;
        try {
            packageInfo = context.getPackageManager().getPackageInfo(packagename, 0);
        } catch (Exception e) {
            packageInfo = null;
            e.printStackTrace();
        }

        if (packageInfo == null) {
            return false;
        } else {
            return true;
        }
    }
}