import axios from '@/utils/request'
import qs from 'qs'

/**
 * 获取验证码 随机生成的id
 * @param {*} sid
 */
export const getCode = sid =>
  axios.get('/public/getCaptcha', {
    params: {
      sid
    }
  })

/**
 * 注册接口
 * @param {*} data
 */
export const reg = data => axios.post('/public/reg', data)

/**
 * 登录接口
 * @param {*} data
 */
export const login = data => axios.post('/public/login', data)

/**
 * 获取文章列表
 * @param {Object} data
 * type:0-普通列表，1-置顶列表
 * page:分页，从几页开始
 * limit:每页的数量，默认10
 * catalog:分类的名称，默认是index
 * sort:文章的排序 ，默认是created 创建时间进行倒序排列，否则的话按照回复数量进行排列
 * status:文章的状态，''-全部 ，0-未关闭，1-已结贴
 */
// export const getArticleList = data =>
//   axios.get('/getArticleList', {
//     params: {
//       type: data.type,
//       page: data.page,
//       limit: data.limit,
//       catalog: data.catalog,
//       sort: data.sort,
//       status: data.status
//     }
//   })
export const getPostList = data =>
  axios.get(`/public/getPostList?${qs.stringify(data)}`)

// 获取温馨提醒
export const getTips = () => axios.get('/public/getTips')

// 获取友情链接
export const getLinks = () => axios.get('/public/getLinks')

// 获取本周热议
export const getTopWeek = () => axios.get('/public/getTopWeek')

// 签到
export const fav = () => axios.get('/user/fav')

// 更新用户基本资料
export const updateUserInfo = (data) => axios.post('/user/basic', data)

// 发送更新用户名邮件
export const sendUpdateEmail = (updateUserName) => axios.get('/user/sendUpdateEmail', {
  params: {
    updateUserName
  }
})

// 确认更新用户名
export const updateUsername = (data) => axios.get('/user/updateUsername', {
  params: {
    key: data.key,
    username: data.username
  }
})
