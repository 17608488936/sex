import { TValueOf } from "./base";

export interface ICourseResItem {
  _id: string;
  title: string;
  name: string;
  cover: string;
  children: ICourseResItemChild[];
  userState:string
}

export interface ICourseResItemChild {
  cover: string;
  state: ECourseType;
  title: string;
  _id: string;
  video: ICourseVideo[];
}

export interface ICourseVideo {
  _id: string;
  cover: string;
  duration: string;
  size: { width: number; height: number };
  title: string;
  url: string;
  type: string;
}

/**
 * 课程学习进度状态
 */
type ECourseType = "not-started" | "pending" | "completed";
// /**
//  * 未开始
//  */
// NOT_STARTED = "not-started",
// /**
//  * 进行中
//  */
// PENDING = "pending",
// /**
//  * 完成
//  */
// COMPLETE = "complete",

/**
 * 课程列表
 */
export interface ICourseListMap {
  id: string;
  /**
   * 课程名
   */
  name: string;
  /**
   * 课程学习进度状态
   */
  status: TValueOf<ECourseType>;
}
/**
 * 课程tab列表
 *
 *  请求方式 @method get
 *
 *
 *  请求url @url api/cemetapub/usermanager/v1/course/tabList
 *
 *  响应 @result  ICourseTabList[]
 */
export interface ICourseTabList {
  id: string;
  /**
   * tab图片地址
   */
  url: string;
  /**
   * tab图片上文字
   */
  text: string;

  /**
   * 课程列表
   */
  list: ICourseListMap[];
}

/**
 * 课程详情
 *
 *  请求方式 @method put
 *
 *  入参 @param {string} id - 课程id
 *
 *  请求url @url api/cemetapub/usermanager/v1/course/${id}
 *
 *  响应 @result  ICourseTabList[]
 */
export interface ICourseDetail extends ICourseListMap {
  /**
   * 视频地址
   */
  videoUrl: string;
}

export interface IInstructionListMap {
  /**
   * 视频第一帧
   */
  url: string;
}

/**
 * 课程视频拍摄指导列表
 *
 *  请求方式 @method get
 *
 *  入参 @param {string} id - 课程tabId
 *
 *  请求url @url api/cemetapub/usermanager/v1/instruction/${id}
 *
 *  响应 @result  IInstructionList
 */
export interface IInstructionList {
  /**
   * 拍摄技巧名称
   */
  name: string;
  /**
   * 视频图片列表
   */
  list: IInstructionListMap[];
}

export interface IInstructionDetailTab {
  /**
   * tab名 讲解
   */
  name: string;
  /**
   * 视频地址
   */
  videoUrl: string;
}
/**
 * 课程视频拍摄指导-详情
 *
 *  请求方式 @method get
 *
 *  入参 @param {string} id - 视频ID
 *
 *  请求url @url api/cemetapub/usermanager/v1/instruction/detail/${id}
 *
 *  响应 @result  IInstructionDetail
 */
export interface IInstructionDetail {
  id: string;
  /**
   * 拍摄技巧名称
   */
  name: string;

  /**
   * tab 场景/样片切换
   */
  tab: IInstructionDetailTab[];
}
