import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { Coin } from '../models/api/coin'
import { coinGecko as API } from '../common/endpoints'
import { API_CONFIG as config, http } from '../common/constants'

const initialState = {
  value: [] as Coin[],
  status: 'IDLE',
}

export const fetchCoins = createAsyncThunk('coin', async () => {
  const canceler = axios.CancelToken.source()

  const response = await http.request({
    ...config('coinGecko'),
    url: API.coins('market_cap_desc', 1, 250, false),
    cancelToken: canceler.token,
  })

  return response.data as Coin[]
})

const coinSlice = createSlice({
  name: 'coin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoins.pending, (state) => {
        state.status = 'LOADING'
      })
      .addCase(fetchCoins.fulfilled, (state, action) => {
        state.status = 'IDLE'
        state.value = action.payload
      })
      .addCase(fetchCoins.rejected, (state) => {
        state.status = 'FAILED'
      })
  },
})

export default coinSlice.reducer
