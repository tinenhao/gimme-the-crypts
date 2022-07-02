import rateLimit from 'axios-rate-limit'
import axios, { AxiosRequestConfig } from 'axios'

export const http = rateLimit(axios.create(), {
  maxRequests: 2,
  perMilliseconds: 1750,
})

export const API_CONFIG: (
  server:
    | 'coinGecko'
    | 'owlracle'
    | 'blockchain.com'
    | 'defiLlama'
    | 'cryptoslam',
) => AxiosRequestConfig = (
  server:
    | 'coinGecko'
    | 'owlracle'
    | 'blockchain.com'
    | 'defiLlama'
    | 'cryptoslam',
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
    case 'blockchain.com':
      return {
        baseURL: 'https://api.blockchain.info',
        responseType: 'json',
        method: 'GET',
      }
    case 'defiLlama':
      return {
        baseURL: 'https://api.llama.fi',
        responseType: 'json',
        method: 'GET',
      }
    case 'cryptoslam':
      return {
        baseURL: 'https://api.cryptoslam.io/v1',
        responseType: 'json',
        method: 'GET',
      }
  }
}
