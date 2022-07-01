export type timeframe = 'day' | 'week' | 'month' | 'all'

export interface collections {
  baseCurrency: string
  buyers: number
  changeInValueUSD: number
  contractName: string
  iconUrl: string
  isSalesOnly: boolean
  isSlamLandDisabled: boolean
  owners: number
  platform: number
  previousValue: number
  previousValueUSD: number
  productPath: string
  rank: number
  sellers: number
  transactions: number
  value: number
  valueUSD: number
}

export interface sales {
  buyer: string
  buyerDisplay: string
  collectionImage: string
  collectionName: string
  id: string
  imageURI: string
  marketplaceAddress: string
  marketplaceIcon: string
  marketplaceName: string
  paymentToken: string
  price: number
  priceUSD: number
  rank: number
  seller: string
  sellerDisplay: string
  timeStamp: string
  tokens: []
  transactionHash: string
}
