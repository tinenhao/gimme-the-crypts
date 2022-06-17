import React from 'react'
import { makeStyles, Theme, Box, Typography } from '@material-ui/core'
import { IndividualCoin } from '../../../models/api/individualCoin'
import { handleNotExist } from '../../../common/number'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    width: '100%',
    height: '12%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  box: {
    height: '100%',
    width: '24%',
    backgroundColor: theme.palette.info.main,
    borderRadius: 15,
  },
  text: {
    textAlign: 'center',
  },
}))

interface Prop {
  coin: IndividualCoin
}

function IndividualStats(prop: Prop) {
  const classes = useStyles()
  const contents = [
    {
      title: `Market Cap ${
        prop.coin.market_cap_rank !== null
          ? '#' + prop.coin.market_cap_rank
          : ''
      }`,
      number: handleNotExist(prop.coin.market_data.market_cap['usd'], true),
      usd: true,
    },
    {
      title: '24H Trading Volume',
      number: handleNotExist(prop.coin.market_data.total_volume['usd'], true),
      usd: true,
    },
    {
      title: 'Circulating Supply',
      number: handleNotExist(prop.coin.market_data.circulating_supply, true),
      usd: false,
    },
    {
      title: 'Max Supply',
      number: prop.coin.market_data.max_supply
        ? prop.coin.market_data.max_supply.toLocaleString()
        : '∞',
      usd: false,
    },
  ]

  return (
    <div className={classes.main}>
      {contents.map((element, index) => {
        return (
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            className={classes.box}
            key={index}
          >
            <Typography className={classes.text} color="textSecondary">
              {element.title}
            </Typography>
            <Typography className={classes.text}>
              {element.usd && 'US$'} {element.number}{' '}
              {!element.usd && prop.coin.symbol.toUpperCase()}
            </Typography>
          </Box>
        )
      })}
    </div>
  )
}

export default IndividualStats
