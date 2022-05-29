import { createSlice } from '@reduxjs/toolkit'
import { Coin } from '../models/api/coin'

const initialState = {
  dialog: false,
  searchValue: '',
  currentCoin: '',
  coinFromValue: 0.0,
  coinToValue: 0.0,
  coinFrom: {} as Coin,
  coinTo: {} as Coin,
  status: 'IDLE',
}

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
      const tempCoin = state.coinFrom
      state.coinFrom = state.coinTo
      state.coinTo = tempCoin
      const multiplier =
        state.coinFrom.current_price / state.coinTo.current_price
      state.coinFromValue = state.coinToValue
      state.coinToValue = parseInt(
        (state.coinFromValue * (1 / multiplier)).toFixed(5),
      )
    },
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
