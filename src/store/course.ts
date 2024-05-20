import { ICourseResItemChild, ICourseVideo } from "@/types/course";
import Taro from "@tarojs/taro";

type ICurrentCourseDetail = {
  status: boolean;
  children: ICourseResItemChild[];
  id: string;
  title: string;
};

type ICurrentVideo = {
  status: boolean;
  id: string;
  video: ICourseVideo;
};

export function setCurrentCourse(data: ICurrentCourseDetail) {
  Taro.setStorageSync("_currentCourseDetail_", data);
}

export function getCurrentCourse() {
  return (Taro.getStorageSync("_currentCourseDetail_") ||
    {}) as ICurrentCourseDetail;
}

export function setCurrentVideo(data: ICurrentVideo) {
  Taro.setStorageSync("_currentCourseVideo_", data);
}

export function getCurrentVideo() {
  return (Taro.getStorageSync("_currentCourseVideo_") || {}) as ICurrentVideo;
}
