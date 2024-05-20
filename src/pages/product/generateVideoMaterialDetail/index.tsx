import { View, Textarea } from "@tarojs/components";
import Taro, { useRouter } from "@tarojs/taro";
import { Icon } from "@antmjs/vantui";
import { useEffect, useState } from "react";
import BaseButton from "@/components/base/baseButton";
import editImg from "@/assets/images/common/edit.png";
import { IVideoItem } from "@/types/product";
import NavTool from "@/components/base/nav";

import {
  IAimanagerVideoListParams,
  IConsumptionParams,
  IGetVideoText,
  IPostVideoTextParams,
} from "@/types/video";
import {
  consumption,
  getVideoText,
  postVideoText,
  videoList,
} from "@/apis/video";
import { clipboard } from "@/common/taroUtils";

import BaseVideo from "@/components/base/baseVideo";
import { videoPathToImagePath } from "@/common/transform";
import "./index.less";

let timer = -1;
export default function GenerateVideoMaterialDetail() {
  const router = useRouter<{
    _id: string;
    type: IPostVideoTextParams["type"];
    taskId?: string;
    videoUrl?: string;
    cover?: string;
    name?: string;
    videoType?: IPostVideoTextParams["videoType"];
  }>();
  const [content, setContent] = useState<IGetVideoText>({
    content: "文案生成中...",
  } as IGetVideoText);
  const [videoDetail, setVideoDetail] = useState<IVideoItem>({} as IVideoItem);
  const [textareaDisabled, setTextareaDisabled] = useState(true);
  useEffect(() => {
    getVideoList();
    return () => {
      clearTimeout(timer);
    };
  }, []);
  const getVideoList = async () => {
    const { videoUrl, name, _id, taskId } = router.params;
    if (videoUrl) {
      setVideoDetail({
        ...videoDetail,
        result: {
          video: videoUrl,
          thumbnail: null,
        },
      });
      Taro.setNavigationBarTitle({ title: name! });
      generateContent("");
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
      const detail = res.list[0];
      Taro.setNavigationBarTitle({ title: detail.displayName });
      setVideoDetail(detail);
      generateContent(detail._id);
    }
  };

  const generateContent = async (videoId: string) => {
    const { type, videoType } = router.params;

    const videoRes = await postVideoText({
      payload: {
        videoId,
      },
      videoType,
      type: type,
    });
    getTaskProgressInfo(videoRes.id);
  };

  const getTaskProgressInfo = async (askId: string) => {
    const { type } = router.params;
    const res = await getVideoText({
      askId: askId,
      type: "img-text",
      articleType: type,
    });
    if (res?.content) {
      setContent(res);
    }
    if (!res.isFinish) {
      timer = window.setTimeout(async () => {
        getTaskProgressInfo(askId);
      }, 300);
    } else {
      consumption({
        id: res.askId,
        type: res.type as IConsumptionParams["type"],
        count: res.content.length,
      });
    }
  };

  const mainElement = () => {
    return (
      <>
        <View className="generate-result-detail-video-content">
          <Textarea
            maxlength={-1}
            className="generate-result-detail-video-content-textarea"
            value={content?.content}
            disabled={textareaDisabled}
            onInput={(e) =>
              setContent((prev) => ({ ...prev, content: e.detail.value }))
            }
          />

          {/* <View className="css-cursor"></View> */}
          {/* <View>
            <View className="generate-result-detail-video-footer-util-wrap">
              <Icon
                name="arrow"
                className="generate-result-detail-video-footer-util-icon"
              ></Icon>
              <View className="generate-result-detail-video-footer-util-btn">
                重新生成
              </View>
            </View>
          </View> */}
        </View>
      </>
    );
  };

  const footerElement = () => (
    <View className="generate-result-detail-video-footer-container">
      <View className="custom-line mb-10"></View>
      <View className="generate-result-detail-video-footer-wrap wrap-container-space-16">
        <Icon
          name={editImg}
          size={20}
          className="generate-result-detail-footer-icon"
          onClick={() => {
            if (textareaDisabled) {
              setTextareaDisabled(false);
              Taro.showToast({ icon: "none", title: "点击文本区域可修改内容" });
            }
          }}
        />
        <BaseButton
          plain
          className="generate-result-detail-footer-reset-btn"
          onClick={() => {
            setContent((prev) => ({ ...prev, content: "文案生成中..." }));
            generateContent(videoDetail._id);
          }}
        >
          重新生成文案
        </BaseButton>

        <BaseButton
          //  onClick={() => downloadVideo(videoDetail?.result?.video)}
          onClick={() => clipboard(content.content)}
        >
          复制文案
        </BaseButton>
      </View>
    </View>
  );
  return (
    <View className="generate-result-detail-video-wrap">
      <NavTool color="#000" title="查看视频素材" isShowToTop />

      {videoDetail?.result?.video && (
        <BaseVideo
          className="generate-result-detail-video"
          src={videoDetail?.result?.video}
          poster={videoPathToImagePath(videoDetail?.result?.video)}
        />
      )}

      {/* <Popup safeAreaInsetBottom overlay={false} round show position="bottom"> */}
      <View className="wrap-container-space-16">{mainElement()}</View>
      {footerElement()}
      {/* </Popup> */}
    </View>
  );
}
