import React from 'react'
import { View, Text } from '@tarojs/components'
import {parseTime} from '@/utils/utils'
import './index.scss'

const CouponBox = (props) => {
  const { price, startTime, entTime, onClick = () => {}} = props;


  return (
    <View className='coupon_box' onClick={onClick}>
      <View className="left">
        <View className="price_box">
          <Text className="symbol">¥</Text>
          <Text className="price">{price}</Text>
        </View>
        <View className="time_box">
          <Text>优惠券</Text>
          <Text>使用时间: {parseTime(startTime, '{y}-{m}-{d}')} - {parseTime(entTime, '{y}-{m}-{d}')}</Text>
        </View>
      </View>
      <Text className="r_btn">立即领取</Text>
    </View>
  )
}

export default CouponBox