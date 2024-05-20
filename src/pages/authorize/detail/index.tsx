import { Button, Image, Text, View } from "@tarojs/components";
import { Grid, GridItem } from "@antmjs/vantui";
import React, { useEffect } from "react";
import { douyinInfo } from "@/apis/user";
import { IDouyinUserData } from "@/types/douyin";
import classNames from "classnames";
import Taro from "@tarojs/taro";
import "./index.less";

const btnArr = [
  { date: "昨天", text: "yesterday", live: "yesterdayLive" },
  { date: "本周", text: "recentWeek", live: "recentWeekLive" },
  { date: "本月", text: "recentMonth", live: "recentMonthLive" },
] as const;
const countArr = [
  { data: "newFansCount",
    text: "新增粉丝数",
  },
  {
    data: "newVideoCount",
    text: "视频发布量",
  },
  {
    data: "newPlayCount",
    text: "视频播放量(增量)",
  },
  {
    data: "newLikeCount",
    text: "点赞数（增量）",
  },
  {
    data: "newCommentCount",
    text: "评论数(增量)",
  },
] as const;

const liveCountArr = [
  {
    data: "liveCount",
    text: "直播场次",
  },
  {
    data: "liveDuration",
    text: "直播时长",
  },
  {
    data: "liveViews",
    text: "观看人次",
  },
  {
    data: "liveInteractions",
    text: "互动人次",
  },
  {
    data: "liveOnlineAvg",
    text: "场均在线人数",
  },
] as const;

// newCommentCount: 0
// newFansCount: 0
// newLikeCount: 0
// newPlayCount: 0
// newVideoCount: 0

// function CountCom({ num = 0 }: { num: number }) {
//   return (
//     <View className="fan_count">
//       {num > 10000 ? Math.round((num / 10000) * 10) / 10 : num}
//       {num > 10000 && <Text>W</Text>}
//     </View>
//   );
// }

export default function AuthDetails() {
  const [index, setIndex] = React.useState(0);
  const [userDetail, setUserDetail] = React.useState<INewDouyinInfo>(
    {} as INewDouyinInfo
  );
  const [windowWidth, setWindowWidth] = React.useState(0);

  const [userData, setUserData] = React.useState<IDouyinUserData>(
    {} as IDouyinUserData
  );
  useEffect(() => {
    getDouyinInfo();
  }, []);

  useEffect(() => {
    if (Object.keys(userDetail).length) {
      setUserData({
        ...userDetail[btnArr[index].text],
        ...userDetail[btnArr[index].live],
      });
    }
  }, [index]);
  useEffect(() => {
    const res = Taro.getSystemInfoSync();
    setWindowWidth(res.windowWidth);
  }, []);
  async function getDouyinInfo() {
    let res = await douyinInfo();
    setUserDetail(res);
    setUserData({
      ...res[btnArr[index].text],
      ...res[btnArr[index].live],
    });
  }
  return (
    <View
      className={classNames({ detail: true, max_width: windowWidth > 500 })}
    >
      {/* <NavTool
        title="抖音授权"
        isShowToTop
        noTopColor="none"
        color="black"
      ></NavTool> */}
      <View className="detail_info">
        <View className="detail_info_user_logo">
          <Image
            fadeIn
            style={{ borderRadius: "50%" }}
            className=""
            src={userDetail?.douyinAvatar}
          />
        </View>
        <View className="detail_info_text">
          <View className="detail_info_text_username">{userDetail?.name}</View>
          <View className="detail_info_text_nikename">
            抖音昵称：{userDetail?.douyinNickname}
          </View>
        </View>
      </View>
      <View className="detail_count">
        <View className="detail_count_data  detail_count_data_active">
          <View className="content_count">
            {userDetail?.totalVideos}
            <Text className="content_count_text">条</Text>
          </View>
          <View className="content_content_count">发布内容数量</View>
        </View>
        <View className="detail_count_data ">
          <View className="fan_count">{userDetail?.totalFans}</View>
          <View className="fan_text">抖音粉丝数</View>
        </View>
      </View>
      <View className="detail-data_overview">
        <View className="data_overview_title">
          <View className="data_overview_title_left">数据总览</View>
          <View className="data_overview_title_right">每天0点更新数据</View>
        </View>
        <View className="data_overview_countbox">
          <View className="data_overview_countbox_btn">
            {btnArr.map((v, i) => (
              <Button
                key={i}
                onClick={() => {
                  setIndex(i);
                }}
                className={i == index ? "action" : ""}
              >
                {v.date}
              </Button>
            ))}
          </View>
          <View className="data_overview_countbox_data">
            {Object.keys(userData).length ? (
              <View className="type-btn">短视频</View>
            ) : null}
            <Grid
              className="Grid"
              border={false}
              center
              columnNum="3"
              gutter="5px"
            >
              {Object.keys(userData).length &&
                countArr.map((v) => {
                  return (
                    <GridItem className="GridItem" key={v.text}>
                      <View className="GridItem_count">{userData[v.data]}</View>
                      <View className="GridItem_text">{v.text}</View>
                    </GridItem>
                  );
                })}
            </Grid>
          </View>
          <View className="data_overview_countbox_data">
            {Object.keys(userData).length ? (
              <View className="type-btn">直播</View>
            ) : null}
            <Grid
              className="Grid"
              border={false}
              center
              columnNum="3"
              gutter="5px"
            >
              {Object.keys(userData).length &&
                liveCountArr.map((v) => {
                  return (
                    <GridItem className="GridItem" key={v.text}>
                      <View className="GridItem_count">{userData[v.data]}</View>
                      <View className="GridItem_text">{v.text}</View>
                    </GridItem>
                  );
                })}
            </Grid>
          </View>
        </View>
      </View>
    </View>
  );
}
