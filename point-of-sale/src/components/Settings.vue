<template>
  <v-container>

    <v-card>
      <v-card-title>
        Settings
      </v-card-title>
      <v-card-text>

        <v-row>
          <v-select
            :items="currencies"
            :item-text="currencyText"
            item-value="code"
            v-model="l_currency" label="Currency"></v-select>
        </v-row>

        <v-row>
          <v-text-field
            label="Wallet"
            hide-details="auto"
            v-model="l_wallet"
          ></v-text-field>
        </v-row>

        <v-row>
          <v-select
            :items="correctionLevels"
            item-text="name"
            item-value="id"
            v-model="l_correctionLevel" label="QR Correction Level"></v-select>
        </v-row>

      </v-card-text>
    </v-card>

    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      >
      {{ message }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { ICurrency } from '../types'

export default Vue.extend({
  name: 'Settings',
  components: {},
  computed: {
    ...mapState(['correctionLevels', 'correctionLevel']),
    ...mapState('polkadot', ['currencies', 'currency', 'wallet'])
  },
  data () {
    return {
      l_currency: {},
      l_wallet: '',
      l_correctionLevel: 'M',
      message: '',
      snackbar: false,
      timeout: 3000
    }
  },
  watch: {
    l_currency (val) {
      console.debug('watch.l_currency()', val)
      const c = this.currencies.find((f: ICurrency) => f.code === val)
      this.$store.dispatch('polkadot/setCurrency', c)
    },
    wallet (val) {
      this.l_wallet = val
    },
    l_wallet (val) {
      console.debug('watch.l_wallet()', val)
      this.$store.dispatch('polkadot/setWallet', val)
    },
    l_correctionLevel (val) {
      console.debug('watch.l_correctionLevel()', val)
      this.$store.dispatch('setCorrectionLevel', val)
    }
  },
  methods: {
    currencyText (c: ICurrency) {
      return `${c.code} - ${c.name}`
    }
  },
  mounted () {
    this.l_currency = this.currency.code
    this.l_wallet = this.wallet
    this.l_correctionLevel = this.correctionLevel // .id
  }
})
</script>
