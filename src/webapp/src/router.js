import Vue from 'vue'
import Router from 'vue-router'

import User from './components/User.vue'
import UserSettings from './components/User/Settings.vue'
import UserDevices from './components/User/Devices.vue'

import Admin from './components/Admin.vue'
import AdminUsers from './components/Admin/Users.vue'

import NotFound from './components/NotFound.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/', component: User,
      children: [
        {
          path: '',
          redirect: 'devices'
        },
        {
          path: 'devices', 
          component: UserDevices
        },
        {
          path: 'settings',
          component: UserSettings
        }
      ]
    },
    {
      path: '/admin', component: Admin,
      children: [
        {
          path: '',
          redirect: 'users'
        },
        {
          path: 'users',
          component: AdminUsers
        }
      ]
    },
    {
      path: '*',
      component: NotFound
    }
  ]
})
