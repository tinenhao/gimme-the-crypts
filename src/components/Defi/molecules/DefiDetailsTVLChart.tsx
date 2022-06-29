import React from 'react'
import { useAppSelector } from '../../../app/hooks'
import { makeStyles, Theme, Typography } from '@material-ui/core'
import HistoricalTVLGraph from '../atoms/HistoricalTVLGraph'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    width: `calc(100% - ${450}px)`,
    minHeight: 450,
    borderRadius: '0px 15px 15px 0px',
    padding: 25,
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.down('md')]: {
      width: '100%',
      borderRadius: '0px 0px 15px 15px',
    },
  },
}))

function DefiDetailsTVLChart() {
  const classes = useStyles()
  const defi = useAppSelector((state) => state.defiProtocol)

  return (
    <div className={classes.main}>
      <Typography>Historical TVL</Typography>
      <HistoricalTVLGraph
        individual
        color={defi.protocol.color}
        chartData={defi.protocol.tvl}
      />
    </div>
  )
}

export default DefiDetailsTVLChart
