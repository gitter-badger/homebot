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
    },
    ch_device(state, device) {
      for (let i=0; i<state.user.devices.length; i++) {
        if (state.user.devices[i]._id == device._id) {
          Vue.set(state.user.devices, i, device)
          break;
        }
      }
    }
  },
  getters: {
    userDevices: state => {
      if (state.user.devices){
        let devices = []
        state.user.devices.forEach((x) => {
          devices.push({
            _id: x._id,
            name: x.name,
            type: x.type,
            where: x.where,
            image:{
              origUrl: x.image.origUrl
            },
            payload: {
              turn: x.payload.turn == 'on' ? true: false
            }
          })
        });
        return devices
      }
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
