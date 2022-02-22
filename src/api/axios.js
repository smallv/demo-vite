import axios from 'axios'
import router from '../router/index.js'
// import store from '@/store/index'
import utils from '../utils/common.js'
import { ElLoading, ElMessage } from 'element-plus'



/* 
  跳转登录
*/
const toLogin = () => {
  router.replace({
    path: '/login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

/* 
  请求失败后的统一处理
*/
const errorHandle = (status, other) => {
  switch (status) {
    // 401: 未登录状态，跳转登录页
    case 401:
      toLogin()
      break
    // 403 token过期
    // 清除token并跳转登录页
    case 403:
      ElMessage .error('登录过期，请重新登录')
      localStorage.removeItem('token')
      // store.commit('loginSuccess', null)
      setTimeout(() => {
        toLogin();
      }, 1000)
      break
    // 404请求不存在
    case 404:
      ElMessage .error('请求的资源不存在')
      break
    default:
      console.log(other)
  }
}

// 创建axios实例 不需要加载动画
var instance = axios.create({ timeout: 1000 * 60 })

instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

/* 
  请求拦截
*/
let Inc = (new Date()).getTime();
instance.interceptors.request.use(
  config => {
    // get 请求去缓存
    if (config.method === 'get') {
      Inc += 1;
      if (config.params) {
          config.params._ = Inc;
        } else {
            config.params = {
                _: Inc
            };
        }
    } 
    const token = utils.fetch('token')
    token && (config.headers.Authorization = token)
    return config
  },
  error => {
    return Promise.error(error)
  }
)

/* 
  响应拦截
*/
instance.interceptors.response.use(
  // 请求成功
  res => {
    if (res.status === 200 ) {

      // 从响应头中获取token 并刷新本地token
      let auth = res.headers.authorization
      if (auth) {
        let userInfo = utils.fetch('userInfo')
        userInfo.token = auth
        utils.save('userInfo', userInfo)
        utils.save('token', auth)
      }
      if (!res.data.success) {
        // token 过期
        if (res.data.code == 'TK02') {
          utils.logout()
        }
        if (res.data.code == 'TK08') {
          window.location.href = window.location.origin + '/' + base.interface.appPath + '/sginAgreement.html'
        }
        if (res.data.code == 'TK07') {
          window.location.href = window.location.origin + '/' + config.interface.appPath + '/userAgreement.html'
        }
        if (res.data.code == 'TK06') {
          return ElMessage .error('You are not authorized by this button')
        }
        
        return ElMessage .error(res.data.ElMessage )
      } 
      
      return Promise.resolve(res.data)
    } else {
      return Promise.reject(res.data)
    }
  },
  
  error => {
    const { response } = error
    if (error.ElMessage .includes('timeout')) { // 请求超时
      return ElMessage .error('time out')
    }
    if (response) {
      // 请求已发出，但是不在2xx的范围 
      errorHandle(response.status, response.data.ElMessage )
      return Promise.reject(response)
    } else {
      // 处理断网的情况
      // eg:请求超时或断网时，更新state的network状态
      // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
      // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
      // if (!window.navigator.onLine) {
      //   store.commit('changeNetwork', false)
      // } else {
      //   return Promise.reject(error)
      // }
    }
  }
)
// 创建axios实例 需要加载动画
var instanceLoading = axios.create({ timeout: 1000 * 60 })

instanceLoading.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

/* 
  请求拦截
*/
let loadinginstance
let Inc2 = (new Date()).getTime();
instanceLoading.interceptors.request.use(
  config => {
    loadinginstance = ElLoading.service({fullscreen: true})
    // get 请求去缓存
    if (config.method === 'get') {
      Inc2 += 1;
      if (config.params) {
          config.params._ = Inc2;
        } else {
            config.params = {
                _: Inc2
            };
        }
    } 
    const token = utils.fetch('token')
    token && (config.headers.Authorization = token)
    return config
  },
  error => {
    loadinginstance.close()
    return Promise.error(error)
  }
)

/* 
  响应拦截
*/
instanceLoading.interceptors.response.use(
  // 请求成功
  res => {
    loadinginstance.close()
    if (res.status === 200 ) {

      // 从响应头中获取token 并刷新本地token
      let auth = res.headers.authorization
      if (auth) {
        let userInfo = utils.fetch('userInfo')
        userInfo.token = auth
        utils.save('userInfo', userInfo)
        utils.save('token', auth)
      }
      if (!res.data.success) {
        // token 过期
        if (res.data.code == 'TK02') {
          utils.logout()
        }
        if (res.data.code == 'TK08') {
          window.location.href = window.location.origin + '/' + base.interface.appPath + '/sginAgreement.html'
        }
        if (res.data.code == 'TK07') {
          window.location.href = window.location.origin + '/' + config.interface.appPath + '/userAgreement.html'
        }
        if (res.data.code == 'TK06') {
          return ElMessage .error('You are not authorized by this button')
        }
        
        return ElMessage .error(res.data.ElMessage )
      } 
      
      return Promise.resolve(res.data)
    } else {
      return Promise.reject(res.data)
    }
  },
  
  error => {
    loadinginstance.close()
    const { response } = error
    if (error.ElMessage .includes('timeout')) { // 请求超时
      return ElMessage .error('time out')
    }
    if (response) {
      // 请求已发出，但是不在2xx的范围 
      errorHandle(response.status, response.data.ElMessage )
      return Promise.reject(response)
    } else {
      // 处理断网的情况
      // eg:请求超时或断网时，更新state的network状态
      // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
      // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
      // if (!window.navigator.onLine) {
      //   store.commit('changeNetwork', false)
      // } else {
      //   return Promise.reject(error)
      // }
    }
  }
)

export {
  instance as axios,
  instanceLoading as axiosLoading
}

