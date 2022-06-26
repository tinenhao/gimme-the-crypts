import React from 'react'
import {
  makeStyles,
  Theme,
  useTheme,
  CardHeader,
  Typography,
  CardContent,
} from '@material-ui/core'
import { useAppSelector } from '../../../app/hooks'
import { formatMarketCap } from '../../../common/number'
import CardLayout from '../../template/CardLayout'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    width: '100%',
    height: '33.3%',
    padding: 5,
    [theme.breakpoints.down('md')]: {
      height: 130,
    },
  },
}))

interface Prop {
  type: number
}

function InfoStats(prop: Prop) {
  const classes = useStyles()
  const theme = useTheme()
  const defi = useAppSelector((state) => state.defiProtocol)
  const percentageChange =
    ((defi.TVLChart[defi.TVLChart.length - 1].totalLiquidityUSD -
      defi.TVLChart[defi.TVLChart.length - 2].totalLiquidityUSD) *
      100) /
    defi.TVLChart[defi.TVLChart.length - 2].totalLiquidityUSD
  const dominance =
    (defi.protocolList[0].tvl * 100) /
    defi.TVLChart[defi.TVLChart.length - 1].totalLiquidityUSD
  const data = [
    {
      title: 'Total Value Locked',
      content:
        'US$ ' +
        formatMarketCap(
          defi.TVLChart[defi.TVLChart.length - 1].totalLiquidityUSD,
        ),
      color: theme.palette.primary.main,
    },
    {
      title: '24H Change',
      content:
        percentageChange > 0
          ? '+' + percentageChange.toFixed(2) + '%'
          : percentageChange.toFixed(2) + '%',
      color:
        percentageChange > 0
          ? theme.palette.success.light
          : theme.palette.error.light,
    },
    {
      title: defi.protocolList[0].name + ' Dominance',
      content: dominance.toFixed(2) + '%',
      color: theme.palette.primary.main,
    },
  ]

  return (
    <div className={classes.main}>
      <CardLayout>
        <div>
          <CardHeader
            title={data[prop.type].title}
            titleTypographyProps={{
              variant: 'body1',
            }}
          />
          <Typography
            variant="h6"
            style={{ marginLeft: 18, color: data[prop.type].color }}
          >
            {data[prop.type].content}
          </Typography>
        </div>
      </CardLayout>
    </div>
  )
}

export default InfoStats
