import React, { useEffect, useState } from 'react'
import { View, Text } from '@tarojs/components'
import { connect } from 'react-redux'
import { AtTabs, AtTabsPane, AtToast } from 'taro-ui'
import GoodsItem from '@/components/GoodsItem'
import './index.scss'

const Rank = (props) => {
  const { dispatch, rankList, loading } = props;
  const [currentTab, setCurrentTab] = useState(0)
  const tabList = [
    { title: '实时销量榜', sale_type: 1 },
    { title: '今日爆单榜', sale_type: 2 },
    { title: '昨日爆单榜', sale_type: 3 }
  ]

  useEffect(() => {
    dispatch({
      type: 'Rank/fetchData',
      payload: {
        sale_type: tabList[currentTab].sale_type,
        back: 20
      }
    })
  }, [currentTab])

  return (
    <View className='rank_p'>
      <AtTabs current={currentTab} tabList={tabList} onClick={(v) => { setCurrentTab(v) }}>
        {
          tabList.map((_, index) => {
            return <AtTabsPane key={index} current={currentTab} index={index} >
              <View className="goods_wrap">
                {
                  rankList.map(goodsItem => {
                    return <GoodsItem style={{ marginBottom: '10px' }} data={goodsItem} key={goodsItem.product_id} />
                  })
                }
              </View>
            </AtTabsPane>
          })
        }
      </AtTabs>
      <AtToast isOpened={loading} text="加载中" status="loading" icon="loading" hasMask></AtToast>
    </View>
  )
}

export default connect(({ Rank, loading }) => {
  return {
    rankList: Rank.rankList,
    loading: loading.effects['Rank/fetchData']
  }
})(Rank)