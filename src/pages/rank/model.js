import { rankList } from '@/service'
import { concat } from 'lodash'

const returnRank = (type, res) => {
  if (type === 1) {
    // 实时榜单
    return { realTimeList: res.data.data }
  } else if (type === 2) {
    // 今日榜单
    return { todayList: res.data.data }
  } else {
    // 昨日榜单
    return { yesterdayList: res.data.data }
  }
}

export default {
  namespace: 'Rank',
  state: {
    realTimeList: [], // 实时
    todayList: [], // 今日
    yesterdayList: [], // 昨日
  },

  effects: {
    *fetchData({ payload }, { call, put }) {
      const { sale_type } = payload
      const res = yield call(rankList, payload);
      yield put({
        type: 'updateSave',
        payload: returnRank(sale_type, res),
        sale_type: sale_type
      })
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload }
    },
    updateSave(state, { payload, sale_type }) {
      let currentPayload = []
      if (sale_type === 1) {
        // 实时榜单
        currentPayload = concat(state.realTimeList, payload.realTimeList);
        return {
          ...state,
          ...payload,
          realTimeList: currentPayload,
        }
      } else if (sale_type === 2) {
        // 今日榜单
        currentPayload = concat(state.todayList, payload.todayList);
        return {
          ...state,
          ...payload,
          todayList: currentPayload,
        }
      } else {
        // 昨日榜单
        currentPayload = concat(state.yesterdayList, payload.yesterdayList);
        return {
          ...state,
          ...payload,
          yesterdayList: currentPayload,
        }
      }
    },

  },
}
