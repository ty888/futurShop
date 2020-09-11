import { demo } from '@/service'

export default {
  namespace: 'Tlj',
  state: {
    data: []
  },

  effects: {
    *fetchData({ payload }, { call }) {
      try {
        const res = yield call(demo, payload);
      } catch (e) {
        console.log(e)
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload }
    }
  },
}
