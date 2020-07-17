import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
Vue.use(Vuex)

export default new Vuex.Store({
  // 生产环境 禁用严格模式 严格模式有性消耗
  strict: process.env.NODE_ENV !== 'production',
  state: {
    sid: '',
    isLogin: false,
    token: '',
    userInfo: {}
  },
  mutations: {
    setSid (state, value) {
      state.sid = value
    },
    setToken (state, value) {
      state.token = value
      localStorage.setItem('token', value)
    },
    // 设置用户的基本信息
    setUserInfo (state, value) {
      state.userInfo = value
      // 本地存储用户信息
      if (value !== '') {
        localStorage.setItem('userInfo', JSON.stringify(value))
      }
    },
    // 设置isLogin的状态
    setIsLogin (state, value) {
      state.isLogin = value
    }
  },
  actions: {},
  plugins: process.env.NODE_ENV !== 'production' ? [createLogger()] : []
})
