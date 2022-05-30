import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { coinGecko as API } from '../common/endpoints'
import { API_CONFIG as config, http } from '../common/constants'
import { Coin } from '../models/api/coin'
import { Dataformat } from '../models/api/coinMarketChart'
import { AvailableDayRanges } from '../models/api/coinMarketChart'

const initialState = {
  dialog: false,
  searchValue: '',
  currentCoin: '',
  coinFromValue: parseInt(''),
  coinToValue: parseInt(''),
  coinFrom: {} as Coin,
  coinTo: {} as Coin,
  value: [] as Dataformat[][],
  status: 'IDLE',
}

interface Params {
  coinFrom: Coin
  coinTo: Coin
}

export const fetchMarketData = createAsyncThunk(
  'currencyConverter',
  async (params: Params) => {
    const canceler = axios.CancelToken.source()
    const accResponse = []
    const dayRange = [1, 7, 30, 90, 365]

    for (let i = 0; i < 5; i++) {
      const coinFromResponse = await http.request({
        ...config('coinGecko'),
        url: API.coinMarketChart(
          params.coinFrom.id,
          dayRange[i] as AvailableDayRanges,
          dayRange[i] < 30 ? 'hourly' : 'daily',
        ),
        cancelToken: canceler.token,
      })

      const coinToResponse = await http.request({
        ...config('coinGecko'),
        url: API.coinMarketChart(
          params.coinTo.id,
          dayRange[i] as AvailableDayRanges,
          dayRange[i] < 30 ? 'hourly' : 'daily',
        ),
        cancelToken: canceler.token,
      })

      const coinFromPrices = coinFromResponse.data.prices
      const coinToPrices = coinToResponse.data.prices
      const arr =
        coinFromPrices.length < coinToPrices.length
          ? coinFromPrices
          : coinToPrices
      const prices = arr.map((element: [number, number], index: number) => {
        return {
          time: element[0],
          price: coinFromPrices[index][1] / coinToPrices[index][1],
        }
      })
      accResponse[i] = prices
    }
    return accResponse
  },
)

const currencyConverterSlice = createSlice({
  name: 'currencyConverter',
  initialState,
  reducers: {
    handleDialog(state, action) {
      state.dialog = !state.dialog
      state.currentCoin = action.payload
      state.searchValue = ''
    },
    updateSearchValue(state, action) {
      state.searchValue = action.payload
    },
    updateCoin(state, action) {
      if (state.currentCoin === 'From') {
        state.coinFrom = action.payload
      } else if (state.currentCoin === 'To') {
        state.coinTo = action.payload
      }
      state.value = []
    },
    updateValue(state, action) {
      const multiplier =
        state.coinFrom.current_price / state.coinTo.current_price
      if (action.payload.type === 'From') {
        state.coinFromValue = parseFloat(action.payload.value)
        state.coinToValue = parseFloat(
          (state.coinFromValue * multiplier).toFixed(5),
        )
      } else if (action.payload.type === 'To') {
        state.coinToValue = parseFloat(action.payload.value)
        state.coinFromValue = parseFloat(
          (state.coinToValue * (1 / multiplier)).toFixed(5),
        )
      }
    },
    swap(state) {
      //swap coin
      const tempCoin = state.coinFrom
      state.coinFrom = state.coinTo
      state.coinTo = tempCoin
      //swap value
      const multiplier =
        state.coinFrom.current_price / state.coinTo.current_price
      state.coinFromValue = state.coinToValue
      state.coinToValue = parseInt(
        (state.coinFromValue * (1 / multiplier)).toFixed(5),
      )
      //swap prices
      for (let i = 0; i < state.value.length; i++) {
        for (let j = 0; j < state.value[i].length; j++) {
          state.value[i][j].price = 1 / state.value[i][j].price
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMarketData.pending, (state) => {
        state.status = 'LOADING'
      })
      .addCase(fetchMarketData.fulfilled, (state, action) => {
        state.status = 'IDLE'
        state.value = action.payload
      })
      .addCase(fetchMarketData.rejected, (state, action) => {
        state.status = 'FAILED'
        console.log(action.error.message)
      })
  },
})

export const {
  handleDialog,
  updateSearchValue,
  updateCoin,
  updateValue,
  swap,
} = currencyConverterSlice.actions

export default currencyConverterSlice.reducer
