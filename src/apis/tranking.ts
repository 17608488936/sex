import { get } from '@/common/http'
import { ITrankingPage, ITrankingPageParams } from '@/types/tranking'

export const userPage = (data: ITrankingPageParams) => get<ITrankingPage>('api/cemeta/aimanager/v1/data-center/data-status/user', { data })
export const teamPage = (data: ITrankingPageParams) => get<ITrankingPage>('api/cemeta/aimanager/v1/data-center/data-status/team', { data })
export const videoPage = (data: ITrankingPageParams) => get<ITrankingPage>('api/cemeta/aimanager/v1/data-center/video/statistics/daily', { data })
export const livePage = (data: ITrankingPageParams) => get<ITrankingPage>('api/cemeta/aimanager/v1/data-center/live/statistics/daily', { data })
