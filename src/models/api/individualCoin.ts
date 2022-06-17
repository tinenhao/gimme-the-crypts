export interface platforms {
  [key: string]: string
}

export interface description {
  en: string
}

export interface repos_url {
  github: string[]
  bitbucket: string[]
}

export interface links {
  homepage: string[]
  blockchain_site: string[]
  official_forum_url: string[]
  chat_url: string[]
  announcement_url: string[]
  twitter_screen_name: string
  facebook_username: string
  bitcointalk_thread_identifier: string
  subreddit_url: string
  repos_url: repos_url
}

export interface image {
  thumb: string
  small: string
  large: string
}

export interface dataNumber {
  [key: string]: number
}

export interface dataDate {
  [key: string]: Date
}

export interface market_data {
  current_price: dataNumber
  total_value_locked: number
  mcap_to_tv1_ratio: number
  fdv_to_tvl_ratio: number
  roi: number
  ath: dataNumber
  ath_change_percentage: dataNumber
  ath_date: dataDate
  atl: dataNumber
  atl_change_percentage: dataNumber
  atl_date: dataDate
  market_cap: dataNumber
  market_cap_rank: number
  fully_diluted_valuation: dataNumber
  total_volume: dataNumber
  high_24h: dataNumber
  low_24h: dataNumber
  price_change_24h: number
  price_change_percentage_24h: number
  price_change_percentage_7d: number
  price_change_percentage_30d: number
  price_change_percentage_60d: number
  price_change_percentage_200d: number
  price_change_percentage_1y: number
  market_cap_change_24h: number
  market_cap_change_percentage_24h: number
  price_change_24h_in_currency: dataNumber
  price_change_percentage_1h_in_currency: dataNumber
  price_change_percentage_24h_in_currency: dataNumber
  price_change_percentage_7d_in_currency: dataNumber
  price_change_percentage_14d_in_currency: dataNumber
  price_change_percentage_30d_in_currency: dataNumber
  price_change_percentage_60d_in_currency: dataNumber
  price_change_percentage_200d_in_currency: dataNumber
  price_change_percentage_1y_in_currency: dataNumber
  market_cap_change_24h_in_currency: dataNumber
  market_cap_change_percentage_24h_in_currency: dataNumber
  total_supply: number
  max_supply: number
  circulating_supply: number
  last_updated: Date
}

export interface community_data {
  facebook_likes: number
  twitter_followers: number
  reddit_average_posts_48h: number
  reddit_average_comments_48h: number
  reddit_subscribers: number
  reddit_accounts_active_48h: number
  telegram_channel_user_count: number
}

export interface code_changes {
  additions: number
  deletions: number
}

export interface developer_data {
  forks: number
  stars: number
  subscribers: number
  total_issues: number
  closed_issues: number
  pull_requests_merged: number
  pull_request_contributors: number
  code_additions_deletions_4_weeks: code_changes
  commit_count_4_weeks: number
  last_4_weeks_commit_activity_series: number[]
}

export interface public_interests_stats {
  alexa_rank: number
  bing_matches: number
}

export interface IndividualCoin {
  id: string
  symbol: string
  name: string
  asset_platform_id: string
  platforms: platforms
  block_time_in_minutes: number
  hashing_algorithm: string
  categories: string[]
  public_notice: any
  additional_notices: any[]
  description: description
  links: links
  image: image
  country_origin: string
  genesis_date: Date
  contract_address: string
  sentiment_votes_up_percentage: number
  sentiment_votes_down_percentage: number
  market_cap_rank: number
  coingecko_rank: number
  coingecko_score: number
  developer_score: number
  community_score: number
  liquidity_score: number
  public_interest_score: number
  market_data: market_data
  community_data: community_data
  developer_data: developer_data
  public_interest_stats: public_interests_stats
  status_updates: any[]
  last_updated: Date
}
