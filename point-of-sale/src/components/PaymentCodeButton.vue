<template>
    <v-btn x-large rounded
      :color="amount==='0' ? 'secondary' : 'primary'"
      :dark="!dark"
      :light="dark" class="text-none" @click="onClick">
        <v-icon>mdi-qrcode</v-icon>
        Generate Payment Code
      </v-btn>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  computed: {
    ...mapState(['dark']),
    ...mapState('polkadot', ['amount'])
  },
  methods: {
    onClick () {
      this.$emit('onClick')
    }
  }
})
</script>
