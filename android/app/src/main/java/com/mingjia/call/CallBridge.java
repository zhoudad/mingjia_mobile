// import com.facebook.react.bridge.Arguments;
// import com.facebook.react.bridge.Promise;
// import com.facebook.react.bridge.ReactApplicationContext;
// import com.facebook.react.bridge.ReactContextBaseJavaModule;
// import com.facebook.react.bridge.ReactMethod;
// import com.facebook.react.bridge.WritableMap;
// import com.facebook.react.modules.core.DeviceEventManagerModule;

// public class RNCallBridgeModule extends ReactContextBaseJavaModule {
// private Promise callPromise;
// private ReactApplicationContext reactContext;

// public RNCallBridgeModule(ReactApplicationContext reactContext) {
// super(reactContext);
// this.reactContext = reactContext;
// }

// @Override
// public String getName() {
// return "mingjia";
// }

// @ReactMethod
// public void passCallTime(Promise callPromise) {
// this.callPromise = callPromise;
// }

// @ReactMethod
// public void call(String phoneNumber) {
// if (getCurrentActivity() instanceof MainActivity) {
// ((MainActivity) getCurrentActivity()).startCallPhone(phoneNumber, this);
// }
// }

// @ReactMethod
// public void endCall(CallEntity callEntity) {
// if (callEntity == null) {
// callEntity = new CallEntity();
// }
// String startDate = callEntity.getStartDate() == null ? null : String.valueOf(callEntity.getStartDate().getTime());
// String endDate = callEntity.getEndDate() == null ? null : String.valueOf(callEntity.getEndDate().getTime());
// WritableMap map = Arguments.createMap();
// map.putInt("callTime", callEntity.getDuration());
// map.putString("phoneNumber", callEntity.getPhone());
// map.putString("startTime", startDate);
// map.putString("endTime", endDate);
// this.callPromise.resolve(map);
// System.out.println(callEntity.toString());
// }
// }
