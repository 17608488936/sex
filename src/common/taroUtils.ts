import Taro from "@tarojs/taro";
import { getUserStore } from "@/store/user";
import { baseURL } from "./http";

export const clipboard = async (data: string) => {
  try {
    Taro.setClipboardData({ data });
  } catch (error) {
    Taro.showToast({ icon: "error", title: "复制失败，错误信息: " + error });
  }
};

export type TSourceType =
  /** 从相册选择视频 */
  | "album"
  /** 使用相机拍摄视频 */
  | "camera";

// 上传视频
export const uploadVideo = (sourceType: TSourceType[]) => {
  return new Promise<string>((resolve, reject) => {
    Taro.chooseVideo({
      sourceType: sourceType,
      maxDuration: 15,
      success: function (res) {
        const user = getUserStore();
        let _headers: any = {};
        if (user) {
          _headers = {
            "x-user": user.user.id || "",
            "x-auth": user.token,
            "x-app": "1168429",
            "x-company": user.user.companyId,
            "x-team": user.user.teamId,
          };
        }
        Taro.showLoading({ title: "上传中..." });
        Taro.uploadFile({
          url: baseURL + "api/cemeta/aimanager/v1/video/upload", //仅为示例，非真实的接口地址
          // url: "http://192.168.2.29:3000/v1/test/upload", //仅为示例，非真实的接口地址
          filePath: res.tempFilePath,
          name: "video",
          header: { ..._headers },
          success(_res) {
            if (_res.statusCode !== 200) {
              reject(_res);
              console.log("上传错误信息", _res);

              Taro.showToast({
                icon: "error",
                title: "上传出错，请联系客服",
              });
            } else {
              resolve(_res.data);
            }
          },
          fail(_res) {
            console.log("上传失败", _res);
            reject(_res);
            Taro.showToast({
              icon: "error",
              title: "上传失败",
            });
          },
          complete() {
            Taro.hideLoading();
          },
        });
      },
      // fail(res) {
      //   reject(res);
      //   Taro.showToast({
      //     icon: "error",
      //     title: "摄像头调用失败",
      //   });
      // },
    });
  });
};

// 下载视频保存到相册
export const downloadVideo = (url: string) => {
  Taro.showLoading({ mask: true, title: "下载中..." });
  Taro.downloadFile({
    url,
    success({ tempFilePath }) {
      Taro.saveVideoToPhotosAlbum({
        filePath: tempFilePath,
        success: function () {
          Taro.hideLoading();
          Taro.showToast({
            icon: "success",
            title: "下载成功",
          });
        },
        fail() {
          Taro.hideLoading();
          Taro.showToast({
            icon: "error",
            title: "保存失败",
          });
        },
      });
    },
    fail() {},
  });
};

// 下载图片保存到相册
export const downloadImage = (url: string[]) => {
  Taro.showLoading({ mask: true, title: "下载中..." });
  let count = 0;
  for (let i = 0; i < url.length; i++) {
    Taro.downloadFile({
      url: url[i],
      success({ tempFilePath }) {
        Taro.saveImageToPhotosAlbum({
          filePath: tempFilePath,
          success: function () {
            count++;
            if (count === url.length) {
              Taro.hideLoading();
              Taro.showToast({
                icon: "success",
                title: "保存成功",
              });
            }
          },
          fail() {
            Taro.hideLoading();
            Taro.showToast({
              icon: "error",
              title: "保存失败",
            });
          },
        });
      },
      fail() {},
    });
  }
};
