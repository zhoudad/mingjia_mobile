package com.mingjia.maputil;

import android.content.Intent;

import android.net.Uri;

import android.content.Context;

import android.content.pm.PackageInfo;

import com.facebook.react.bridge.ReactContextBaseJavaModule;

import com.facebook.react.bridge.Callback;

import com.facebook.react.bridge.ReactApplicationContext;

import com.facebook.react.bridge.WritableNativeArray;

import com.facebook.react.bridge.WritableNativeMap;

import com.facebook.react.bridge.ReactMethod;

import com.facebook.react.bridge.WritableArray;

public class UtilMap extends ReactContextBaseJavaModule{

    public UtilMap(ReactApplicationContext reactContext) {

        super(reactContext);

    }

    @Override

    public String getName() {

        return "UtilMap";

    }

    /*

    检查手机是否安装了相应的地图app。返回的数据格式为:[{title:'xxx'url:app地图的URL},{title:'xxx'url:app地图的URL},{title:'xxx'url:app地图的URL}]

    */

    @ReactMethod

    public void findEvents(

            String lon,

            String lat,

            String address,

            Callback successCallback) throws Exception {

        WritableArray array = new WritableNativeArray();

        //百度地图app检测

        if (isInstalled(getReactApplicationContext(), "com.baidu.BaiduMap")) {

            WritableNativeMap writableNativeMap = new WritableNativeMap();

            writableNativeMap.putString("title", "百度地图");

            writableNativeMap.putString("url", "baidumap://map/direction?origin=我的位置&destination=name:" +address+"|latlng:"+ lat+","+lon + "&mode=driving&coord_type=bd09ll");

            array.pushMap(writableNativeMap);

        }

        //高德地图app检测

        if (isInstalled(getReactApplicationContext(), "com.autonavi.minimap")) {

            WritableNativeMap writableNativeMap = new WritableNativeMap();

            writableNativeMap.putString("title", "高德地图");

            writableNativeMap.putString("url", "androidamap://navi?sourceApplication=导航功能&backScheme=nav123456&lat=" + lat + "&lon=" + lon + "&dev=0&style=2");

            array.pushMap(writableNativeMap);

        }

        //腾讯地图app检测

        if (isInstalled(getReactApplicationContext(), "com.tencent.map")) {

            WritableNativeMap writableNativeMap = new WritableNativeMap();

            writableNativeMap.putString("title", "腾讯地图");

            writableNativeMap.putString("url", "qqmap://map/routeplan?from=我的位置&type=drive&tocoord=" + lat + "," + lon + "&to=" + address + "&coord_type=1&policy=0");

            array.pushMap(writableNativeMap);

        }

        WritableNativeMap writableNativeMap = new WritableNativeMap();

        writableNativeMap.putString("title", "取消");

        writableNativeMap.putString("url", "");

        array.pushMap(writableNativeMap);

        successCallback.invoke(array);

    }

    /**

    * 查看是否安装了地图软件

    */

    public boolean isInstalled(Context context, String name) {

        PackageInfo packageInfo;

        try {

            packageInfo = context.getPackageManager().getPackageInfo(name, 0);

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

    /*

    外部调用，打开对应app，title：地址的名称

    url：`baidumap://map/direction?origin=我的位置&destination=name:${name}|latlng:${lat},${lon}&mode=driving&coord_type=bd09ll`

        `androidamap://navi?sourceApplication=导航功能&backScheme=nav123456&lat=${lat}&lon=${lon}&dev=0&style=2`

        `qqmap://map/routeplan?from=我的位置&type=drive&tocoord=${lat},${lon}&to=${name}&coord_type=1&policy=0`

    */

    @ReactMethod

    public void openApp(String url) {

        //打开对应的app

        if(!url.equals("")){

            Intent i1 = new Intent();

            i1.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);

            i1.setData(Uri.parse(url));

            getReactApplicationContext().startActivity(i1);

        }

    }

}