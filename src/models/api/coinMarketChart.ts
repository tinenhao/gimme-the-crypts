export type AvailableDayRanges = 1 | 7 | 30 | 90 | 365 | 730 | 'max'

export type AvailableIntervals = 'minutely' | 'hourly' | 'daily'

export type CoinMarketChartDataTypes =
  | 'total_volumes'
  | 'prices'
  | 'market_caps'

export interface CoinMarketChart {
  prices: [number, number][]
  market_caps: [number, number][]
  total_volumes: [number, number][]
}

export type CoinMarketChartList = {
  [key: string]: CoinMarketChart
}

export interface Dataformat {
  time: number
  price: number
}
