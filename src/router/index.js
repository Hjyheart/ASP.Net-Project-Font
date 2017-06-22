import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/index'
import InOut from '@/views/inOut/inOut'
import Search from '@/views/search/search'
import Manage from '@/views/manage/manage'
import Statistic from '@/views/statistic/statistic'
import Recommendation from '@/views/recommendation/recommendation'
import History from '@/views/history/history'
import Users from '@/views/users/users'
import Admin from '@/views/admin/admin'
import Login from '@/views/login/login'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '**',
    //   component: Login
    // },
    {
      path: '/',
      name: 'index',
      redirect: '/login'
    },
    {
      path: '/admin-in-out',
      name: 'inOut',
      component: InOut
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/manage',
      name: 'manage',
      component: Manage
    },
    {
      path: '/statistic',
      name: 'statistic',
      component: Statistic
    },
    {
      path: '/recommendation',
      name: 'recommendation',
      component: Recommendation
    },
    {
      path: '/history',
      name: 'history',
      component: History
    },
    {
      path: '/users',
      name: 'users',
      component: Users
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
