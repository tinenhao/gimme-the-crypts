import React from 'react'
import {
  makeStyles,
  Theme,
  useTheme,
  Box,
  Avatar,
  Typography,
  LinearProgress,
} from '@material-ui/core'
import { IndividualCoin } from '../../../models/api/individualCoin'
import { formatPrice, handleNotExist, convert2dp } from '../../../common/number'
import PercentageChange from '../../overview/atoms/PercentageChange'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    width: '100%',
    height: 200,
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 20,
    paddingLeft: 15,
    paddingRight: 15,
  },
  info: {
    height: 18,
    padding: '1px 8px',
    fontSize: 10,
    borderRadius: 5,
    marginTop: 3,
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.info.main,
  },
  progress: {
    width: '100%',
    height: 8,
    marginTop: 4,
    borderRadius: 8,
  },
}))

interface Prop {
  coin: IndividualCoin
}

function MobileIndividualHeader(prop: Prop) {
  const classes = useStyles()
  const theme = useTheme()
  const lowest =
    prop.coin.market_data.low_24h['usd'] <
    prop.coin.market_data.current_price['usd']
      ? prop.coin.market_data.low_24h['usd']
      : prop.coin.market_data.current_price['usd']
  const highest =
    prop.coin.market_data.high_24h['usd'] >
    prop.coin.market_data.current_price['usd']
      ? prop.coin.market_data.high_24h['usd']
      : prop.coin.market_data.current_price['usd']
  const percentage =
    (prop.coin.market_data.current_price['usd'] - lowest) / (highest - lowest)

  return (
    <div className={classes.main}>
      <Box display="flex">
        <Avatar src={prop.coin.image.large} style={{ width: 40, height: 40 }} />
        <Box display="flex" flexDirection="column" marginLeft={2}>
          <Typography variant="body1" noWrap style={{ maxWidth: 225 }}>
            {prop.coin.name}
          </Typography>
          <Box display="flex">
            <Typography
              noWrap
              className={classes.info}
              style={{ maxWidth: 150 }}
            >
              {prop.coin.symbol.toUpperCase()}
            </Typography>
            {prop.coin.market_cap_rank !== null && (
              <Typography
                variant="caption"
                className={classes.info}
                style={{ marginLeft: 10 }}
              >
                Rank #{prop.coin.market_cap_rank}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-evenly" marginTop={1}>
        <Typography variant="h6" style={{ marginTop: 8 }}>
          US${formatPrice(prop.coin.market_data.current_price['usd'])}
        </Typography>
        <PercentageChange
          percentageChange={convert2dp(
            handleNotExist(prop.coin.market_data.price_change_percentage_24h),
          )}
          negative={prop.coin.market_data.price_change_percentage_24h < 0}
        />
      </Box>
      <Box marginTop={1}>
        <LinearProgress
          color="secondary"
          className={classes.progress}
          value={percentage * 100}
          variant="determinate"
        />
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="caption" color="textSecondary">
          US${formatPrice(lowest)}
        </Typography>
        <Typography align="center" variant="caption" color="textSecondary">
          24H range
        </Typography>
        <Typography variant="caption" color="textSecondary">
          US$ {formatPrice(highest)}
        </Typography>
      </Box>
    </div>
  )
}

export default MobileIndividualHeader
