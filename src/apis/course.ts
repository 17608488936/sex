import { get, put } from "@/common/http";
import { ICourseResItem } from "@/types/course";

// 获取课程列表
export const getCourseList = () =>
  get<ICourseResItem[]>("api/cemeta/aimanager/v1/courses", {});

// 更新 课程中某一节状态
export const updateCourseStatus = (id: string, childId: string) =>
  put(`api/cemeta/aimanager/v1/course/${id}`, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: {
      done: "TRUE",
      childId,
    },
  });
