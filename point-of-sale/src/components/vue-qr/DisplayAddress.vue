<template>
  <Display
    :className="className"
    :size="lSize"
    :skipEncoding="skipEncoding"
    :css="css"
    :timerDelay="timerDelay"
    :value="data"
    :correctionLevel="correctionLevel"
  />
</template>

<script lang="ts">
import Vue from 'vue'
import { createAddressPayload, decodeString } from './util'
import { CorrectionLevel } from './types'
import Display from './Display.vue'
import { ADDRESS_PREFIX } from './constants'

interface IData {
  lSize: number
  data: Uint8Array | string
}

// eslint-disable-next-line
interface IMethods {
  setData(): void
  onResize(): void
}

// eslint-disable-next-line
interface IComputed {}

interface IProps {
  address: string
  genesisHash: string
  className?: string
  size: number
  skipEncoding?: boolean
  correctionLevel: CorrectionLevel
  css?: string // React.CSSProperties;
  timerDelay?: number
  amount: number | string
}

const DEFAULT_SIZE = 300

export default Vue.extend<IData, IMethods, IComputed, IProps>({
  name: 'DisplayAddress',
  props: {
    address: {
      type: undefined
    },
    className: { type: undefined },
    genesisHash: { type: undefined },
    size: { type: Number, default: 300 },
    skipEncoding: { type: Boolean },
    correctionLevel: { type: undefined, default: CorrectionLevel.M },
    css: { type: undefined },
    timerDelay: { type: undefined },
    amount: { type: undefined }
  },
  components: {
    Display
  },
  data () {
    return {
      lSize: 300,
      data: new Uint8Array()
    }
  },
  watch: {
    amount () {
      console.debug('watch.amount()', this.address)
      this.setData()
    },
    address () {
      console.debug('watch.address()', this.address)
      this.setData()
    }
  },
  methods: {
    setData () {
      // const address = 'HyLisujX7Cr6D7xzb6qadFdedLt8hmArB6ZVGJ6xsCUHqmx'
      // const genesisHash = '0xeebbde3ff2bb37ca11414154e92c0521ac8051ea48d0d84b39714b2347763648:kusama 1kv stash'
      // this.data = createAddressPayload(this.address, this.genesisHash)
      this.data = `${ADDRESS_PREFIX}:${this.address}:${this.genesisHash}${this.amount ? ':' + this.amount : ''}`
      console.debug('DisplayAddress.vue: setData(): addressPayload', this.data)
      // console.debug('DisplayAddress.vue: watch.address(): addressPayload', decodeString(this.data))
    },
    // createAddressPayload (address, genesisHash) {}
    onResize () {
      console.debug('onResize()')
      if (window.innerWidth < this.lSize) this.lSize = window.innerWidth
    }
  },
  created () {
    this.lSize = this.size
    this.onResize()
    console.debug('created()', this.address, this.genesisHash)
    // this.data = createAddressPayload(this.address, this.genesisHash)
    this.data = `${ADDRESS_PREFIX}:${this.address}:${this.genesisHash}${this.amount ? ':' + this.amount : ''}`
    // console.debug('DisplayAddress.vue: created(): addressPayload', this.data)
    window.addEventListener('resize', this.onResize)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onResize)
  }
})
</script>
