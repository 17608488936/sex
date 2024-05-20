import { Video, View } from "@tarojs/components";
import BaseButton from "@/components/base/baseButton";
import Taro, { useDidShow } from "@tarojs/taro";

import {
  getCurrentCourse,
  getCurrentVideo,
  setCurrentCourse,
} from "@/store/course";
import { updateCourseStatus } from "@/apis/course";

import "./index.less";

function CourseVideo() {
  const currentVideo = getCurrentVideo();
  const currentCourse = getCurrentCourse();

  useDidShow(() => {
    Taro.setNavigationBarTitle({
      title: currentVideo.video.title || "课程视频",
    });
  });

  const handleComplete = async () => {
    if (currentVideo.status) {
      Taro.navigateBack();
      return;
    }
    await updateCourseStatus(currentCourse.id, currentVideo.id);
    const findIndex = (currentCourse.children || [])?.findIndex(
      (item) => item._id === currentVideo.id
    );
    if (findIndex !== -1) {
      currentCourse.children[findIndex].state = "completed";

      setCurrentCourse(currentCourse);
    }
    Taro.navigateBack();
  };

  return (
    <View className="page">
      <Video
        poster={currentVideo.video.cover}
        autoplay
        className="video"
        src={currentVideo.video.url}
      ></Video>
      <BaseButton round className="btn" onClick={handleComplete}>
        {currentVideo.status ? "已完成学习" : "完成学习"}
      </BaseButton>
    </View>
  );
}

export default CourseVideo;
