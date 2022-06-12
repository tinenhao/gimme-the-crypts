import React from 'react'
import { makeStyles, useTheme, Typography } from '@material-ui/core'
import { formatPrice } from '../../../common/number'
import { Coin } from '../../../models/api/coin'
import { CoinMarketChart } from '../../../models/api/coinMarketChart'
import CoinName from '../atoms/CoinName'
import TrendingSparkline from './TrendingSparkline'
import Tooltip from '../../template/Tooltip'

const useStyles = makeStyles(() => ({
  main: {
    height: 70,
    display: 'flex',
    paddingLeft: 14,
    paddingRight: 10,
    marginTop: 5,
  },
  text: {
    marginTop: 20,
    width: 18,
  },
  price: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'right',
    marginTop: 8,
    marginLeft: 'auto',
  },
  chart: {
    width: '100%',
    height: '100%',
    margin: 'auto',
    maxWidth: 180,
  },
}))

interface Prop {
  rank: number
  coin: Coin
  coinMarketChart: Record<string, CoinMarketChart>
}

function CoinItem(prop: Prop) {
  const classes = useStyles()
  const theme = useTheme()
  const negative = prop.coin.price_change_percentage_30d_in_currency < 0

  return (
    <div className={classes.main}>
      <Typography className={classes.text}>{prop.rank + 1}</Typography>
      <CoinName coin={prop.coin} />
      {Object.keys(prop.coinMarketChart).length !== 0 && (
        <div className={classes.chart}>
          <TrendingSparkline
            data={prop.coinMarketChart[prop.coin.id].prices}
            positive={!negative}
          />
        </div>
      )}
      <div className={classes.price}>
        <Typography>US${formatPrice(prop.coin.current_price)}</Typography>
        <Tooltip title="price change in the last 30 days">
          <Typography
            style={{
              color: negative
                ? theme.palette.error.light
                : theme.palette.success.light,
            }}
          >
            {!negative ? '+' : ''}
            {prop.coin.price_change_percentage_30d_in_currency.toFixed(2)}%
          </Typography>
        </Tooltip>
      </div>
    </div>
  )
}

export default CoinItem
