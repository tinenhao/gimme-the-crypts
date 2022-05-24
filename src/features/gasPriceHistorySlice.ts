import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { gasPriceData } from '../models/api/gasPriceHistory'
import { owlracle as API } from '../common/endpoints'
import { API_CONFIG as config, http } from '../common/constants'

const initialState = {
  value: [] as gasPriceData[],
  status: 'IDLE',
}

interface Param {
  startDate: number
  endDate: number
}

export const fetchGasPriceHistory = createAsyncThunk(
  'gasPriceHistory',
  async (param: Param) => {
    const canceler = axios.CancelToken.source()

    const response = await http.request({
      ...config('owlracle'),
      url: API.gasPriceHistory(param.startDate, param.endDate),
      cancelToken: canceler.token,
    })

    return response.data as gasPriceData[]
  },
)

const gasPriceHistorySlice = createSlice({
  name: 'gasPriceHistory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGasPriceHistory.pending, (state) => {
        state.status = 'LOADING'
      })
      .addCase(fetchGasPriceHistory.fulfilled, (state, action) => {
        state.status = 'IDLE'
        state.value = action.payload
      })
      .addCase(fetchGasPriceHistory.rejected, (state) => {
        state.status = 'FAILED'
      })
  },
})

export default gasPriceHistorySlice.reducer
