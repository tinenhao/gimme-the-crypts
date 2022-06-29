import React from 'react'
import { makeStyles, Theme, CardHeader } from '@material-ui/core'
import { useAppSelector } from '../../../app/hooks'
import CardLayout from '../../template/CardLayout'
import HistoricalTVLGraph from '../atoms/HistoricalTVLGraph'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    width: `calc(100% - ${710}px)`,
    height: 400,
    padding: 5,
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
}))

function TVLChart() {
  const classes = useStyles()
  const defi = useAppSelector((state) => state.defiProtocol)

  return (
    <div className={classes.main}>
      <CardLayout>
        <CardHeader
          title="Historical TVL"
          titleTypographyProps={{
            variant: 'body1',
          }}
        />
        <HistoricalTVLGraph chartData={defi.TVLChart} />
      </CardLayout>
    </div>
  )
}

export default TVLChart
