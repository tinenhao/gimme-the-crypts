export interface gasPrice {
  open: number
  close: number
  low: number
  high: number
}

export interface gasPriceData {
  gasPrice: gasPrice
  avgGas: number
  timestamp: string
  samples: number
}
