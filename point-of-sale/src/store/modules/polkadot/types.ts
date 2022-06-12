import { ICurrency } from '../../../types'
import { ApiPromise } from '@polkadot/api'

export interface PolkadotState {
    currencies: ICurrency[]
    currency: ICurrency
    amount: string
    wallet: string
    api: Promise<ApiPromise> | null
    genesisHash: string
}

export interface PolkadotWindow extends Window {
  $polkadot: any
//   name: string
//   salary: number
//   totalSalary: Function
//   display: Function
}
