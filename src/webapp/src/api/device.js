import axios from 'axios'
import config from '../../config/dev'

export default {
  getDevices: async function () {
    return axios.get(`${config.server.urlSchema}://${config.server.host}:${config.server.port}`+
      `/api/v1/devices`)
  },
  changeDevice: async function (deviceId, state) {
    return axios.put(`${config.server.urlSchema}://${config.server.host}:${config.server.port}`+
      `/api/v1/devices/${deviceId}`, {
        payload:{
          turn: state ? 'on': 'off'
        }
    })
  }
}