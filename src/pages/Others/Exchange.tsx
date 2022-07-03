import React from 'react'
import { makeStyles, Box } from '@material-ui/core'
import ExchangeDetails from '../../components/exchange/organisms/ExchangeDetails'
import ExchangeList from '../../components/exchange/organisms/ExchangeList'

const useStyles = makeStyles(() => ({
  main: {
    height: '98%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    overflowY: 'scroll',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
}))

function Exchange() {
  const classes = useStyles()

  return (
    <div className={classes.main}>
      <Box height={300}>
        <ExchangeDetails />
      </Box>
      <Box height={`calc(100% - ${300}px)`} minHeight={300} marginTop={2}>
        <ExchangeList />
      </Box>
    </div>
  )
}

export default Exchange
