import BaseVideo from "@/components/base/baseVideo";
import { Cell, Icon } from "@antmjs/vantui";
import { View } from "@tarojs/components";
import douyinImg from "@/assets/images/common/douyin.png";
import xiaohognshuImg from "@/assets/images/common/xiaohongshu.png";
import pengyouquan from "@/assets/images/common/pengyouquan.png";
import Taro, { useRouter } from "@tarojs/taro";
import { useEffect, useState } from "react";
import { videoList } from "@/apis/video";
import { IVideoItem } from "@/types/product";
import { downloadVideo } from "@/common/taroUtils";
import { IAimanagerVideoListParams, IPostVideoTextParams } from "@/types/video";
import { videoPathToImagePath } from "@/common/transform";
import NavTool from "@/components/base/nav";
import "./index.less";

const cellList = [
  {
    src: xiaohognshuImg,
    text: "生成小红书文案",
    path: "/pages/product/generateVideoMaterialDetail/index",
    type: "ai_product_video_assistant_xiaohongshu",
  },
  {
    src: douyinImg,
    text: "生成抖音文案",
    path: "/pages/product/generateVideoMaterialDetail/index",
    type: "ai_product_video_assistant_douyin",
  },
  {
    src: pengyouquan,
    text: "生成朋友圈文案",
    path: "/pages/product/generateVideoMaterialDetail/index",
    type: "ai_product_video_assistant_wechatpyq",
  },
];

export default function MyWorksCatVideo() {
  const [setDetail] = useState<string>();
  const router = useRouter<{
    taskId?: string;
    _id: string;
    videoUrl?: string;
    cover?: string;
    name?: string;
    videoType?: IPostVideoTextParams["videoType"];
  }>();
  const [videoDetail, setVideoDetail] = useState<IVideoItem>({} as IVideoItem);
  useEffect(() => {
    getVideoList();
  }, []);
  const getVideoList = async () => {
    const { videoUrl, name, taskId, _id } = router.params;
    if (videoUrl) {
      setVideoDetail({
        ...videoDetail,
        result: {
          video: videoUrl,
          thumbnail: null,
        },
      });
      Taro.setNavigationBarTitle({
        title: name!,
      });
      return;
    }

    const videoListParams: IAimanagerVideoListParams = {
      skip: 0,
      limit: 1,
    };
    if (_id) {
      videoListParams._id = _id;
    } else {
      videoListParams.resourceId = taskId;
    }

    const res = await videoList(videoListParams);
    if (res?.list?.length) {
      console.log(res);

      const det = res.list[0];
      setVideoDetail(det);
      setDetail(det.displayName);

      // Taro.setNavigationBarTitle({
      //   title: detail.displayName,
      // });
    }
  };

  return (
    <View className="my-works-cat-video-wrap">
      <NavTool color="#000" title={router.params.name as string} isShowToTop />
      {videoDetail?.result?.video && (
        <BaseVideo
          className="my-works-cat-video-video"
          src={videoDetail?.result?.video}
          poster={videoPathToImagePath(videoDetail?.result?.video)}
          isCoverView={false}
        />
      )}

      <View
        className="my-works-cat-video-download"
        onClick={() => downloadVideo(videoDetail.result.video)}
      >
        发布至抖音
      </View>
      <View className="my-works-cat-video-cell-wrap">
        {cellList.map((w) => (
          <Cell
            key={w.text}
            className="my-works-cat-video-cell"
            renderIcon={
              <Icon name={w.src} className="my-works-cat-video-cell-icon" />
            }
            title={w.text}
            isLink
            onClick={() => {
              const {
                videoType = "",
                _id = "",
                videoUrl = "",
                cover = "",
                taskId = "",
                name = "",
              } = router.params;
              let url = `${w.path}?_id=${_id}&type=${w.type}&videoType=${videoType}`;
              if (taskId) {
                url += `&taskId=${taskId}`;
              }
              if (videoUrl) {
                url += `&videoUrl=${videoUrl}&cover=${cover}&name=${name}`;
              }
              Taro.navigateTo({
                url,
              });
            }}
          />
        ))}
      </View>
    </View>
  );
}
