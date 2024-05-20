import { Image, View } from "@tarojs/components";
import { Icon, Swiper, SwiperItem } from "@antmjs/vantui";
import classNames from "classnames";
import douyinImg from "@/assets/images/common/douyin.png";
import xiaohognshuImg from "@/assets/images/common/xiaohongshu.png";
import pengyouquanImg from "@/assets/images/common/pengyouquan.png";
import Taro, { useRouter } from "@tarojs/taro";
import { IProductProgress } from "@/types/product";
import { useEffect, useState } from "react";
import { getChildTask } from "@/apis/product";
import BaseBgLogo from "@/components/base/baseBgLogo";
import NavTool from "@/components/base/nav";

import "./index.less";

const productLinkList = [
  {
    src: douyinImg,
    text: "生成抖音图文素材",
    path: "/pages/product/generateImageMaterialDetail/index",
    type: "douyin",
  },
  {
    src: xiaohognshuImg,
    text: "生成小红书图文素材",
    path: "/pages/product/generateImageMaterialDetail/index",
    type: "xiaohongshu",
  },
  {
    src: pengyouquanImg,
    text: "生成朋友圈图文素材",
    path: "/pages/product/generateImageMaterialDetail/index",
    type: "wechatpyq",
  },
] as const;
export default function ProductSelectProduct() {
  const router = useRouter<{ taskId: string }>();
  const [taskInfo, setTaskInfo] = useState<IProductProgress>(
    {} as IProductProgress
  );
  useEffect(() => {
    getTaskInfo();
  }, []);
  const getTaskInfo = async () => {
    const res = await getChildTask({
      taskId: router.params.taskId,
      type: "image-img",
    });
    setTaskInfo(res);
  };
  const handleClickImage = () => {
    Taro.previewImage({
      urls: taskInfo.list.map((task) => task.data.source),
    });
  };
  const headElement = () => {
    // console.log('Taro.pxTransform(276)',Taro.pxTransform(276));

    return (
      <View className="generate-image-material-head-wrap">
        <Swiper
          height={276}
          paginationColor="#82A5A2"
          autoPlay="3000"
          initPage={0}
          paginationVisible
        >
          {taskInfo?.list?.map(
            (item: { data: { source: any } }, index: any) => (
              <SwiperItem
                key={index}
                className="generate-image-material-head-img-wrap"
              >
                <Image
                  src={item.data.source}
                  mode="aspectFit"
                  className="generate-image-material-head-img"
                  onClick={handleClickImage}
                />
              </SwiperItem>
            )
          )}
          {/* {taskInfo?.list?.map(
          (w: {
            id: string | number | undefined;
            data: { source: string };
          }) => (
            <View key={w.id} className="generate-image-material-head-img-wrap">
              <Image
                fadeIn
                className="generate-image-material-head-img"
                src={w.data.source}
                mode="aspectFit"
                onClick={handleClickImage}
              />
            </View>
          )
        )} */}
        </Swiper>
        {/* {taskInfo?.list?.map(
          (w: {
            id: string | number | undefined;
            data: { source: string };
          }) => (
            <View key={w.id} className="generate-image-material-head-img-wrap">
              <Image
                fadeIn
                className="generate-image-material-head-img"
                src={w.data.source}
                mode="aspectFit"
                onClick={handleClickImage}
              />
            </View>
          )
        )} */}
        {/* <View className="generate-image-material-head-img-desc">
          <Text className="generate-image-material-head-img-desc-title">
            点击
          </Text>
          图片查看大图
        </View> */}
      </View>
    );
  };
  const handleToMake = (productLink: (typeof productLinkList)[number]) => {
    const { path, type } = productLink;
    const { taskId } = router.params;

    Taro.navigateTo({
      url: `${path}?taskId=${taskId}&type=${type}&imgUrl=${taskInfo.list[0].data.source}`,
    });
  };
  return (
    <View className="product-select-product-container">
      <NavTool color="#000" title="生成营销素材" isShowToTop />
      {headElement()}

      <View className="wrap-container-space-16">
        <View className="product-select-product-link-wrap">
          <View className="product-select-product-link-title">
            选择你要制作的素材类型
          </View>
          {productLinkList.map((productLink, idx) => (
            <View
              key={idx}
              className={classNames("product-select-product-link-item")}
              onClick={() => handleToMake(productLink)}
            >
              <View className="product-select-product-link-item-left">
                <Image
                  fadeIn
                  className="product-select-product-link-item-left_img"
                  src={productLink.src}
                />
                <View>{productLink.text}</View>
              </View>
              <Icon name="arrow" />
            </View>
          ))}
        </View>
      </View>
      <BaseBgLogo image="logoImg" />
    </View>
  );
}
