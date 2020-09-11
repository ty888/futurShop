import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'
import { AtTabs, AtTabsPane } from 'taro-ui'
import GoodsItem from '@/components/GoodsItem'
import Loading from '@/components/Loading'
import './index.scss'

const Rank = (props) => {
  const { dispatch, Rank, loading } = props;
  const { realTimeList, todayList, yesterdayList } = Rank;
  const [currentTab, setCurrentTab] = useState(0) // 当前Tab
  const [min_id, setMin_id] = useState([1, 1, 1]) // 三榜分页
  const [canGet, setCanGet] = useState([true, true, true]);
  const tabList = [
    { title: '实时销量榜', sale_type: 1 },
    { title: '今日爆单榜', sale_type: 2 },
    { title: '昨日爆单榜', sale_type: 3 }
  ]

  useEffect(() => {
    if (canGet[currentTab]) {
      fetData()
      const currentData = canGet;
      currentData[currentTab] = false;
      setCanGet(currentData);
    }
  }, [currentTab])

  // 获取数据
  const fetData = () => {
    dispatch({
      type: 'Rank/fetchData',
      payload: {
        sale_type: tabList[currentTab].sale_type,
        back: 20,
        min_id: min_id[currentTab]
      }
    })
    const currentId = min_id;
    currentId[currentTab]++
    setMin_id(currentId)
  }

  // useEffect(() => {
  //   if(loading) {
  //     Taro.showLoading({
  //       title: '加载中',
  //     })
  //   } else {
  //     Taro.hideLoading
  //   }
  // }, [loading])

  const returnList = (index) => {
    if (index === 0) {
      return realTimeList
    } else if (index === 1) {
      return todayList
    } else {
      return yesterdayList
    }
  }

  return (
    <View className='rank_p'>
      <AtTabs current={currentTab} animated={false} tabList={tabList} onClick={(v) => { setCurrentTab(v) }}>
        {
          tabList.map((_, i) => {
            return <AtTabsPane key={i} current={currentTab} index={i} >
              <ScrollView
                className="goods_wrap"
                scrollY
                style={{ height: '100vh' }}
                onScrollToLower={() => { fetData() }}
              >
                {
                  returnList(i).map((goodsItem, index) => {
                    return <GoodsItem
                      onClick={() => {
                        Taro.navigateTo({
                          url: '/pages/goodsDetail/index?id=' + goodsItem.itemid
                        })
                      }}
                      style={{ marginBottom: '10px' }}
                      data={goodsItem} key={index}
                    />
                  })
                }
              </ScrollView>
            </AtTabsPane>
          })
        }
      </AtTabs>
      <Loading loading={loading} />
    </View>
  )
}

export default connect(({ Rank, loading }) => {
  return {
    Rank: Rank,
    loading: loading.effects['Rank/fetchData']
  }
})(Rank)