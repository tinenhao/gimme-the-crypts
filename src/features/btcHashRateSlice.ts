import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { blockchainCom as API } from '../common/endpoints'
import { API_CONFIG as config, http } from '../common/constants'
import { rootModule, pools } from '../models/api/btcHashRate'

const initialState = {
  value: {
    hashRate: {} as rootModule,
    btcPrice: {} as rootModule,
    pools: {} as pools,
  },
  status: 'IDLE',
}

export const fetchBTCHashRateAndPrice = createAsyncThunk(
  'btcHashRate',
  async () => {
    const canceler = axios.CancelToken.source()

    const hashRate = await http.request({
      ...config('blockchain.com'),
      url: API.hashRate,
      cancelToken: canceler.token,
    })

    const btcPrice = await http.request({
      ...config('blockchain.com'),
      url: API.bitcoinPrice,
      cancelToken: canceler.token,
    })

    const pools = await http.request({
      ...config('blockchain.com'),
      url: API.pools,
      cancelToken: canceler.token,
    })

    return {
      hashRate: hashRate.data,
      btcPrice: btcPrice.data,
      pools: pools.data,
    }
  },
)

const btcHashRateSlice = createSlice({
  name: 'btcHashRate',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBTCHashRateAndPrice.pending, (state) => {
        state.status = 'LOADING'
      })
      .addCase(fetchBTCHashRateAndPrice.fulfilled, (state, action) => {
        state.status = 'IDLE'
        state.value = action.payload
      })
      .addCase(fetchBTCHashRateAndPrice.rejected, (state) => {
        state.status = 'FAILED'
      })
  },
})

export default btcHashRateSlice.reducer
