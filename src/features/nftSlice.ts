import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { cryptoSlam as API } from '../common/endpoints'
import { API_CONFIG as config, http } from '../common/constants'
import { timeframe } from '../models/api/nft'
import { RootState } from '../app/store'
import { collections, sales } from '../models/api/nft'

const initialState = {
  sales: [[], [], [], []] as sales[][],
  collections: [[], [], [], []] as collections[][],
  sale: {} as sales,
  collection: {} as collections,
  timeframeCollection: 0,
  timeframeSales: 0,
  type: 0,
  dialog: false,
  statusCollections: 'IDLE',
  statusSales: 'IDLE',
}

export const fetchCollections = createAsyncThunk(
  'collection',
  async (param, { getState }) => {
    const canceler = axios.CancelToken.source()
    const state = getState() as RootState
    const timeframe = ['day', 'week', 'month', 'all'] as timeframe[]

    const response = await http.request({
      ...config('cryptoslam'),
      url: API.collection(timeframe[state.nft.timeframeCollection]),
      cancelToken: canceler.token,
    })
    return response.data as collections[]
  },
)

export const fetchSales = createAsyncThunk(
  'sales',
  async (param, { getState }) => {
    const canceler = axios.CancelToken.source()
    const state = getState() as RootState
    const timeframe = ['day', 'week', 'month', 'all'] as timeframe[]

    const response = await http.request({
      ...config('cryptoslam'),
      url: API.sales(timeframe[state.nft.timeframeSales]),
      cancelToken: canceler.token,
    })
    return response.data as sales[]
  },
)

const nftSlice = createSlice({
  name: 'nft',
  initialState,
  reducers: {
    setTimeframeCollection(state, action) {
      state.timeframeCollection = action.payload
    },
    setTimeframeSales(state, action) {
      state.timeframeSales = action.payload
    },
    setType(state, action) {
      state.type = action.payload
    },
    setCollection(state, action) {
      state.collection = action.payload
    },
    setSale(state, action) {
      state.sale = action.payload
    },
    handleDialog(state) {
      state.dialog = !state.dialog
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCollections.pending, (state) => {
        state.statusCollections = 'LOADING'
      })
      .addCase(fetchCollections.fulfilled, (state, action) => {
        state.statusCollections = 'IDLE'
        state.collections[state.timeframeCollection] = action.payload
      })
      .addCase(fetchCollections.rejected, (state) => {
        state.statusCollections = 'FAILED'
      })
      .addCase(fetchSales.pending, (state) => {
        state.statusSales = 'LOADING'
      })
      .addCase(fetchSales.fulfilled, (state, action) => {
        state.statusCollections = 'IDLE'
        state.sales[state.timeframeSales] = action.payload
      })
      .addCase(fetchSales.rejected, (state) => {
        state.statusSales = 'FAILED'
      })
  },
})

export const {
  setTimeframeCollection,
  setTimeframeSales,
  setType,
  setCollection,
  setSale,
  handleDialog,
} = nftSlice.actions

export default nftSlice.reducer
