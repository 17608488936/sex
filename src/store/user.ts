import { IUser } from "@/types/user";
import Taro from "@tarojs/taro";

export const setUserStore = (user: IUser) => {
  Taro.setStorageSync("user", user);
};

export const getUserStore = () => Taro.getStorageSync<IUser | null>("user");
