import { View, Image } from "@tarojs/components";
import Taro, { useDidShow, useRouter } from "@tarojs/taro";
import { Button, Swiper, SwiperItem, NoticeBar } from "@antmjs/vantui";
import BaseBgLogo from "@/components/base/baseBgLogo";
import { useState, useEffect } from "react";
import tuiImg from "@/assets/images/home/首页_slices/icon_tui.png";
import yinliu from "@/assets/images/home/首页_slices/icon_yinliu.png";
import shipin from "@/assets/images/home/首页_slices/icon_shipin.png";
import { IUserBanners, IUserNotice } from "@/types/user";
import { banners, login, notice, teamListUser } from "@/apis/user";
import { setUserStore } from "@/store/user";
import "./index.less";

export default function Home() {
  const [initPage1] = useState(0);
  const router = useRouter();
  const [bannerList, setBannerList] = useState<IUserBanners[]>([
    // { _id: "1", cover: tuiImg },
    // { _id: "2", cover: yinliu },
    // { _id: "3", cover: shipin },
  ]);
  const [noticeList, setNoticeList] = useState<IUserNotice[]>([]);
  let version = Taro.getAccountInfoSync().miniProgram.envVersion;

  useDidShow(() => {
    // getBannerInfo();
    getUserDate();
  });

  const getUserDate = async () => {
    const username = router.params?.username;
    // const username = "aux_dangxiaojuan";
    if (!username) {
      getBannerInfo();
      return;
    }

    let res = await login(
      {
        type: "channel",
        payload: { username: username },
      },
      {
        "x-company":
          version == "develop" || version == "trial"
            ? "663c78b62ee99854b6161215"
            : "", //TODO():
      }
    );
    res.user.teamId = await getTimeId();
    setUserStore(res);
    getBannerInfo();
  };
  const getTimeId = async () => {
    let teamId = await teamListUser();
    return teamId.teamList[0].id;
  };

  const getBannerInfo = async () => {
    const res = await banners();
    // console.log(ref);

    getNoticeInfo();
    setBannerList(res);
  };
  const getNoticeInfo = async () => {
    const res = await notice();
    setNoticeList(res);
  };

  const swiperElement = () => {
    return (
      <Swiper
        height="auto"
        className="swiper-wrap"
        paginationColor="#426543"
        autoPlay={3000}
        initPage={initPage1}
        paginationVisible
        isCenter
      >
        {bannerList.map((item) => (
          <SwiperItem className="swiper-item-image" key={item._id}>
            <Image
              fadeIn
              onClick={() =>
                Taro.navigateTo({
                  url: `/pages/activity/bannerActivity/index?activityId=${item.activityId}`,
                })
              }
              className="swiper-item-image"
              src={item.cover}
              mode="widthFix"
            />
          </SwiperItem>
        ))}
      </Swiper>
    );
  };
  const NoticeBarElement = () => {
    return (
      noticeList?.length > 0 && (
        <NoticeBar
          className="home-noticeBar"
          leftIcon="volume-o"
          text={noticeList[0].title}
          background="#171B27"
          color="#FFFFFF"
          mode={noticeList[0].activityId ? "link" : undefined}
        />
      )
    );
  };
  return (
    <View>
      {/* <View
        className="nav"
        style={{
          top: Taro.pxTransform(navTop),
          height: Taro.pxTransform(navHeight),
          lineHeight: Taro.pxTransform(navHeight),
        }}
      >
        企业营销物料助手
      </View> */}
      <View className="home-swiper-box">
        {bannerList.length ? swiperElement() : null}
      </View>
      <View className="home-body">
        {NoticeBarElement()}
        <View className="home-promotion">
          <View
            className="home-promotion-left"
            onClick={() =>
              Taro.navigateTo({
                url: "/pages/product/list/index",
              })
            }
          >
            <View>
              <Image fadeIn src={tuiImg} className="home-promotion_icon" />
            </View>
            <View className="home-promotion-left-product">推广产品</View>
            <View className="home-promotion-left-material">
              制作产品推广素材
            </View>
          </View>
          <View
            className="home-promotion-right"
            onClick={() =>
              Taro.navigateTo({
                url: "/pages/store/list/index",
              })
            }
          >
            <View>
              <Image fadeIn src={yinliu} className="home-promotion_icon" />
            </View>
            <View className="home-promotion-right-product">为门店引流</View>
            <View className="home-promotion-right-material">
              制作门店推广视频
            </View>
          </View>
        </View>
        <View
          className="tostudy"
          onClick={() =>
            Taro.navigateTo({
              url: "/pages/course/list/index",
            })
          }
        >
          <Image fadeIn src={shipin} className="tostudy_icon" />
          <View className="tostudy-text_btn">
            <View className="title">抖音爆款秘籍</View>
            <View className="text">即刻学习，冲击抖音热榜</View>
          </View>
          <Button className="btn">去学习</Button>
        </View>
      </View>

      <BaseBgLogo isFixed image="logoImg" />
      <View className="home-down-bg"></View>
    </View>
  );
}
