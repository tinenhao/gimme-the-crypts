import React from 'react'
import { makeStyles, Theme, Typography } from '@material-ui/core'
import { TrendingCoin } from '../../../models/api/trending'
import { Coin } from '../../../models/api/coin'
import { CoinMarketChart } from '../../../models/api/coinMarketChart'
import CoinHeader from '../atoms/CoinHeader'
import PercentageChange from '../atoms/PercentageChange'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
  },
  price: {
    marginLeft: '20px',
    fontSize: 25,
  },
}))

interface Prop {
  data: Record<string, unknown>
  trendingcoin: TrendingCoin
  coins: Coin[]
}

function TrendingPrice(prop: Prop) {
  const classes = useStyles()

  const bitcoin = prop.coins.find((element) => element.id === 'bitcoin') as Coin
  const price = parseFloat(
    (prop.trendingcoin.price_btc * bitcoin.current_price).toString(),
  ).toFixed(2)

  const data: CoinMarketChart = prop.data[
    prop.trendingcoin.id
  ] as CoinMarketChart
  const percentageChange = (
    ((data.prices[23][1] - data.prices[0][1]) * 100) /
    data.prices[0][1]
  ).toFixed(2)

  const exist = !(percentageChange === undefined)
  const negative = percentageChange?.charAt(0) === '-'

  return (
    <div className={classes.main}>
      <CoinHeader coin={prop.trendingcoin} />
      <Typography className={classes.price}>US${price}</Typography>
      {exist && (
        <PercentageChange
          negative={negative}
          percentageChange={percentageChange}
        />
      )}
    </div>
  )
}

export default TrendingPrice
