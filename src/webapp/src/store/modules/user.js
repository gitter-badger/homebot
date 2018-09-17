import Vue from 'vue'
// import shop from '../../api/user'

// initial state
const state = {
  token: '',
  user: {}
}

// getters
const getters = {

  devices: state => {
    if (state.user.devices){
      let devices = []
      state.user.devices.forEach((x) => {
        devices.push({
          _id: x._id,
          name: x.name,
          type: x.type,
          where: x.where,
          image:{
            origUrl: x.image.origUrl || 'default.jpg'
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

// actions
const actions = {
}

// mutations
const mutations = {

  setToken(state, data) {
    state.token = data;
  },

  setUser(state, data) {
    state.user = data;
  },

  setDevice(state, device) {
    for (let i=0; i<state.user.devices.length; i++) {
      if (state.user.devices[i]._id == device._id) {
        Vue.set(state.user.devices, i, device)
        break;
      }
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}