import BaseButton from "@/components/base/baseButton";
import BaseVideo from "@/components/base/baseVideo";
import { View } from "@tarojs/components";
import Taro, { useRouter } from "@tarojs/taro";
import { useEffect, useState } from "react";
import { IVideoTemplate } from "@/types/video";
import { videoTemplateDetail } from "@/apis/video";
import NavTool from "@/components/base/nav";
import classNames from "classnames";
import "./index.less";

export default function AIListDetail() {
  const router = useRouter<{ id: string }>();
  const [detail, setDetail] = useState<IVideoTemplate>({} as IVideoTemplate);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    getDetail();
  }, []);
  useEffect(() => {
    const res = Taro.getSystemInfoSync();
    setWindowWidth(res.windowWidth);
  }, []);
  const getDetail = async () => {
    const res = await videoTemplateDetail(router.params.id);
    setDetail(res);
  };
  return (
    <View className="ai-detail-wrap">
      <NavTool color="#000" title={detail.title} isShowToTop />
      <BaseVideo
        src={detail.url}
        poster={detail.cover}
        className={classNames({
          ai_detail_video: true,
          max_display: windowWidth > 500,
        })}
      />
      <View className="ai-detail-btn">
        <BaseButton
          round
          color="#789C99"
          onClick={() =>
            Taro.navigateTo({
              url: `/pages/AI/create/index?id=${router.params.id}`,
            })
          }
        >
          一键拍同款
        </BaseButton>
      </View>
    </View>
  );
}
