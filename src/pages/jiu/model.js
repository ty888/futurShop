import { lowPriceList } from '@/service'
import { concat } from 'lodash'

export default {
  namespace: 'Jiu',
  state: {
    jingxuan: [], // 精选
    nine: [], // 9.9
    six: [], // 6.9
    three: [], // 3.9
  },

  effects: {
    *fetchData({ payload }, { call, put }) {
      const { type } = payload
      const res = yield call(lowPriceList, payload);
      yield put({
        type: 'updateSave',
        payload: { data: res.data.data },
        tab_type: type
      })
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload }
    },
    updateSave(state, { payload, tab_type }) {
      let currentPayload = []
      if (tab_type === 1) {
        // 精选
        // currentPayload = state.jingxuan
        // currentPayload.push(...payload.data)
        currentPayload = concat(state.jingxuan, payload.data);
        return {
          ...state,
          ...payload,
          jingxuan: currentPayload,
        }
      } else if (tab_type === 2) {
        // 9.9
        currentPayload = concat(state.nine, payload.data);
        return {
          ...state,
          ...payload,
          nine: currentPayload,
        }
      } else if(tab_type === 3) {
        // 6.9
        currentPayload = concat(state.six, payload.data);
        return {
          ...state,
          ...payload,
          six: currentPayload,
        }
      } else {
        currentPayload = concat(state.three, payload.data);
        return {
          ...state,
          ...payload,
          three: currentPayload,
        }
      }
    },
  },
}
