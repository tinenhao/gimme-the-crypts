import React from 'react'
import { makeStyles, Theme, Box } from '@material-ui/core'
import ExchangeGraph from '../../components/currency/organisms/ExchangeGraph'
import ExchangeCurrency from '../../components/currency/organisms/ExchangeCurrency'
import ChooseCurrencyDialog from '../../components/currency/molecules/ChooseCurrencyDialog'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    display: 'flex',
    height: 460,
    width: 1000,
    margin: 'auto',
    marginTop: '5%',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      width: '100%',
      maxWidth: 500,
      height: 920,
    },
  },
  graph: {
    width: 600,
    height: '100%',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  currency: {
    width: 400,
    height: '100%',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
}))

function Currency() {
  const classes = useStyles()

  return (
    <div className={classes.main}>
      <ChooseCurrencyDialog />
      <Box className={classes.graph}>
        <ExchangeGraph />
      </Box>
      <Box className={classes.currency}>
        <ExchangeCurrency />
      </Box>
    </div>
  )
}

export default Currency
