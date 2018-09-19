<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-list two-line>          
        <v-subheader >
          Устройства
        </v-subheader>
        <template v-for="device in devices">
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
                  @change="changeDevice(device._id, device.payload.turn)"
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
import {mapGetters} from 'vuex'
import deviceAPI from '../../api/device'

export default {
  name: 'UserDevices',
  computed:{
    ...mapGetters({
      devices: 'user/devices'
    })
  },
  methods:{
    changeDevice: function(deviceId, state){
      const self = this;
      deviceAPI.changeDevice(deviceId, state).then(data=>{
        self.$store.commit('user/setDevice', data.data);
      });
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
