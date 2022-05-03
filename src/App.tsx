import React from 'react'
import Erbaum from './assets/fonts/Erbaum-Bold.woff'
import {
  createTheme,
  CssBaseline,
  Theme,
  ThemeProvider,
} from '@material-ui/core'

type fontDisplay = 'swap' | 'auto'

const erbaum = {
  fontFamily: 'Erbaum',
  fontStyle: 'semi-bold',
  fontDisplay: 'swap' as fontDisplay,
  fontWeight: 300,
  src: `
  local('Erbaum'),
  local('Erbaum-Bold'),
  url(${Erbaum}) format('woff')`,
}

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
  typography: {
    fontFamily: "'Erbaum', sans-serif !important",
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [erbaum],
      },
    },
  },
})

// Drystick Semi Bold
// Erbaum Book

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div>test</div>
      <CssBaseline />
    </ThemeProvider>
  )
}

export default App
