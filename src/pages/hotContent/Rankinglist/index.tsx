import { Image, Picker, View } from "@tarojs/components";
import { startTransition, useEffect, useState } from "react";
import trophy from "@/assets/images/hotIndex/trophy.png";
import one from "@/assets/images/hotIndex/one.png";
import two from "@/assets/images/hotIndex/two.png";
import three from "@/assets/images/hotIndex/three.png";
import classNames from "classnames";
import { Empty, Icon } from "@antmjs/vantui";
import { pxTransform } from "@tarojs/taro";
import { useCapsuleHeight } from "@/hooks/pagePositionCapsuleHooks";
import dayjs from "dayjs";
import { ITranking } from "@/types/tranking";
import emptyPng from "@/assets/images/common/empty.png";
import { rankingHeadHeight, rankingTabList } from "../constant";
import "./index.less";

const indexImg = [
  { index: 0, img: one },
  { index: 1, img: two },
  { index: 2, img: three },
];
const groupMap = new Map(
  indexImg.map((obj) => {
    return [obj.index, obj];
  })
);

const timeTabArr = [
  { label: "周榜", value: "week" },
  { label: "月榜", value: "month" },
];
let from_date: string = "";
let to_date: string | null = null;
export default function RankingList() {
  const [allHeight] = useCapsuleHeight("all");
  const [tabRanking] = useState(
    rankingTabList.map((w) => ({ label: w.label, value: w.value }))
  );
  const [tabRankingIdx, setTabRankingIdx] = useState(0);

  const publishCountArr = rankingTabList[tabRankingIdx].children;

  const [trankPage, setTrankPage] = useState<ITranking[]>([]);
  const [filterParam, setFilterParm] = useState({
    selectTime: "",
    timeTabIdx: 0,
    publishCountIdx: 0,
  });

  useEffect(() => {
    setTime(
      dayjs().subtract(7, "day").format("YYYY-MM-DD"),
      dayjs().format("YYYY-MM-DD")
    );
    queryPage();
  }, [tabRankingIdx]);
  const queryPage = async () => {
    const res = await rankingTabList[tabRankingIdx].urlFn({
      from_date,
      to_date,
      order: publishCountArr[filterParam.publishCountIdx].value,
      limit: 100,
      offset: 0,
    });
    setTrankPage(sortVal(res.list || [], filterParam.publishCountIdx));
  };

  const sortVal = (list: any[], idx: any) => {
    return list.sort(
      (a, b) =>
        (b[rankingTabList[tabRankingIdx].children[idx].value] || 0) -
        (a[rankingTabList[tabRankingIdx].children[idx].value] || 0)
    );
  };

  const setTime = (_from_date: string, _to_date: string | null = null) => {
    from_date = _from_date;
    to_date = _to_date;
  };

  const listElement = () => (
    <View className="hotIndex_dataIndex">
      {trankPage.map((v, i) => {
        if (i === 0) {
          return (
            <View className="hotIndex_dataIndex_one" key={Math.random() + ""}>
              <View className="hotIndex_dataIndex_one_linear">
                <View className="hotIndex_dataIndex_one_linear_1">排名</View>
                <View className="hotIndex_dataIndex_one_linear_2">
                  {tabRanking[tabRankingIdx].label.substring(0, 2)}
                </View>
                <View className="hotIndex_dataIndex_one_linear_3">
                  {
                    rankingTabList[tabRankingIdx].children[
                      filterParam.publishCountIdx
                    ].label
                  }
                </View>
              </View>
              <View className="hotIndex_dataindex_item item_one">
                <View className="index">
                  <Image fadeIn className="" src={groupMap.get(i)?.img} />
                </View>
                {(v.cover || v.avatar) && (
                  <View className="imagebox">
                    <Image
                      fadeIn
                      className=""
                      mode="aspectFit"
                      src={v.cover || v.avatar}
                    />
                  </View>
                )}
                <View className="textbox">
                  <View className="title van-ellipsis">{v.title || "-"}</View>
                  {v.team_name ? (
                    <View className="textbox-desc">{v.team_name}</View>
                  ) : null}
                  {/* <View>
                    <Text className="name">{v.name}</Text>
                    <Text className="address">{v.address}</Text>
                  </View> */}
                </View>
                {/* @ts-ignore */}
                <View className="hot">
                  {Number(
                    v[
                      rankingTabList[tabRankingIdx].children[
                        filterParam.publishCountIdx
                      ].value
                    ] || 0
                  ).toLocaleString()}
                </View>
              </View>
            </View>
          );
        } else {
          return (
            <View key={Math.random() + ""} className="hotIndex_dataindex_item">
              <View className="index">
                {!groupMap.get(i)?.img ? (
                  i + 1
                ) : (
                  <Image fadeIn className="" src={groupMap.get(i)?.img} />
                )}
              </View>
              {(v.cover || v.avatar) && (
                <View className="imagebox">
                  <Image
                    fadeIn
                    className=""
                    mode="aspectFit"
                    src={v.cover || v.avatar}
                  />
                </View>
              )}
              <View className="textbox">
                <View className="title van-ellipsis">{v.title || "-"}</View>
                {v.team_name ? (
                  <View className="textbox-desc">{v.team_name}</View>
                ) : null}
              </View>
              {/* @ts-ignore */}
              <View className="hot">
                {Number(
                  v[
                    rankingTabList[tabRankingIdx].children[
                      filterParam.publishCountIdx
                    ].value
                  ] || 0
                ).toLocaleString()}
              </View>
            </View>
          );
        }
      })}
    </View>
  );

  const tabRankingElement = () => {
    return tabRanking.map((tab, tabIdx) => (
      <View
        key={tab.value}
        className={classNames("tab-ranking-item", {
          "tab-ranking-item-active": tabIdx === tabRankingIdx,
        })}
        onClick={() => {
          startTransition(() => {
            setTrankPage([]);
            setFilterParm({
              selectTime: "",
              timeTabIdx: 0,
              publishCountIdx: 0,
            });
            setTabRankingIdx(tabIdx);
          });
        }}
      >
        {tab.label}
      </View>
    ));
  };

  const filterRankingElement = () => {
    return (
      <>
        <View className="ranking-filter-time-wrap">
          <View className="ranking-filter-time-wrap">
            <View className="ranking-filter-time-tab-wrap">
              {timeTabArr.map((w, idx) => (
                <View
                  key={w.value}
                  className={classNames("ranking-filter-time-tab-item", {
                    "ranking-filter-time-tab-item-active":
                      idx === filterParam.timeTabIdx,
                  })}
                  onClick={() => {
                    setFilterParm((prev) => ({ ...prev, timeTabIdx: idx }));
                    setTime(
                      dayjs()
                        .subtract(idx === 0 ? 7 : 30, "day")
                        .format("YYYY-MM-DD"),
                      dayjs().format("YYYY-MM-DD")
                    );
                    queryPage();
                  }}
                >
                  {w.label}
                </View>
              ))}
            </View>
          </View>
          <Picker
            value={filterParam.selectTime}
            className=""
            mode="date"
            onChange={(e) => {
              setFilterParm((prev) => ({
                ...prev,
                selectTime: e.detail.value,
              }));
              setTime(e.detail.value, null);
              queryPage();
            }}
          >
            <View className="ranking-filter-select">
              <View className="ranking-filter-select-text">
                {filterParam.selectTime.replace(/-/g, "/") || "请选择时间"}
              </View>
              <Icon name="play" className="ranking-filter-select-allow"></Icon>
            </View>
          </Picker>
        </View>
        <Picker
          className=""
          mode="selector"
          range={publishCountArr.map((w) => w.label)}
          onChange={(e) => {
            startTransition(() => {
              setFilterParm((prev) => ({
                ...prev,
                publishCountIdx: +e.detail.value,
              }));
              setTrankPage(sortVal(trankPage, +e.detail.value));
            });
            // queryPage()
          }}
        >
          <View className="ranking-filter-select">
            <View className="ranking-filter-select-text">
              {publishCountArr[filterParam.publishCountIdx].label}
            </View>
            <Icon name="play" className="ranking-filter-select-allow"></Icon>
          </View>
        </Picker>
      </>
    );
  };

  return (
    <View
      style={{ marginTop: pxTransform(0 - (rankingHeadHeight - allHeight)) }}
    >
      {/* <View className={classNames({hotInde)x_top hotIndex_no_top }}> */}
      <View>
        <View className="hotIndex_top_videoindex">
          <View className="hotIndex_top_videoindex_text">
            <View className="hotIndex_top_videoindex_text_title">
              {tabRanking[tabRankingIdx].label.substring(0, 2)}排行榜
            </View>
            <View className="hotIndex_top_videoindex_text_content">
              每日凌晨2点前更新-日榜单
            </View>
          </View>
          <View className="hotIndex_top_videoindex_img">
            <Image fadeIn className="" src={trophy} />
          </View>
        </View>
        <View className="tab-ranking-container">
          <View className="tab-ranking-wrap">{tabRankingElement()}</View>
        </View>
        <View className="ranking-filter--container">
          <View className="ranking-filter-wrap">{filterRankingElement()}</View>
        </View>
      </View>
      {trankPage.length ? (
        <>
          {listElement()}
          <View className="ranking-desc">仅展示排名前100</View>
        </>
      ) : (
        <View>
          <Empty
            className="custom-image"
            image={emptyPng}
            description="暂无数据"
          />
        </View>
      )}
    </View>
  );
}
