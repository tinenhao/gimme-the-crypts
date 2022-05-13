import { CoinSortOrder } from '../models/api/coin'
import {
  AvailableDayRanges,
  AvailableIntervals,
} from '../models/api/coinMarketChart'

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
}
