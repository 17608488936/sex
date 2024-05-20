import { get, post } from "@/common/http";
import {
  ICompanyParams,
  ICompanyInfo,
  ITeamParams,
  ILoginParams,
  VerifyCodeParams,
  ITeamHeaders,
  ITeamInfo,
  ILoginHeaders,
  IUser,
  IUserBanners,
  IUserNotice,
  IActivityDetail,
  IgetDouyinResult,
  IUserDetail,
  IRegisterParams,
  INewDouyinInfo,
} from "@/types/user";

import tuiImg from "@/assets/images/home/首页_slices/icon_tui.png";
import yinliu from "@/assets/images/home/首页_slices/icon_yinliu.png";
// 发送验证吗
export const verifyCode = (params: VerifyCodeParams) =>
  get<void>("api/cemetapub/message/v1/phone/" + params.phone + "/code", {
    data: params,
    isShowLoad: false,
  });

// 通过手机号查询企业
export const companyList = (params: ICompanyParams) =>
  get<ICompanyInfo>("api/cemetapub/usermanager/v1/account/login", {
    data: params,
    isShowLoad: false,
  });

// 通过手机号查询团队
export const teamList = (params: ITeamParams, headers: ITeamHeaders) =>
  get<ITeamInfo>("api/cemeta/usermanager/v1/team/userTeamInfoByPhone", {
    data: params,
    headers,
    isShowLoad: false,
  });
// 通过userid查询团队
export const teamListUser = () =>
  get<ITeamInfo>("api/cemeta/usermanager/v1/team/userTeamInfo", {});

// 登录
export const login = (data: ILoginParams, headers?: ILoginHeaders) =>
  post<IUser>("api/cemetapub/usermanager/v1/account/login", { data, headers });

// // banner
export const banners = () =>
  get<IUserBanners[]>("api/cemeta/aimanager/v1/banners", { isShowLoad: false });

export const getTableData = () => {
  return new Promise((resolve) => {
    resolve({
      code: 200,
      data: [
        {
          _id: "1",
          cover: tuiImg,
        },
        {
          _id: "2",
          cover: yinliu,
        },
        {
          _id: "3",
          cover: yinliu,
        },
      ],
    });
  });
};

// 公告
export const notice = () =>
  get<IUserNotice[]>("api/cemeta/aimanager/v1/announcements", {
    isShowLoad: false,
  });

//抖音授权
export const authQrcode = () =>
  get<ArrayBuffer>("api/cemeta/douyinservice/auth/qrcode", {
    responseType: "arraybuffer",
    isShowLoad: false,
  });

// 活动列表
export const activityList = () =>
  get<IActivityDetail[]>("api/cemeta/aimanager/v1/activities", {});

// 活动详情
export const activityDetail = (id: string) =>
  get<IActivityDetail>(`api/cemeta/aimanager/v1/activity/${id}`, {});

//获取抖音授权页面数据
export const douyinInfo = () =>
  get<INewDouyinInfo>(`api/cemeta/aimanager/v1/douyin/data`, {});
//获取抖音授权结果

export const douyinResult = () =>
  get<IgetDouyinResult>(`api/cemeta/aimanager/v1/douyin/access`, {});
//获取个人信息

export const getUserData = () =>
  get<IUserDetail>(`api/cemeta/usermanager/v1/account/mock`, {});

// 快捷注册
export const register = (data: IRegisterParams) =>
  post("api/cemeta/aimanager/v1/user/awe/register", { data });
