import { Image, View, Text, ITouchEvent } from "@tarojs/components";
import { Checkbox } from "@antmjs/vantui";
import Taro, { useDidShow } from "@tarojs/taro";
import { useState } from "react";
import { getCurrentCourse, setCurrentVideo } from "@/store/course";
import "./index.less";

function CourseDetailPage() {
  const [currentCourseList, setCurrentCourseList] = useState(() => {
    return getCurrentCourse().children || [];
  });

  const handleClick = (e: ITouchEvent) => {
    const video = e.currentTarget.dataset.video || [];
    const id = e.currentTarget.dataset.id;
    const status = e.currentTarget.dataset.status || false;
    setCurrentVideo({
      id,
      status,
      video: video[0] || {},
    });
    Taro.navigateTo({
      url: "/pages/course/video/index",
    });
  };

  useDidShow(() => {
    const currentCourse = getCurrentCourse();
    Taro.setNavigationBarTitle({
      title: currentCourse.title || "课程详情",
    });
    setCurrentCourseList(currentCourse.children);
  });

  return (
    <View className="page">
      <View className="item-wrapper">
        {currentCourseList.map((item, idx) => {
          const status = item.state === "completed";
          return (
            <View
              className="item"
              key={idx}
              data-video={item.video}
              data-id={item._id}
              data-status={status}
              onClick={handleClick}
            >
              <Image fadeIn src={item.cover} mode="aspectFit" />
              <View className="item-right">
                <Text className="title">{item.title}</Text>
                <Checkbox
                  iconSize="auto"
                  className="checkout-box"
                  value={status}
                  checkedColor="#405F5D"
                >
                  <Text
                    className="checkout-text"
                    style={{ color: status ? "#405F5D" : "#000" }}
                  >
                    {status ? "已学习" : "未学习"}
                  </Text>
                </Checkbox>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

export default CourseDetailPage;
