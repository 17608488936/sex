import { View } from '@tarojs/components'
import classNames from 'classnames'
import { useState } from 'react'
import { Sticky } from '@antmjs/vantui'
import NavContainer from '@/components/base/navContainer'
import RankingList from './Rankinglist'
import Popular from './Popular'
import './index.less'

const tabBtnArr = ['排行榜', '热门内容']

export default function HotIndex() {
  const [tabIndex, setTabIndex] = useState(0)
  const hostComtent = () => {
    return <Popular></Popular>
  }

  const hotTabElement = () => (
    <View className="hot-index-tab">
      {tabBtnArr.map((tab, idx) => (
        <View
          key={tab}
          className={classNames('hot-index-tab-item', {
            'hot-index-tab-item-active': idx === tabIndex,
          })}
          onClick={() => setTabIndex(idx)}
        >
          {tab}
        </View>
      ))}
    </View>
  )
  return (
    <View className="ranking-container">
      <View className={classNames({ 'ranking-wrap': tabIndex === 0 })}>
        <Sticky style={{ backgroundColor: '#242738' }}>
          <NavContainer classNameWrap="pdl-16">{hotTabElement()}</NavContainer>
        </Sticky>
      </View>
      {tabIndex == 0 ? <RankingList></RankingList> : hostComtent()}
    </View>
  )
}
