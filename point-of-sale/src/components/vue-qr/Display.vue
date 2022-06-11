<template>
  <!-- <div
    :className="className"
    :style="containerStyle"
  > -->
    <!-- <div
      className='ui--qr-Display'
      :style="css"
    > -->
      <!-- <img :src="image" /> -->
      <qr-code :text="value" :size="size" :errorLevel="correctionLevel"></qr-code>
    <!-- </div> -->
  <!-- </div> -->
</template>

<script lang="ts">
import Vue from 'vue'
import { qrcode } from './qrcode'
import { createFrames, createImgSize } from './util'
// import { objectSpread } from '@polkadot/util'
import { xxhashAsHex } from '@polkadot/util-crypto'
import { mapState } from 'vuex'

import VueQRCodeComponent from 'vue-qr-generator'
Vue.component('qr-code', VueQRCodeComponent)

interface FrameState {
  frames: Uint8Array[]
  frameIdx: number
  image: string | null
  valueHash: string | null
}

interface TimerState {
  timerDelay: number
  timerId: any | null // NodeJS.Timeout | null
}

const DEFAULT_FRAME_DELAY = 2750
const TIMER_INC = 500

function getDataUrl (value: Uint8Array): string {
  const qr = qrcode(0, 'M')

  // HACK See our qrcode stringToBytes override as used internally. This
  // will only work for the case where we actually pass `Bytes` in here
  qr.addData(value as unknown as string, 'Byte')
  qr.make()

  return qr.createDataURL(16, 0)
}

interface IData {
  timerRef: TimerState
  frames: Uint8Array[]
  frameIdx: number
  valueHash: string
  image: string
}

interface IMethods {
  nextFrame(): void
  setFrameState(value: string): void
}

interface IComputed {
  amount: number
  containerStyle: Record<string, string>
}

enum CorrectionLevel {
  L,
  M,
  Q,
  H
}

interface IProps {
  className?: string
  size?: number
  skipEncoding: boolean
  correctionLevel: CorrectionLevel
  css?: string
  timerDelay: number // TimerState,
  value: string
}

export default Vue.extend<IData, IMethods, IComputed, IProps>({
  name: 'Display',
  components: {
    // VueQRCodeComponent
  },
  // props: ['className', 'size', 'skipEncoding', 'style', 'timerDelay', 'value'],
  props: {
    className: {
      type: undefined // String,
    },
    size: {
      type: undefined // Number,
    },
    skipEncoding: {
      type: undefined // 'boolean'
    },
    correctionLevel: {
      type: undefined,
      default: CorrectionLevel.M
    },
    css: {
      type: undefined // String,
    },
    timerDelay: {
      type: undefined
      // default: DEFAULT_FRAME_DELAY
    },
    value: {
      type: undefined // String,
    }
  },
  computed: {
    ...mapState(['amount']),
    containerStyle (size?: number) {
      return createImgSize(size)
    }
  },
  data () {
    return {
      timerRef: {} as TimerState, // useRef<TimerState>({ timerDelay, timerId: null });
      frames: [],
      frameIdx: 0,
      valueHash: '',
      image: ''
    }
  },
  watch: {
    // value (val) {
    //   // console.debug('Display.vue: watch.value()', val)
    //   this.setFrameState(val)
    // },
    size (val) {
      console.debug('Display.vue: watch.size()', val)
    },
    correctionLevel (val) {
      console.debug('Display.vue: watch.correctionLevel()', val)
    }
  },
  methods: {
    nextFrame () {
      // console.debug('Display.vue: methods.nextFrame()...', this.timerDelay)
      if (this.frames.length <= 1) {
        return
      }

      this.frameIdx = this.frameIdx + 1
      // when we overflow, skip to the first and slightly increase the delay between frames
      if (this.frameIdx === this.frames.length) {
        this.frameIdx = 0
        this.timerRef.timerDelay = this.timerRef.timerDelay + TIMER_INC
      }

      // only encode the frames on demand, not above as part of the
      // state derivation - in the case of large payloads, this should
      // be slightly more responsive on initial load
      // const newState = objectSpread<FrameState>({}, this, {
      //   this.frameIdx,
      //   image: getDataUrl(this.frames[frameIdx])
      // })
      this.image = getDataUrl(this.frames[this.frameIdx])

      // set the new timer last
      this.timerRef.timerId = setTimeout(this.nextFrame, this.timerRef.timerDelay)
    },
    setFrameState (value: any) {
      console.debug('Display.vue: methods.setFrameState()...', value)
      const valueHash = xxhashAsHex(value)

      if (valueHash === this.valueHash) {
        return // this
      } else {
        this.valueHash = valueHash
      }

      this.frames = this.skipEncoding
        ? [value]
        : createFrames(value)

      this.image = getDataUrl(this.frames[0])
    }
  },
  created () {
    // this.timerRef = {
    //   timerDelay: this.timerDelay || DEFAULT_FRAME_DELAY,
    //   timerId: null // this.timerRef.timerId
    // }
    // this.setFrameState(this.value)
    // this.nextFrame()
  }
})
</script>

<style scoped>
.ui--qr-Display {
  height: 100%;
  width: 100%;
}
img, svg {
  background: white;
  height: auto !important;
  max-height: 100%;
  max-width: 100%;
  width: auto !important;
}
</style>
