import { get, post } from "@/common/http";
import {
  IProduckVideoList,
  IProduckVideoListItem,
  IProduct,
  IProductCategories,
  IProductCreateTask,
  IProductCreateTaskParams,
  IProductGenerateCOntentParams,
  IProductParams,
  IProductProgress,
  IProductProgressParams,
  ITaskListParams,
  IproductTaskData,
  PosterListParams,
  Id,
  IPosterList,
} from "@/types/product";

//商品分类
export const productCategories = (params?: { name: string }) =>
  get<IProductCategories[]>("api/cemeta/aimanager/v1/resource/categories", {
    data: params,
  });

// 产品列表
export const productPage = (params: IProductParams) =>
  get<IProduct[]>("api/cemeta/aimanager/v1/resource", { data: params });

//查询任务列表
export const getTask = (params: ITaskListParams) =>
  get<IproductTaskData>("api/cemeta/aimanager/v1/task", { data: params });


//添加ai任务
export const addTask = (data: IProductCreateTaskParams) =>
  post<IProductCreateTask>("api/cemeta/aimanager/v1/task", { data ,isShowLoad:false});
//添加子任务
export const addExcute = (data: IProductGenerateCOntentParams) =>
  post<null>("api/cemeta/aimanager/v1/task/" + data.taskId + "/execute", {
    data,
  });

//查询任务进度
export const getTaskProgress = (params: IProductProgressParams) =>
  get("api/cemeta/aimanager/v1/task/" + params.taskId + "/progress", {
    data: params,
  });
//查询子任务度
export const getChildTask = (params: IProductProgressParams) =>
  get<IProductProgress>(
    "api/cemeta/aimanager/v1/task/" + params.taskId + "/child",
    { data: params, isShowLoad: params.isLoading || false }
  );
export const gitProduckVideoList = (params: IProduckVideoList) =>
  get<IProduckVideoListItem>("api/cemeta/aimanager/v1/video/list", {
    data: params,
  });


//获取海报列表
export const getPosterList = (params: PosterListParams) =>
get<PosterListParams>("api/poster", { data: params });

//获取海报详情
export const GetPosterDetails = (params: Id) =>
get<IPosterList>("api/poster/"+params.id, { data: params });

