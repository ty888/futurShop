import React, { useState } from 'react'
import { View } from '@tarojs/components'
import './index.scss'

const SortBar = (props) => {
  const { onSort, onChangeCoupon } = props;
  const [value, setValue] = useState(0)
  const [is_coupon, setIs_coupon] = useState(false)

  const sortParams = [
    { title: '综合', value: 0 },
    { title: '最新', value: 1 },
    { title: '销量', value: 2 },
    { title: '价格', value: 4 }
  ]

  const onSelect = (v) => {
    setValue(v)
    onSort(v)
  }

  const onCoupon = (v) => {
    setIs_coupon(v)
    onChangeCoupon(v ? 1 : 0)
  }

  return (
    <View className='sort_bar_c'>
      <View className="bar_box">
        {
          sortParams.map(item => {
            return <View key={item.value} onClick={() => { onSelect(item.value) }} className={`bar_item ${item.value === value ? 'active' : ''}`}>{item.title}</View>
          })
        }
        <View className='bar_item have_coupon' onClick={() => {onCoupon(!is_coupon)}}>
          <View style={{color: is_coupon ? '#FF2B22' : '#333'}} className='at-icon at-icon-check-circle' />
          <View className="text">有券</View>
        </View>
      </View>
    </View>
  )
}

export default SortBar