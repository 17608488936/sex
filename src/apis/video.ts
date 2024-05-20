import { get, post } from "@/common/http";
import { IProduckVideoListItem } from "@/types/product";
import {
  IVideoTemplate,
  IVideoPage,
  ICreateAIVideoParams,
  TVideoListParams,
  IAimanagerVideoListParams,
  IConsumptionParams,
  IGenerateVideoParams,
  IGenerateVideoProductParams,
  IGenerateVideoProduct,
  IPostVideoTextParams,
  IGetVideoTextParams,
  IGetVideoText,
  IVideoTemplateParams,
} from "@/types/video";

export const videoPageList = (data: TVideoListParams) =>
  get<IVideoPage>("api/cemeta/aimanager/v1/video/list/published", { data });
// 视频模版列表
export const videoTemplateList = (params: IVideoTemplateParams) =>
  get<IVideoPage>("api/cemeta/aimanager/v1/video/template", { data: params });

// 视频模版列表-详情
export const videoTemplateDetail = (id: string) =>
  get<IVideoTemplate>(`api/cemeta/aimanager/v1/video/template/${id}`, {});

// ai合成
export const createAIVideo = (data: ICreateAIVideoParams) =>
  post<{
    cover: string;
    url: string;
  }>("api/cemeta/aimanager/v1/video/complex", {
    data,
    loadingTitle: "生成预计30秒",
  });

//提交文案字数消耗
export const consumption = (params: IConsumptionParams) =>
  post<null>("api/cemeta/aimanager/v1/article/consumption", {
    data: params,
    isShowLoad: false,
  });

//查询视频
export const videoList = (params: IAimanagerVideoListParams) =>
  get<IProduckVideoListItem>("api/cemeta/aimanager/v1/video/list", {
    data: params,
  });

//生成视频
export const generateVideo = (params: IGenerateVideoParams) =>
  post<null>("api/cemeta/aimanager/v1/video/generate", {
    data: params,
  });
//生成视频
export const getByProductId = (params: IGenerateVideoProductParams) =>
  get<IGenerateVideoProduct>("api/cemeta/aimanager/v1/video/getByProductId", {
    data: params,
  });
//生成视频文案
export const postVideoText = (params: IPostVideoTextParams) =>
  post<{ id: string }>("api/cemeta/aimanager/v1/article/ask", { data: params });
//获取视频文案
export const getVideoText = (params: IGetVideoTextParams) =>
  get<IGetVideoText>(
    "api/cemeta/aimanager/v1/article/" + params.askId + "/answer",
    {
      data: params,
      isShowLoad: false,
    }
  );
