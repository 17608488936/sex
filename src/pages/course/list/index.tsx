import { View, Text, Image } from "@tarojs/components";
import { useState } from "react";
import Taro, { useDidShow } from "@tarojs/taro";
import BaseBgLogo from "@/components/base/baseBgLogo";
import { getCourseList } from "@/apis/course";
import { setCurrentCourse } from "@/store/course";
import { ICourseResItemChild } from "@/types/course";
import { Icon } from "@antmjs/vantui";
import "./index.less";

type Item = {
  url: string;
  title: string;
  count: number;
  readCount: number;
  status: boolean;
  children: ICourseResItemChild[];
  id: string;
  userState: string;
};

export default function Index() {
  // const [selectIdx] = useState(0);
  const [itemList, setItemList] = useState<Array<Item>>([]);

  useDidShow(() => {
    getCourseList().then((res) =>
      setItemList(
        res.map((item) => {
          const readCount = item.children.filter(
            (cItem) => cItem.state === "completed"
          ).length;
          return {
            url: item.cover,
            title: item.name,
            count: item.children.length,
            readCount,
            status: item.children.length === readCount,
            children: item.children,
            id: item._id,
            userState: item.userState,
          };
        })
      )
    );
  });

  return (
    <View className="page flex-col">
      <View className="box_1 flex-col">
        <View className="group_15 flex-col">
          <View className="box_2 flex-col">
            <View className="text-group_6 flex-col">
              <Text className="text_3">精选课程在线学习</Text>
              <Text className="paragraph_1">
                规则解读、直播运营、账号运营、行
                <br />
                业知识、流量转化
              </Text>
            </View>
            <Image
              fadeIn
              className="image_2"
              mode="aspectFit"
              src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPngfefa49ce506bf8b9f9247204b1af00184ed9f033bd09df2305cd196e8c316eef"
            />
          </View>
          {/* <View className="block_2 flex-row">
            {["全部", "企业课程", "精选课程"].map((w, idx) => (
              <View

                key={w}
                className={classNames("text_" + (4 + idx), {
                  action: idx === selectIdx,
                })}

                // onClick={() => setSelectIdx(idx)}
              >
                {w}
              </View>
            ))}
          </View> */}
        </View>
      </View>
      <View className="produck_item">
        {itemList.map((v, idx) => {
          return (
            <View
              key={idx}
              className="item"
              onClick={() => {
                setCurrentCourse({
                  status: v.status,
                  children: v.children,
                  id: v.id,
                  title: v.title,
                });
                Taro.navigateTo({
                  url: "/pages/course/detail/index",
                });
              }}
            >
              <View className="item_img">
                <Image fadeIn className="" src={v.url} />
                {/* <View className="item_img_text">{v.item_img_text}</View> */}
              </View>
              <View className="item_text">
                <View className="item_text_title">{v.title}</View>
                <View className="item_text_count_wrapper">
                  <Text className="item_text_count">共{v.count}节</Text>
                  <View className="checkbox-wrapper">
                    {/* <Checkbox className="checkbox-wrapper-checkbox"  checked={v.userState == 'completed'}  checkedColor="red" disabled>
                      <Text style={{ color: v.status ? "#405F5D" : "#000" }}>
                        {v.userState == 'completed' ? "已完成" : "未完成"}
                      </Text>
                    </Checkbox> */}
                    <View className="checkbox-wrapper-checkbox">
                      <View className="checkbox">
                        {v.userState == "completed" && (
                          <Icon
                            name="success"
                            color="#405F5D"
                            size="20px"
                          ></Icon>
                        )}
                      </View>
                      <Text style={{ color: v.status ? "#405F5D" : "#000" }}>
                        {v.userState == "completed" ? "已完成" : "未完成"}
                      </Text>
                    </View>
                    {!v.status ? (
                      <Text className="count_text_num">
                        {v.readCount}/{v.count}
                      </Text>
                    ) : null}
                  </View>
                </View>
              </View>
            </View>
          );
        })}
      </View>
      <BaseBgLogo isFixed image="logoImg" />
    </View>
  );
}
