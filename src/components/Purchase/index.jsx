import React, { useState } from 'react'
import { View, Image, Text, ScrollView } from '@tarojs/components'
import qiangIcon from '@/assets/qiang.png'
import { connect } from 'react-redux'
import { AtTabs, AtTabsPane } from 'taro-ui'
import Taro from '@tarojs/taro'
import PurchaseGoodsItem from "@/components/PurchaseGoodsItem"
import Loading from '@/components/Loading'
import './index.scss'

// 咚咚抢

const Purchase = (props) => {
  const { onChange, data, loading } = props;

  const [current, setCurrent] = useState(2)

  const tabList = [
    { title: '昨天15点', hour_type: 4 },
    { title: '昨天20点', hour_type: 5 },
    { title: '0点准时', hour_type: 6 },
    { title: '10点场', hour_type: 7 },
    { title: '12点场', hour_type: 8 },
    { title: '15点场', hour_type: 9 },
    { title: '20点场', hour_type: 10 },
  ]

  const onChangeTab = (v) => {
    setCurrent(v);
    onChange(tabList[v].hour_type)
  }

  return (
    <View className='purchase_c'>
      <View className="header_box">
        <View className="left">
          <Image className="icon" src={qiangIcon} />
          <View className="title">咚咚抢</View>
        </View>
        <View className="desc">整点特惠开抢</View>
      </View>
      <View className='content_wrap'>
        <AtTabs animated={false} swipeable={false} current={current} scroll tabList={tabList} onClick={(v) => { onChangeTab(v) }}>
          {
            tabList.map((_, i) => {
              return <AtTabsPane current={current} index={i} key={i} >
                <ScrollView
                  className="goods_wrap"
                  scrollX
                >
                  {
                    data.map((item, index) => {
                      return <PurchaseGoodsItem onClick={() => {
                        Taro.navigateTo({
                          url: '/pages/goodsDetail/index?id=' + item.itemid
                        })
                      }}
                      data={item} key={index} />
                    })
                  }
                  <Loading loading={loading} isGlobal={false} />
                </ScrollView>
              </AtTabsPane>
            })
          }
        </AtTabs>
      </View>
    </View>
  )
}

export default connect(({ loading }) => ({
  loading: loading.effects['Home/fetchPurchaseList']
}))(Purchase)
