import React from 'react'
import { View, Text, AtIcon } from '@tarojs/components'
import './index.scss'

const BuyButton = (props) => {
  /**
   * title: 按钮标题
   * showIcon: 是否显示Icon
   * Icon: Icon
   */
  const {
    title = '立即抢购',
    showIcon = true,
    Icon = 'lightning-bolt'
  } = props;


  return (
    <View className='but_button_c'>
      { showIcon && <View className={`at-icon at-icon-${Icon} icon`}></View>}
      <Text className="title">{title}</Text>
    </View>
  )
}

export default BuyButton