import Taro from "@tarojs/taro";

type TCustomKey = "AIFirstPageStatus" | "";

export const setCustomBooleanStore = (customKey: TCustomKey, v: boolean) => {
  Taro.setStorageSync(customKey, v);
};

export const getCustomBooleanStore = (customKey: TCustomKey) =>
  Taro.getStorageSync<boolean | null>(customKey);
