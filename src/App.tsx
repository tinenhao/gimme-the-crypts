import React from 'react'
import Erbaum from './assets/fonts/Erbaum-Bold.woff'
import Main from './pages/Main'
import {
  createTheme,
  CssBaseline,
  Theme,
  ThemeProvider,
} from '@material-ui/core'

type fontDisplay = 'swap' | 'auto'

const erbaum = {
  fontFamily: 'Erbaum',
  fontStyle: 'bold',
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
    primary: {
      main: '#0890fe',
    },
    secondary: {
      main: '#4f46ba',
    },
    success: {
      main: '#ff4267',
    },
  },
  typography: {
    allVariants: {
      fontFamily: "'erbaum', sans-serif !important",
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [erbaum],
      },
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Main />
      <CssBaseline />
    </ThemeProvider>
  )
}

export default App
