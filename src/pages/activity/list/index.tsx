import { NoticeBar } from "@antmjs/vantui";
import { Image, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { activityList } from "@/apis/user";
import React, { useEffect } from "react";
import { IActivityDetail } from "@/types/user";
import BaseEmptyWrap from "@/components/base/baseEmptyWrap";
import yulan from "@/assets/images/common/yulan.png";
import "./index.less";

export default function ActivityList() {
  const [activitiesList, setActivitiesList] = React.useState<IActivityDetail[]>(
    []
  );
  const noticeELement = () => (
    <NoticeBar
      leftIcon={yulan}
      text="点击下方活动名称，查看对应话题"
      backgroundColor="rgba(22, 25, 35, 0.05)"
      color="#333333"
    />
  );
  async function getActivitiesList() {
    const res = await activityList();
    setActivitiesList(res);
  }
  useEffect(() => {
    getActivitiesList();
  }, []);

  return (
    <>
      {noticeELement()}
      <View className="activity-list-wrap wrap-container-space-16">
        <BaseEmptyWrap>
          {activitiesList.map((v) => {
            return (
              <Image
                fadeIn
                key={v._id}
                src={v.cover}
                className="activity-list-item"
                onClick={() =>
                  Taro.navigateTo({
                    url: `/pages/activity/detail/index?id=${v._id}`,
                  })
                }
              />
            );
          })}
        </BaseEmptyWrap>
      </View>
    </>
  );
}
