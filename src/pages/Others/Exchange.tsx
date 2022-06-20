import React from 'react'
import { makeStyles, Box } from '@material-ui/core'
import ExchangeDetails from '../../components/exchange/organisms/ExchangeDetails'
import ExchangeList from '../../components/exchange/organisms/ExchangeList'

const useStyles = makeStyles(() => ({
  main: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
}))

function Exchange() {
  const classes = useStyles()

  return (
    <div className={classes.main}>
      <Box height="32%">
        <ExchangeDetails />
      </Box>
      <Box height="65%">
        <ExchangeList />
      </Box>
    </div>
  )
}

export default Exchange
