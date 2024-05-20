/* eslint-disable import/first */
// import "./lib/mtj-wx-sdk-1.10.23/mtj-wx-sdk";
import { PropsWithChildren } from "react";
import "@/assets/styles/index.less";
import Taro from "@tarojs/taro";

function App({ children }: PropsWithChildren<any>) {
  Taro.onError((e) => {});
  // children 是将要会渲染的页面
  return children;
}
export default App;
