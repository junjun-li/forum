import Vue from 'vue'
import Router from 'vue-router'

const Login = () => import(/* webpackChunkName: 'login' */ '@/views/Login.vue')
const Reg = () => import(/* webpackChunkName: 'reg' */ '@/views/Reg.vue')
// const Forget = () => import(/* webpackChunkName: 'forget' */ '@/views/Forget.vue')
const Index = () => import(/* webpackChunkName: 'index' */ '@/views/channels/Index.vue')
const Home = () => import(/* webpackChunkName: 'home' */ '@/views/channels/Home.vue')
const catalog = () => import(/* webpackChunkName: 'catalog' */ '@/views/channels/catalog.vue')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: 'index',
          name: 'index',
          component: Index
        },
        {
          path: '/index/:catalog',
          name: 'catalog',
          component: catalog
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/reg',
      name: 'reg',
      component: Reg,
      // login页面才能拿到sid 防止没有sid
      beforeEnter: (to, from, next) => {
        if (from.name === 'login') {
          next()
        } else {
          next('/login')
        }
      }
    }
    // {
    //   path: '/forget',
    //   name: 'forget',
    //   component: Forget
    // }
  ]
})
