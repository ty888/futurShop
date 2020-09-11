import React from 'react'
import { View, Image } from '@tarojs/components'
import Price from '@/components/Price'
import './index.scss'

const PurchaseGoodsItem = (props) => {

  const { data, style, onClick } = props;

  return (
    <View className="purchase_goods_item_c" style={style} onClick={() => { onClick() }}>
      <Image className="goods_img" mode="aspectFill" src={data.itempic} />
      <View className="info_box">
        <View className="title">{data.itemtitle}</View>
        <Price fontSize={16} price={data.itemendprice} showTitle={false} />
      </View>

    </View>
  )
}

export default PurchaseGoodsItem