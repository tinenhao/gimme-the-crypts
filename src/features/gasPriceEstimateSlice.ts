import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { gasPriceEstimation } from '../models/api/gasPriceEstimation'
import { owlracle as API } from '../common/endpoints'
import { API_CONFIG as config, http } from '../common/constants'

const initialState = {
  value: {} as gasPriceEstimation,
  status: 'IDLE',
}

export const fetchGasPrice = createAsyncThunk(
  'gasPriceEstimation',
  async () => {
    const canceler = axios.CancelToken.source()

    const response = await http.request({
      ...config('owlracle'),
      url: API.gasPriceEstimation,
      cancelToken: canceler.token,
    })

    return response.data as gasPriceEstimation
  },
)

const gasPriceEstimationSlice = createSlice({
  name: 'gasPriceEstimation',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGasPrice.pending, (state) => {
        state.status = 'LOADING'
      })
      .addCase(fetchGasPrice.fulfilled, (state, action) => {
        state.status = 'IDLE'
        state.value = action.payload
      })
      .addCase(fetchGasPrice.rejected, (state) => {
        state.status = 'FAILED'
      })
  },
})

export default gasPriceEstimationSlice.reducer
