import { useCapsuleHeight } from '@/hooks/pagePositionCapsuleHooks'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { ReactNode } from 'react'
import classNames from 'classnames'
import './index.less'

interface NavContainerProps {
  children: ReactNode
  classNameWrap?: string
}
export default function NavContainer({ children, classNameWrap = '' }: NavContainerProps) {
  const [allHeight] = useCapsuleHeight('all')
  const [topHeight] = useCapsuleHeight('top')
  return (
    <View className="nav-container" style={{ height: Taro.pxTransform(allHeight) }}>
      <View className={classNames(classNameWrap)} style={{ paddingTop: Taro.pxTransform(topHeight) }}>
        {children}
      </View>
    </View>
  )
}
