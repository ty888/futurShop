import React from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'

const GoodsTitle = (props) => {
  /**
   * shoptype: 店铺类型
   * title: 标题
   */
  const {
    shoptype,
    title
  } = props;


  return (
    <View className="title_box">
      <View className="title">
        {/* <Text className="tm">{shoptype === 'B' ? '天猫' : '淘宝'}</Text> */}
        {title}
      </View>
    </View>
  )
}

export default GoodsTitle