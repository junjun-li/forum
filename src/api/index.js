import axios from '@/utils/request'
import qs from 'qs'
/**
 * 获取验证码 随机生成的id
 * @param {*} sid
 */
export const getCode = sid =>
  axios.get('/getCaptcha', {
    params: {
      sid
    }
  })

/**
 * 注册接口
 * @param {*} data
 */
export const reg = data => axios.post('/reg', data)

/**
 * 登录接口
 * @param {*} data
 */
export const login = data => axios.post('/login', data)

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
export const getArticleList = data =>
  axios.get(`/getArticleList?${qs.stringify(data)}`)

// 获取温馨提醒
export const getTips = () => axios.get(`/getTips`)

// 获取友情链接
export const getLinks = () => axios.get(`/getLinks`)

// 获取本周热议
export const getTopWeek = () => axios.get(`/getTopWeek`)
