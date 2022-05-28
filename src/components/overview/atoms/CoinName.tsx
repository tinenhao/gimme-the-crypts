import React from 'react'
import { makeStyles, Theme, Typography, Avatar } from '@material-ui/core'
import { Coin } from '../../../models/api/coin'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    display: 'flex',
    marginLeft: 15,
    marginTop: 10,
    paddingBottom: 5,
    width: 130,
  },
  title: {
    marginLeft: 10,
    display: 'flex',
    flexDirection: 'column',
    fontSize: 13,
    maxWidth: 100,
  },
  subtitle: {
    color: theme.palette.text.secondary,
    fontSize: 12,
  },
}))

interface Prop {
  coin: Coin
}

function CoinName(prop: Prop) {
  const classes = useStyles()

  return (
    <div className={classes.main}>
      <Avatar src={prop.coin.image} style={{ marginTop: '3px' }} />
      <div className={classes.title}>
        <Typography noWrap display="inline">
          {prop.coin.name}
        </Typography>
        <Typography className={classes.subtitle}>
          {prop.coin.symbol.toUpperCase()}/USD
        </Typography>
      </div>
    </div>
  )
}

export default CoinName
