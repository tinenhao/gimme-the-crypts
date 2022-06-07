import rateLimit from 'axios-rate-limit'
import axios, { AxiosRequestConfig } from 'axios'

export const http = rateLimit(axios.create(), {
  maxRequests: 4,
  perMilliseconds: 1000,
})

export const API_CONFIG: (
  server: 'coinGecko' | 'owlracle' | 'alternative.me' | 'blockchain.com',
) => AxiosRequestConfig = (
  server: 'coinGecko' | 'owlracle' | 'alternative.me' | 'blockchain.com',
) => {
  switch (server) {
    case 'coinGecko':
      return {
        baseURL: 'https://api.coingecko.com/api/v3',
        responseType: 'json',
        method: 'GET',
      }
    case 'owlracle':
      return {
        baseURL: 'https://owlracle.info/eth',
        responseType: 'json',
        method: 'GET',
      }
    case 'alternative.me':
      return {
        baseURL: ' https://api.alternative.me',
        responseType: 'json',
        method: 'GET',
      }
    case 'blockchain.com':
      return {
        baseURL: 'https://api.blockchain.info',
        responseType: 'json',
        method: 'GET',
      }
  }
}
