import axios from 'axios'
import { baseURL } from '@/config/index'

const CancelToken = axios.CancelToken
class HttpRequest {
  constructor (baseURL) {
    this.baseURL = baseURL
    this.pending = {}
  }

  // 设置axios的基本配置
  getInsideConfig () {
    const config = {
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      timeout: 10000
    }
    return config
  }

  // 如果重复请求,删除掉重复的请求
  removePending (key, isRequest = false) {
    if (this.pending[key] && isRequest) {
      this.pending[key]('重复请求')
    }
    delete this.pending[key]
  }

  // 给实例添加拦截器
  interceptors (instance) {
    // // 添加请求拦截器
    instance.interceptors.request.use(
      config => {
        // 在发送请求之前做些什么
        const key = config.url + '&' + config.method
        const token = localStorage.getItem('token')
        // 先判断 this.pending[key] 里面有没有这个请求
        this.removePending(key, true)
        // 往 this.pending里面添加这个取消请求的方法
        config.cancelToken = new CancelToken(c => {
          this.pending[key] = c
        })
        config.headers.Authorization = 'Bearer ' + token
        return config
      },
      err => {
        // 对请求错误做些什么
        return Promise.reject(err)
      }
    )
    // 添加响应拦截器
    instance.interceptors.response.use(
      res => {
        // 对响应数据做点什么
        const key = res.config.url + '&' + res.config.method
        this.removePending(key)
        if (res.status === 200) {
          return Promise.resolve(res.data)
        } else {
          return Promise.reject(res)
        }
      },
      err => {
        // 对响应错误做点什么
        return Promise.reject(err)
      }
    )
  }

  // 创建axios实例
  request (options) {
    const instance = axios.create()
    // 混合options
    const newOptions = Object.assign(this.getInsideConfig(), options)
    // 编辑拦截器
    this.interceptors(instance)
    return instance(newOptions)
  }

  get (url, config) {
    const options = Object.assign(
      {
        method: 'get',
        url
      },
      config
    )
    return this.request(options)
  }

  post (url, data) {
    return this.request({
      method: 'post',
      url,
      data
    })
  }
}

const URL = process.env.NODE_ENV === 'development' ? baseURL.dev : baseURL.pro

export default new HttpRequest(URL)
