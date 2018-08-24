import '@babel/polyfill'
import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from "vue-resource"
import './plugins/vuetify'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

Vue.use(Vuex);
Vue.use(VueResource);

const store = new Vuex.Store({
  state: {
      token: '',
      user: {}
  },
  mutations: {
    ch_token(state, data) {
      state.token = data;
    },
    ch_user(state, data) {
      state.user = data;
    }
  }
});

Vue.http.interceptors.push( ( request, next ) => {
  if (store.state.token){
    request.params['token'] = store.state.token;
  }
  next()
})

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
