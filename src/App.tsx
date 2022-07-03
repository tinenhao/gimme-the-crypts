import React from 'react'
import Erbaum from './assets/fonts/Erbaum-Bold.woff'
import Main from './pages/Main'
import {
  createTheme,
  CssBaseline,
  Theme,
  ThemeProvider,
  ThemeOptions,
  responsiveFontSizes,
} from '@material-ui/core'
import { useAppSelector } from './app/hooks'

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

const common: ThemeOptions = {
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
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
}

const dark: Theme = createTheme({
  palette: {
    type: 'dark',
    background: {
      default: '#1b1d31',
      paper: '#26273c',
    },
    text: {
      primary: '#fdfdfd',
      secondary: '#9d9fb0',
    },
    primary: {
      main: '#2768a0',
    },
    secondary: {
      main: '#f5b94c',
    },
    success: {
      main: '#293e41',
      light: '#68ca87',
    },
    error: {
      main: '#40263a',
      light: '#d16a6d',
    },
    info: {
      main: '#353652',
    },
  },
  ...common,
})

const light: Theme = createTheme({
  palette: {
    type: 'light',
    background: {
      default: '#f5f5f5',
      paper: '#e4e7ec',
    },
    text: {
      primary: '#000000',
      secondary: '#7d7979',
    },
    primary: {
      main: '#2768a0',
    },
    secondary: {
      main: '#f5b94c',
    },
    success: {
      main: '#293e41',
      light: '#68ca87',
    },
    error: {
      main: '#40263a',
      light: '#d16a6d',
    },
    info: {
      main: '#d5d9db',
    },
  },
  ...common,
})

function App() {
  const main = useAppSelector((state) => state.main)
  return (
    <ThemeProvider theme={responsiveFontSizes(main.darkMode ? dark : light)}>
      <Main />
      <CssBaseline />
    </ThemeProvider>
  )
}

export default App
