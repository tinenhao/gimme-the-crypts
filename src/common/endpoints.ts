import { CoinSortOrder } from '../models/api/coin'
import {
  AvailableDayRanges,
  AvailableIntervals,
} from '../models/api/coinMarketChart'

const owlracle_API_key = '48f432cdbb73459dba8203365a8dc3cf'

const owlracle_API_secret_key = '9f24d18ece0a492db4fa214e0874f749'

export const coinGecko = {
  individualCoin: (id: string) =>
    `coins/${id}?localization=false&tickers=false`,
  coins: (
    sortingKey: CoinSortOrder,
    page: number,
    perPage: number,
    sparkline: boolean,
  ) =>
    `coins/markets?vs_currency=usd&order=${sortingKey}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=24h%2C7d%2C30d%2C1y`,
  coinMarketChart: (
    coinId: string,
    days: AvailableDayRanges,
    interval: AvailableIntervals,
  ) =>
    `coins/${coinId}/market_chart?vs_currency=usd&days=${days}&interval=${interval}`,
  trending: `search/trending`,
  global: `global`,
  supportedCoins: `coins/list`,
  exchange: (page: number) => `exchanges/?per_page=100&page=${page}`,
  exchangeVolume: (id: string, days: number) =>
    `exchanges/${id}/volume_chart?days=${days}`,
}

export const owlracle = {
  gasPriceEstimation: `/gas?accept=50%2C80%2C100&blocks=1000&apikey=${owlracle_API_key}`,
  gasPriceHistory: (startDate: number, endDate: number) =>
    `/history?apikey=48f432cdbb73459dba8203365a8dc3cf&from=${startDate}&to=${endDate}&candles=365&timeframe=1d`,
}

export const blockchainCom = {
  hashRate: `/charts/hash-rate?rollingAverage=1d&timespan=1year&sampled=true&cors=true`,
  bitcoinPrice: `/charts/market-price?rollingAverage=1d&timespan=1year&sampled=true&cors=true`,
  pools: `/pools?timespan=7days&cors=true`,
}

export const defiLlama = {
  protocolList: `protocols`,
  protocol: (id: string) => `protocol/${id}`,
  tvlChart: `charts`,
  chainList: `chains`,
}
