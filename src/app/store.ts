import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import trendingReducer from '../features/trendingSlice'
import coinReducer from '../features/coinSlice'
import coinMarketChartReducer from '../features/coinMarketChartSlice'
import globalReducer from '../features/globalSlice'
import gasPriceEstimationReducer from '../features/gasPriceEstimateSlice'
import gasPriceHistoryReducer from '../features/gasPriceHistorySlice'
import btchHashRateReducer from '../features/btcHashRateSlice'
import supportedCoinsReducer from '../features/supportedCoinsSlice'
import currencyConverterReducer from '../features/currencyConverterSlice'
import correlationReducer from '../features/correlationSlice'
import individualCoinReducer from '../features/individualCoinSlice'
import exchangeReducer from '../features/exchangeSlice'
import defiProtocolReducer from '../features/defiProtocolSlice'
import nftReducer from '../features/nftSlice'

export const store = configureStore({
  reducer: {
    trending: trendingReducer,
    coin: coinReducer,
    coinMarketChart: coinMarketChartReducer,
    global: globalReducer,
    gasPriceEstimation: gasPriceEstimationReducer,
    gasPriceHistory: gasPriceHistoryReducer,
    btcHashRate: btchHashRateReducer,
    supportedCoins: supportedCoinsReducer,
    currencyConverter: currencyConverterReducer,
    correlation: correlationReducer,
    individualCoin: individualCoinReducer,
    exchange: exchangeReducer,
    defiProtocol: defiProtocolReducer,
    nft: nftReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
