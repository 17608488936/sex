import { Image, View } from "@tarojs/components";
import { useEffect, useState } from "react";
import Taro, { useRouter } from "@tarojs/taro";
import { activityDetail } from "@/apis/user";
import { IActivityDetail } from "@/types/user";
import BaseButton from "@/components/base/baseButton";
import "./index.less";

export default function BannerActivity() {
  const router = useRouter<{ activityId: string }>();
  const [detail, setDetail] = useState<IActivityDetail>({} as IActivityDetail);
  useEffect(() => {
    getDetail();
  }, []);

  const getDetail = async () => {
    const res = await activityDetail(router.params.activityId);
    Taro.setNavigationBarTitle({ title: res.title });
    setDetail(res);
  };
  const handleTo = () => {
    if (detail) {
      const { skus = [], videos = [], subtype } = detail;
      switch (subtype) {
        case "sku":
          Taro.navigateTo({
            url: `/pages/product/activityList/index?ids=${JSON.stringify(
              skus
            )}`,
          });
          return;
        case "video":
        default:
          Taro.navigateTo({
            url: `/pages/store/list/index?ids=${JSON.stringify(videos)}`,
          });
          return;
      }
    }
  };
  return (
    <View className="banner-activity-wrap">
      {detail?.images?.map((src, idx) => (
        <Image
          fadeIn
          className="banner-activity-img"
          mode="widthFix"
          key={idx}
          src={src}
        />
      ))}
      <View className="banner-activity-btn-wrap">
        <View className="wrap-container-space-16">
          <BaseButton round onClick={handleTo}>
            立即报名
          </BaseButton>
        </View>
      </View>
    </View>
  );
}
