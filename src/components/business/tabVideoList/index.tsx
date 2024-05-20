import { View, Image } from "@tarojs/components";
import { Grid, GridItem } from "@antmjs/vantui";
import React, { useEffect, useState } from "react";
import Taro, { useReachBottom } from "@tarojs/taro";
import { gitProduckVideoList } from "@/apis/product";
import { IVideoItem } from "@/types/product";
import playImg from "@/assets/images/common/play.png";
import { formatDateVerify } from "@/common/verifyUtils";
// import BaseVideo from "@/components/base/baseVideo";
import "./index.less";

export default function TabVideoList() {
  const [videoList] = React.useState<IVideoItem[]>([]);
  const [totalInfo, setTotalInfo] = useState(10);
  const [skip, setSkip] = React.useState(0);
  // const [isShowLoading, setIsShowLoading] = React.useState(false);

  const [isShowNoData, setIsShowNoData] = useState(true);

  useEffect(() => {
    getVideo();
  }, []);

  useReachBottom(() => {
    // setIsShowLoading(false);
    if (skip * 10 > totalInfo) {
      setIsShowNoData(true);
      return false;
    }
    getVideo();
  });

  async function getVideo() {
    let res = await gitProduckVideoList({
      skip: skip * 10,
      limit: 10,
      status: "finish",
      type: "video_of_product_video_assistant",
    });
    if (!res.list.length) {
      setIsShowNoData(true);
      return false;
    } else {
      setSkip(skip + 1);
      res.list.forEach((v) => videoList.push(v));
      setTotalInfo(res.total);
    }
  }

  const videoElement = () => (
    <View className="my-marketing-item-wrap">
      <Grid border={false} gutter={10} columnNum={2}>
        {videoList?.map((v, idx) => (
          <GridItem
            key={idx}
            className="my-marketing-item-prop"
            onClick={(e) => {
              e.preventDefault();
              if (!v._id) {
                Taro.showToast({
                  icon: "error",
                  title: "_id不存在",
                });
                return;
              }
              let url = `/pages/product/generateVideoMaterial/index?_id=${v._id}`;
              if (v.type === "complex") {
                url += `&videoType=${v.type}`;
              }
              Taro.navigateTo({
                url,
              });
            }}
          >
            <View className="my-marketing-item my-marketing-item-video">
              {/* <BaseVideo
                className="my-marketing-item-video-img"
                src={v.result.video}
                poster={v.result.cover || undefined}
                controls={false}
                showPlayBtn={false}
                isCoverView
              /> */}

              <Image
                fadeIn
                className="my-marketing-item-video-img"
                mode="widthFix"
                src={
                  v.result.cover
                    ? v.result.cover
                    : `${v.result.video}?x-oss-process=video/snapshot,t_0,f_jpg`
                }
              />

              <Image
                fadeIn
                mode="aspectFit"
                src={playImg}
                className="my-marketing-item-video-play-img"
              ></Image>
              <View className="my-marketing-item-video-info-wrap">
                <View className="my-marketing-item-video-title">
                  {v.displayName}
                </View>
                <View className="my-marketing-item-video-desc">
                  {formatDateVerify(v.createdAt)}
                </View>
              </View>
            </View>
            <View className="my-marketing-item-child"></View>
          </GridItem>
        ))}
      </Grid>
    </View>
  );

  return (
    <>
      {videoElement()}
      <View className={isShowNoData ? "no_data" : "no_data no_show"}>
        没有更多了
      </View>
    </>
  );
}
