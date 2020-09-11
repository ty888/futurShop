import { goodsDetail, purchaseList, everyDayGoodsList } from '@/service'
import { parseContent } from '@/service/dtkApi'

import Taro from '@tarojs/taro'

export default {
  namespace: 'Home',
  state: {
    goodsDetail: {
      taobao_image: []
    }, // 商品详情
    purchaseList: [], // 快抢商品
    everyDayGoodsList: [], // 今日值得买
  },

  effects: {
    *fetchData({ payload, cb }, { call, put }) {
      const resOne = yield call(parseContent, payload);
      if (resOne.data.code === 0) {
        const { goodsId } = resOne.data.data
        const currentSearchGoodsId = Taro.getStorageSync('CURRENT_SEARCH_GOODS_ID')
        if(goodsId === currentSearchGoodsId) {
          return
        }
        const res = yield call(goodsDetail, { itemid: goodsId });
        yield put({
          type: 'save',
          payload: {
            goodsDetail: {
              ...res.data.data,
              taobao_image: res.data.data.taobao_image.split(',')
            }
          },
        })
        if (cb && res.data.data) {
          Taro.setStorage({
            key: "CURRENT_SEARCH_GOODS_ID",
            data: goodsId
          })
          return cb()
        }
      }
    },
    
    // 获取快抢商品
    *fetchPurchaseList({ payload }, { call, put }) {
      const res = yield call(purchaseList, payload);
      yield put({
        type: 'save',
        payload: {
          purchaseList: res.data.data
        },
      })
    },
    // 获取快抢商品
    *fetchEveryDayList({ payload }, { call, put }) {
      const res = yield call(everyDayGoodsList, payload);
      console.log(res)
      yield put({
        type: 'save',
        payload: {
          everyDayGoodsList: res.data.item_info
        },
      })
    },

  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload }
    }
  },
}
