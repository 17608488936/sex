import { View } from '@tarojs/components'
import { videoTagsConfig } from '@/common/config'
import { useEffect, useState } from 'react'
import { videoPageList } from '@/apis/video'
import { IVideo, TVideoTags } from '@/types/video'
import Taro, { useReachBottom } from '@tarojs/taro'
import BaseEmptyWrap from '@/components/base/baseEmptyWrap'
import './index.less'

export default function Popular() {
  const [pageList] = useState<IVideo[]>([])
  const [totalInfo, setTotalInfo] = useState(0)
  const [skip, setSkip] = useState(0)
  const [isShowNoData, setIsShowNoData] = useState(false)

  useEffect(() => {
    getPageList()
  }, [])
  const getPageList = async () => {
    await videoPageList({
      skip: skip * 10,
      limit: 10,
      tags: ['热门'],
    }).then(res => {
      if (!res.list.length) {
        setIsShowNoData(true)
        return false
      } else {
        setSkip(skip + 1)
        res.list.forEach(v => pageList.push(v))
        setTotalInfo(res.total as number)
      }
    })
  }

  useReachBottom(() => {
    if (skip * 10 > totalInfo) {
      setIsShowNoData(true)
      return false
    }
    getPageList()
  })

  const getVideoTag = (tags: IVideo['tags'], tagType: TVideoTags) => tags.find(tag => tag.type === tagType)

  const videoTagsElement = (videoItem: IVideo) => {
    return (
      <View className="video_list_item_top">
        {getVideoTag(videoItem.tags, 'upper') && <View className="increase ">{getVideoTag(videoItem.tags, 'upper')!.content}</View>}
        <View className="increasenull"></View>
        {videoItem.tags
          .filter(tag => tag.type !== 'upper')
          .map(tag => (
            <View
              key={tag.type}
              className={videoTagsConfig[tag.type].class}
              style={{
                background: videoTagsConfig[tag.type].color,
              }}
            >
              {tag.content}
            </View>
          ))}
      </View>
    )
  }
  return (
    <View className="popular">
      <View className="video_list max_video_list">
        <BaseEmptyWrap>
          {pageList.map(v => {
            return (
              <View
                key={v._id}
                className="video_list_item"
                style={{ backgroundImage: `url(${v.cover})` }}
                onClick={() => {
                  Taro.navigateTo({
                    url: `/pages/common/videoplay/index?url=${v.url}&title=${v.title}`,
                  })
                }}
              >
                {videoTagsElement(v)}
                <View className="video_list_item_bottom">
                  <View className="name">{v.title}</View>
                  <View className="Hotspot">{v.type === 'hot' ? '热点' : '卡点'}</View>
                </View>
              </View>
            )
          })}
        </BaseEmptyWrap>
      </View>
      <View className={isShowNoData ? 'no_data' : 'no_data no_show'}>没有更多了</View>
    </View>
  )
}
