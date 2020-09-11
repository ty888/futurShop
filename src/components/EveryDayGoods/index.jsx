import React from 'react'
import { View, Image } from '@tarojs/components'
import titleIcon from '@/assets/index_1.jpg'
import GoodsItem from '@/components/GoodsItem'
import Taro from '@tarojs/taro'
import './index.scss'

const EveryDayGoods = (props) => {

  const { data, style } = props;

  return (
    <View className="every_day_goods" style={style}>
      <Image className="title_img" mode="aspectFill" src={titleIcon} />
      <View className="content_box">
        {
          data.map((item, i) => {
            return <GoodsItem
              onClick={() => {
                Taro.navigateTo({
                  url: '/pages/goodsDetail/index?id=' + item.itemid
                })
              }}
              style={{ marginBottom: '10px' }}
              data={item} key={i}
            />
          })
        }
      </View>

    </View>
  )
}

export default EveryDayGoods