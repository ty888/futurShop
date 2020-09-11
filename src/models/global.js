import { goodsDetail, transformLink } from '@/service'

export default {
  namespace: 'Global',
  state: {
    goodsDetail: {
      taobao_image: []
    }, // 商品详情
  },

  effects: {
    *getGoodsDetail({ payload }, { call, put }) {
      const res = yield call(goodsDetail, payload);
      yield put({
        type: 'save',
        payload: {
          goodsDetail: {
            ...res.data.data,
            taobao_image: res.data.data.taobao_image.split(',')
          }
        },
      })
    },

    // 转链
    *transformLink({ payload, cb }, { call }) {
      const res = yield call(transformLink, payload);
      if(cb) {cb(res.data.data)}
    },

  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload }
    },
  },
}
