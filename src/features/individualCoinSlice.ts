import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { IndividualCoin } from '../models/api/individualCoin'
import {
  CoinMarketChart,
  AvailableDayRanges,
} from '../models/api/coinMarketChart'
import { coinGecko as API } from '../common/endpoints'
import { API_CONFIG as config, http } from '../common/constants'

const initialState = {
  value: {} as IndividualCoin,
  marketChartValue: [] as CoinMarketChart[],
  selectedCoin: 'USD',
  timeframe: 0,
  data: 0,
  currencyDialog: false,
  coinFromValue: parseInt(''),
  coinToValue: parseInt(''),
  dialog: false,
  status: 'IDLE',
}

interface Param {
  id: string
}

export const fetchIndividualCoin = createAsyncThunk(
  'individualCoin',
  async (param: Param) => {
    const canceler = axios.CancelToken.source()

    const response = await http.request({
      ...config('coinGecko'),
      url: API.individualCoin(param.id),
      cancelToken: canceler.token,
    })

    return response.data as IndividualCoin
  },
)

export const fetchCoinMarketChart = createAsyncThunk(
  'individualCoinData',
  async (param: Param) => {
    const canceler = axios.CancelToken.source()
    const dayRange = [1, 7, 30, 90, 365, 730, 'max']
    const accResponse = [] as any

    for (let i = 0; i < 7; i++) {
      const response = await http.request({
        ...config('coinGecko'),
        url: API.coinMarketChart(
          param.id,
          dayRange[i] as AvailableDayRanges,
          dayRange[i] < 90 ? 'hourly' : 'daily',
        ),
        cancelToken: canceler.token,
      })

      accResponse[i] = response.data
    }
    return accResponse
  },
)

const IndividualCoinSlice = createSlice({
  name: 'individualCoin',
  initialState,
  reducers: {
    handleDialog(state) {
      state.dialog = !state.dialog
    },
    handleCurrencyDialog(state) {
      state.currencyDialog = !state.currencyDialog
    },
    setCurrency(state, action) {
      state.selectedCoin = action.payload
      state.coinFromValue = parseInt('')
      state.coinToValue = parseInt('')
    },
    setTimeframe(state, action) {
      state.timeframe = action.payload
    },
    setDataType(state, action) {
      state.data = action.payload
    },
    updateValue(state, action) {
      const multiplier = action.payload.exchange
      if (action.payload.type === 'From') {
        state.coinFromValue = parseFloat(action.payload.value)
        state.coinToValue = parseFloat(
          (state.coinFromValue * multiplier).toFixed(2),
        )
      } else if (action.payload.type === 'To') {
        state.coinToValue = parseFloat(action.payload.value)
        state.coinFromValue = parseFloat(
          (state.coinToValue * (1 / multiplier)).toFixed(5),
        )
      }
    },
    restart(state) {
      state.value = {} as IndividualCoin
      state.marketChartValue = [] as CoinMarketChart[]
      state.selectedCoin = 'USD'
      state.timeframe = 0
      state.data = 0
      state.coinFromValue = parseInt('')
      state.coinToValue = parseInt('')
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIndividualCoin.pending, (state) => {
        state.status = 'LOADING'
      })
      .addCase(fetchIndividualCoin.fulfilled, (state, action) => {
        state.status = 'IDLE'
        state.value = action.payload
      })
      .addCase(fetchIndividualCoin.rejected, (state) => {
        state.status = 'FAILED'
      })
      .addCase(fetchCoinMarketChart.pending, (state) => {
        state.status = 'LOADING'
      })
      .addCase(fetchCoinMarketChart.fulfilled, (state, action) => {
        state.status = 'IDLE'
        state.marketChartValue = action.payload
      })
      .addCase(fetchCoinMarketChart.rejected, (state) => {
        state.status = 'FAILED'
      })
  },
})

export const {
  handleDialog,
  handleCurrencyDialog,
  setCurrency,
  updateValue,
  setTimeframe,
  setDataType,
  restart,
} = IndividualCoinSlice.actions

export default IndividualCoinSlice.reducer
