import React, { useEffect, useState } from 'react'
import { View, Text, Swiper, SwiperItem, Image } from '@tarojs/components'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import Price from '@/components/Price'
import GoodsTitle from '@/components/GoodsTitle'
import CouponBox from '@/components/CouponBox'
import CopyBox from '@/components/CopyBox'
import recommendIcon from '@/assets/recommend.png'
import shareIcon from '@/assets/share.png'
import { figureChange } from '@/utils/utils'
import { connect } from 'react-redux'
import './index.scss'

const GoodsDetail = (props) => {
  const { data, loading, dispatch } = props;
  const goodsId = getCurrentInstance().router.params.id
  const [transformGoods, setTransformGoods] = useState({}) // 转链后的数据
  const [showTransformInfo, setShowTransformInfo] = useState(false) // 是否展示复制框

  useEffect(() => {
    async function fetchData() {
      await dispatch({
        type: 'Global/getGoodsDetail',
        payload: {
          itemid: goodsId
        }
      })
    }
    fetchData()
  }, [])


  const submitBuy = () => {
    dispatch({
      type: 'Global/transformLink',
      payload: {
        itemid: goodsId,
        title: data.itemtitle
      },
      cb: (res) => {
        setTransformGoods(res)
        setShowTransformInfo(true)
      }
    })
  }


  return (
    <View>
      {
        !loading && <View className="good_detail_c">
          {/* 轮播 */}
          <View className="header_box" style={{ height: '100vw' }}>
            <View className="back" onClick={() => { Taro.navigateBack() }}>
              <View className='at-icon at-icon-chevron-left left_icon'></View>
            </View>
            <Swiper
              className="img_wrap"
              indicatorColor='#999'
              indicatorActiveColor='#333'
              circular
              indicatorDots
              autoplay>
              {
                data.taobao_image.map((item, i) => {
                  return <SwiperItem key={i} className="img_item" >
                    <Image className="img" mode='widthFix' src={item} />
                  </SwiperItem>
                })
              }
            </Swiper>
          </View>
          {/* 价格 */}
          <View className="info_box">
            <View className="price_wrap">
              <View className="price_box">
                <Price price={data.itemendprice} fontSize={26} showTitle={false} />
                <Text className="y_price">{data.itemprice}</Text>
              </View>
              <View className="sale">已售<Text className="num">{figureChange(data.itemsale, true)}</Text>件</View>
            </View>
            <View className="title_wrap">
              <GoodsTitle shoptype={data.shoptype} title={data.itemtitle} />
            </View>
            {
              data.couponmoney !== '0' && <View className="coupon_wrap">
                <CouponBox startTime={data.couponstarttime} entTime={data.couponendtime} price={data.couponmoney} onClick={submitBuy} />
              </View>
            }
          </View>

          {/* 推荐语 */}
          <View className="recommend_wrap">
            <View className="header">
              <Image className="reccommend_icon" src={recommendIcon} />
              <Text className="reccommend_text">宝贝推荐语</Text>
            </View>
            <View className="content">
              <Text className="text">{data.guide_article || data.itemdesc}</Text>
            </View>
          </View>

          {/* 商品详情 */}
          <View className="detail_wrap">
            <View className="title_box">
              <View className="label" />
              <Text className="text">商品介绍</Text>
            </View>
            <View className="content">
              {
                data.taobao_image.map((item, i) => {
                  return <Image key={i} mode="aspectFit" className="img" mode='widthFix' src={item} />
                })
              }
            </View>
          </View>

          {/* 底部操作 */}
          <View className="footer_bar_wrap">
            <View className="left">
              <View className="op_item">
                <Image className="op_img" src={shareIcon} />
                <Text className="text">分享</Text>
              </View>
            </View>
            <View className="right">
              <View className="puy_btn" onClick={submitBuy}>复制文案</View>
            </View>
          </View>
        </View>
      }
      <CopyBox data={transformGoods} onSuccess={() => { console.log('ok') }} visible={showTransformInfo} onCancel={() => { setShowTransformInfo(false) }} />
    </View>
  )
}

export default connect(({ Global, loading }) => {
  return {
    data: Global.goodsDetail,
    loading: loading.effects['Global/getGoodsDetail']
  }
})(GoodsDetail)