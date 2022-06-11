import { state } from '@polkadot/types/interfaces/definitions'
import Vue from 'vue'
import Vuex from 'vuex'

import polkadot from './modules/polkadot'

import { correctionLevels } from './constants'

Vue.use(Vuex)

export interface IRootState {
  dark: boolean
  drawer: boolean
  fullscreen: boolean
  correctionLevels: any[]
  correctionLevel: any
}
// // eslint-disable-next-line
// interface IModules {}

export default new Vuex.Store<IRootState>({
  state: {
    dark: false,
    drawer: false,
    fullscreen: false,
    correctionLevels: correctionLevels,
    correctionLevel: correctionLevels[0].id
  },
  mutations: {
    SET_QR_CORRECTION_LEVEL (state, value) {
      state.correctionLevel = value
    },
    SET_DARK (state, value) {
      state.dark = value
    },
    SET_FULLSCREEN (state, value) {
      state.fullscreen = value
    },
    SET_DRAWER (state, value) {
      state.drawer = value
    }
  },
  actions: {
    async init ({ dispatch }) {
      dispatch('polkadot/init', {}, { root: true })
    },
    setCorrectionLevel ({ commit }, value) {
      commit('SET_QR_CORRECTION_LEVEL', value)
    },
    setDark ({ commit }, dark) {
      commit('SET_DARK', dark)
    },
    setFullscreen ({ commit }, value) {
      commit('SET_FULLSCREEN', value)
    },
    toggleFullscreen ({ state, commit }) {
      commit('SET_FULLSCREEN', !state.fullscreen)
    },
    setDrawer ({ commit }, active) {
      commit('SET_DRAWER', active)
    },
    toggleDrawer ({ state, commit }) {
      commit('SET_DRAWER', !state.drawer)
    }
  },
  modules: {
    polkadot
  }
})
