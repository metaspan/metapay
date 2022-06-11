<template>
  <div
    :className="className"
    :style="containerStyle"
  >
    <Reader
      className='ui--qr-Scan'
      :delay="delay"
      @onError="_onError"
      @onScan="_onScan"
      :css="css"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { createImgSize } from './util'
import Reader from './Reader.vue'

interface IData {
  data: Uint8Array
}

interface IMethods {
  _onError(error: any): void
  _onScan(scan: any): void
}

interface IComputed {
  containerStyle: any
}

interface IProps {
  className?: string;
  delay?: number;
  onError?: (error: Error) => void;
  onScan: (data: string) => void;
  size?: string | number;
  css?: string // TODO React.CSSProperties;
}

const DEFAULT_DELAY = 150

const DEFAULT_ERROR = (error: Error): void => {
  console.error('@metaspan/metapay/vue-qr:Scan', error)
}

export default Vue.extend<IData, IMethods, IComputed, IProps>({
  name: 'Scan',
  components: {
    Reader
  },
  props: {
    className: { type: undefined }, // string;
    delay: {
      type: Number,
      required: false,
      default: DEFAULT_DELAY
    },
    onError: {
      type: undefined,
      required: false,
      default: DEFAULT_ERROR
    }, // (error: Error) => void;
    onScan: { type: undefined }, // (data: string) => void;
    size: { type: undefined }, // string | number;
    css: { type: String } // string // React.CSSProperties;
  },
  computed: {
    containerStyle () {
      return createImgSize(this.size)
    }
  },
  methods: {
    _onError (error: any) {
      console.error(error)
    },
    _onScan (scan: any) {
      if (this.onScan !== undefined) {
        this.onScan(scan)
      }
    }
  }
})
</script>

<style scoped>
.ui--qr-Scan {
  display: inline-block;
  height: 100%;
  transform: matrix(-1, 0, 0, 1, 0, 0);
  width: 100%;
}
.video {
  margin: 0;
}
</style>
