package com.mingjia.maputil;

import com.facebook.react.ReactPackage;

import com.facebook.react.bridge.NativeModule;

import com.facebook.react.bridge.ReactApplicationContext;

import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;

import java.util.Collections;

import java.util.List;

import com.mingjia.maputil.UtilMap;

public class UtilMapPackage implements ReactPackage {

  @Override

  public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {

    return Collections.emptyList();

  }

  @Override

  public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {



    List<NativeModule> modules = new ArrayList<>();

    modules.add(new UtilMap(reactContext));

    return modules;

  }

}