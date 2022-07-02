import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  infoDialog: false,
  warningDialog: false,
}

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    handleDialog(state) {
      state.infoDialog = !state.infoDialog
    },
    handleWarning(state) {
      state.warningDialog = !state.warningDialog
    },
  },
})

export const { handleDialog, handleWarning } = mainSlice.actions

export default mainSlice.reducer
