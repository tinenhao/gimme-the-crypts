export interface TrendingCoin {
  id: string
  coin_id: number
  name: string
  symbol: string
  market_cap_rank: number
  thumb: string
  small: string
  large: string
  slug: string
  price_btc: number
  score: number
}

export interface TrendingCoinItem {
  item: TrendingCoin
}

export interface TrendingRootObject {
  coins: TrendingCoinItem[]
  exchange: unknown
}
