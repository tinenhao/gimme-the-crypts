import React, { useEffect } from 'react'
import { Box, Hidden } from '@material-ui/core'
import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import { fetchCoins } from '../../../features/coinSlice'
import CardLayout from '../../template/CardLayout'
import ExchangeStats from '../molecules/ExchangeStats'
import ChartToolbar from '../../coins/atoms/ChartToolbar'
import ExchangeVolumeGraph from '../molecules/ExchangeVolumeGraph'

function ExchangeDetails() {
  const dispatch = useAppDispatch()
  const exchange = useAppSelector((state) => state.exchange)

  useEffect(() => {
    if (exchange.exchangeList.length === 0) {
      dispatch(fetchCoins())
    }
  }, [])

  return (
    <CardLayout>
      {exchange.exchangeList.length !== 0 ? (
        <Box display="flex" height="100%" width="100%" padding={2}>
          <Hidden smUp>
            <ExchangeStats mobile />
          </Hidden>
          <Hidden xsDown>
            <ExchangeStats />
            <Box
              display="flex"
              flexDirection="column"
              width="100%"
              marginLeft={2}
            >
              <ChartToolbar type="volume" />
              <ExchangeVolumeGraph />
            </Box>
          </Hidden>
        </Box>
      ) : (
        <div />
      )}
    </CardLayout>
  )
}

export default ExchangeDetails
