import React from 'react'
import { makeStyles, Theme, Typography, Avatar } from '@material-ui/core'
import { Coin } from '../../../models/api/coin'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    display: 'flex',
    marginLeft: 15,
    marginTop: 14,
    paddingBottom: 5,
    width: 140,
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
      <Avatar
        src={prop.coin.image}
        style={{ marginTop: '3px', width: 30, height: 30 }}
      />
      <div className={classes.title}>
        <Typography variant="body2" noWrap display="inline">
          {prop.coin.name}
        </Typography>
        <Typography variant="body2" className={classes.subtitle}>
          {prop.coin.symbol.toUpperCase()}/USD
        </Typography>
      </div>
    </div>
  )
}

export default CoinName
