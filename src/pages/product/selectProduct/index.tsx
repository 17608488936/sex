import { Image, View } from "@tarojs/components";
import { Icon } from "@antmjs/vantui";
import sceneImg from "@/assets/images/common/scene.png";
import videoImg from "@/assets/images/common/video.png";
import AIImg from "@/assets/images/common/AI.png";
import Taro, { useRouter } from "@tarojs/taro";
import { useEffect, useState } from "react";
import { IProduct } from "@/types/product";
import { productPage } from "@/apis/product";
import { generateVideo } from "@/apis/video";
import { pipeFn } from "@/common/utils";
import BaseBgLogo from "@/components/base/baseBgLogo";
import NavTool from "@/components/base/nav";
import { IUser } from "@/types/user";
import dayjs from "dayjs";

import "./index.less";

const productLinkList = [
  {
    src: sceneImg,
    text: "生成产品场景图",
    path: "/pages/product/selectGenerate/index",
    type: "changjingtu_sku",
  },
  {
    src: videoImg,
    text: "生成产品推广视频",
    path: "/pages/product/generateImageMaterial/index",
    type: "video_product_source",
  },
  {
    src: AIImg,
    text: "我要出镜，AI智能合拍",
    path: "/pages/AI/list/index",
    type: "AI",
  },
] as const;

const excludesTips = ["64ae92ff2886fbc0c69c85e2", "65fd9d10e3383d09796967fb"];
const excludeTipsIds = ["663b472453eef2cd19805586"];
let timer = -1;

export default function ProductSelectProduct() {
  const router = useRouter<{ id: string }>();
  const [productDetail, setProductDetail] = useState<IProduct>({} as IProduct);
  const [detail, setDetail] = useState<string>();
  const [showModal, setShowModal] = useState(false);
  const [showTimeModal, setShowTimeModal] = useState(false);
  const currentTime = dayjs();
  useEffect(() => {
    getProductDetail();
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const getProductDetail = async () => {
    const res = await productPage({
      type: "resource",
      resourceId: router.params.id,
    });
    if (res[0]) {
      const det = res[0];
      setProductDetail(det);
      setDetail(det.name);
      // Taro.setNavigationBarTitle({
      //   title: detail.name,
      // });
    }
  };

  const handleCreateVideoTask = (
    type: (typeof productLinkList)[number]["type"]
  ) => {
    createVideoTask(type);
  };
  const createVideoTask = async (
    type: (typeof productLinkList)[number]["type"]
  ) => {
    const { _id } = getProductLink(type)!;
    await generateVideo({
      count: 1,
      resourceId: _id,
    });
    Taro.navigateTo({
      // url: `/pages/webView/index?taskId=${_id}&webViewUrl=${constant.sharehUrl}pages/index/index`,
      url: `/pages/product/generateVideoMaterial/index?taskId=${_id}`,
    });
  };

  const getProductLink = (type: (typeof productLinkList)[number]["type"]) =>
    productDetail.detailType.find((w) => w.detailType === type);
  const handleRouterStatus = (
    type: (typeof productLinkList)[number]["type"],
    text: (typeof productLinkList)[number]["text"]
  ) => {
    const productLink = getProductLink(type);
    if (!productLink) {
      Taro.showToast({
        icon: "none",
        title: `此产品无法${text}`,
      });
      return false;
    }
    return productLink;
  };
  const handleTo = (item: (typeof productLinkList)[number], index: number) => {
    switch (item.type) {
      case "AI":
        Taro.navigateTo({
          url: `${item.path}?id=${productDetail.id}&skuId=${productDetail.id}`,
        });
        break;

      case "video_product_source":
        let flagvideo = handleRouterStatus(item.type, item.text);
        if (flagvideo) {
          //能生图
          let res = userClickCountFn();
          if (!res) {
            pipeFn(
              () => handleRouterStatus(item.type, item.text),
              () => handleCreateVideoTask(item.type)
            )();
          }
        }

        break;
      case "changjingtu_sku":
      default:
        let flagImage = handleRouterStatus(item.type, item.text);
        if (flagImage) {
          //能生图
          let res = userClickCountFn();
          if (!res) {
            pipeFn(
              () => handleRouterStatus(item.type, item.text),
              () =>
                Taro.navigateTo({
                  url: `${item.path}?type=${item.type}&id=${
                    productDetail.id
                  }&detailId=${getProductLink(item.type)!._id}`,
                })
            )();
          }
        }
        break;
    }
  };

  // const userClickCountFn = (
  //   item?: (typeof productLinkList)[number],
  //   index?: number
  // ) => {
  //   const dataTime: number = Taro.getStorageSync("dataTime");
  //   if (!dataTime) {
  //     //如果没存时间，就把现在时间存进去
  //     Taro.setStorageSync("dataTime", new Date().getDate()); //
  //     return clickCount(item, index);
  //   } else {
  //     //存过时间，就和当前时间对比
  //     let data = new Date().getDate(); //当前时间
  //     if (dataTime != data) {
  //       //两个时间一致，就是当天
  //       Taro.removeStorage({ key: "userCLickCount" });
  //       Taro.setStorageSync("dataTime", new Date().getDate()); //
  //     }
  //     return clickCount(item, index);
  //   }
  // };
  //统计用户点击生成数量
  const userClickCountFn = () => {
    let resulr: boolean = false;
    const userId: IUser = Taro.getStorageSync("user");
    const { id, companyId } = userId.user;
    if (excludeTipsIds.includes(id)) {
      return false;
    }
    let date = new Date().getDate();
    const userCLickCount: { userId: string; count: number; time: any }[] =
      Taro.getStorageSync(`userCLickCount${date}`);
    if (!userCLickCount) {
      Taro.setStorageSync(`userCLickCount${date}`, [
        {
          userId: id,
          count: 1,
          time: currentTime,
        },
      ]);
    } else {
      const flag = userCLickCount.find((v) => v.userId == id);
      if (
        companyId == "6530dda76a6e8d7878bb196b" &&
        !excludesTips.includes(id)
      ) {
        if (!flag) {
          //没用相同id的
          userCLickCount.push({ userId: id, count: 1, time: currentTime });
          Taro.setStorageSync(`userCLickCount${date}`, userCLickCount);
        } else {
          userCLickCount.forEach((v) => {
            if (v.userId == id) {
              const differenceInDays = currentTime.diff(v.time, "day");

              if (Math.abs(differenceInDays) > 3) {
                //超过三天
                resulr = true;
                setShowTimeModal(true);
                setTimeout(() => {
                  setShowTimeModal(false);
                }, 3000);
              } else {
                if (v.count >= 3) {
                  resulr = true;
                  setShowModal(true);
                  setTimeout(() => {
                    setShowModal(false);
                  }, 3000);
                } else {
                  v.count = v.count + 1;
                  Taro.setStorageSync(`userCLickCount${date}`, userCLickCount);
                }
              }
            }
            return false;
          });
        }
      }
    }
    return resulr;
  };

  return (
    <View className="product-select-product-container">
      <NavTool color="#000" title={detail as string} isShowToTop />
      <View className="wrap-container-space-16">
        <Image
          fadeIn
          className="product-select-product-img"
          src={productDetail.data}
          mode="aspectFit"
        />
        <View className="product-select-product-title van-multi-ellipsis--l2">
          {productDetail.name}
        </View>
        <View className="product-select-product-link-wrap">
          <View className="product-select-product-link-title">
            选择你要制作的素材类型
          </View>
          {productLinkList.map((item, idx) => (
            <View
              key={idx}
              className="product-select-product-link-item"
              onClick={() => {
                // if (
                //   userInfo.user.companyId != "6530dda76a6e8d7878bb196b" ||
                //   idx == 2
                // ) {
                handleTo(item, idx);
                // } else {
                //   // userClickCountFn(item, idx);
                // }
              }}
            >
              <View className="product-select-product-link-item-left">
                <Image
                  fadeIn
                  className="product-select-product-link-item-left_img"
                  src={item.src}
                />
                <View>{item.text}</View>
              </View>
              <Icon name="arrow" />
            </View>
          ))}
        </View>
        <BaseBgLogo image="logoImg"></BaseBgLogo>
      </View>

      {showModal ? (
        <>
          <View className="product-user-click-count">
            <Icon name="fail" className="icon"></Icon>
            <View className="">今日ai已经帮您生成3条商品内容,</View>
            <View className="">请明日继续哦～</View>
          </View>
        </>
      ) : null}
      {showTimeModal ? (
        <>
          <View className="product-user-click-count">
            <Icon name="fail" className="icon"></Icon>
            <View className="">您的3天试用期已结束。感谢您的体验！</View>
          </View>
        </>
      ) : null}
    </View>
  );
}
