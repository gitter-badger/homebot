import axios from 'axios'
import config from '../../../config/dev'

export default {
  async getDevices () {
    return axios.get(`${config.server.urlSchema}://${config.server.host}:${config.server.port}`+
      `/api/v1/devices`)
  }
}