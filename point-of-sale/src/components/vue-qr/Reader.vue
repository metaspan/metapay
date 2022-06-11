<template>
  <v-container>
    <v-select :items="['front','back','auto']" v-model="camera" label="Select Camera"></v-select>
    <StreamBarcodeReader @decode="onDecode" :camera="camera"></StreamBarcodeReader>
    <!-- <QrcodeStream @decode="onDecode" :camera="camera"></QrcodeStream> -->
    <!-- <QrcodeDropZone></QrcodeDropZone> -->
    <!-- <QrcodeCapture></QrcodeCapture> -->
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
// , QrcodeDropZone, QrcodeCapture
// import { QrcodeStream } from 'vue-qrcode-reader'
import { StreamBarcodeReader } from 'vue-barcode-reader'
import { debounce } from 'lodash'

export default Vue.extend({
  name: 'Reader',
  components: {
    StreamBarcodeReader
    // QrcodeStream
    // QrcodeDropZone,
    // QrcodeCapture
  },
  props: {
    delay: {
      type: Number
    }
  },
  data () {
    return {
      camera: 'auto'
    }
  },
  methods: {
    // onCameraChange (promise: any) {
    //   promise.catch(error => {})
    // },
    onDecode (decodedString: string) {
      // alert('found:' + decodedString)
      console.debug(`Reader.vue: onDecode() |${decodedString}|`)
      // this.$emit('onScan', decodedString)
      this.notify(decodedString)
      // const that = this
      // setTimeout(() => {
      //   console.debug('resetting camera', this.camera)
      //   const prevCam = this.camera
      //   this.camera = (prevCam === 'auto') ? 'front' : 'auto'
      //   this.camera = prevCam
      // }, 5000, this)
    },
    notify (decodedString: string) {
      this.$emit('onScan', decodedString)
    }
  },
  // created () {
  //   console.debug('Reader.vue: created()', this.delay)
  //   this.notify = debounce((decodedString: string) => {
  //     console.debug(`Reader.vue: debounced notify() |${decodedString}|`)
  //     this.$emit('onScan', decodedString)
  //   }, this.delay)
  // },
  mounted () {
    this.camera = 'auto'
  },
  beforeDestroy () {
    this.camera = ''
    // this.onDecode.cancel()
  }
})
</script>
