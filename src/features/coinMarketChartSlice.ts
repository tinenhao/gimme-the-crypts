import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { coinGecko as API } from '../common/endpoints'
import { API_CONFIG as config, http } from '../common/constants'
import {
  AvailableDayRanges,
  CoinMarketChartList,
} from '../models/api/coinMarketChart'

const initialState = {
  value1: {} as CoinMarketChartList,
  value7: {} as CoinMarketChartList,
  value30: {} as CoinMarketChartList,
  value90: {} as CoinMarketChartList,
  value365: {} as CoinMarketChartList,
  value730: {} as CoinMarketChartList,
  valueMax: {} as CoinMarketChartList,
  status: 'IDLE',
}

interface Param {
  coinId: string[]
  dayRange: AvailableDayRanges
}

export const fetchCoinMarketChartList = createAsyncThunk(
  'coinMarketChart',
  async (param: Param) => {
    const canceler = axios.CancelToken.source()
    const accResponse = {} as any

    for (let i = 0; i < param.coinId.length; i++) {
      const response = await http.request({
        ...config('coinGecko'),
        url: API.coinMarketChart(
          param.coinId[i],
          param.dayRange,
          param.dayRange < 90 ? 'hourly' : 'daily',
        ),
        cancelToken: canceler.token,
      })

      accResponse[param.coinId[i]] = response.data
    }

    return {
      dayRange: param.dayRange,
      data: accResponse,
    }
  },
)

const coinMarketChartListSlice = createSlice({
  name: 'coinMarketChartSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoinMarketChartList.pending, (state) => {
        state.status = 'LOADING'
      })
      .addCase(fetchCoinMarketChartList.fulfilled, (state, action) => {
        state.status = 'IDLE'
        switch (action.payload.dayRange) {
          case 1:
            state.value1 = action.payload.data
            break
          case 7:
            state.value7 = action.payload.data
            break
          case 30:
            state.value30 = action.payload.data
            break
          case 90:
            state.value90 = action.payload.data
            break
          case 365:
            state.value365 = action.payload.data
            break
          case 730:
            state.value730 = action.payload.data
            break
          case 'max':
            state.valueMax = action.payload.data
            break
        }
      })
      .addCase(fetchCoinMarketChartList.rejected, (state) => {
        state.status = 'FAILED'
      })
  },
})

export default coinMarketChartListSlice.reducer
