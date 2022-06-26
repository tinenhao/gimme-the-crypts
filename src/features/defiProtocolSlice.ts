import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { defiLlama as API } from '../common/endpoints'
import { API_CONFIG as config, http } from '../common/constants'
import { chartData, protocol, protocolDetails, chain } from '../models/api/defi'

const initialState = {
  protocolList: [] as protocol[],
  chainList: [] as chain[],
  protocol: {} as protocolDetails,
  TVLChart: [] as chartData[],
  sortKey: 'tvl',
  sortOrder: 'desc' as 'asc' | 'desc',
  statusProtocolList: 'IDLE',
  statusChainList: 'IDLE',
  statusProtocol: 'IDLE',
  statusTVLChart: 'IDLE',
}

interface Param {
  id: string
}

export const fetchProtocolList = createAsyncThunk('protocolList', async () => {
  const canceler = axios.CancelToken.source()

  const response = await http.request({
    ...config('defiLlama'),
    url: API.protocolList,
    cancelToken: canceler.token,
  })
  return response.data
})

export const fetchChainList = createAsyncThunk('chainList', async () => {
  const canceler = axios.CancelToken.source()

  const response = await http.request({
    ...config('defiLlama'),
    url: API.chainList,
    cancelToken: canceler.token,
  })
  return response.data
})

export const fetchProtocolDetails = createAsyncThunk(
  'protocolDetails',
  async (param: Param) => {
    const canceler = axios.CancelToken.source()

    const response = await http.request({
      ...config('defiLlama'),
      url: API.protocol(param.id),
      cancelToken: canceler.token,
    })
    return response.data
  },
)

export const fetchTVLData = createAsyncThunk('tvl', async () => {
  const canceler = axios.CancelToken.source()

  const response = await http.request({
    ...config('defiLlama'),
    url: API.tvlChart,
    cancelToken: canceler.token,
  })
  return response.data
})

const protocolSlice = createSlice({
  name: 'defi',
  initialState,
  reducers: {
    setSortKey(state, action) {
      if (state.sortKey === action.payload) {
        state.sortOrder = state.sortOrder === 'asc' ? 'desc' : 'asc'
      } else {
        state.sortKey = action.payload
        state.sortOrder = 'desc'
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProtocolList.pending, (state) => {
        state.statusProtocolList = 'LOADING'
      })
      .addCase(fetchProtocolList.fulfilled, (state, action) => {
        state.statusProtocolList = 'IDLE'
        state.protocolList = action.payload
      })
      .addCase(fetchProtocolList.rejected, (state) => {
        state.statusProtocolList = 'FAILED'
      })
      .addCase(fetchChainList.pending, (state) => {
        state.statusChainList = 'LOADING'
      })
      .addCase(fetchChainList.fulfilled, (state, action) => {
        state.statusChainList = 'IDLE'
        state.chainList = action.payload
      })
      .addCase(fetchChainList.rejected, (state) => {
        state.statusChainList = 'FAILED'
      })
      .addCase(fetchProtocolDetails.pending, (state) => {
        state.statusProtocol = 'LOADING'
      })
      .addCase(fetchProtocolDetails.fulfilled, (state, action) => {
        state.statusProtocol = 'IDLE'
        state.protocolList = action.payload
      })
      .addCase(fetchProtocolDetails.rejected, (state) => {
        state.statusProtocol = 'FAILED'
      })
      .addCase(fetchTVLData.pending, (state) => {
        state.statusTVLChart = 'LOADING'
      })
      .addCase(fetchTVLData.fulfilled, (state, action) => {
        state.statusTVLChart = 'IDLE'
        state.TVLChart = action.payload
      })
      .addCase(fetchTVLData.rejected, (state) => {
        state.statusTVLChart = 'FAILED'
      })
  },
})

export const { setSortKey } = protocolSlice.actions

export default protocolSlice.reducer
