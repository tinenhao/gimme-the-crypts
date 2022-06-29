import React from 'react'
import { makeStyles, Theme, Avatar, Typography } from '@material-ui/core'
import { TrendingCoin } from '../../../models/api/trending'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    display: 'flex',
    marginLeft: '15px',
    paddingBottom: '5px',
  },
  title: {
    marginLeft: '10px',
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 100,
  },
  subtitle: {
    color: theme.palette.text.secondary,
    fontSize: 13,
  },
}))

interface Prop {
  coin: TrendingCoin
}

function TrendingPrice(prop: Prop) {
  const classes = useStyles()

  return (
    <div className={classes.main}>
      <Avatar src={prop.coin.large} style={{ marginTop: '3px' }} />
      <div className={classes.title}>
        <Typography noWrap>{prop.coin.name}</Typography>
        <Typography noWrap className={classes.subtitle}>
          {prop.coin.symbol}/USD
        </Typography>
      </div>
    </div>
  )
}

export default TrendingPrice
