import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { coinGecko as API } from '../common/endpoints'
import { API_CONFIG as config, http } from '../common/constants'
import {
  AvailableDayRanges,
  CoinMarketChartList,
} from '../models/api/coinMarketChart'
import { RootState } from '../app/store'

const initialState = {
  value: {
    1: {},
    7: {},
    30: {},
    90: {},
    365: {},
    730: {},
    max: {},
  },
  selectedDayRange: 1,
  selectedDataType: 'prices',
  status: 'IDLE',
}

interface Param {
  coinId: string[]
  dayRange: AvailableDayRanges
}

export const fetchCoinMarketChartList = createAsyncThunk(
  'coinMarketChart',
  async (param: Param, { getState }) => {
    const canceler = axios.CancelToken.source()
    const state = getState() as RootState
    const accResponse = {} as any

    for (let i = 0; i < param.coinId.length; i++) {
      const response = await http.request({
        ...config('coinGecko'),
        url: API.coinMarketChart(
          param.coinId[i],
          param.dayRange,
          param.dayRange < 30 ? 'hourly' : 'daily',
        ),
        cancelToken: canceler.token,
      })

      accResponse[param.coinId[i]] = response.data
    }

    return {
      ...state.coinMarketChart.value,
      [param.dayRange]: accResponse,
    } as CoinMarketChartList
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
        state.value = action.payload
      })
      .addCase(fetchCoinMarketChartList.rejected, (state) => {
        state.status = 'FAILED'
      })
  },
})

export default coinMarketChartListSlice.reducer
