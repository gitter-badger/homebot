import Vue from 'vue'
import Router from 'vue-router'
import Settings from './components/Settings.vue'
import Devices from './components/Devices.vue'
import NotFound from './components/NotFound.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/', redirect: '/devices',
      name: 'Devices',
      component: Devices
    },
    {
    path: '/devices',
    name: 'Devices',
    component: Devices
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings
    },
    { path: '*', 
    component: NotFound }
  ]
})
