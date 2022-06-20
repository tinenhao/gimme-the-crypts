import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { Exchange } from '../models/api/exchange'
import { coinGecko as API } from '../common/endpoints'
import { API_CONFIG as config, http } from '../common/constants'
import { RootState } from '../app/store'

const initialState = {
  page: 1,
  displayExchange: 0,
  displayTimeframe: 0,
  exchangeList: [] as Exchange[],
  exchangeVolume: [[], [], [], [], []] as [number, string][][],
  exchangeStatus: 'IDLE',
  volumeStatus: 'IDLE',
}

interface Param {
  id: string
  day: number
}

export const fetchExchangeList = createAsyncThunk(
  'exchangeList',
  async (params, { getState }) => {
    const canceler = axios.CancelToken.source()
    const state = getState() as RootState

    const response = await http.request({
      ...config('coinGecko'),
      url: API.exchange(state.exchange.page),
      cancelToken: canceler.token,
    })

    return response.data
  },
)

export const fetchExchangeVolume = createAsyncThunk(
  'exchangeVolume',
  async (param: Param) => {
    const canceler = axios.CancelToken.source()
    const days = [1, 7, 30, 90, 365]

    const response = await http.request({
      ...config('coinGecko'),
      url: API.exchangeVolume(param.id, days[param.day]),
      cancelToken: canceler.token,
    })

    return { timeframe: param.day, data: response.data }
  },
)

const exchangeSlice = createSlice({
  name: 'exchange',
  initialState,
  reducers: {
    addPage(state) {
      state.page += 1
    },
    setDisplayExchange(state, action) {
      state.displayExchange = action.payload
      state.displayTimeframe = 0
      state.exchangeVolume = [[], [], [], [], []]
    },
    setDisplayTimeframe(state, action) {
      state.displayTimeframe = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExchangeList.pending, (state) => {
        state.exchangeStatus = 'LOADING'
      })
      .addCase(fetchExchangeList.fulfilled, (state, action) => {
        state.exchangeStatus = 'IDLE'
        state.exchangeList =
          state.page > 1
            ? [...state.exchangeList, ...action.payload]
            : action.payload
      })
      .addCase(fetchExchangeList.rejected, (state) => {
        state.exchangeStatus = 'FAILED'
      })
      .addCase(fetchExchangeVolume.pending, (state) => {
        state.volumeStatus = 'LOADING'
      })
      .addCase(fetchExchangeVolume.fulfilled, (state, action) => {
        state.volumeStatus = 'IDLE'
        state.exchangeVolume[action.payload.timeframe] = action.payload.data
      })
      .addCase(fetchExchangeVolume.rejected, (state) => {
        state.volumeStatus = 'FAILED'
      })
  },
})

export const { addPage, setDisplayExchange, setDisplayTimeframe } =
  exchangeSlice.actions

export default exchangeSlice.reducer
