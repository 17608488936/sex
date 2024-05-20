import { clearAllStore } from "@/store/base";
import { getUserStore } from "@/store/user";
import Taro from "@tarojs/taro";

type TMethod =
  /** HTTP 请求 OPTIONS */
  | "OPTIONS"
  /** HTTP 请求 'GET' */
  | "GET"
  /** HTTP 请求 HEAD */
  | "HEAD"
  /** HTTP 请求 POST */
  | "POST"
  /** HTTP 请求 PUT */
  | "PUT"
  /** HTTP 请求 PATCH */
  | "PATCH"
  /** HTTP 请求 DELETE */
  | "DELETE"
  /** HTTP 请求 TRACE */
  | "TRACE"
  /** HTTP 请求 CONNECT */
  | "CONNECT";

type IResponseType = "text" | "arraybuffer";

// const baseURL = "https://aipicture.cenmetahome.cn/";
// export const baseURL = "https://api-dev.cenmetahome.cn/";
// export const baseURL = "https://api.cenmetahome.cn/";
export const baseURL = "http://101.42.161.202:9000/mock/671/";
// export const baseURL = "http://49.232.52.74:3001/";

type TDefaultParams<U> = {
  data?: U;
  headers?: any;
  responseType?: IResponseType;
  isShowLoad?: boolean;
  loadingTitle?: string;
};
const http = <T = any, U = any>(
  url: string,
  params: TDefaultParams<U> & { method: TMethod }
) => {
  const {
    data,
    method,
    headers,
    responseType,
    isShowLoad,
    loadingTitle = "",
  } = params;
  const user = getUserStore();
  let _headers = {};
  if (user) {
    _headers = {
      "x-user": user.user.id || "",
      "x-auth": user.token,
      // "x-app": data.appid || "1168429",
      "x-company": user.user.companyId,
      "x-team": user.user.teamId,
      // "x-team": "64fee410d556edecb84ca569",
    };
  }

  function showLoading(state: string) {
    if (isShowLoad != false) {
      state == "active"
        ? Taro.showLoading({ title: loadingTitle, mask: true })
        : Taro.hideLoading();
    }
  }
  showLoading("active");

  return new Promise<T>((res, rej) => {
    Taro.request<T>({
      method,
      //   url: `${process.env.TARO_BASE_URL}${url}`, //仅为示例，并非真实的接口地址
      url: `${baseURL}${url}`, //仅为示例，并非真实的接口地址
      data,
      header: {
        "content-type": "application/json",
        "x-app": "1168429",
        // data.appid || "1168429",
        ..._headers,
        ...headers,
      },
      timeout: 60000 * 5,
      responseType,
      success: function (response) {
        if ([400, 403, 404, 408, 429, 500, 504].includes(response.statusCode)) {
          Taro.showToast({
            icon: "error",
            title: (response.data as { message: string }).message,
            duration: 2000,
          });
          // @ts-ignore
          rej(response);
          return;
        }

        if (response.statusCode === 401) {
          clearAllStore();
          Taro.navigateTo({ url: "/pages/login/index" });
          return;
        }

        res(response.data);
      },
      fail: function (error) {
        rej(error.errMsg);
        Taro.showToast({
          icon: "error",
          title: error.errMsg,
        });
      },
      // eslint-disable-next-line @typescript-eslint/no-shadow
      complete: function (res) {
        // console.log("http url信息", url);
        // console.log("http入参 信息", params);
        // console.log("http header 信息 ", _headers);
        // console.log("http接口响应信息", res);
        showLoading("end");
      },
    });
  });
};

export const get = <T = any, U = any>(url: string, params: TDefaultParams<U>) =>
  http<T, U>(url, { ...params, method: "GET" });
export const post = <T = any, U = any>(
  url: string,
  params: TDefaultParams<U>
) => http<T, U>(url, { ...params, method: "POST" });
export const put = <T = any, U = any>(url: string, params: TDefaultParams<U>) =>
  http<T, U>(url, { ...params, method: "PUT" });
export const del = <T = any, U = any>(url: string, params: TDefaultParams<U>) =>
  http<T, U>(url, { ...params, method: "DELETE" });

export default http;
