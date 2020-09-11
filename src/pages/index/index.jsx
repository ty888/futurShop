import React, { useEffect, useState } from 'react'
import { View, Text, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'
import { WEAPP } from '@/utils/constants'
import SearchCoupon from '@/components/SearchCoupon'
import HomeSwiper from '@/components/HomeSwiper'
import Entrance from '@/components/Entrance'
import Purchase from '@/components/Purchase'
import EveryDayGoods from '@/components/EveryDayGoods'
import './index.scss'

import logoIcon from '@/assets/logo.png'

const Home = (props) => {

  const { dispatch, purchaseList, everyDayGoodsList } = props;

  const [statusBarHeight, setStatusBarHeight] = useState(0); // bar高度
  const [showSearchCoupon, setShowSearchCoupon] = useState(false);
  // const [clipboardData, setClipboardData] = useState(''); // 剪贴板内容
  const [currentBgColor, setCurrentBgColor] = useState(''); // 背景颜色
  const [hourType, setHourType] = useState(6); // 快抢时间类型

  // 获取系统信息
  useEffect(() => {
    Taro.getSystemInfo({
      success: function (res) {
        setStatusBarHeight(res.statusBarHeight)
      }
    })
  }, [])

  useEffect(() => {
    if (!WEAPP) return;
    Taro.getClipboardData({
      success: function (res) {
        // if (res) {
        //   dispatch({
        //     type: 'Home/fetchData',
        //     payload: { content: res },
        //     cb: () => {
        //       setShowSearchCoupon(true)
        //     }
        //   })
        // }
        // console.log(res.data)
        // Taro.showToast({
        //   title: res.data,
        //   icon: 'success',
        //   duration: 2000
        // })
      }
    })
  }, [])


  // 页面分享
  useEffect(() => {
    if (WEAPP) {
      Taro.showShareMenu({
        withShareTicket: true,
        showShareItems: ['qq', 'qzone', 'wechatFriends', 'wechatMoment']
      })
    }
  }, [])


  // 快抢商品
  useEffect(() => {
    dispatch({
      type: 'Home/fetchPurchaseList',
      payload: {
        min_id: 1,
        hour_type: hourType
      },
    })
  }, [hourType])

  // 今日值得抢
  useEffect(() => {
    dispatch({
      type: 'Home/fetchEveryDayList'
    })
  }, [])


  return (
    <View className='home_p'>
      <View className="bg_wrap" style={{ background: currentBgColor || '#36135f' }} />
      <View className="home_wrap">
        {/* logo搜索 */}
        <View className="nav_wrap" style={{ paddingTop: statusBarHeight + 6 + 'px' }}>
          <Image mode="aspectFit" src={logoIcon} className="logo" />
          <View className="search_wrap" onClick={() => {
            Taro.navigateTo({
              url: '/pages/search/index'
            })
          }}>
            <View className='at-icon at-icon-search' />
            <Text>搜索商品</Text>
          </View>
        </View>
        {/* 轮播图 */}
        <View className="swiper_wrap">
          <HomeSwiper onSwiper={(v) => { setCurrentBgColor(v) }} />
        </View>
        {/* 图标入口 */}
        <View className="entrance_wrap">
          <Entrance />
        </View>
        {/* 快抢->咚咚抢 */}
        <View className="purchase_wrap">
          <Purchase data={purchaseList} onChange={(v) => { setHourType(v) }} />
        </View>
        {/* 今日值得买 */}
        <View className="every_day_goods_wrap">
          <EveryDayGoods data={everyDayGoodsList} />
        </View>

      </View>

      <SearchCoupon visible={showSearchCoupon} onSuccess={(v) => {
        Taro.navigateTo({
          url: '/pages/goodsDetail/index?id=' + v
        })
        setShowSearchCoupon(false)
      }} onCancel={() => { setShowSearchCoupon(false) }} />
    </View>
  )
}

export default connect(({ Home }) => ({
  purchaseList: Home.purchaseList,
  everyDayGoodsList: Home.everyDayGoodsList
}))(Home)