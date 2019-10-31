package com.mingjia;

// import android.app.Application;
import androidx.multidex.MultiDexApplication;
import android.content.Context;
import android.os.Handler;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.brentvatne.react.ReactVideoPackage;

// import com.rnfs.RNFSPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import java.lang.reflect.InvocationTargetException;
import java.util.List;
import com.horcrux.svg.SvgPackage;
import com.theweflex.react.WeChatPackage;
import com.mingjia.MyLocationPackage;
import com.mingjia.DplusReactPackage;

import com.umeng.commonsdk.UMConfigure;
import com.umeng.socialize.PlatformConfig;
import com.umeng.message.PushAgent;
import com.umeng.message.IUmengRegisterCallback;
// import com.umeng.message.common.UmLog;

public class MainApplication extends MultiDexApplication  implements ReactApplication {

  private final ReactNativeHost mReactNativeHost =
      new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
          @SuppressWarnings("UnnecessaryLocalVariable")
          List<ReactPackage> packages = new PackageList(this).getPackages();
          // Packages that cannot be autolinked yet can be added manually here, for example:
          packages.add(new WeChatPackage());
          // packages.add(new RNFSPackage());
          packages.add(new MyLocationPackage());
          packages.add(new DplusReactPackage());
          return packages;
        }

        @Override
        protected String getJSMainModuleName() {
          return "index";
        }
      };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }
  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    initializeFlipper(this); // Remove this line if you don't want Flipper enabled

    // RNUMConfigure.init(this, "5db6475d4ca3576be20007db", "Umeng", UMConfigure.DEVICE_TYPE_PHONE,"");
    UMConfigure.init(this,"5db94561570df3e29a000524","umeng",UMConfigure.DEVICE_TYPE_PHONE,"fd5hm4mm1bm6sxxd2oduxo2q7i6tdraz");
    initUpush();
  }

  private void initUpush() {
        PushAgent mPushAgent = PushAgent.getInstance(this);

        //注册推送服务 每次调用register都会回调该接口
        mPushAgent.register(new IUmengRegisterCallback() {
            @Override
            public void onSuccess(String deviceToken) {
                // UmLog.i(TAG, "device token: " + deviceToken);
                 android.util.Log.e("token","tokenxc: "+deviceToken);
            }

            @Override
            public void onFailure(String s, String s1) {
              android.util.Log.e("tokenError",s+s1);
                // UmLog.i(TAG, "register failed: " + s + " " + s1);
            }
        });
    }
  /**
   * Loads Flipper in React Native templates.
   *
   * @param context
   */
  private static void initializeFlipper(Context context) {
    if (BuildConfig.DEBUG) {
      try {
        /*
         We use reflection here to pick up the class that initializes Flipper,
        since Flipper library is not available in release mode
        */
        Class<?> aClass = Class.forName("com.facebook.flipper.ReactNativeFlipper");
        aClass.getMethod("initializeFlipper", Context.class).invoke(null, context);
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      }
    }
  }
  {
    PlatformConfig.setWeixin("wx07cb98a4feb4b5b3", "4c081dc0af963c596d8e93f548acfd22");
  }
}
