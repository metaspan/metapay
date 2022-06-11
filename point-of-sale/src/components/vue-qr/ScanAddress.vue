<template>
  <Scan
    :className="className"
    :onError="_onError"
    :onScan="_onScan"
    :size="size"
    :css="css"
    :delay="delay"
  ></Scan>
</template>

<script lang="ts">
import Vue from 'vue'
import { assert } from '@polkadot/util'
import { decodeAddress } from '@polkadot/util-crypto'

import { ADDRESS_PREFIX, SEED_PREFIX } from './constants'
import Scan from './Scan.vue'

interface ScanType {
  isAddress: boolean;
  content: string;
  genesisHash: string;
  name?: string;
}

// eslint-disable-next-line
interface IData {}

interface IMethods {
  _onScan(scan: string): void
  _onError(error: Error): void
}

// eslint-disable-next-line
interface IComputed {}

interface IProps {
  className?: string
  isEthereum?: boolean
  onError?: (error: Error) => void
  onScan: (scanned: ScanType) => void
  size?: string | number
  css?: string // React.CSSProperties;
  delay?: number
}

export default Vue.extend<IData, IMethods, IComputed, IProps>({
  name: 'ScanAddress',
  components: {
    Scan
  },
  props: {
    className: { type: undefined },
    isEthereum: { type: undefined },
    onError: { type: undefined },
    onScan: { type: undefined },
    size: { type: undefined },
    css: { type: undefined },
    delay: { type: Number, default: 1000 }
  },
  methods: {
    _onScan (data: string) {
      try {
        let prefix: string, content: string, genesisHash: string, name: string[]
        if (!this.isEthereum) {
          [prefix, content, genesisHash, ...name] = data.split(':')
        } else {
          [prefix, content, ...name] = data.split(':')
          genesisHash = ''
          content = content.substring(0, 42)
        }
        const expectedPrefix = (this.isEthereum ? 'ethereum' : ADDRESS_PREFIX)
        const isValidPrefix = (prefix === expectedPrefix) || (prefix === SEED_PREFIX)
        assert(isValidPrefix, `Invalid prefix received, expected '${expectedPrefix} or ${SEED_PREFIX}' , found '${prefix}'`)
        const isAddress = prefix === expectedPrefix
        if (isAddress && !this.isEthereum) {
          decodeAddress(content)
        }
        this.onScan({ content, genesisHash, isAddress, name: name?.length ? name.join(':') : undefined })
      } catch (error) {
        this.onError && this.onError(error as Error)
        console.error('@metaspan/metapay/vue-qr:ScanAddress', (error as Error).message, `|${data}|`)
      }
    },
    _onError (error: Error) {
      if (this.onError) {
        this.onError(error)
      } else {
        console.error(error)
      }
    }
  }
})
</script>
