export interface totalMarketCap {
  [key: string]: number
}

export interface totalVolume {
  [key: string]: number
}

export interface marketCapPercentage {
  [key: string]: number
}

export interface globalData {
  active_cryptocurrencies: number
  upcoming_icos: number
  ongoing_icos: number
  ended_icos: number
  markets: number
  total_market_cap: totalMarketCap
  total_volume: totalVolume
  market_cap_percentage: marketCapPercentage
  market_cap_change_percentage_24h_usd: number
  updated_at: number
}

export interface globalRootData {
  data: globalData
}
