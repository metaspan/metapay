<template>
  <v-container>
    <!-- <ScanAddress :onScan="onScan" :delay="1000" :className="'text-center'"></ScanAddress> -->
    <Reader v-show="!result" @onScan="onScan" @onError="onError" :className="'text-center'"></Reader>
    <v-card v-show="result">
      {{result}}
    </v-card>

    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      >
      {{ result }}
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
// import ScanAddress from './vue-qr/ScanAddress.vue'
import Reader from './vue-qr/Reader.vue'
import { decodeString } from './vue-qr/util'

interface IData {
  result: any | null
  snackbar: boolean
  timeout: number
}
interface IMethods {
  onScan(scan: string): void
  handleScan(scan: string): void
  onError(error: Error): void
}
// eslint-disable-next-line
interface IComputed {}
// eslint-disable-next-line
interface IProps {}

export default Vue.extend<IData, IMethods, IComputed, IProps>({
  components: {
    // ScanAddress,
    Reader
  },
  data () {
    return {
      result: null,
      snackbar: false,
      timeout: 3000
    }
  },
  methods: {
    onScan (scan: string) {
      if (!this.result) {
        this.handleScan(scan)
        setTimeout(() => {
          this.result = null
        }, this.timeout)
      // } else {
      //   console.debug('debounce...', scan)
      }
    },
    onError (error: Error) {
      console.error(error)
    },
    handleScan (scan: string) {
      console.debug('Scanner.vue: handleScan() ' + scan)
      // this.result = decodeString(Buffer.from(scan, 'utf8'))
      this.result = scan.split(':')
      this.snackbar = true
    }
  }
})
</script>
