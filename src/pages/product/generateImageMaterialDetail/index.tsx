import { View, Image, Textarea } from "@tarojs/components";
import Taro, { useRouter } from "@tarojs/taro";
import { Icon, Popup, Swiper, SwiperItem } from "@antmjs/vantui";
import { useEffect, useState } from "react";
import BaseButton from "@/components/base/baseButton";
import {
  IGenerateContext,
  IProductGenerateCOntentParams,
  IProductProgress,
} from "@/types/product";
import { addExcute, getChildTask } from "@/apis/product";
import { getUserStore } from "@/store/user";
import { clipboard, downloadImage } from "@/common/taroUtils";
import editImg from "@/assets/images/common/edit.png";
import NavTool from "@/components/base/nav";
import { consumption } from "@/apis/video";
import "./index.less";

let timer = -1;
const descObj = {
  xiaohongshu: "小红书",
  douyin: "抖音",
  wechatpyq: "朋友圈",
};
/*
生成图片内容
*/
export default function GenerateImageMaterialDetail() {
  const router = useRouter<{
    taskId: string;
    type: IProductGenerateCOntentParams["articleType"];
    imgUrl: string;
  }>();
  const [textareaDisabled, setTextareaDisabled] = useState(true);
  const [taskInfo, setTaskInfo] = useState<
    IProductProgress["data"][number]["data"]
  >([]);
  const [content, setContent] = useState<IGenerateContext>({
    content: "文案生成中...",
  } as IGenerateContext);
  useEffect(() => {
    // getTaskInfo();
    generateContent("img-exp");
    generateContent();
    return () => {
      clearTimeout(timer);
    };
  }, []);
  const getTaskInfo = async () => {
    const { taskId, imgUrl } = router.params;
    const res = await getChildTask({
      taskId: taskId,
      type: "img-exp",
      imgUrl: imgUrl,
      // isLoading: true,
    });

    if (!res.data.length) {
      timer = window.setTimeout(async () => {
        await getTaskInfo();
      }, 1000);
    } else {
      setTaskInfo([...res.data[0].data, res.data[0].source]);
      Taro.hideLoading();
      return;
    }
  };

  const generateContent = async (createType?: string) => {
    const { taskId, type, imgUrl } = router.params;
    const { user } = getUserStore()!;
    // const user
    await addExcute({
      articleType: type,
      taskId: taskId,
      type: createType ? "img-exp" : "img-text",
      imgUrl: imgUrl,
      userId: user.id,
    });
    if (createType) {
      Taro.showLoading({ title: "加载中" });
      getTaskInfo();
    } else {
      getTaskProgressInfo();
    }
  };

  const getTaskProgressInfo = async () => {
    const { taskId, type } = router.params;
    const { user } = getUserStore()!;

    const res = (await getChildTask({
      taskId: taskId,
      type: "img-text",
      articleType: type,
      userId: user.id,
    })) as unknown as IGenerateContext;

    if (res) {
      if (res.content) {
        res.content = res.content
          .replace(/标题：/g, "")
          .replace(/正文：/g, "")
          .replace(/话题标签/g, "");
        setContent(res);
      }

      if (!res.isFinish) {
        timer = window.setTimeout(() => {
          getTaskProgressInfo();
        }, 1000);
      } else {
        consumption({
          type: res.type,
          count: res.content.length,
        });
      }
    }
  };

  // 下载图片
  const handleDownloadImage = () => {
    downloadImage(taskInfo!.map((w) => w));
  };
  // swiper轮播图
  const swiperImages = () => (
    <View className="generate-result-detail-swiper-wrap">
      <Swiper
        height={298}
        paginationColor="#426543"
        autoPlay="3000"
        initPage={0}
        paginationVisible
      >
        {taskInfo?.map((item) => (
          <SwiperItem key={item}>
            <Image
              fadeIn
              src={item}
              mode="aspectFit"
              className="generate-result-detail-swiper-img"
            />
          </SwiperItem>
        ))}
      </Swiper>
      <View
        className="generate-result-detail-swiper-float_btn"
        onClick={handleDownloadImage}
      >
        下载组图
      </View>
    </View>
  );

  const mainElement = () => {
    return (
      <>
        <View className="generate-result-detail-content">
          <Textarea
            maxlength={-1}
            className="generate-result-detail-content-textarea"
            disabled={textareaDisabled}
            value={content?.content}
            onInput={(e) => {
              setContent((prev) => ({
                ...prev,
                content: e.detail.value,
              }));
            }}
          />
          {/* {!content?.isFinish && <View className="css-cursor"></View>} */}
        </View>
        <View className="generate-result-detail-tips">
          下载图片并复制文案，立即分享到你的{descObj[router.params.type]}
        </View>
      </>
    );
  };
  // 重新生成文案
  const handleResetGenerate = () => {
    content.content = "重新生成中...";
    content.isFinish = false;
    setContent(content);
    generateContent();
  };

  const footerElement = () => (
    <>
      <View className="custom-line mb-10"></View>
      <View className="generate-result-detail-footer-wrap wrap-container-space-16">
        <Icon
          name={editImg}
          size={20}
          className="generate-result-detail-footer-icon"
          onClick={() => {
            if (textareaDisabled) {
              setTextareaDisabled(false);
            }
            Taro.showToast({ icon: "none", title: "点击文本区域可修改内容" });
          }}
        />
        <BaseButton
          plain
          className="generate-result-detail-footer-reset-btn"
          onClick={handleResetGenerate}
        >
          重新生成文案
        </BaseButton>

        <BaseButton
          disabled={!content?.isFinish}
          onClick={() => clipboard(content.content)}
        >
          复制文案
        </BaseButton>
      </View>
    </>
  );
  return (
    <View>
      <NavTool color="#000" title="查看图片素材" isShowToTop />

      {swiperImages()}
      <Popup safeAreaInsetBottom overlay={false} round show position="bottom">
        <View className="product-select-generate-select-wrap wrap-container-space-16">
          {mainElement()}
        </View>
        {footerElement()}
      </Popup>
    </View>
  );
}
