import { livePage, teamPage, userPage, videoPage } from '@/apis/tranking'

export const rankingHeadHeight = 475

const teamList = [
  { label: '粉丝增长', value: 'fans_incr' },
  { label: '作品数', value: 'posts' },
  { label: '视频播放量', value: 'plays' },
  { label: '直播场次', value: 'lives' },
  { label: '直播观看人数', value: 'live_viewers' },
] as const

export const rankingTabList = [
  {
    label: '成员榜单',
    value: '',
    urlFn: userPage,
    children: [...teamList],
  },
  {
    label: '大区榜单',
    children: [...teamList],
    urlFn: teamPage,
  },
  {
    label: '视频榜单',
    urlFn: videoPage,
    children: [
      { label: '总播放量', value: 'plays' },
      { label: '点赞数', value: 'likes' },
      { label: '转发数', value: 'forwards' },
      { label: '分享数', value: 'shares' },
      { label: '收藏数', value: 'favorites' },
      { label: '评论数', value: 'comments' },
    ],
  },
  {
    label: '直播榜单',
    urlFn: livePage,
    children: [
      { label: '场关', value: 'watches' },
      { label: '直播时长', value: 'live_duration_in_seconds' },
      { label: '评论人数', value: 'comment_peoples' },
      { label: '成交总GMV', value: 'xiaohuangche_gmv' },
    ],
  },
]
