import { superSearch } from '@/service'
import { concat } from 'lodash'

export default {
  namespace: 'Search',
  state: {
    searchList: []
  },

  effects: {
    *fetchData({ payload }, { call, put }) {
      const { searchParams } = payload;
      const res = yield call(superSearch, searchParams);
      yield put({
        type: 'save',
        payload: {
          searchList: res.data.data
        }
      })
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload }
    },
    updateSave(state, { payload }) {
      return {
        ...state,
        ...payload,
        searchList: concat(state.searchList, payload.searchList),
      }
    },
  },
}
