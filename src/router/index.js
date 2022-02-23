import * as VueRouter from 'vue-router'
const Home = import('../page/Home.vue')
const DraftList = import('../page/draft/draftList.vue')
const AddDraft = import('../page/draft/addDraft.vue')
const Index = import('../page/index/index.vue')

const routes = [
  {
    path: '/',
    component: Index
  }, {
    path: '/draft',
    component: Home,
    children: [{
      path: '/draft/draftList',
      component: DraftList
    }, {
      path: '/draft/addDraft',
      component: AddDraft
    }]
  }
]
// const routes = {
//   '/': Index
// }

 
export default VueRouter.createRouter({
  // history: VueRouter.createWebHashHistory(), // 哈希模式
  history: VueRouter.createWebHistory(),// history模式
  routes
})