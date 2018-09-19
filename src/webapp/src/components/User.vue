<template>
  <v-app id="inspire">
    <v-dialog
      v-model="dialog.opened"
      width="500"
    >
      <v-card>
        <v-card-title>{{dialog.title}}</v-card-title>
        <v-card-text>{{dialog.text}}</v-card-text>
      </v-card>
    </v-dialog>
    <v-navigation-drawer  :clipped="$vuetify.breakpoint.lgAndUp" 
                          v-model="navigation.opened" fixed app>
      <v-list dense>
        <template v-for="item in navigation.items">
          <v-layout
              v-if="item.heading"
              :key="item.heading"
              row
              align-center
            >
            <v-flex xs6>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-flex>
          </v-layout>
          <v-list-group
            v-else-if="item.children"
            v-model="item.model"
            :key="item.text"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
          >
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
              v-for="(child, i) in item.children"
              :key="i"        
              >
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ child.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-tile v-else :key="item.text" :to="item.route">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      color="blue darken-3"
      dark
      app
      fixed
    >
    <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
      <v-toolbar-side-icon @click.stop="navigation.opened = !navigation.opened"></v-toolbar-side-icon>
      <span class="hidden-sm-and-down">User panel</span>
    </v-toolbar-title>  
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat>{{$store.state.user.email}}</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-top>          
          <v-scale-transition>
          <router-view></router-view>
          </v-scale-transition>          
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import deviceApi from '../api/device'

  export default {
    name: 'User',
    data: () => {
      return {
        navigation: {
          opened: true,
          items: [{
            icon: 'phonelink',
            text: 'Devices',
            route: '/devices'
          },
          {
            icon: 'settings',
            text: 'Settings',
            route: '/settings'
          }]  
        },
        dialog:{
          opened: false,
          title: '',
          text: '',
        },
        user: {
          devices: []
        }
      }
    },
    created: function() {
      const self = this;
      deviceApi.getDevices().then(data => {
        self.user.devices = data.data;
        self.$store.commit('user/setUser', self.user);
      }).catch(err => {
        self.dialog.opened = true;
        self.dialog.title = 'Error getting the token';
        self.dialog.text = err; 
      })
    }
  }
</script>
