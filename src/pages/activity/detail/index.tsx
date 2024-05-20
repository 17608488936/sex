import { Button, Icon, NoticeBar } from "@antmjs/vantui";
import { View, Text } from "@tarojs/components";
import Taro, { useRouter } from "@tarojs/taro";
import { clipboard } from "@/common/taroUtils";
import { useEffect, useState } from "react";
import { activityDetail } from "@/apis/user";
import { IActivityDetail } from "@/types/user";
import tipsImg from "@/assets/images/common/tips.png";
import feiji from "@/assets/images/common/feiji.png";
import NavTool from "@/components/base/nav";
import "./index.less";

export default function ActivityList() {
  const router = useRouter<{ id: string }>();
  const [detail, setDetail] = useState<IActivityDetail>({} as IActivityDetail);
  useEffect(() => {
    getActivityDetail();
  }, []);
  const getActivityDetail = async () => {
    const res = await activityDetail(router.params.id);
    Taro.setNavigationBarTitle({ title: res.title });
    setDetail(res);
  };
  const noticeELement = () => (
    <NoticeBar
      leftIcon={feiji}
      text="发布素材时，记得复制下方话题到发布文案中"
      backgroundColor="rgba(22, 25, 35, 0.05)"
      color="#333333"
    />
  );

  const cardElement = () =>
    detail.topics?.map((w, idx) => (
      <View key={idx} className="activity-deatil-list-item">
        <View className="activity-deatil-list-item-head">
          <Icon name={tipsImg} />
          <Text className="activity-deatil-list-item-head-title">
            {w.title}
          </Text>
        </View>
        <View className="activity-deatil-list-item-content">
          <View className="activity-deatil-list-item-content-text">
            {w.content.join("")}
          </View>
          <Button
            round
            color="#000"
            className="activity-list-item-content-btn"
            onClick={() => clipboard(w.content.join(""))}
          >
            复制
          </Button>
        </View>
      </View>
    ));
  return (
    <View className="activity-deatil">
      <NavTool color="#000" title="活动话题" isShowToTop />

      {noticeELement()}
      <View className="activity-list-wrap wrap-container-space-16">
        {cardElement()}
      </View>
    </View>
  );
}
