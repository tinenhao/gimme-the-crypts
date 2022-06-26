export interface protocol {
  address: string
  audit_links: string[]
  audit_note: string
  audits: string
  category: string
  chain: string
  chainTvls: { [key: string]: number }
  chains: string[]
  change_1d: number
  change_1h: number
  change_7d: number
  cmcId: string
  description: string
  fdv: number
  gecko_id: string
  id: string
  logo: string
  mcap: number
  module: string
  name: string
  oracles: string[]
  slug: string
  symbol: string
  tvl: number
  twitter: string
  url: string
}

export interface data {
  date: number
  tokens: { [key: string]: number }
}

export interface chartData {
  date: number
  totalLiquidityUSD: number
}

export interface chainTvls {
  tvl: chartData[]
  tokensInUsd: data[]
  tokens: data[]
}

export interface protocolDetails {
  address: string
  audit_links: string[]
  audits: string
  category: string
  chain: string
  chainTvls: { [key: string]: chainTvls }
  chains: string[]
  cmcId: string
  currentChainTvls: { [key: string]: number }
  description: string
  gecko_id: string
  id: string
  logo: string
  methodology: string
  module: string
  name: string
  oracles: string[]
  symbol: string
  tokens: data[]
  tokensInUsd: data[]
  tvl: chartData[]
  twitter: string
  url: string
}

export interface chain {
  gecko_id: string
  tvl: number
  tokenSymbol: string
  cmcId: string
  name: string
  chainId: number
}
