import axios from 'axios'
import { baseURL } from '@/config/index'

class HttpRequest {
  constructor(baseURL) {
    this.baseURL = baseURL
  }
  // 设置axios的基本配置
  getInsideConfig() {
    const config = {
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      timeout: 10000
    }
    return config
  }
  // 给实例添加拦截器
  interceptors(instance) {
    // // 添加请求拦截器
    instance.interceptors.request.use(
      (config) => {
        // 在发送请求之前做些什么
        return config
      },
      (err) => {
        // 对请求错误做些什么
        return Promise.reject(err)
      }
    )
    // 添加响应拦截器
    instance.interceptors.response.use(
      (res) => {
        // 对响应数据做点什么
        if (res.status === 200) {
          return Promise.resolve(res.data)
        } else {
          return Promise.reject(res)
        }
      },
      (err) => {
        // 对响应错误做点什么
        return Promise.reject(err)
      }
    )
  }

  // 创建axios实例
  request(options) {
    let instance = axios.create()
    // 混合options
    let newOptions = Object.assign(this.getInsideConfig(), options)
    // 编辑拦截器
    this.interceptors(instance)
    return instance(newOptions)
  }
  get(url, config) {
    let options = Object.assign(
      {
        method: 'get',
        url
      },
      config
    )
    return this.request(options)
  }
  post(url, data) {
    return this.request({
      method: 'post',
      url,
      data
    })
  }
}

let URL = process.env.NODE_ENV === 'development' ? baseURL.dev : baseURL.pro

export default new HttpRequest(URL)
