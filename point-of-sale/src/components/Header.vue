<template>
  <v-app-bar
    app
    :dark="false"
    flat
    dense
  >
    <v-toolbar-title>
      <!-- <router-link class="logo" to="/">met🌐pay</router-link> -->
    </v-toolbar-title>

    <v-toolbar-items>
      <v-btn icon @click="toggleFullscreen"><v-icon>mdi-fullscreen{{fullscreen ? '-exit' : ''}}</v-icon></v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <!-- <v-btn>{{isReady}}</v-btn> -->
    <v-btn icon to="/" v-show="showHome"><v-icon>mdi-home</v-icon></v-btn>
    <v-app-bar-nav-icon @click.stop="toggleDrawer"></v-app-bar-nav-icon>

  </v-app-bar>

</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters, mapState } from 'vuex'
export default Vue.extend({
  name: 'Header',
  computed: {
    ...mapGetters('polkadot', ['isReady']),
    ...mapState(['fullscreen']),
    showHome () {
      console.debug('showHome()', this.$route)
      return this.$route.path !== '/'
    }
  },
  data () {
    return {
      // fullscreen: false
    }
  },
  methods: {
    toggleFullscreen () {
      this.$store.dispatch('toggleFullscreen')
    },
    toggleDrawer () {
      this.$store.dispatch('toggleDrawer')
    }
  }
})
</script>

<style>
.logo {
  text-decoration: inherit;
  color: inherit;
}
</style>
