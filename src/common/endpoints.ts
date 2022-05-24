import { CoinSortOrder } from '../models/api/coin'
import {
  AvailableDayRanges,
  AvailableIntervals,
} from '../models/api/coinMarketChart'

const owlracle_API_key = '48f432cdbb73459dba8203365a8dc3cf'

const owlracle_API_secret_key = '9f24d18ece0a492db4fa214e0874f749'

export const coinGecko = {
  coins: (
    sortingKey: CoinSortOrder,
    page: number,
    perPage: number,
    sparkline: boolean,
  ) =>
    `coins/markets?vs_currency=usd&order=${sortingKey}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=7d`,
  coinMarketChart: (
    coinId: string,
    days: AvailableDayRanges,
    interval: AvailableIntervals,
  ) =>
    `coins/${coinId}/market_chart?vs_currency=usd&days=${days}&interval=${interval}`,
  trending: `search/trending`,
  global: `global`,
}

export const owlracle = {
  gasPriceEstimation: `/gas?accept=50%2C80%2C100&blocks=1000&apikey=${owlracle_API_key}`,
}
