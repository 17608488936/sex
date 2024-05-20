import Taro from "@tarojs/taro";

// 删除所有store数据
export const clearAllStore = () => Taro.removeStorage({ key: "user" });
