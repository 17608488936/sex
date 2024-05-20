import { View } from "@tarojs/components";
import { ReactNode } from "react";
import "./index.less";

interface IBaseContainerProps {
  footerBtn: ReactNode;
  children: ReactNode;
}
export default function BaseContainer({
  footerBtn,
  children,
}: IBaseContainerProps) {
  const footerElement = () => (
    <View className="base-container-footer-container">
      <View className="custom-line mb-10"></View>
      {footerBtn}
    </View>
  );
  return (
    <View className="base-container-container">
      {children}
      {footerElement()}
    </View>
  );
}
