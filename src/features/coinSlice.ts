import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { Coin } from '../models/api/coin'
import { coinGecko as API } from '../common/endpoints'
import { API_CONFIG as config, http } from '../common/constants'
import { RootState } from '../app/store'

const initialState = {
  page: 1,
  dialog: false,
  sortID: 'market_cap',
  sortOrder: 'desc' as 'desc' | 'asc',
  value: [] as Coin[],
  show: [true, true, true, true, true, true, true, true, true, true, true],
  status: 'IDLE',
}

export const fetchCoins = createAsyncThunk(
  'coin',
  async (params, { getState }) => {
    const canceler = axios.CancelToken.source()
    const state = getState() as RootState

    const response = await http.request({
      ...config('coinGecko'),
      url: API.coins('market_cap_desc', state.coin.page, 250, true),
      cancelToken: canceler.token,
    })

    return response.data as Coin[]
  },
)

const coinSlice = createSlice({
  name: 'coin',
  initialState,
  reducers: {
    addPage(state) {
      state.page += 1
    },
    showSection(state, action) {
      state.show[action.payload] = !state.show[action.payload]
    },
    handleDialog(state) {
      state.dialog = !state.dialog
    },
    setSortID(state, action) {
      if (state.sortID === action.payload) {
        state.sortOrder = state.sortOrder === 'asc' ? 'desc' : 'asc'
      } else {
        state.sortID = action.payload
        state.sortOrder = 'desc'
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoins.pending, (state) => {
        state.status = 'LOADING'
      })
      .addCase(fetchCoins.fulfilled, (state, action) => {
        state.status = 'IDLE'
        state.value =
          state.page > 1 ? [...state.value, ...action.payload] : action.payload
      })
      .addCase(fetchCoins.rejected, (state) => {
        state.status = 'FAILED'
      })
  },
})

export const { addPage, showSection, handleDialog, setSortID } =
  coinSlice.actions
export default coinSlice.reducer
