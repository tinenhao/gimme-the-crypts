import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { coinGecko as API } from '../common/endpoints'
import { API_CONFIG as config, http } from '../common/constants'
import { globalData } from '../models/api/global'

const initialState = {
  value: {} as globalData,
  status: 'IDLE',
}

export const fetchGlobal = createAsyncThunk('global', async () => {
  const canceler = axios.CancelToken.source()

  const response = await http.request({
    ...config('coinGecko'),
    url: API.global,
    cancelToken: canceler.token,
  })

  return response.data.data as globalData
})

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGlobal.pending, (state) => {
        state.status = 'LOADING'
      })
      .addCase(fetchGlobal.fulfilled, (state, action) => {
        state.status = 'IDLE'
        state.value = action.payload
      })
      .addCase(fetchGlobal.rejected, (state) => {
        state.status = 'FAILED'
      })
  },
})

export default globalSlice.reducer
