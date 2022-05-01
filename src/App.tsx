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
      paper: '#26273c',
    },
    text: {
      primary: '#fdfdfd',
      secondary: '#303244',
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
