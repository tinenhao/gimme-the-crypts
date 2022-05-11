import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import {
  TrendingCoin,
  TrendingCoinItem,
  TrendingRootObject,
} from '../models/api/trending'
import { coinGecko as API } from '../common/endpoints'
import { API_CONFIG as config, http } from '../common/constants'

const initialState = {
  value: [] as TrendingCoin[],
  status: 'IDLE',
}

export const fetchTrendingCoins = createAsyncThunk('trending', async () => {
  const canceler = axios.CancelToken.source()

  const response = await http.request({
    ...config('coinGecko'),
    url: API.trending,
    cancelToken: canceler.token,
  })

  const returnValue = response.data as TrendingRootObject

  return returnValue.coins.map(
    (element: TrendingCoinItem) => element.item,
  ) as TrendingCoin[]
})

const trendingSlice = createSlice({
  name: 'trending',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrendingCoins.pending, (state) => {
        state.status = 'LOADING'
      })
      .addCase(fetchTrendingCoins.fulfilled, (state, action) => {
        state.status = 'IDLE'
        state.value = action.payload
      })
      .addCase(fetchTrendingCoins.rejected, (state) => {
        state.status = 'FAILED'
      })
  },
})

export default trendingSlice.reducer
