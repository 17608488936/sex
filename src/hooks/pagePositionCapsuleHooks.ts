import Taro from "@tarojs/taro";
import { useEffect, useState } from "react";

/**
 *
 * @returns 胶囊区域高度
 */
export function useCapsuleHeight(
  heightPosition: "height" | "top" | "all" = "all"
) {
  const [navBarHeight, setNavBarHeight] = useState(0);
  useEffect(() => {
    const { top } = Taro.getMenuButtonBoundingClientRect();
    const { statusBarHeight = 0 } = Taro.getSystemInfoSync();
    switch (heightPosition) {
      case "all":
        setNavBarHeight(statusBarHeight + top);
        break;
      case "height":
        setNavBarHeight(statusBarHeight);
      case "top":
      default:
        setNavBarHeight(top);
        break;
    }
  }, []);
  return [navBarHeight];
}
