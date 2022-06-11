// import { PublicKey } from '@solana/web3.js';
// import { Address } from '@polkadot/types/interfaces'
import { HexString } from '@polkadot/util/types'
import BigNumber from 'bignumber.js'

export enum CorrectionLevel {
  L, M, Q, H
}

export type Address = string | HexString | Uint8Array | null

export type Recipient = Address

export type Amount = BigNumber

export type SPLToken = Address

export type Reference = Address

export type Label = string

export type Message = string

export type Memo = string

export type Link = URL
