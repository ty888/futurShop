import React from 'react'
import { View, Text, Image } from '@tarojs/components'
import noDataIcom from '@/assets/no_data.png'
import './index.scss'

const NoData = (props) => {
  const { title = '暂无数据' } = props;


  return (
    <View className='no_data_c'>
      <Image src={noDataIcom} mode="aspectFit" className="img" />
      <Text className="text">{title}</Text>
    </View>
  )
}

export default NoData