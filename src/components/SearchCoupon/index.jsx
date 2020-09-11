import React from 'react'
import { View, Text } from '@tarojs/components'
import { connect } from 'react-redux'
import PImage from '@/components/PImage'
import Price from '@/components/Price'

import './index.scss'

const SearchCoupon = (props) => {
  const { data, visible = false, onCancel, onSuccess } = props;

  const currentStyle = {
    display: visible ? 'flex' : 'none'
  }

  return (
    <View className='copy_box_c' style={currentStyle}>
      <View className="copy_wrap">
        <View className="copy_body">
          <View className="title_box">
            <Text className="text">智能搜券</Text>
          </View>
          <View className="content">
            <View className="content_box">
              <View className="left">
                <PImage size={80} radius={4} src={data.itempic} />
              </View>
              <View className="right">
                <Text className="title">{data.itemtitle}</Text>
                <View className="price_box">
                  <Price price={data.itemendprice} />
                </View>
              </View>
            </View>
            <View className="copy_btn" onClick={() => { onSuccess(data.itemid) }}>前往查看</View>
          </View>
        </View>
        <View className='at-icon at-icon-close-circle close_btn' onClick={() => { onCancel() }} />
      </View>
    </View>
  )
}

export default connect(({ Home }) => ({
  data: Home.goodsDetail
}))(SearchCoupon)