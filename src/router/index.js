import * as VueRouter from 'vue-router'
const Home = import('../page/Home.vue') 

const routes = [
  {
    path: '/',
    component: () => import('../page/index/index.vue')
  }, {
    path: '/draft',
    component: Home,
    children: [{
      path: '/draft/darftList',
      component: () => import('../page/draft/draftList.vue')
    }, {
      path: '/draft/addDraft',
      component: () => import('../page/draft/addDraft.vue')
    }]
  }
]
 
export default VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes
})