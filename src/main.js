import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import router from './router'
import vuex from './store'
import api from './api'
import App from './App.vue'
import './index.css'
import './assets/css/base.css'
 
const app = createApp(App)
app.config.globalProperties.$api = api
app.use(ElementPlus)
app.use(router)
app.use(vuex)
app.mount('#app')
