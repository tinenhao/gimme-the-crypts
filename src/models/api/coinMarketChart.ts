export type AvailableDayRanges = 1 | 7 | 30 | 90 | 365 | 730 | 'max'

export type AvailableIntervals = 'minutely' | 'hourly' | 'daily'

export interface CoinMarketChart {
  prices: [number, number][]
  market_caps: [number, number][]
  total_volume: [number, number][]
}

export type CoinMarketChartList = {
  [key in AvailableDayRanges]: {
    [key: string]: CoinMarketChart
  }
}
