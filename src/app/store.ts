import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import trendingReducer from '../features/trendingSlice'
import coinReducer from '../features/coinSlice'

export const store = configureStore({
  reducer: {
    trending: trendingReducer,
    coin: coinReducer,
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
