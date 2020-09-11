import React, { useState, useEffect } from 'react'
import { View, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'
import Loading from '@/components/Loading'
import GoodsItem from '@/components/GoodsItem'
import SearchBar from '@/components/SearchBar'
import SortBar from '@/components/SortBar'
import NoData from '@/components/NoData'
import './index.scss'

const Search = (props) => {
  const { dispatch, searchList, loading } = props;

  const [searchParams, setSearchParams] = useState({
    keyword: '', // 搜索关键词
    min_id: 1, // 当前页码
    back: 100, // 每页返回
    is_tmall: 0, // 是否天猫商品
    is_coupon: 0, // 是否有券商品
    sort: 0, // 排序
  })

  useEffect(() => {
    if (searchParams.keyword === '') return
    search()
  }, [searchParams])

  const search = () => {
    dispatch({
      type: 'Search/fetchData',
      payload: { searchParams }
    })
  }

  return (
    <View className='search_p'>
      <View className="header_wrap">
        <View className="search_wrap">
          <SearchBar onSearch={(v) => { setSearchParams({ ...searchParams, keyword: v }) }} />
          <SortBar
            onSort={(v) => { setSearchParams({ ...searchParams, sort: v }) }}
            onChangeCoupon={(v) => { setSearchParams({ ...searchParams, is_coupon: v }) }}
          />
        </View>
      </View>

      <View className="goods_wrap">
        {
          searchList.length > 0 ? <ScrollView
            className="goods_list"
            scrollY
            style={{ height: '100vh' }}
          // onScrollToLower={updataSearch}
          >
            {
              searchList.map((goodsItem, index) => {
                return <View className="goods_box" key={index}><GoodsItem
                  onClick={() => {
                    Taro.navigateTo({
                      url: '/pages/goodsDetail/index?id=' + goodsItem.itemid
                    })
                  }}
                  data={goodsItem}
                /></View>
              })
            }
          </ScrollView> : <NoData />
        }
      </View>
      <Loading loading={loading} />
    </View>
  )
}

export default connect(({ Search, loading }) => ({
  searchList: Search.searchList,
  loading: loading.effects['Search/fetchData']
}))(Search)