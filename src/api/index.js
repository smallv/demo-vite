import {axios} from './axios.js'
import config from './../config'
export default {
  
  // 获取draft列表
  getDraftList(params) {
    return axios.post(`${config.server}/api/business/t/query/billInfo/list`, params)
  },
  
  //...
}