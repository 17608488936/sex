import { View } from "@tarojs/components";
import { Loading, NoticeBar, Tab, Tabs } from "@antmjs/vantui";
import React, { useEffect, useState } from "react";
import TabImageList from "@/components/business/tabImageList/index";
import TabVideoList from "@/components/business/tabVideoList/index";
import Taro from "@tarojs/taro";
import "./index.less";

export default function MyMarketingTabs() {
  const [active, setActive] = useState(0);
  const [isShowLoading] = React.useState(false);
  // 通知栏
  useEffect(() => {
    Taro.pageScrollTo({ scrollTop: active === 0 ? 0 : 1 });
  }, [active]);

  const noticeBarElement = () => {
    return active === 1 ? (
      <NoticeBar
        backgroundColor="#EAF4F4"
        color="#6B8482"
        text="视频素材仅保留最近7天生成记录"
      />
    ) : (
      <View className=""></View>
    );
  };
  return (
    <>
      {noticeBarElement()}
      <Tabs
        swipeable
        animated
        color="#82A5A2"
        className="my-marketing-tabs-wrap"
        lineWidth="24"
        // sticky
        onChange={(e) => {
          setActive(e.detail.index);
        }}
      >
        <Tab title="图片">
          <TabImageList></TabImageList>
          {isShowLoading ? (
            <View className="image-list_loading">
              <Loading type="spinner" />
            </View>
          ) : null}
        </Tab>
        <Tab title="视频">
          <TabVideoList></TabVideoList>
        </Tab>
      </Tabs>
    </>
  );
}
