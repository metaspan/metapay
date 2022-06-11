<template>
  <Display
    :className="className"
    :size="size"
    :skipEncoding="skipEncoding"
    :style="style"
    :value="data"
  />
</template>

<script lang="ts">
import Vue from 'vue'
import type { NetworkSpecsStruct } from '@polkadot/ui-settings/types'
import { encodeString } from './util';
import Display from './Display.vue'

interface IData {
  data: Uint8Array
}

// eslint-disable-next-line
interface IMethods {}

// eslint-disable-next-line
interface IComputed {}

interface IProps {
  className?: string
  networkSpecs: NetworkSpecsStruct
  size?: string | number
  style?: string // React.CSSProperties
  skipEncoding?: boolean
}

export default Vue.extend<IData, IMethods, IComputed, IProps>({
  name: 'NetworkSpecs',
  components: {
    Display
  },
  props: {
    className: { type: String, required: false, default: '' },
    networkSpecs: { type: undefined },
    size: { type: String },
    style: { type: String },
    skipEncoding: { type: Boolean }
  },
  data() {
    return {
      data: new Uint8Array
    }
  },
  created () {
    this.data = encodeString(JSON.stringify(this.networkSpecs))
  }
})
</script>
