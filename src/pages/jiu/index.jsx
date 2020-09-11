import React, { useState, useEffect } from 'react'
import { AtTabs, AtTabsPane } from 'taro-ui'
import { View, Text, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'
import GoodsItem from '@/components/GoodsItem'
import Loading from '@/components/Loading'
import './index.scss'

const Jiu = (props) => {
  const { dispatch, Jiu, loading } = props;
  const { jingxuan, nine, three, six } = Jiu;

  const [currentTab, setCurrentTab] = useState(0) // 当前Tab
  const [min_id, setMin_id] = useState([1, 1, 1, 1]) // 三榜分页
  const [canGet, setCanGet] = useState([true, true, true, true]);
  const tabList = [
    { title: '精选专区', type: 1 },
    { title: '9.9专区', type: 2 },
    { title: '6.9专区', type: 3 },
    { title: '3.9专区', type: 4 }
  ]

  useEffect(() => {
    if (canGet[currentTab]) {
      fetData()
      const currentData = canGet;
      currentData[currentTab] = false;
      setCanGet(currentData);
    }
  }, [currentTab])

  const fetData = () => {
    dispatch({
      type: 'Jiu/fetchData',
      payload: {
        type: tabList[currentTab].type,
        back: 20,
        min_id: min_id[currentTab]
      }
    })
    const currentId = min_id;
    currentId[currentTab]++
    setMin_id(currentId)
  }

  const returnList = (index) => {
    if (index === 0) {
      return jingxuan
    } else if (index === 1) {
      return nine
    } else if (index === 2) {
      return six
    } else {
      return three
    }
  }

  return (
    <View className='jiu_p'>
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

export default connect(({ Jiu, loading }) => {
  return {
    Jiu: Jiu,
    loading: loading.effects['Jiu/fetchData']
  }
})(Jiu)