import React from 'react'
import {
  createTheme,
  CssBaseline,
  Theme,
  ThemeProvider,
} from '@material-ui/core'

const theme: Theme = createTheme({
  palette: {
    background: {
      default: '#1b1d31',
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
    </ThemeProvider>
  )
}

export default App
