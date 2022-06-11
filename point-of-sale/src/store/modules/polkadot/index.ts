import Vue from 'vue'
import Vuex, { Module } from 'vuex'
import { ICurrency } from '../../../types'
import { ApiPromise, WsProvider } from '@polkadot/api'

import { IRootState } from '../../index'
import { currencies } from './constants'
import { PolkadotState, PolkadotWindow } from './types'
declare let window: PolkadotWindow

Vue.use(Vuex)

// interface IWallet {
//   endpoint: string
// }
const initState: PolkadotState = {
  currencies: currencies,
  currency: currencies[0],
  amount: '0.001',
  wallet: 'EuKPqqwM5Q3jxCxGqrHcLnBM1Edv5QR5Cnzjhi1MttQWwLq',
  api: null,
  genesisHash: ''
}

const testWallets = {
  KSM: 'EuKPqqwM5Q3jxCxGqrHcLnBM1Edv5QR5Cnzjhi1MttQWwLp',
  DOT: '',
  WND: '5E4TRWDFLUbq6oQPJhW7gXHoevc2EFPmftLCxozP5r3x9y6a'
} as Record<string, string>

const polkadot: Module<PolkadotState, IRootState> = {
  namespaced: true,
  state: initState,
  mutations: {
    SET_API (state, api) {
      state.api = api
    },
    SET_WALLET (state, value: string) {
      console.debug('SET_WALLET()', value)
      state.wallet = value
    },
    SET_CURRENCY (state, value: ICurrency) {
      state.currency = value
    },
    SET_GENESIS_HASH (state, value: string) {
      state.genesisHash = value
    },
    SET_AMOUNT (state, amount: string) {
      // console.debug('SET_CURRENCY', value)
      state.amount = amount
    }
  },
  getters: {
    isReady () {
      return window.$polkadot ? window.$polkadot.isReady() : false
    }
  },
  actions: {
    async init ({ state, commit }) {
      console.debug('store/modules/polkadot: init()', state.currency)
      const wsProvider = new WsProvider(state.currency.endpoint)
      const api = await ApiPromise.create({ provider: wsProvider })
      window.$polkadot = api
      try {
        const gh = await api.genesisHash.toString() // .toHex()
        await commit('SET_WALLET', testWallets[state.currency.code])
        await commit('SET_GENESIS_HASH', gh)
        console.debug('genesisHash', gh)
      } catch (err) {
        console.error(err)
      // } finally {
      //   await api.close()
      }
    },
    setWallet ({ commit, dispatch }, wallet) {
      commit('SET_WALLET', wallet)
      dispatch('init')
    },
    setAmount ({ commit }, amount) {
      commit('SET_AMOUNT', amount)
    },
    setCurrency ({ commit }, c: ICurrency) {
      commit('SET_CURRENCY', c)
      commit('SET_WALLET', testWallets[c.code])
    }
  },
  modules: {}
}

export default polkadot
