package com.mingjia;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;
import android.content.Intent;
import android.os.Bundle;
import com.umeng.socialize.UMShareAPI;
import com.umeng.message.PushAgent;


public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "mingjia";
  }
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new ReactActivityDelegate(this, getMainComponentName()) {
      @Override
      protected ReactRootView createRootView() {
       return new RNGestureHandlerEnabledRootView(MainActivity.this);
      }
    };
  }
  @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        ShareModule.initSocialSDK(this);
        PushModule.initPushSDK(this);
        PushAgent.getInstance(this).onAppStart();
    }
  @Override
    public void onActivityResult(int requestCode,int resultCode, Intent data) {
    super.onActivityResult(requestCode, resultCode, data);
    UMShareAPI.get(this).onActivityResult(requestCode, resultCode, data);
  }
}
