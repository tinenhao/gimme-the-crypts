export interface speedData {
  acceptance: number
  gasPrice: number
  estimatedFee: number
}

export interface gasPriceEstimation {
  timestamp: string
  lastBlock: number
  avgTime: number
  avgTx: number
  avgGas: number
  speeds: speedData[]
  baseFee: number
}
