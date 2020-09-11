import React from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'

const Price = (props) => {
  /**
   * price: 金额
   * title: 名称
   * showTitle: 是否显示名称
   */
  const {
    price = 0.00,
    title = '券后价',
    showTitle = true,
    fontSize = 16
  } = props;


  return (
    <View className='price_c'>
      {showTitle && <Text className="title">{title}</Text>}
      <Text className="price_box">
        <Text className="symbol" style={{fontSize: fontSize - 10 + 'px'}}>¥</Text>
        <Text className="price" style={{fontSize: fontSize + 'px'}}>{price}</Text>
      </Text>
    </View>
  )
}

export default Price