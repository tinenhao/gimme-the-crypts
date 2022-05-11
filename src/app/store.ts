import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import trendingReducer from '../features/trendingSlice'

export const store = configureStore({
  reducer: {
    trending: trendingReducer,
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
