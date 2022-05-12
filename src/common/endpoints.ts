import { CoinSortOrder } from '../models/api/coin'

export const coinGecko = {
  coins: (
    sortingKey: CoinSortOrder,
    page: number,
    perPage: number,
    sparkline: boolean,
  ) =>
    `coins/markets?vs_currency=usd&order=${sortingKey}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=7d`,
  trending: `search/trending`,
}
