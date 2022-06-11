<template>
    <v-select
      v-model="currency"
      :items="currencies"
      :item-text="itemText"
      item-value="code"
      filled
      label="Enter amount in currency"
    ></v-select>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { ICurrency } from '../types'

export default Vue.extend({
  name: 'CurrencyPicker',
  props: ['code'],
  computed: {
    ...mapState(['currencies'])
  },
  watch: {
    currency (val: string | ICurrency) {
      console.debug('watch.currency()', val)
      if (typeof val === 'string') {
        const c: ICurrency = this.currencies.find((f: ICurrency) => f.code === val)
        this.$store.dispatch('setCurrency', c)
        this.$emit('select', c)
      } else {
        this.$store.dispatch('setCurrency', val)
        this.$emit('select', val)
      }
    }
  },
  data () {
    return {
      currency: null
    }
  },
  methods: {
    itemText (c: ICurrency) {
      return c.code + ' ' + c.name
    }
  },
  mounted () {
    if (this.code) {
      // console.debug('we have a code: ', this.code)
      this.currency = this.currencies.find((f: ICurrency) => f.code === this.code)
    } else {
      this.currency = this.currencies[0]
    }
  }
})
</script>
