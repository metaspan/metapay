<template>
  <v-card fluid>
    <v-toolbar flat>
      <!-- <v-toolbar-title>QR Code</v-toolbar-title> -->
      <v-spacer></v-spacer>
      <v-btn icon @click="$emit('onClose')"><v-icon>mdi-close</v-icon></v-btn>
    </v-toolbar>
    <v-container>
      <v-row>
        <v-col>&nbsp;</v-col>
        <v-col class="text-center">
          <div class="text-h3">{{amount}} {{currency.code}}</div>
          <br>
          <div :class="dark ? 'qrcode-dark' : ''">
          <DisplayAddress :address="wallet" :genesisHash="genesisHash"
            :size="getSize"
            :correctionLevel="correctionLevel"
            :css="'display: inline; max-width: 300px; max-height: 300px;'"
            ></DisplayAddress>
          </div>
        </v-col>
        <v-col>&nbsp;</v-col>
      </v-row>
      <v-row>
        <v-col class="col-1"></v-col>
        <v-col class="text-center">
          <v-sheet outlined rounded class="wallet">
            <span class="text-subtitle text-md-h6">{{wallet}}</span>
          </v-sheet>
          <!-- <DisplayPayload :address="wallet"></DisplayPayload> -->
        </v-col>
        <v-col class="col-1"></v-col>
      </v-row>
      <v-row>
        <v-col class="text-center">
          <div class="text-h5">Scan this code with your wallet app</div>
          <div class="text=h6">You'll be asked to approve the transaction</div>
        </v-col>
      </v-row>
      <Footer></Footer>

    </v-container>

  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters, mapState } from 'vuex'
import { ICurrency } from '../types'
import DisplayAddress from './vue-qr/DisplayAddress.vue'
// import DisplayPayload from './vue-qr/DisplayPayload.vue'
import Footer from './Footer.vue'

// eslint-disable-next-line
interface IData {
  size: number
  resizeListener: any
}
// eslint-disable-next-line
interface IMethods {
  url(): string
  onWindowResize(ev: any): void
  setSize(s: number): void
}
// eslint-disable-next-line
interface IComputed {
  dark: boolean
  amount: string
  wallet: string
  currency: ICurrency
  genesisHash: any
  getSize: number
}
interface IProps {
  active: boolean
}

const DEFAULT_SIZE = 350

export default Vue.extend<IData, IMethods, IComputed, IProps>({
  name: 'QRCode',
  components: {
    DisplayAddress,
    // DisplayPayload,
    Footer
  },
  computed: {
    ...mapState(['correctionLevel', 'dark']),
    ...mapState('polkadot', ['amount', 'wallet', 'currency', 'genesisHash']),
    getSize () {
      return Math.min(DEFAULT_SIZE, window.innerWidth - 50)
    }
  },
  data () {
    return {
      size: DEFAULT_SIZE,
      // options: {
      //   url: '',
      //   size: 400,
      //   transparent: true,
      //   color: '#2a2a2a'
      // },
      resizeListener: null
    }
  },
  methods: {
    url () {
      return `${this.wallet}:metapay:${this.amount}`
    },
    onWindowResize (ev: any): void {
      // console.debug('onWindowResize', ev)
      this.setSize(Math.min(window.screen.availWidth - 48, DEFAULT_SIZE))
    },
    setSize (size: number) {
      this.size = typeof window === 'undefined' ? 400 : Math.min(window.screen.availWidth - 48, DEFAULT_SIZE)
    }
  },
  created () {
    // console.debug('QRCode.vue: created()', this.currency)
    window.addEventListener('resize', this.onWindowResize)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.resizeListener)
  }
})
</script>

<style scoped>
.qrcode-dark {
  /* margin: 5px; */
  padding: 5px;
  background-color: white;
}
.qrcode-wrapper {
  max-width: 500px;
}
.wallet {
  min-width: 400px;
    /* These are technically the same, but use both */
  overflow-wrap: break-word;
  word-wrap: break-word;

  -ms-word-break: break-all;
  /* This is the dangerous one in WebKit, as it breaks things wherever */
  word-break: break-all;
  /* Instead use this non-standard one: */
  word-break: break-word;

  /* Adds a hyphen where the word breaks, if supported (No Blink) */
  -ms-hyphens: none;
  -moz-hyphens: none;
  -webkit-hyphens: none;
  hyphens: none;
}
</style>
