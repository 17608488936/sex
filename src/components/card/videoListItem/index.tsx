import { Image, View } from '@tarojs/components'
import playImg from '@/assets/images/common/play.png'
import './index.less'

interface ICardVideoListItemProps {
  title: string
  tag?: string
  url: string
  onClick?: () => void
}
export default function CardVideoListItem({ title, tag, url, onClick }: ICardVideoListItemProps) {
  return (
    <View className="card-video-list-item" onClick={() => onClick?.()}>
      <Image fadeIn className="card-video-list-item-img" src={url} />
      {tag && <View className="card-video-list-item-tag">{tag}</View>}
      <Image fadeIn src={playImg} className="card-video-list-item-play_img"></Image>
      <View className="card-video-list-item-title van-multi-ellipsis--l2">{title}</View>
    </View>
  )
}
