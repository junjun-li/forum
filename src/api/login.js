import axios from '@/utils/request'

export const getCode = sid =>
  axios.get('/getCaptcha', {
    params: {
      sid
    }
  })

export const reg = data => axios.post('/reg', data)

export const login = data => axios.post('/login', data)
