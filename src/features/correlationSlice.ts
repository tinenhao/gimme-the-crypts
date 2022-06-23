import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { coinGecko as API } from '../common/endpoints'
import { API_CONFIG as config, http } from '../common/constants'
import {
  AvailableDayRanges,
  CoinMarketChart,
} from '../models/api/coinMarketChart'

const initialState = {
  timeframe: 0,
  coinSelected: 'Bitcoin',
  coinsNum: 10,
  heatmap: true,
  correlationValues: [] as number[][][],
  progress: [0, 0, 0, 0, 0],
  value: [] as number[][][],
  status: 'IDLE',
}

interface Params {
  timeframe: number
  coinId: string[]
}

export const fetchTop50Prices = createAsyncThunk(
  'correlation',
  async (params: Params) => {
    const canceler = axios.CancelToken.source()
    const accResponse = [] as CoinMarketChart[]
    const dayRange = [1, 7, 30, 90, 365]

    for (let i = 0; i < 50; i++) {
      const response = await http.request({
        ...config('coinGecko'),
        url: API.coinMarketChart(
          params.coinId[i],
          dayRange[params.timeframe] as AvailableDayRanges,
          dayRange[params.timeframe] < 30 ? 'hourly' : 'daily',
        ),
        cancelToken: canceler.token,
      })

      console.log('fetched ' + i + ' times ' + params.timeframe)
      accResponse.push(response.data as CoinMarketChart)
    }

    const prices = accResponse.map((element) =>
      element.prices.map((data) => data[1]),
    )
    return { timeframe: params.timeframe, prices: prices }
  },
)

const correlationSlice = createSlice({
  name: 'correlation',
  initialState,
  reducers: {
    setTimeframe(state, action) {
      state.timeframe = action.payload
    },
    updateCorrelationValues(state, action) {
      state.correlationValues[action.payload.timeframe] = action.payload.arr
    },
    setCoinsNum(state, action) {
      state.coinsNum = action.payload
    },
    incrementCoinsNum(state) {
      if (state.coinsNum <= 49) {
        state.coinsNum += 1
      }
    },
    decrementCoinsNum(state) {
      if (state.coinsNum >= 2) {
        state.coinsNum -= 1
      }
    },
    incrementProgress(state) {
      if (state.progress[state.timeframe] < 100) {
        state.progress[state.timeframe] += 1
      }
    },
    changeState(state) {
      state.heatmap = !state.heatmap
    },
    setCoin(state, action) {
      state.coinSelected = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTop50Prices.pending, (state) => {
        state.status = 'LOADING'
      })
      .addCase(fetchTop50Prices.fulfilled, (state, action) => {
        state.status = 'IDLE'
        if (state.value[action.payload.timeframe] === undefined) {
          state.value[action.payload.timeframe] = []
        }
        state.value[action.payload.timeframe] = action.payload.prices
      })
      .addCase(fetchTop50Prices.rejected, (state, action) => {
        state.status = 'FAILED'
        console.log(action.error.message)
      })
  },
})

export const {
  setTimeframe,
  updateCorrelationValues,
  setCoinsNum,
  incrementCoinsNum,
  decrementCoinsNum,
  incrementProgress,
  changeState,
  setCoin,
} = correlationSlice.actions

export default correlationSlice.reducer
