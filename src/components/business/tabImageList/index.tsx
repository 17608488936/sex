import { Image, View } from "@tarojs/components";
import { Grid, GridItem } from "@antmjs/vantui";
import React, { ReactNode, useEffect, useState } from "react";
import Taro, { useReachBottom } from "@tarojs/taro";
import { getTask } from "@/apis/product";
import { ItaskDataList } from "@/types/product";
import { formatDateVerify } from "@/common/verifyUtils";
import "./index.less";

export default function TabImageList() {
  const [imgList] = React.useState<ItaskDataList[]>([]);
  const [totalInfo, setTotalInfo] = useState(0);
  const [skip, setSkip] = React.useState(0);
  // const [isShowLoading, setIsShowLoading] = React.useState(false);

  const [isShowNoData, setIsShowNoData] = useState(false);
  const errImg = "/src/assets/images/common/errImg.jpg";
  useReachBottom(() => {
    // setIsShowLoading(false);
    if (skip * 10 > totalInfo) {
      setIsShowNoData(true);
      return false;
    }
    getImg();
  });
  useEffect(() => {
    getImg();
  }, []);
  //getImage
  async function getImg() {
    await getTask({
      skip: skip * 10,
      limit: 10,
      status: "finish",
    }).then((res) => {
      if (!res.list.length) {
        setIsShowNoData(true);
        return false;
      } else {
        setSkip(skip + 1);
        res.list.forEach((v) => imgList.push(v));
        setTotalInfo(res.total);
      }
    });
  }

  const gridELement = () => {
    const listEle: ReactNode[] = [];
    if (imgList.length == 0) return;
    imgList?.forEach((w, idx) =>
      w.result.images.data?.forEach((item) =>
        listEle.push(
          <GridItem key={idx}>
            <View
              className="my-marketing-item "
              onClick={() => {
                Taro.navigateTo({
                  url: `/pages/product/generateImageMaterial/index?taskId=${w._id}`,
                });
              }}
            >
              <Image
                fadeIn
                mode="aspectFit"
                className="my-marketing-item-img"
                src={item.data?.thumbnail}
                nativeProps={errImg as any}
              />
              <View className="my-marketing-item-title">
                {w.params.sceneName}-{w.params.style}
              </View>
              <View className="my-marketing-item-desc">
                {formatDateVerify(w.createdAt)}
              </View>
            </View>
          </GridItem>
        )
      )
    );
    return listEle;
  };
  const imagesElement = () => (
    <View className="my-marketing-item-wrap">
      <Grid border={false} gutter={10} columnNum={2}>
        {gridELement()}
      </Grid>
    </View>
  );
  return (
    <>
      {imagesElement()}
      <View className={isShowNoData ? "no_data" : "no_data no_show"}>
        没有更多了
      </View>
    </>
  );
}
