import { Empty } from "@antmjs/vantui";
import { View } from "@tarojs/components";
import { ReactNode } from "react";
import "./index.less";

export default function BaseEmptyWrap({ children }: { children?: ReactNode }) {
  const getChildrenStatus = () => {
    let flag = true;
    if (Array.isArray(children)) {
      flag = !!children.length;
    } else {
      switch (typeof children) {
        case "number":
          flag = true;
          break;
        default:
          flag = !!children;
          break;
      }
    }

    return flag;
  };
  return (
    <>
      {getChildrenStatus() ? (
        children
      ) : (
        <View className="empty-wrap">
          <View>
            <Empty description="暂无数据" />
          </View>
        </View>
      )}
    </>
  );
}
