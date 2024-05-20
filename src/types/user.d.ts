import { ICompany } from "./compony";
import { IDouyinUserData } from "./douyin";

export interface VerifyCodeParams {
  phone: string;
  type: "login-phone-code";
}

export interface ICompanyParams {
  account: string;
}
export interface ICompanyInfo {
  user: boolean;
  company: ICompany[];
}

export interface ITeamParams {
  keyword: string;
  phone: string;
}
export interface ITeamHeaders {
  "x-company": string;
}
export interface ITeamInfo {
  teamList: ICompany[];
}

export interface ILoginParams {
  type: "code" | "channel";
  payload: {
    code: string;
    phone: string;
    teamId: string;
    username?: string;
  };
}

export interface ILoginHeaders extends ITeamHeaders {
  "x-team": string;
}

export interface ILogin {}

/**
 * 用户密码登录 - 入参
 */
export interface IUserPasswordLoginParams {
  /**
   * 手机号
   */
  phone: string;
  /**
   * 验证码
   */
  password: string;
}

/**
 * 用户信息
 */
export interface IUser {
  company: ICompany[];
  token: string;
  user: {
    companyId: ICompany["id"];
    // 自定义的team
    teamId: string;
    /**
     * 邮箱
     */
    email: {};
    id: string;
    /**
     * 用户名
     */
    name: string;
    /**
     * 手机号信息
     */
    phone: {
      /**
       * 手机号
       */
      number: string;
      verify: boolean;
    };
    role: ICompany["role"];
  };
}

/**
 * 公告
 *
 *  请求方式 @method get
 *
 *  请求url @url api/cemetapub/usermanager/v1/account/notice
 *
 *  响应 @result  IUserNotice
 */
export interface IUserNotice {
  activityId: string;
  companyId: string;
  createdAt: string;
  endAt: string;
  order: number;
  startAt: string;
  state: boolean;
  title: string;
  updatedAt: string;
  _id: string;
}

/**
 * banner图
 */
export interface IUserBanners {
  activityId: string;
  companyId: string;
  cover: string;
  createdAt: string;
  endAt: string;
  order: number;
  startAt: string;
  state: boolean;
  title: string;
  updatedAt: string;
  _id: string;
}

/**
 * 活动详情
 */
export interface IActivityDetail {
  companyId: string;
  createdAt: string;
  description: string;
  endAt: string;
  images: string[];
  skus: string[];
  startAt: string;
  state: boolean;
  subtype: "sku" | "video";
  title: string;
  cover: string;
  topics: { title: string; content: string[] }[];
  type: string;
  updatedAt: string;
  users: string[];
  videos: string[];
  _id: string;
}

// 抖音主页
export interface IDouyinInfo {
  yesterday: IDouyinUserData;
  recentWeek: IDouyinUserData;
  recentMonth: IDouyinUserData;
  douyinAvatar: string;
  totalVideos: number;
  totalFans: number;
  douyinNickname: string;
  douyinAuthorized: boolean;
  name: string;
  isDouyinAuth: boolean;
}

export interface ILiveItem {
  liveCount: number;
  liveDuration: number;
  liveViews: number;
  liveInteractions: number;
  liveOnlineAvg: number;
}

export interface IDouyinCountItem {
  newVideoCount: number;
  newPlayCount: number;
  newFansCount: number;
  newLikeCount: number;
  newCommentCount: number;
}

export interface INewDouyinInfo {
  yesterdayLive: ILiveItem;
  recentWeekLive: ILiveItem & { liveOnlineTotal: number };
  recentMonthLive: ILiveItem & { liveOnlineTotal: number };
  yesterday: IDouyinCountItem;
  recentWeek: IDouyinCountItem;
  recentMonth: IDouyinCountItem;
  totalVideos: number;
  totalFans: number;
  douyinNickname: string;
  douyinAuthorized: boolean;
  douyinAvatar: string;
  name: string;
}

//抖音授权结果
export interface IgetDouyinResult {
  message: string;
}

//获取个人信息结果
export interface IUserDetail {
  name: string;
  company: string;
  area: string;
  store: string;
  avatar: string;
  uid: string;
}

/**
 * 快捷注册参数
 */
export interface IRegisterParams {
  name: string;
  phone: string;
  companyName: string;
}
