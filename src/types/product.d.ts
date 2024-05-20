import { IBasePage, IBasePageMap, TValueOf } from "./base";
import { IAimanagerVideoListParams } from "./video";

export interface IProductCategories {
  children: IProductCategories[];
  companyId: string;
  cover: string;
  createdAt: string;
  name: string;
  updatedAt: string;
  _id: string;
}

/**
 * 产品列表-入参
 */
export interface IProductParams extends Partial<Omit<IBasePage, "total">> {
  tag?: string[];
  name?: string;
  ids?: string[];
  categoryId?: string;
  resourceId?: string;
  userId?: string;
  type?: "resource" | "sence" | "style" | string;
  senceId?: string;
  skip?: number;
  limit?: number;
  status?: string;
}

export type TProductDetailType = "changjingtu_sku" | "video_product_source";

/**
 * 产品信息
 */
export interface IProduct {
  data: string;
  detailType: { _id: string; detailType: TProductDetailType }[];
  id: string;
  name: string;
  categoryId: string;
  categoryName: string;
}

export interface ITaskListParams {
  skip: number;
  limit: number;
  status: "finish";
}

export interface IProductCreateTaskParams {
  params: {
    imageCount: number;
    productId: string;
    senceId: string;
    styleId: string;
  };
  type: ["image-img", "img-text", "img-video", "img-exp"];
}

export interface IProductGenerateCOntentParams {
  articleType: //小红书
  | "xiaohongshu"
    //抖音
    | "douyin"
    //朋友圈
    | "wechatpyq";
  taskId: string;
  type: IProductCreateTaskParams["type"][number];
  userId?: string;
  imgUrl: string;
}

export interface IProductCreateTask {
  id: string;
}

export interface IProductProgressParams {
  taskId?: string;
  userId?: string;
  type: IProductGenerateCOntentParams["type"];
  articleType?: IProductGenerateCOntentParams["articleType"];
  imgUrl?: string;
  data?: { data: string[]; source: string }[];
  isLoading?: boolean;
}

export interface IProduckVideoList {
  skip?: number;
  limit?: number;
  status?: "finish";
  type: string | "video_of_product_video_assistant";
}
export interface IProduckVideoListItem extends IBasePageMap<IVideoItem> {}

export interface IVideoItem {
  _id: string;
  type: "complex" | string;
  userId: string;
  appId: string;
  companyId: string;
  parentResourceId: string;
  parentTaskId: null | string;
  displayName: string;
  argument: {
    product: {
      name: string;
      sellingpoint: null | string;
      belong: string;
    };
    oralAiticleId: [];
    data: [];
    bgMusic: string;
    isDemoTask: boolean;
    resourceId: string;
  };
  attribute: {
    status: string;
  };
  result: {
    video: string;
    thumbnail: null | string;
    cover: null | string;
  };
  createdAt: string;
  updatedAt: string;
  answerInfo: null;
}

export interface IProductProgress {
  data: {
    data: string[];
    source: string;
    thumbnail: string;
  }[];
  list: {
    progress: number;
    status: "wait";
    isDemoTask: boolean;
    ignored: boolean;
    data: { source: string; thumbnail: string };
    id: string;
  }[];

  type: string;
}

export interface IGenerateContext {
  askId: string;
  content: string;
  isFinish: boolean;
  type: IAimanagerVideoListParams["type"];
}

//已有素材图片查询
export interface IproductTaskData {
  findCost: number;
  list: Array<ItaskDataList>;
  pagingCost: number;
  total: number;
}

export interface ItaskDataList {
  _id: string;
  type: ["image-img", "img-text", "img-video", "img-exp"];
  ignore: {
    active: boolean;
  };
  userId: string;
  appId: string;
  companyId: string;
  teamId: string;
  params: {
    productId: string;
    senceId: string;
    sceneName: string;
    styleId: string;
    style: string;
    imageCount: number;
    product: {
      name: string;
      mark: string;
    };
    isDemoTask: true;
    resourceId: string;
  };
  result: {
    images: {
      subItem: Array<string>;
      progress: number;
      status: string;
      data: [
        {
          data: {
            source: string;
            thumbnail: string;
          };
          date: string;
          progress: number;
        },
        {
          data: {
            source: string;
            thumbnail: string;
          };
          date: string;
          progress: number;
        }
      ];
      thumbnail: Array<string>;
      bigImg: Array<string>;
    };
    video: {
      progress: 0;
      status: string;
      data: string;
    };
    text: {
      xiaohongshu: {
        chatAnswerId: string;
      };
      wechatpyq: {
        chatAnswerId: string;
      };
      douyin: {
        chatAnswerId: string;
      };
    };
    expansion: {
      data: [];
    };
  };
  createdAt: string;
  updatedAt: string;
  progress: number;
}

/**
 * 产品分页列表
 *
 *  请求方式 @method get
 *
 *  入参 @query IProductParams
 *
 *  请求url @url api/cemetapub/usermanager/v1/product/page
 *
 *  响应 @result  IProductPage
 */
export interface IProductPage extends IBasePageMap<IProduct> {}

/**
 * 产品AI模版列表类型枚举
 */
export enum EProductAITemplateListType {
  // 生活类
  LIFE = "life",
  //卖点类
  SELLING_POINT = "sellingPoint",
  //探店类
  SEEK_SHOP = "seekShop",
  //微剧类
  MINI_VIDEO = "miniVideo",
}

/**
 * 产品-AI合拍-模版列表
 *
 *  请求方式 @method get
 *
 *
 *  请求url @url api/cemetapub/usermanager/v1/product/AI/template
 *
 *  响应 @result  IProductAIList[]
 */
export interface IProductAITemplateList {
  /**
   * 模版ID
   */
  id: string;

  /**
   * 产品AI模版列表类型
   */
  type: TValueOf<EProductAITemplateListType>;
  /**
   * 视频第一帧图片地址
   */
  url: string;
}

/**
 * 视频进度条列表
 */
export interface IVideoProgressListMap {
  /**
   * 视频进度
   */
  progress: number;
  /**
   * 视频进度第一帧图片地址
   */
  videoProgressImgUrl: string;
}

export interface IProductAITemplateTab {
  /**
   * 视频url
   */
  videoUrl: string;

  /**
   * 视频进度条列表
   */
  videoProgressList: IVideoProgressListMap[];
}

/**
 * 产品-AI合拍-模版详情
 *
 *  请求方式 @method get
 *
 *  入参 @param {string} id - 模版id
 *
 *  请求url @url api/cemetapub/usermanager/v1/product/AI/template/${id}
 *
 *  响应 @result  IProductAITemplate
 */
export interface IProductAITemplate {
  /**
   * 模版ID
   */
  id: string;

  /**
   * 产品AI模版列表类型
   */
  type: TValueOf<EProductAITemplateListType>;
  /**
   * 标题
   */
  title: string;

  /**
   * 样例
   */
  example: IProductAITemplateTab;

  /**
   * 我的
   */
  my: IProductAITemplateTab;
}

/**
 * 产品-AI合拍-模版详情提示
 *
 *  请求方式 @method get
 *
 *  入参 @param {string} id - 模版id
 *
 *  请求url @url api/cemetapub/usermanager/v1/product/AI/template/tip/${id}
 *
 *  响应 @result  IProductAITemplateTip[]
 */
export interface IProductAITemplateTip {
  /**
   * 提示文字
   */
  text: string;
  /**
   * 图片url
   */
  url: string;
}

/**
 * 上传AI视频
 *
 *  请求方式 @method post
 *
 *  入参 @body FormData
 *
 *  请求url @url api/cemetapub/usermanager/v1/product/AI/uploadVideo
 *
 *  响应 @result  IUploadAIVideo
 */
export interface IUploadAIVideo extends IProductAITemplateTab {}

/**
 * 产品AI模版列表类型枚举
 */
export enum EShopPromotionType {
  // 门店
  SHOPS = "shops",
  //产品讲解
  PRODUCT = "product",
  //探店类
  SEEK_SHOP = "seekShop",
  //娱乐类
  ENTERTAINMENT = "entertainment",
}

/**
 * 门店推广
 *
 *  请求方式 @method get
 *
 *
 *  请求url @url api/cemetapub/usermanager/v1/product/AI/shopPromotion/list
 *
 *  响应 @result  IShopPromotion[]
 */
export interface IShopPromotion {
  id: string;
  /**
   * 推广类型
   */
  type: TValueOf<EShopPromotionType>;

  /**
   * 视频第一帧图片
   */
  url: string;
}

/**
 * 营销素材 入参
 */
export interface IMarketingProductParmas extends Omit<IBasePage, "total"> {
  /**
   * 产品名称 - 搜索
   */
  name?: string;

  /**
   * 更新时间 - 最近生成tab用
   */
  updateTime?: string;
}

/**
 * 营销素材
 */
export interface IMarketingProduct {
  id: string;
  /**
   * 产品名称 - 搜索
   */
  name: string;

  /**
   * 产品图片
   */
  url: string;

  /**
   * 产品创建时间
   */
  createTime: string;
  /**
   * 产品更新时间
   */
  updateTime: string;
}
/**
 * 查看营销素材-列表
 *
 *  请求方式 @method get
 *
 *  入参 @params IMarketingProductParmas
 *
 *  请求url @url api/cemetapub/usermanager/v1/marketing/product/page
 *
 *  响应 @result  IShopPromotion[]
 */

export interface IMarketingProductList
  extends IBasePageMap<IMarketingProduct> {}


export interface PosterListParams{
  skip: number;
  limit: number;
}
export interface IPosterList{
  cover: string,
  width:number,
  height:number,
  createdAt: string,
  data: string,
  extension: [{id: string, title: string, tagId:string, description: string}],
  id: string,
  tagId: string,
  title:string,
  updatedAt:string,
}
export interface Id{
  id: string,
}
  