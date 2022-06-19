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
import { useAppDispatch } from '../../../app/hooks'
import { IndividualCoin } from '../../../models/api/individualCoin'
import { handleDialog } from '../../../features/individualCoinSlice'
import { formatPrice, handleNotExist, convert2dp } from '../../../common/number'
import CategoriesDialog from '../atoms/CategoriesDialog'
import PercentageChange from '../../overview/atoms/PercentageChange'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    width: '100%',
    height: 150,
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: 15,
  },
  info: {
    height: 22,
    padding: '1px 8px',
    borderRadius: 5,
    marginTop: 5,
    marginLeft: 10,
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.info.main,
  },
  links: {
    color: theme.palette.text.secondary,
    marginTop: 5,
    cursor: 'pointer',
  },
  tag: {
    color: 'black',
    backgroundColor: theme.palette.secondary.main,
    borderRadius: 5,
    padding: '1px 8px',
  },
  view: {
    marginLeft: 7,
    color: theme.palette.text.secondary,
    cursor: 'pointer',
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

function IndividualHeader(prop: Prop) {
  const classes = useStyles()
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const categories = prop.coin.categories.filter((element) => element !== null)
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
      <Box display="flex" flexDirection="column" marginTop={1}>
        <Box display="flex">
          <Avatar
            src={prop.coin.image.large}
            style={{ width: 60, height: 60 }}
          />
          <Box display="flex" flexDirection="column" marginLeft={2}>
            <Box display="flex">
              <Typography variant="h5">{prop.coin.name}</Typography>
              <Typography
                noWrap
                variant="caption"
                className={classes.info}
                style={{ maxWidth: 70 }}
              >
                {prop.coin.symbol.toUpperCase()}
              </Typography>
              {prop.coin.market_cap_rank !== null && (
                <Typography variant="caption" className={classes.info}>
                  Rank #{prop.coin.market_cap_rank}
                </Typography>
              )}
            </Box>
            <Box display="flex">
              <Typography
                className={classes.links}
                onClick={() => (
                  window.open(prop.coin.links.homepage[0]), '_blank'
                )}
              >
                Website
              </Typography>
              {prop.coin.links.blockchain_site[0] !== '' && (
                <Typography
                  className={classes.links}
                  style={{ marginLeft: 8 }}
                  onClick={() => (
                    window.open(prop.coin.links.blockchain_site[0]), '_blank'
                  )}
                >
                  Blockchain
                </Typography>
              )}
              {prop.coin.links.official_forum_url[0] !== '' && (
                <Typography
                  className={classes.links}
                  style={{ marginLeft: 8 }}
                  onClick={() => (
                    window.open(prop.coin.links.official_forum_url[0]), '_blank'
                  )}
                >
                  Forum
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
        <Box
          display="flex"
          marginTop={1}
          marginLeft={categories.length > 1 ? 0 : 9}
        >
          {categories.map(
            (category, index) =>
              index < 2 && (
                <Typography
                  noWrap
                  key={index}
                  variant="body2"
                  className={classes.tag}
                  style={{ marginLeft: index !== 0 ? 7 : 0 }}
                >
                  {category}
                </Typography>
              ),
          )}
          {categories.length > 2 && (
            <Typography
              noWrap
              variant="body2"
              className={classes.view}
              onClick={() => dispatch(handleDialog())}
            >
              View More
            </Typography>
          )}
        </Box>
      </Box>
      <Box display="flex" flexDirection="column">
        <Box display="flex">
          <Typography variant="h5" style={{ marginTop: 8 }}>
            US${formatPrice(prop.coin.market_data.current_price['usd'])}
          </Typography>
          <PercentageChange
            percentageChange={convert2dp(
              handleNotExist(prop.coin.market_data.price_change_percentage_24h),
            )}
            negative={prop.coin.market_data.price_change_percentage_24h < 0}
          />
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography color="textSecondary">
            {prop.coin.market_data.current_price['btc']} BTC
          </Typography>
          <Typography
            style={{
              marginRight: 10,
              color:
                prop.coin.market_data
                  .market_cap_change_percentage_24h_in_currency['btc'] < 0
                  ? theme.palette.error.light
                  : theme.palette.success.light,
            }}
          >
            {prop.coin.market_data.market_cap_change_percentage_24h_in_currency[
              'btc'
            ] > 0 && '+'}
            {convert2dp(
              handleNotExist(
                prop.coin.market_data
                  .market_cap_change_percentage_24h_in_currency['btc'],
              ),
            )}
            %
          </Typography>
        </Box>
        <Box>
          <LinearProgress
            className={classes.progress}
            value={percentage * 100}
            variant="determinate"
          />
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="caption" color="textSecondary">
            US${formatPrice(lowest)}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            24H range
          </Typography>
          <Typography variant="caption" color="textSecondary">
            US$ {formatPrice(highest)}
          </Typography>
        </Box>
      </Box>
      <CategoriesDialog categories={categories} />
    </div>
  )
}

export default IndividualHeader
