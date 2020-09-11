import React from 'react'
import { View, Text, Image } from '@tarojs/components'
import Progress from '@/components/Progress'
import Price from '@/components/Price'
import BuyButton from '@/components/BuyButton'
import PImage from '@/components/PImage'
import './index.scss'

const GoodsItem = (props) => {

  const { data, style, onClick } = props;

  return (
    <View className="goods_item_c" style={style} onClick={() => { onClick() }}>
      <View className="left">
        <PImage size={120} radius={4} src={data.itempic} />
      </View>
      <View className="right">
        <View className="title_info">
          {/* <Image className='goods_img' lazyLoad src={data.itempic} /> */}
          <Text className="title">{data.itemtitle}</Text>
        </View>
        {
          data.couponsurplus ? <View className="progress_box">
            <View style={{ width: '50%' }}><Progress percent={data.couponreceive / data.couponnum * 100} /></View>
            <Text className="surplus">剩余{data.couponsurplus}件</Text>
          </View> : <View className="sale_wrap">热销：{data.itemsale}</View>
        }
        <View className="btm">
          <Price price={data.itemendprice} />
          <BuyButton />
        </View>
      </View>
    </View>
  )
}

export default GoodsItem