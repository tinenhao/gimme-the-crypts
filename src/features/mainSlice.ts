import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  infoDialog: true,
  warningDialog: false,
  darkMode: true,
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
    setDarkMode(state) {
      state.darkMode = true
    },
    setLightMode(state) {
      state.darkMode = false
    },
  },
})

export const { handleDialog, handleWarning, setDarkMode, setLightMode } =
  mainSlice.actions

export default mainSlice.reducer
