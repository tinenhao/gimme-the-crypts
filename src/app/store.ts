import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import trendingReducer from '../features/trendingSlice'
import coinReducer from '../features/coinSlice'
import coinMarketChartReducer from '../features/coinMarketChartSlice'
import globalReducer from '../features/globalSlice'
import gasPriceEstimationReducer from '../features/gasPriceEstimateSlice'
import gasPriceHistoryReducer from '../features/gasPriceHistorySlice'
import btchHashRateReducer from '../features/btcHashRateSlice'

export const store = configureStore({
  reducer: {
    trending: trendingReducer,
    coin: coinReducer,
    coinMarketChart: coinMarketChartReducer,
    global: globalReducer,
    gasPriceEstimation: gasPriceEstimationReducer,
    gasPriceHistory: gasPriceHistoryReducer,
    btcHashRate: btchHashRateReducer,
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
