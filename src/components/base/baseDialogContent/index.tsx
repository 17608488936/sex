import { Button } from "@antmjs/vantui";
import { View } from "@tarojs/components";
import { ReactNode } from "react";

import "./index.less";

interface IBaseDialogContentProps {
  children: ReactNode;
  leftBtnText: string;
  leftBtnClick?: () => void;

  rightBtnText: string;
  rightBtnClick?: () => void;
}
export default function BaseDialogContent({
  children,
  leftBtnText,
  leftBtnClick,
  rightBtnText,
  rightBtnClick,
}: IBaseDialogContentProps) {
  return (
    <>
      <View className="base-dialog-content">{children}</View>
      <View className="base-dialog-content-footer-wrap">
        <Button
          block
          round
          plain
          type="default"
          className="base-dialog-content-footer-wrap-space"
          onClick={() => leftBtnClick?.()}
        >
          {leftBtnText}
        </Button>
        <Button block round color="#171B27" onClick={() => rightBtnClick?.()}>
          {rightBtnText}
        </Button>
      </View>
    </>
  );
}
