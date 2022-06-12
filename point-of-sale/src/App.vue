<template>
  <fullscreen id="fullscreen" :fullscreen.sync="fullscreen">
  <v-app :dark="dark" fill-height>
      <!-- <SystemBar class="d-none d-md-block"></SystemBar> -->
      <Header></Header>
      <v-main>
        <v-fade-transition mode="out-in">
          <router-view/>
        </v-fade-transition>
      </v-main>
      <Footer></Footer>
      <NavDrawer :active="drawer"></NavDrawer>
  </v-app>
  </fullscreen>
</template>

<script lang="ts">
import Vue from 'vue'
// import SystemBar from '@/components/SystemBar.vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { mapState } from 'vuex'
import NavDrawer from './components/NavDrawer.vue'

interface IData {
  matcher: any
}
// eslint-disable-next-line
interface IMethods {
  onDark (evt: any): void
}
// eslint-disable-next-line
interface IComputed {
  fullscreen: boolean
  dark: boolean
  drawer: boolean
}
// eslint-disable-next-line
interface IProps {}

export default Vue.extend<IData, IMethods, IComputed, IProps>({
  name: 'App',
  components: {
    // SystemBar,
    Header,
    Footer,
    NavDrawer
  },
  computed: {
    ...mapState({ fullscreenState: 'fullscreen', dark: 'dark', drawer: 'drawer' }),
    fullscreen: {
      get () {
        return this.$store.state.fullscreen
      },
      set (value) {
        this.$store.dispatch('setFullscreen', value)
        return value
      }
    }
  },
  data: () => ({
    matcher: null
  }),
  // watch: {
  //   dark (isDark: boolean) {
  //     console.debug('App.vue: watch.dark()', isDark)
  //   }
  // },
  methods: {
    async onDark (evt: any) {
      console.debug('onDark', evt.matches)
      this.$vuetify.theme.dark = evt.matches
      await this.$store.dispatch('setDark', evt.matches)
    }
  },
  async created () {
    this.matcher = window.matchMedia('(prefers-color-scheme: dark)')
    // set the initial state from the matcher  await this.onDark(this.matcher)
    this.matcher.addListener(this.onDark)
    this.onDark(this.matcher)
    this.$store.dispatch('init')
  }
})
</script>
