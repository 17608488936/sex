import classNames from "classnames";
import { View } from "@tarojs/components";
import { ReactNode } from "react";
import "./index.less";

interface IBaseButtonProps {
  disabled?: boolean;
  round?: boolean;
  plain?: boolean;
  className?: string;
  color?: string;
  children: ReactNode;
  onClick?: () => void;
}
export default function BaseButton({
  disabled,
  round,
  color,
  plain,
  className,
  children,
  onClick,
}: IBaseButtonProps) {
  return (
    <View
      className={classNames(
        "base-btn",
        {
          "base-btn-disabled": disabled,
          "base-btn-round": round,
          "base-btn-plain": plain,
        },
        className
      )}
      style={{
        backgroundColor: color,
      }}
      onClick={() => !disabled && onClick?.()}
    >
      {children}
    </View>
  );
}
