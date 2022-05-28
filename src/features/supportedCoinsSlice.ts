import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { SupportedCoin } from '../models/api/supportedCoins'
import { coinGecko as API } from '../common/endpoints'
import { API_CONFIG as config, http } from '../common/constants'

const initialState = {
  value: [] as SupportedCoin[],
  status: 'IDLE',
}

export const fetchSupportedCoins = createAsyncThunk(
  'supportedCoin',
  async () => {
    const canceler = axios.CancelToken.source()

    const response = await http.request({
      ...config('coinGecko'),
      url: API.supportedCoins,
      cancelToken: canceler.token,
    })

    return response.data
  },
)

const supportedCoinsSlice = createSlice({
  name: 'supportedCoin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSupportedCoins.pending, (state) => {
        state.status = 'LOADING'
      })
      .addCase(fetchSupportedCoins.fulfilled, (state, action) => {
        state.status = 'IDLE'
        state.value = action.payload
      })
      .addCase(fetchSupportedCoins.rejected, (state) => {
        state.status = 'FAILED'
      })
  },
})

export default supportedCoinsSlice.reducer
