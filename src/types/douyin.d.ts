import { TValueOf } from "./base";

/**
 * 抖音授权 - 授权状态
 *
 *  请求方式 @method get
 *
 *  请求url @url api/cemetapub/usermanager/v1/douyin/auth/status
 *
 *  响应 @result  IDouyinAuthStatus
 */
export type IDouyinAuthStatus = boolean;

/**
 * 抖音授权 - 话题
 *
 *  请求方式 @method get
 *
 *  请求url @url api/cemetapub/usermanager/v1/douyin/topics
 *
 *  响应 @result  IDouyinTopics[]
 */
export interface IDouyinTopics {
  /**
   * 话题名
   */
  name: string;
}

/**
 * 抖音数据总览时间类型
 */
export enum EDouyinDataDateType {
  /**
   * 昨天
   */
  YESTERDAY = "yesterday",

  /**
   * 本周
   */
  WEEK = "week",

  /**
   * 本月
   */
  MONTH = "month",
}

/**
 * 抖音授权 - 用户基本信息
 *
 *  请求方式 @method get
 *
 *  请求url @url api/cemetapub/usermanager/v1/douyin/userBaseInfo
 *
 *  响应 @result  IProductAITemplate
 */
export interface IDouyinUserBaseInfo {
  /**
   * 头像
   */
  avatar: string;
  /**
   * 名称
   * @default 张三
   */
  name: string;

  /**
   * 发布内容数
   * @default 7777
   */
  publishCount: number;

  /**
   * 抖音昵称
   * @default 张三xxx
   */
  nickname: string;

  /**
   * 粉丝数
   * @default 66666
   */
  fansCount: number;
}

/**
 * 抖音授权 - 数据总览入参
 */
export interface IDouyinUserDataParams {
  /**
   * 抖音数据总览时间类型
   * @default EDouyinDataDateType.YESTERDAY
   */
  type: TValueOf<EDouyinDataDateType>;
}

/**
 * 抖音授权 - 数据总览
 *
 *  请求方式 @method get
 *
 *  请求url @url api/cemetapub/usermanager/v1/douyin/userData
 *
 *  响应 @result  IDouyinUserData
 */
export interface IDouyinUserData extends IDouyinUserDataParams {
  /**
   * 发布视频量
   * @default 7777
   */
  newVideoCount: number;

  /**
   * 视频播放量(增量)
   */
  newPlayCount: number;

  /**
   * 新增粉丝数
   * @default 66666
   */
  newFansCount: number;

  /**
   * 点赞数(增量)
   */
  newLikeCount: number;

  /**
   * 评论(增量)
   */
  newCommentCount: number;
}
