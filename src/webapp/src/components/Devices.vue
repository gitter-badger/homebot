<template>

  <v-layout row wrap>
    
    <v-flex xs12>
      <v-list two-line>          

        <v-subheader >
          Устройства
        </v-subheader>
        
        <template v-for="device in this.$store.state.user.devices">

          <v-list-tile :key="device._id" ripple @click="click" avatar >
            <v-list-tile-avatar size=50>
              <img v-bind:src="device.image.origUrl">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title v-html="device.name"></v-list-tile-title>
              <v-list-tile-sub-title v-html="device.type"></v-list-tile-sub-title>
            </v-list-tile-content>
    
            <v-list-tile-action>
              <v-switch right 
                  :label="device.payload.turn"
                  v-model="device.payload.turn"
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

export default {
  name: 'Devices',
  data () {
    return {
    }
  },
  methods:{
    click: function(){

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
