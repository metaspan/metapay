<template>
  <v-navigation-drawer app right v-model="isActive">
    <v-toolbar dense>
      <router-link class="logo" to="/">met🌐pay</router-link>

      <v-spacer></v-spacer>
      <!-- <v-app-bar-nav-icon @click.stop="toggleDrawer"></v-app-bar-nav-icon> -->
      <v-btn icon @click.stop="toggleDrawer"><v-icon>mdi-window-close</v-icon></v-btn>
    </v-toolbar>

    <v-list>

      <v-list-item to="/">
        <v-list-item-icon>
          <v-icon>mdi-home</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item to="/settings">
        <v-list-item-icon>
          <v-icon>mdi-tools</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Settings</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item @click="toggleDark()">
        <v-list-item-icon>
          <v-icon>mdi-theme-light-dark</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Dark mode {{dark ? '(on)' : ''}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item to="/scan">
        <v-list-item-icon>
          <v-icon>mdi-qrcode</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Scan</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

// eslint-disable-next-line
interface IData {
  isActive: boolean
}
// eslint-disable-next-line
interface IMethods {
  toggleDrawer(): void
  toggleDark(): void
  toggleScan(): void
}
// eslint-disable-next-line
interface IComputed {
  dark: boolean
}
interface IProps {
  active: boolean
}

export default Vue.extend<IData, IMethods, IComputed, IProps>({
  name: 'NavDrawer',
  props: {
    active: {
      type: undefined
    }
  },
  computed: {
    ...mapState(['dark'])
  },
  data () {
    return {
      isActive: false
    }
  },
  watch: {
    active (val) {
      this.isActive = val
    },
    isActive (val) {
      this.$store.dispatch('setDrawer', val)
    }
  },
  methods: {
    toggleDrawer () {
      this.isActive = !this.isActive
    },
    toggleDark () {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
      this.$store.dispatch('setDark', this.$vuetify.theme.dark)
    },
    toggleScan () {
      this.$store.dispatch('toggleScan')
    }
  }
})
</script>
