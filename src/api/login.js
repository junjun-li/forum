import axios from '@/utils/request'

export const getCode = () => axios.get('/getCaptcha')
