import React from 'react'
import { useAppSelector } from '../../../app/hooks'
import {
  makeStyles,
  Theme,
  useTheme,
  Avatar,
  Box,
  Typography,
} from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    width: '100%',
    height: 50,
    display: 'flex',
    justifyContent: 'space-evenly',
  },
}))

interface Prop {
  rank: number
  firstCoin: number
  secondCoin: number
  value: number
}

function CoinPair(prop: Prop) {
  const classes = useStyles()
  const theme = useTheme()
  const coins = useAppSelector((state) => state.coin).value

  return (
    <div className={classes.main}>
      <Typography style={{ marginTop: 3 }}>{prop.rank}</Typography>
      <Box style={{ display: 'flex' }}>
        <Avatar
          style={{ height: 30, width: 30, marginRight: 8 }}
          src={coins[prop.firstCoin].image}
        />
        <Typography style={{ marginTop: 3 }}>
          {coins[prop.firstCoin].symbol.toUpperCase()}
        </Typography>
      </Box>
      <Typography style={{ marginTop: 3 }}>vs</Typography>
      <Box style={{ display: 'flex' }}>
        <Avatar
          style={{ height: 30, width: 30, marginRight: 8 }}
          src={coins[prop.secondCoin].image}
        />
        <Typography style={{ marginTop: 3 }}>
          {coins[prop.secondCoin].symbol.toUpperCase()}
        </Typography>
      </Box>
      <Typography
        style={{
          marginTop: 3,
          color:
            prop.value < 0
              ? theme.palette.error.light
              : theme.palette.success.light,
        }}
      >
        {(prop.value * 100).toFixed(1)}
      </Typography>
    </div>
  )
}

export default CoinPair
