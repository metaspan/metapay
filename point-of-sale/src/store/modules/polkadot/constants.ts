import { ICurrency } from '../../../types'

const currencies = [
  {
    code: 'WND',
    name: 'Westend',
    chain: 'substrate',
    // icon: '//yt3.ggpht.com/ytc/AKedOLQRz9zG3TydtrteUMvO8mfCvYu80CcfOwotpGgh=s68-c-k-c0x00ffffff-no-rj',
    // endpoint: 'wss://westend-rpc.polkadot.io', // 'wss://kusama-rpc.parity.io',
    endpoint: 'wss://pub.elara.patract.io/westend',
    decimals: 8,
    minimumTransaction: 0.00333
  },
  {
    code: 'KSM',
    name: 'Kusama',
    chain: 'substrate',
    icon: '//yt3.ggpht.com/ytc/AKedOLQRz9zG3TydtrteUMvO8mfCvYu80CcfOwotpGgh=s68-c-k-c0x00ffffff-no-rj',
    endpoint: 'wss://kusama-rpc.polkadot.io', // 'wss://kusama-rpc.parity.io',
    decimals: 8,
    minimumTransaction: 0.00333
  },
  {
    code: 'DOT',
    name: 'Polkadot',
    chain: 'substrate',
    endpoint: 'wss://rpc.polkadot.io', // 'wss://kusama-rpc.polkadot.io'
    decimals: 8,
    minimumTransaction: 0.00333
  },
  { code: 'GBP', name: 'British Pound', symbol: '£', endpoint: '', decimals: 2, minimumTransaction: 0.50 },
  { code: 'EUR', name: 'Euro', symbol: '€', endpoint: '', decimals: 2, minimumTransaction: 0.50 },
  { code: 'USD', name: 'US Dollar', symbol: '$', endpoint: '', decimals: 2, minimumTransaction: 0.50 }
] as ICurrency[]

export {
  currencies
}
