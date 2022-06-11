export type Digits = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 0

export interface ICurrency {
  code: string
  symbol?: string
  icon?: string
  chain?: string
  endpoint: string
  name: string
  decimals: number
  minimumTransaction: number
}
  
export type IAmount = {
  pre: number
  post: number
}
