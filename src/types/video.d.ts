import { IBasePage, IBasePageMap } from './base'
import { IProductCreateTaskParams, ITaskListParams } from './product'

export interface IVideoSize {
  width: number
  height: number
}
export type TVideoTags = 'ai-task' | 'new' | 'upper' | 'complex'
export type TVideoType = 'jam' | 'hot'
export interface IVideoResourceBgm {
  duration: number
  endAt: number
  extension: string
  resourceId: string
  speed: number
  startAt: number
  url: string
  cover: string
}
export interface IVideoResourceSpeech extends IVideoResourceBgm {}

export interface IVideoResourceVideo extends IVideoResourceBgm {
  size: IVideoSize
}
export interface IVideoResource {
  bgm: IVideoResourceBgm
  order: number
  replaceable: boolean
  speech: IVideoResourceSpeech
  video: IVideoResourceVideo
  _id: string
}
export interface IVideoTemplateParams {
  ids?: string
  skuId?: string
}
export interface IVideoTemplate {
  buildType: string
  companyId: string
  contentDescription: string
  contentIntroduceDemo: {
    title: string
    content: string[]
  }[]
  teaching?: {
    title: string
    cover: string
    url: string
  }[]
  cover: string
  createdAt: string
  duration: number
  extension: string
  published: true
  resource: IVideoResource[]
  size: IVideoSize
  skuId: string
  speed: number
  state: true
  tags: string[]
  title: string
  type: 'hot'
  updatedAt: string
  url: string
  _id: string
}
export interface IVideoTemplatePage extends IBasePageMap<IVideoTemplate> {}

export interface ICreateAIVideoParams {
  url: string
  templateId: string
  // VC_BV001-通用女声，VC_BV123-阳光青年
  voiceType?: 'VC_BV001' | 'VC_BV123'
  resourceId: string
}

export interface TVideoListParams extends Partial<Omit<IBasePage, 'total'>> {
  tags: string[]
}

export interface IVideo {
  buildType: string
  companyId: string
  contentDescription: string
  cover: string
  createdAt: string
  duration: number
  extension: string
  published: boolean
  resourceId: string
  size: IVideoSize
  skuId: string
  speed: number
  tags: { type: TVideoTags; content: string }[]
  templateId: string
  title: string
  type: TVideoType
  updatedAt: string
  url: string
  userId: string
  _id: string
}

export interface IVideoPage extends IBasePageMap<IVideo> {
  // tags: string[];
}

export interface IAimanagerVideoListParams extends Partial<ITaskListParams> {
  type?: 'video_of_product_video_assistant' | 'changjingtu_douyin_article' | 'changjingtu_xiaohongshu_article' | 'ai_video_douyin_assistant'
  resourceId?: string
  _id?: string
}

export interface IConsumptionParams {
  type: IAimanagerVideoListParams['type']
  id?: string
  count: number
}

export interface IGenerateVideoParams {
  count: number
  resourceId: string
}
export interface IGenerateVideoProductParams extends IGenerateVideoParams {
  type: 'video_assistant'
}
export interface IGenerateVideoProduct {
  appId: string
  companyId: string
  createdAt: string
  parentResourceId: string
  parentTaskId: string
  result: {
    thumbnail: string
    video: string
  }

  type: string
  updatedAt: string
  userId: string
  _id: string
}

export interface IPostVideoTextParams {
  payload: { videoId: string }
  type: 'ai_product_video_assistant_xiaohongshu' | 'ai_product_video_assistant_douyin' | 'ai_product_video_assistant_wechatpyq'
  videoType?: 'ai-task' | 'complex'
}

export interface IGetVideoTextParams {
  askId: string
  type: IProductCreateTaskParams['type'][number]
  articleType: IPostVideoTextParams['type']
}

export interface IGetVideoText {
  askId: string
  content: string
  isFinish: boolean
  type: IPostVideoTextParams['type'] | IAimanagerVideoListParams['type']
}
