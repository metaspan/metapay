<template>
  <Display
    :className="className"
    :size="size"
    :style="style"
    :timerDelay="timerDelay"
    :value="data"
  />
</template>

<script lang="ts">
import Vue from 'vue'
import Display from './Display.vue'
import { createSignPayload } from './util'

interface IData {
  data: Uint8Array
}

// eslint-disable-next-line
interface IMethods {}

// eslint-disable-next-line
interface IComputed {}

interface IProps {
  address: string;
  className?: string;
  cmd: number;
  delay?: number;
  genesisHash: Uint8Array | string;
  payload: Uint8Array;
  size?: string | number;
  style?: string // React.CSSProperties;
  timerDelay?: number;
}

export default Vue.extend<IData, IMethods, IComputed, IProps>({
  name: 'DisplayPayload',
  components: {
    Display
  },
  props: {
    address: { type: String },
    className: { type: String },
    cmd: { type: Number },
    genesisHash: { type: String },
    payload: { type: Uint8Array },
    size: { type: String },
    style: { type: String },
    timerDelay: { type: Number }
  },
  data () {
    return {
      data: new Uint8Array()
    }
  },
  created () {
    this.data = createSignPayload(this.address, this.cmd, this.payload, this.genesisHash)
  }
})
</script>
