import CardVideoListItem from '@/components/card/videoListItem'
import { View } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import BusinessGuide from '@/components/business/guide'
import { IVideo } from '@/types/video'
import { useEffect, useState } from 'react'
import { videoTemplateList } from '@/apis/video'
import { getCustomBooleanStore, setCustomBooleanStore } from '@/store/custom'
import NavTool from '@/components/base/nav'
import BaseEmptyWrap from '@/components/base/baseEmptyWrap'
import './index.less'

export default function AIList() {
  const [list, setList] = useState<IVideo[]>([])
  const router = useRouter<{ skuId?: string }>()

  const AIFirstPageStatus = getCustomBooleanStore('AIFirstPageStatus')
  useEffect(() => {
    getVideoTemplateList()
  }, [])
  const getVideoTemplateList = async () => {
    const res = await videoTemplateList({ skuId: router.params.skuId })
    if (res) {
      setList(res.list)
    }
  }
  const listElement = () => {
    return list.length ? (
      list.map(w => (
        <CardVideoListItem
          onClick={() =>
            Taro.navigateTo({
              url: `/pages/AI/detail/index?id=${w._id}`,
            })
          }
          key={w._id}
          title={w.title}
          tag={w.tags?.[0]?.content}
          url={w.cover}
        />
      ))
    ) : (
      <BaseEmptyWrap></BaseEmptyWrap>
    )
  }
  return (
    <View className="wrap-container-space-16">
      <NavTool color="#000" title="AI合拍" isShowToTop />

      <View className="ai-list-wrap">{listElement()}</View>
      {!AIFirstPageStatus && (
        <BusinessGuide
          content="点击预览视频，选择你喜欢的，制作同款视频"
          onClick={() => {
            setCustomBooleanStore('AIFirstPageStatus', true)
          }}
        />
      )}
    </View>
  )
}
