<template>
  <v-container fluid fill-height>
    <v-row>

      <v-col class="col-12 col-md-8 numpadx">
        <NumPad></NumPad>
      </v-col>

      <v-col class="col-12 col-md-4 text-center" fill-height>
        <div class="d-none d-md-block"><br><br><br></div>
        <div class="d-none d-md-block text-h4">Balance Due</div>
        <div class="d-none d-md-block"><br><br><br></div>
        <div class="d-none d-md-block text-h5">
          <v-label>Total</v-label>
          {{amount}} {{currency.code}}
        </div>
        <div class="d-none d-md-block"><br><br><br></div>
        <PaymentCodeButton @onClick="onGenerate()"></PaymentCodeButton>
        <!-- <v-btn @click="showScanner = true">Scan</v-btn> -->
      </v-col>
    </v-row>

    <v-dialog v-model="showDialog" fullscreen>
      <QRCode class="qrcode" @onClose="showDialog=false"></QRCode>
    </v-dialog>

    <v-snackbar
      v-model="snackbar"
      color="red accent-2"
      :timeout="3000"
    >
      <span v-html="message"></span>
      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import PaymentCodeButton from './PaymentCodeButton.vue'
import NumPad from './NumPad.vue'
import QRCode from './QRCode.vue'
import { ICurrency } from '../types'

interface IData {
  message: string
  showDialog: boolean
  snackbar: boolean
}

// eslint-disable-next-line
interface IMethods {}

// eslint-disable-next-line
interface IComputed {
  amount: string
  wallet: string
  canScan: boolean
  currency: ICurrency
}

// eslint-disable-next-line
interface IProps {}

export default Vue.extend<IData, IMethods, IComputed, IProps>({
  name: 'Home',
  components: {
    NumPad,
    PaymentCodeButton,
    QRCode
    // Scanner
  },
  computed: {
    ...mapState('polkadot', ['amount', 'wallet', 'currency']),
    canScan () {
      return (Number(this.amount) > 0 && this.wallet !== '')
    }
  },
  data: () => ({
    showDialog: false,
    snackbar: false,
    message: 'Check config'
  }),
  methods: {
    onGenerate () {
      if (this.canScan) {
        this.showDialog = true
      } else {
        let msg = ''
        if (!(this.amount > '0')) msg += 'Amount is zero'
        if (this.wallet === '') msg += '<br>Wallet is empty!'
        this.message = msg
        this.snackbar = true
      }
    }
    // onAmount (evt: any) {
    //   console.debug('onAmount', evt)
    // }
  }
})
</script>

<style scoped>
.numpad {
  background-color: #eef5f6;
}
.qrcode {
  max-width: 300px;
  max-height: 300px;
}
</style>
