<template>
  <v-btn :large="$vuetify.breakpoint.mobile"
    :x-large="!$vuetify.breakpoint.mobile" rounded raised outlined class="ma-2"
    @click="onClick()"
    @dblclick.stop="onClick()">
    <span class="text-h4" v-show="!hasIconSlot">{{value}}</span>
    <slot name="icon"></slot>
  </v-btn>
</template>

<script lang="ts">
import Vue from 'vue'

// eslint-disable-next-line
interface IData {
  // value: string | number
}
// eslint-disable-next-line
interface IMethods {
  onClick(): void
}
// eslint-disable-next-line
interface IComputed {
  hasIconSlot: boolean
}

interface IProps {
  value: number | string
}

export default Vue.extend<IData, IMethods, IComputed, IProps>({
  name: 'NumPadButton',
  props: {
    value: {
      type: undefined
    }
  },
  computed: {
    hasIconSlot () {
      return !!this.$slots.icon
    }
  },
  // data() {
  //   return {
  //     val: ""
  //   }
  // },
  methods: {
    onClick () {
      // console.debug('NumPadButton.vue: onInput', this.value)
      this.$emit('onInput', this.value)
    }
  }
  // created () {
  //   this.val = this.value
  // }
})
</script>

<style scoped>
.keypad-button {
  font-size: 24px;
  font-weight: bold;
  background-color: lightgrey;
}
</style>
