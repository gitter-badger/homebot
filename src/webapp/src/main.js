import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// Vue.http.interceptors.push( ( request, next ) => {
//   if (store.state.token){
//     request.params['token'] = store.state.token;
//   }
//   next()
// })

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
