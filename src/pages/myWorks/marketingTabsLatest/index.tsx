import { Image, View } from "@tarojs/components";
import {
  Grid,
  GridItem,
  IPullToRefreshProps,
  Loading,
  PullToRefresh,
  Tab,
  Tabs,
} from "@antmjs/vantui";
import productImg from "@/assets/images/common/product.png";
import playImg from "@/assets/images/common/play.png";
import React, { ReactNode, useEffect } from "react";
import { getTask, gitProduckVideoList } from "@/apis/product";
import Taro, { useReachBottom } from "@tarojs/taro";
import { IVideoItem, ItaskDataList } from "@/types/product";
import { formatDateVerify } from "@/common/verifyUtils";
import "./index.less";

export default function MyMarketingTabs() {
  // const [setActive] = useState(0);
  const [isShowLoading, setIsShowLoading] = React.useState(false);
  const [limit, setLimit] = React.useState(20);
  const [imgList, setImgList] = React.useState<ItaskDataList[]>([
    {
      _id: "659b8f7be20203ae49d50012",
      type: ["image-img", "img-text", "img-video", "img-exp"],
      ignore: {
        active: false,
      },
      userId: "64dddbf6d6ec9238b84af377",
      appId: "1168429",
      companyId: "64cdede34fad2728558a91c6",
      teamId: "652d1fa5ec66417bddcc66cb",
      params: {
        productId: "658aa25099ed03006e80a536",
        senceId: "zk76n95dohd",
        sceneName: "客厅",
        styleId: "q26nvpxrlck",
        style: "北欧风",
        imageCount: 2,
        product: {
          name: "塔式暖风机",
          mark: "RoHSHFU22LRS",
        },
        isDemoTask: true,
        resourceId: "65373b301d5b50922917240f",
      },
      result: {
        images: {
          subItem: ["659b8f7be20203ae49d50014", "659b8f7be20203ae49d50016"],
          progress: 1,
          status: "finish",
          data: [
            {
              data: {
                source:
                  "https://cdn.web.cenmetahome.cn/demo-repo-resources-03prw1/images/test/65373b301d5b50922917240f/7c319c31-69a0-4ad5-8a2b-ad1cf9360f64.png",
                thumbnail:
                  "https://cdn.web.cenmetahome.cn/demo-repo-resources-03prw1/images/test/65373b301d5b50922917240f/7c319c31-69a0-4ad5-8a2b-ad1cf9360f64.png",
              },
              date: "2024-01-08T06:00:31.093Z",
              progress: 1,
            },
            {
              data: {
                source:
                  "https://cdn.web.cenmetahome.cn/demo-repo-resources-03prw1/images/test/65373b301d5b50922917240f/4d9a3871-7afc-4695-afcb-0c3dd6823cca.png",
                thumbnail:
                  "https://cdn.web.cenmetahome.cn/demo-repo-resources-03prw1/images/test/65373b301d5b50922917240f/4d9a3871-7afc-4695-afcb-0c3dd6823cca.png",
              },
              date: "2024-01-08T06:00:29.090Z",
              progress: 1,
            },
          ],
          thumbnail: [
            "https://cdn.web.cenmetahome.cn/demo-repo-resources-03prw1/images/test/65373b301d5b50922917240f/7c319c31-69a0-4ad5-8a2b-ad1cf9360f64.png",
            "https://cdn.web.cenmetahome.cn/demo-repo-resources-03prw1/images/test/65373b301d5b50922917240f/4d9a3871-7afc-4695-afcb-0c3dd6823cca.png",
          ],
          bigImg: [
            "https://cdn.web.cenmetahome.cn/demo-repo-resources-03prw1/images/test/65373b301d5b50922917240f/7c319c31-69a0-4ad5-8a2b-ad1cf9360f64.png",
            "https://cdn.web.cenmetahome.cn/demo-repo-resources-03prw1/images/test/65373b301d5b50922917240f/4d9a3871-7afc-4695-afcb-0c3dd6823cca.png",
          ],
        },
        video: {
          progress: 0,
          status: "wait",
          data: "",
        },
        text: {
          xiaohongshu: {
            chatAnswerId: "",
          },
          wechatpyq: {
            chatAnswerId: "",
          },
          douyin: {
            chatAnswerId: "",
          },
        },
        expansion: {
          data: [],
        },
      },
      createdAt: "2024-01-08T06:00:27.361Z",
      updatedAt: "2024-01-08T06:00:31.112Z",
      progress: 2,
    },
    {
      _id: "659b8f74e20203ae49d4ffef",
      type: ["image-img", "img-text", "img-video", "img-exp"],
      ignore: {
        active: false,
      },
      userId: "64dddbf6d6ec9238b84af377",
      appId: "1168429",
      companyId: "64cdede34fad2728558a91c6",
      teamId: "652d1fa5ec66417bddcc66cb",
      params: {
        productId: "658aa25099ed03006e80a536",
        senceId: "zk76n95dohd",
        sceneName: "客厅",
        styleId: "q26nvpxrlck",
        style: "北欧风",
        imageCount: 2,
        product: {
          name: "塔式暖风机",
          mark: "RoHSHFU22LRS",
        },
        isDemoTask: true,
        resourceId: "65373b301d5b50922917240f",
      },
      result: {
        images: {
          subItem: ["659b8f74e20203ae49d4fff1", "659b8f74e20203ae49d4fff3"],
          progress: 1,
          status: "finish",
          data: [
            {
              data: {
                source:
                  "https://cdn.web.cenmetahome.cn/demo-repo-resources-03prw1/images/test/65373b301d5b50922917240f/d5f2a9f7-a0be-4131-9831-b8608ff941b2.png",
                thumbnail:
                  "https://cdn.web.cenmetahome.cn/demo-repo-resources-03prw1/images/test/65373b301d5b50922917240f/d5f2a9f7-a0be-4131-9831-b8608ff941b2.png",
              },
              date: "2024-01-08T06:00:23.090Z",
              progress: 1,
            },
            {
              data: {
                source:
                  "https://cdn.web.cenmetahome.cn/demo-repo-resources-03prw1/images/test/65373b301d5b50922917240f/1b3c6d3a-3940-4e43-be0f-cf9d46dfcdcb.png",
                thumbnail:
                  "https://cdn.web.cenmetahome.cn/demo-repo-resources-03prw1/images/test/65373b301d5b50922917240f/1b3c6d3a-3940-4e43-be0f-cf9d46dfcdcb.png",
              },
              date: "2024-01-08T06:00:21.093Z",
              progress: 1,
            },
          ],
          thumbnail: [
            "https://cdn.web.cenmetahome.cn/demo-repo-resources-03prw1/images/test/65373b301d5b50922917240f/d5f2a9f7-a0be-4131-9831-b8608ff941b2.png",
            "https://cdn.web.cenmetahome.cn/demo-repo-resources-03prw1/images/test/65373b301d5b50922917240f/1b3c6d3a-3940-4e43-be0f-cf9d46dfcdcb.png",
          ],
          bigImg: [
            "https://cdn.web.cenmetahome.cn/demo-repo-resources-03prw1/images/test/65373b301d5b50922917240f/d5f2a9f7-a0be-4131-9831-b8608ff941b2.png",
            "https://cdn.web.cenmetahome.cn/demo-repo-resources-03prw1/images/test/65373b301d5b50922917240f/1b3c6d3a-3940-4e43-be0f-cf9d46dfcdcb.png",
          ],
        },
        video: {
          progress: 0,
          status: "wait",
          data: "",
        },
        text: {
          xiaohongshu: {
            chatAnswerId: "",
          },
          wechatpyq: {
            chatAnswerId: "",
          },
          douyin: {
            chatAnswerId: "",
          },
        },
        expansion: {
          data: [],
        },
      },
      createdAt: "2024-01-08T06:00:20.725Z",
      updatedAt: "2024-01-08T06:00:23.112Z",
      progress: 2,
    },
  ]);
  const [videoList, setVideoList] = React.useState<IVideoItem[]>([
    {
      _id: "658d1397cd7bdffee99189f4",
      type: "video_of_product_video_assistant",
      userId: "64dddbf6d6ec9238b84af377",
      appId: "1168443",
      companyId: "64fee410d556edecb84ca569",
      parentResourceId: "658aa25099ed03006e80a536",
      parentTaskId: null,
      argument: {
        product: {
          name: "塔式暖风机",
          sellingpoint: null,
          belong: "company",
        },
        oralAiticleId: [],
        data: [],
        bgMusic: "",
        isDemoTask: true,
        resourceId: "65373b301d5b50922917240f",
      },
      attribute: {
        status: "finish",
      },
      result: {
        video:
          "https://cdn.web.cenmetahome.cn/demo-repo-resources-03prw1/videos/test/6585497913a8806299b513b0/c9b9139f-6ab9-436f-b800-8195bd0be4d1.mp4",
        thumbnail: null,
      },
      createdAt: "2023-12-28T06:20:07.308Z",
      updatedAt: "2023-12-28T06:20:07.308Z",
      answerInfo: null,
    },
  ]);
  const [scrollTop] = React.useState(0);

  useEffect(() => {
    getTask({
      skip: 0,
      limit: 1,
      status: "finish",
    });
  }, []);

  // function utcTimestamp(time: string) {
  //   const data = new Date(time);
  //   return data.toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" });
  // }
  const gridELement = () => {
    const listEle: ReactNode[] = [];

    imgList?.forEach((w, idx) =>
      w.result?.images?.data?.forEach((item) =>
        listEle.push(
          <GridItem key={idx}>
            <View
              className="my-marketing-item"
              onClick={() => {
                Taro.navigateTo({
                  url: `/pages/product/generateImageMaterial/index?taskId=${w._id}`,
                });
              }}
            >
              <Image
                fadeIn
                mode="widthFix"
                className="my-marketing-item-img"
                src={item.data.thumbnail}
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

    // <View className="my-marketing-item-wrap">
    //   <Grid border={false} gutter={10} columnNum={2}>
    //     {new Array(10).fill(0).map((w, idx) => (
    //       <GridItem key={idx}>
    //         <View className="my-marketing-item">
    //           <Image fadeIn
    //             mode="widthFix"
    //             className="my-marketing-item-img"
    //             src={productImg}
    //           />
    //           <View className="my-marketing-item-title">但一步沙发-奶优风</View>
    //           <View className="my-marketing-item-desc">
    //             2022-11-22 22:22:33
    //           </View>
    //         </View>
    //       </GridItem>
    //     ))}
    //   </Grid>
    // </View>
  );

  const videoElement = () => (
    <View className="my-marketing-item-wrap">
      <Grid border={false} gutter={10} columnNum={2}>
        {videoList?.map((v, idx) => (
          <GridItem key={idx}>
            <View
              className="my-marketing-item"
              onClick={() => {
                Taro.navigateTo({
                  url: `/pages/product/generateVideoMaterial/index?_id=${v._id}`,
                });
              }}
            >
              <Image
                fadeIn
                className="my-marketing-item-video-img"
                src={productImg}
              />
              <Image
                fadeIn
                src={playImg}
                className="my-marketing-item-video-play-img"
              ></Image>
              <View className="my-marketing-item-video-info-wrap">
                <View className="my-marketing-item-video-title">
                  {v.argument.product.name}
                </View>
                <View className="my-marketing-item-video-desc">
                  {formatDateVerify(v.createdAt)}
                </View>
              </View>
            </View>
          </GridItem>
        ))}
      </Grid>
    </View>
  );

  const tabsELement = () => {
    return (
      <View className="my-works-tab-wrap">
        <View className="my-works-tab" onClick={() => Taro.navigateBack()}>
          按产品分类
        </View>
        <View className="my-works-tab  my-works-tab-active">最近生成</View>
      </View>
    );
  };

  //getImage
  async function getImg() {
    await getTask({
      skip: 0,
      limit,
      status: "finish",
    }).then((res) => {
      if (res.list.length) {
        setImgList(res.list);
      }
    });
  }
  const onRefresh: IPullToRefreshProps["onRefresh"] = () => {
    return new Promise(() => {
      getImg();
    });
  };
  useReachBottom(() => {
    setIsShowLoading(true);
    setLimit(limit + 1);
    setTimeout(() => {
      getImg().finally(() => {
        setIsShowLoading(false);
      });
    }, 500);
  });
  useEffect(() => {
    gitProduckVideoList({
      skip: 0,
      limit,
      status: "finish",
      type: "video_of_product_video_assistant",
    }).then((res) => {
      if (res.list.length) {
        setVideoList(res.list);
      }
    });
    getImg();
  }, []);

  return (
    <>
      {/* {noticeBarElement()} */}
      {tabsELement()}
      <Tabs
        swipeable
        animated
        color="#82A5A2"
        sticky
        className="my-marketing-tabs-wrap"
        onChange={() => {
          // setActive(e.detail.index);
        }}
      >
        <Tab title="图片">
          <PullToRefresh
            disable={scrollTop > 0}
            successDuration={1000}
            onRefresh={onRefresh}
          >
            {imagesElement()}
            {isShowLoading ? (
              <View className="image-list_loading">
                <Loading type="spinner" />
              </View>
            ) : null}
          </PullToRefresh>
        </Tab>
        <Tab title="视频">
          <PullToRefresh
            disable={scrollTop > 0}
            successDuration={1000}
            onRefresh={onRefresh}
          >
            {videoElement()}
          </PullToRefresh>
        </Tab>
      </Tabs>
    </>
    // <View className="wrap-container-space-16 dropwn-menu-height-none">
    //   {searchElement()}
    //   {searchListElement()}
    //   {tabsELement()}
    //   <WaterfallFlow
    //     dataSource={list}
    //     columnNum={2}
    //     gutter={8}
    //     renderItem={renderItem}
    //     calculationDelay={1000}
    //   />
    // </View>
  );
}
