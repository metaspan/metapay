<template>
  <v-container class="keypad">
    <v-row>
      <v-col class="text-center">
        <!-- <CurrencyPicker></CurrencyPicker> -->
        <!-- <v-img v-if="currency.icon" :src="currency.icon" max-width="36px" max-height="36px"></v-img> -->
         {{currency.code}}
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-center" :class="amountTextClass">
        {{value}}
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-center" v-for="(i,idx) in [1,2,3]" v-bind:key="idx">
        <!-- <v-btn @click="onInput(i)" icon large fab class="mx-2 keypad-button">{{i}}</v-btn> -->
        <NumPadButton :value="i" @onInput="onInput"></NumPadButton>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-center" v-for="(i,idx) in [4,5,6]" v-bind:key="idx">
        <!-- <v-btn @click="onInput(i)" icon large fab class="mx-2 keypad-button">{{i}}</v-btn> -->
        <NumPadButton :value="i" @onInput="onInput"></NumPadButton>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-center" v-for="(i,idx) in [7,8,9]" v-bind:key="idx">
        <!-- <v-btn @click="onInput(i)" icon large fab class="mx-2 keypad-button">{{i}}</v-btn> -->
        <NumPadButton :value="i" @onInput="onInput"></NumPadButton>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-center">
        <!-- <v-btn @click="onInput('.')" :disabled="decimal" icon large fab class="mx-2 keypad-button">.</v-btn> -->
        <NumPadButton value="." @onInput="onInput"></NumPadButton>
      </v-col>
      <v-col class="text-center" v-for="(i,idx) in [0]" v-bind:key="idx">
        <!-- <v-btn @click="onInput(i)" icon large fab class="mx-2 keypad-button">{{i}}</v-btn> -->
        <NumPadButton :value="i" @onInput="onInput"></NumPadButton>
      </v-col>
      <v-col class="text-center">
        <!-- <v-btn @click="onInput('del')" icon large fab class="mx-2 keypad-button"><v-icon>mdi-backspace</v-icon></v-btn> -->
        <NumPadButton value="del" @onInput="onBackspace">
          <template v-slot:icon>
            <v-icon>mdi-backspace</v-icon>
          </template>
        </NumPadButton>
      </v-col>
    </v-row>

  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { Digits, ICurrency } from '../types'
// import CurrencyPicker from './CurrencyPicker.vue'
import NumPadButton from './NumPadButton.vue'
// import BigNumber from 'bignumber'

// interface NumPadInputButton {
//     input: Digits | '.'
//     // onInput(key: Digits | '.'): void;
//     onInput: string
// }

interface IData {
  value: string
}

interface IMethods {
  // onSelectCurrency(c: ICurrency): void
  regExp(decimals: number): RegExp
  setValue(key: Digits | '.'): void
  onBackspace(): void
  onInput(key: Digits | '.'): void
}

interface IComputed {
  currency: ICurrency
  amountTextClass: string
}

// eslint-disable-next-line
interface IProps {
}

export default Vue.extend<IData, IMethods, IComputed, IProps>({
  name: 'NumPad',
  props: {
    // currency: {
    //   type: Object as PropType<ICurrency>,
    //   default: { code: 'KSM', name: 'Kusama', decimals: 4 }
    // }
  },
  components: {
    // CurrencyPicker,
    NumPadButton
  },
  computed: {
    currency: {
      get () {
        return this.$store.state.polkadot.currency
      },
      set (value: ICurrency) {
        console.debug('NumPad.vue: computed.currency.set()', value)
        this.$store.dispatch('polkadot/setCurrency', value, { root: true })
      }
    },
    amountTextClass (): string {
      const len = this.value.length
      if (len < 10) {
        return 'text-h2'
      } else if (len < 15) {
        return 'text-h3'
      } else if (len < 20) {
        return 'text-h4'
      } else {
        return 'text-h5'
      }
    }
  },
  data (): IData {
    return {
      value: '0'
    }
  },
  watch: {
    value (val: string) {
      // console.debug('NumPad.vue: watch.value()', val)
      this.$emit('onAmount', val)
      this.$store.dispatch('polkadot/setAmount', val)
    }
  },
  methods: {
    regExp (decimals: number) {
      // console.debug('regExp()', decimals)
      return new RegExp('^\\d*([.,]\\d{0,' + decimals + '})?$')
    },
    setValue (key: Digits) {
      // console.debug('setValue()', key)
      let newValue = (this.value + key).trim().replace(/^0{2,}/, '0')
      // console.debug('newValue', newValue)
      if (newValue) {
        newValue = /^[.,]/.test(newValue) ? `0${newValue}` : newValue.replace(/^0+(\d)/, '$1')
        // console.debug('newValue', newValue, this.currency)
        const reVal = this.regExp(this.currency.decimals).test(newValue)
        // console.debug('reVal', reVal)
        if (reVal) this.value = newValue// return newValue
      }
      // return value;
    },
    onBackspace () {
      this.value = this.value.length ? this.value.slice(0, -1) || '0' : this.value
    },
    onInput (key: Digits | '.'): void {
      // console.debug(key)
      this.setValue(key)
    }
  }
})
</script>

<style scoped>
currency-icon {
  max-width: 18px;
  max-height: 18px;
}
.keypad {
  min-width: 350px;
  max-width: 450px;
}
</style>
