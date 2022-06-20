import React from 'react'
import {
  makeStyles,
  Theme,
  useTheme,
  Box,
  Avatar,
  Typography,
} from '@material-ui/core'
import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import { setDisplayExchange } from '../../../features/exchangeSlice'
import { Exchange } from '../../../models/api/exchange'
import { formatMarketCap } from '../../../common/number'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    height: '100%',
    width: '100%',
    borderRadius: 15,
    padding: 20,
    backgroundColor: theme.palette.info.main,
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.background.default,
    },
  },
  info: {
    width: 38,
    fontSize: 13,
    borderRadius: 5,
    marginLeft: 8,
    paddingTop: 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.background.paper,
  },
}))

interface Prop {
  exchange: Exchange
}

function ExchangeCard(prop: Prop) {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const theme = useTheme()
  const btcPrice =
    useAppSelector((state) => state.coin).value.find(
      (coin) => coin.id === 'bitcoin',
    )?.current_price || 0

  return (
    <div
      className={classes.main}
      onClick={() =>
        dispatch(setDisplayExchange(prop.exchange.trust_score_rank - 1))
      }
    >
      <Box display="flex">
        <Avatar src={prop.exchange.image} style={{ width: 35, height: 35 }} />
        <Box display="flex" flexDirection="column" width="100%">
          <Box display="flex" marginLeft={1} width="100%">
            <Typography style={{ maxWidth: `calc(100% - ${80}px)` }} noWrap>
              {prop.exchange.name}
            </Typography>
            <Typography className={classes.info}>
              #{prop.exchange.trust_score_rank}
            </Typography>
          </Box>
          <Typography
            variant="body2"
            color="textSecondary"
            style={{ marginLeft: 8 }}
          >
            US$ {formatMarketCap(prop.exchange.trade_volume_24h_btc * btcPrice)}
          </Typography>
        </Box>
      </Box>
      <Box marginTop={4}>
        <Typography
          variant="h4"
          align="center"
          style={{
            color:
              prop.exchange.trust_score > 7
                ? theme.palette.success.light
                : prop.exchange.trust_score > 4
                ? theme.palette.secondary.main
                : theme.palette.error.light,
          }}
        >
          {prop.exchange.trust_score}
        </Typography>
        <Typography align="center" color="textSecondary">
          Trust Score
        </Typography>
      </Box>
    </div>
  )
}

export default ExchangeCard
