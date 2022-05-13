import React from 'react'
import clsx from 'clsx'
import { makeStyles, Theme, Typography, Box } from '@material-ui/core'
import { TrendingCoin } from '../../../models/api/trending'
import { Coin } from '../../../models/api/coin'
import CoinHeader from '../atoms/CoinHeader'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
  },
  price: {
    marginLeft: '20px',
    fontSize: 25,
  },
  change: {
    marginLeft: '30px',
    marginTop: '4px',
    width: '105px',
    height: '40px',
    borderRadius: '15px',
    paddingTop: '7px',
  },
  positive: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.success.light,
  },
  negative: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.light,
  },
}))

interface Prop {
  trendingcoin: TrendingCoin
  coins: Coin[]
}

function TrendingPrice(prop: Prop) {
  const classes = useStyles()

  const bitcoin = prop.coins.find((element) => element.id === 'bitcoin') as Coin

  const price = parseFloat(
    (prop.trendingcoin.price_btc * bitcoin.current_price).toString(),
  ).toFixed(2)

  const percentageChange = prop.coins
    .find((element) => element.id === prop.trendingcoin.id)
    ?.price_change_percentage_24h.toFixed(2)

  const exist = !(percentageChange === undefined)
  const negative = percentageChange?.charAt(0) === '-'

  return (
    <div className={classes.main}>
      <CoinHeader coin={prop.trendingcoin} />
      <Typography className={classes.price}>US${price}</Typography>
      {exist && (
        <Typography
          className={clsx(classes.change, {
            [classes.positive]: !negative,
            [classes.negative]: negative,
          })}
          variant="body1"
          align="center"
        >
          {negative ? percentageChange : '+' + percentageChange}%
        </Typography>
      )}
    </div>
  )
}

export default TrendingPrice
