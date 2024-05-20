import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { Icon } from "@antmjs/vantui";
import { useCapsuleHeight } from "@/hooks/pagePositionCapsuleHooks";
import classNames from "classnames";
import { useEffect, useState } from "react";
import "./index.less";

interface navItem {
  title: string;
  noTopColor?: string;
  isShowToTop?: boolean;
  color?: string;
  showBg?: boolean;
  isTransparent?: boolean;
  isShowBgColor?: string;
  isShowFffbg?: boolean;
}
export default function NavTool(props: navItem) {
  const [navTop] = useCapsuleHeight("top");
  const [navHeight] = useCapsuleHeight("height");
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const res = Taro.getSystemInfoSync();
    setWindowWidth(res.windowWidth);
  }, []);
  const {
    title,
    isShowToTop,
    color,
    isTransparent,
    noTopColor,
    isShowBgColor,
    isShowFffbg = true,
  } = props;
  return (
    <View className={isTransparent ? "isTransparent" : ""}>
      <View
        style={{
          background: isShowBgColor,
          display: noTopColor ? noTopColor : "block",
        }}
        className={classNames({
          display: !!isShowToTop,
          max_display: windowWidth > 500,
        })}
      ></View>
      <View
        style={isShowFffbg ? {} : { display: "none" }}
        className={classNames({
          whiteboard: true,
          whiteboard_dis: windowWidth < 500,
        })}
      ></View>
      <View
        className="nav_tool"
        style={{
          top: Taro.pxTransform(navTop),
          height: Taro.pxTransform(navHeight),
          lineHeight: Taro.pxTransform(navHeight),
        }}
      >
        <View className="nav_icon_box">
          {isShowToTop ? (
            <>
              <Icon
                style={{ color: color }}
                name="arrow-left"
                onClick={() => {
                  Taro.navigateBack();
                }}
                className="nav_icon"
              ></Icon>
              <Icon
                style={{ color: color }}
                name="wap-home-o"
                onClick={() => {
                  Taro.reLaunch({ url: "/pages/index/index" });
                }}
                className="nav_icon"
              ></Icon>
            </>
          ) : null}
        </View>
        <View className="nav_text" style={{ color: color }}>
          {title}
        </View>
        <View className="nav_right"></View>
      </View>
    </View>
  );
}
