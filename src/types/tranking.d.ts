import { IPage } from './base'

export interface ITrankingPageParams {
  from_date: string
  to_date?: string | null
  order: string
  limit: number
  offset: number
}

export interface ITranking {
  fans: number
  fans_incr: number
  has_showcase: string
  interactions: number
  interactions_incr: number
  is_douyin_expert: string
  is_enterprise: string
  is_group_buying_expert: string
  live_viewers: number
  lives: number
  cover: string
  avatar: string
  title: string
  phone: string
  plays: number
  posts: number
  team_name: string
  user_id: string
}

export interface ITrankingPage extends IPage<ITranking> {}
