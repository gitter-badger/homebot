<template>

  <v-layout row wrap>
    
    <v-flex xs12>
      <v-list two-line>          

        <v-subheader >
          Устройства
        </v-subheader>

        <template v-for="device in userDevices">

          <v-list-tile v-if = "device.image" :key="device._id" ripple avatar >
            <v-list-tile-avatar size=50>
              <img v-bind:src="device.image.origUrl">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title v-html="device.name"></v-list-tile-title>
              <v-list-tile-sub-title v-html="device.where"></v-list-tile-sub-title>
            </v-list-tile-content>
    
            <v-list-tile-action>
              <v-switch right 
                  v-model="device.payload.turn"
                  @change="ch_state(device._id, device.payload.turn)"
              ></v-switch>
            </v-list-tile-action>
          </v-list-tile>
          
        </template>
      </v-list>
      <div class="buttons-block">
        <v-btn>Discover</v-btn>
      </div>
    </v-flex>

  </v-layout>

</template>

<script>
// import config from '../../../config/dev'
import {mapGetters} from 'vuex'

export default {
  name: 'Devices',
  data () {
    return {

    }
  },
  computed:{
    ...mapGetters([
      'userDevices'
    ])
  },
  methods:{
    ch_state: function(deviceId, state){
      state;
      // const self = this;
      // console.log(state)
      // this.$http.put(`${config.server.urlSchema}://${config.server.host}:${config.server.port}`+
      //     `/api/v1/devices/${deviceId}`, {
      //       payload:{
      //         turn: state ? 'on': 'off'
      //       }
      //   }).then(data=>{
      //     console.log(data)
      //     self.$store.commit('ch_device', data.body)
      //   });
    }
  }
}
</script>

<style scoped>
.buttons-block {
    display: flex;
    justify-content: flex-end;
    width: 100%;
}
</style>
