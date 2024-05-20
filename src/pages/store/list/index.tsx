import CardVideoListItem from '@/components/card/videoListItem'
import { View,Image } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import { Tab, Tabs ,Grid, GridItem,PullToRefresh ,IPullToRefreshProps,Loading} from "@antmjs/vantui";

import React, { ReactNode, useEffect, useState } from "react";
import { getPosterList } from "@/apis/product";
import { IPosterList } from "@/types/product";
import BaseEmptyWrap from '@/components/base/baseEmptyWrap'
import { formatDateVerify } from "@/common/verifyUtils";
import './index.less'

export default function StoreList() {
  const [scrollTop] = React.useState(0);
  const [isShowLoading, setIsShowLoading] = React.useState(false);
  const [active, setActive] = useState(0);
  const [PosterList, setPosterList] = useState<IPosterList[]>([]);
  const errImg = "/src/assets/images/common/errImg.jpg";
  const onRefresh: IPullToRefreshProps["onRefresh"] = () => {
    return new Promise(() => {
      getPoster()
    });
  };
  useEffect(() => {
    setIsShowLoading(true);
    getPoster()
  }, [])
  //获取海报
  async function getPoster() {
    await getPosterList({
      skip:  0,
      limit: 10,
    }).then((res) => {
      if (!res.list.length) {
        return false;
      } else {
        setIsShowLoading(false);
        setPosterList(res.list);
        // res.list.forEach((v) => PosterList.push(v));
        console.log(PosterList)
      }
    });
  }

  const listElement = () => {
    return (
      <BaseEmptyWrap>
        {PosterList.map(w => (
          <CardVideoListItem
            onClick={() =>
              Taro.navigateTo({
                url: `/pages/AI/detail/index?id=${w.id}`,
              })
            }
            key={w.id}
            title={w.title}
            url={w.cover}
          />
        ))}
      </BaseEmptyWrap>
    )
  }
  const gridELement = () => {
    const listEle: ReactNode[] = [];
    if (PosterList.length == 0) return;
    PosterList?.forEach((w, idx) =>
        listEle.push(
          <GridItem key={idx}>
            <View className="my-marketing-item "
              onClick={() => {
                Taro.navigateTo({
                  url: `/pages/product/GenerateImagePosters/index?posterId=${w.id}`,
                });
              }}
            > 
              <Image fadeIn mode="aspectFit" className="my-marketing-item-img" src={w.cover} nativeProps={errImg as any}  />
            </View>
          </GridItem>
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
     <View className="wrap-container-space-16">
       <Tabs  swipeable  animated color="#82A5A2" className="my-marketing-tabs-wrap" lineWidth="24" sticky
        onChange={(e) => {
          setActive(e.detail.index);
        }}
      >
        <Tab title="海报模板">
        <PullToRefresh  disable={scrollTop > 0} successDuration={1000} onRefresh={onRefresh} >
            {imagesElement()}
            {isShowLoading ? (
              <View className="image-list_loading">
                <Loading type="spinner" />
              </View>
            ) : null}
          </PullToRefresh>
       
        </Tab>
        <Tab title="智能合拍">
          asd222
          {/* <TabVideoList></TabVideoList> */}
        </Tab>
      </Tabs>
     
    </View>
   
  );
}
