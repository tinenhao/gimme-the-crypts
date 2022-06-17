import React from 'react'
import {
  makeStyles,
  Theme,
  useTheme,
  Typography,
  List,
  ListItem,
} from '@material-ui/core'
import { IndividualCoin } from '../../../models/api/individualCoin'
import { handleNotExist } from '../../../common/number'
import moment from 'moment'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    width: '100%',
    height: '100%',
  },
  content: {
    width: '95%',
    height: '100%',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    minHeight: 400,
    padding: 10,
    borderRadius: 25,
    marginTop: 15,
    backgroundColor: theme.palette.info.main,
    overflowY: 'scroll',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}))

interface Prop {
  coin: IndividualCoin
}

function MarketData(prop: Prop) {
  const theme = useTheme()
  const classes = useStyles()
  const titles = [
    { title: true, text: `${prop.coin.symbol.toUpperCase()} Price Today` },
    {
      title: false,
      text: 'Price',
      value: `US$ ${handleNotExist(
        prop.coin.market_data.current_price['usd'],
      )}`,
    },
    {
      title: false,
      text: 'Price Change 24H',
      value: `US$ ${convert2dp(
        handleNotExist(prop.coin.market_data.price_change_24h),
      )}`,
    },
    {
      title: false,
      text: 'Price Change % 24H',
      percentage: true,
      value: `${convert2dp(
        handleNotExist(prop.coin.market_data.price_change_percentage_24h),
      )}`,
    },
    {
      title: false,
      text: '24H Low',
      value: `US$ ${handleNotExist(prop.coin.market_data.low_24h['usd'])}`,
    },
    {
      title: false,
      text: '24H High',
      value: `US$ ${handleNotExist(prop.coin.market_data.high_24h['usd'])}`,
    },
    {
      title: false,
      text: 'Market Cap Rank',
      value: `#${handleNotExist(prop.coin.market_data.market_cap_rank)}`,
    },
    {
      title: false,
      text: 'Market Cap',
      value: `US$ ${handleNotExist(
        prop.coin.market_data.market_cap['usd'],
      ).toLocaleString()}`,
    },
    {
      title: false,
      text: 'Volume',
      value: `US$ ${handleNotExist(
        prop.coin.market_data.total_volume['usd'],
      ).toLocaleString()}`,
    },
    { title: true, text: `${prop.coin.symbol.toUpperCase()} Price History` },
    {
      title: false,
      text: 'Price Change % 7D',
      percentage: true,
      value: `${convert2dp(
        handleNotExist(prop.coin.market_data.price_change_percentage_7d),
      )}`,
    },
    {
      title: false,
      text: 'Price Change % 30D',
      percentage: true,
      value: `${convert2dp(
        handleNotExist(prop.coin.market_data.price_change_percentage_30d),
      )}`,
    },
    {
      title: false,
      text: 'Price Change % 60D',
      percentage: true,
      value: `${convert2dp(
        handleNotExist(prop.coin.market_data.price_change_percentage_60d),
      )}`,
    },
    {
      title: false,
      text: 'Price Change % 200D',
      percentage: true,
      value: `${convert2dp(
        handleNotExist(prop.coin.market_data.price_change_percentage_200d),
      )}`,
    },
    {
      title: false,
      text: 'Price Change % 1Y',
      percentage: true,
      value: `${convert2dp(
        handleNotExist(prop.coin.market_data.price_change_percentage_1y),
      )}`,
    },
    {
      title: false,
      text: 'All Time High',
      value: `US$ ${convert2dp(
        handleNotExist(prop.coin.market_data.ath['usd']),
      )}`,
    },
    {
      title: false,
      text: 'All Time High %',
      percentage: true,
      value: `${convert2dp(
        handleNotExist(prop.coin.market_data.ath_change_percentage['usd']),
      )}`,
    },
    {
      title: false,
      text: 'ATH Date',
      value: `${convertTime(
        handleNotExist(prop.coin.market_data.ath_date['usd']),
      )}`,
    },
    { title: true, text: `${prop.coin.symbol.toUpperCase()} Supply Stats` },
    {
      title: false,
      text: 'Circulating Supply',
      value: `${handleNotExist(
        prop.coin.market_data.circulating_supply,
      ).toLocaleString()} ${prop.coin.symbol.toUpperCase()}`,
    },
    {
      title: false,
      text: 'Total Supply',
      value: `${handleNotExist(
        prop.coin.market_data.total_supply,
      ).toLocaleString()} ${prop.coin.symbol.toUpperCase()}`,
    },
    {
      title: false,
      text: 'Max Supply',
      value: `${handleNotExist(
        prop.coin.market_data.max_supply,
      ).toLocaleString()} ${prop.coin.symbol.toUpperCase()}`,
    },
  ]

  function convert2dp(num: any) {
    if (num !== '-') {
      return num.toFixed(2)
    }
    return num
  }

  function convertTime(num: any) {
    if (num !== '-') {
      return moment(num).format('Do MMM YYYY HH') + '00'
    }
    return num
  }

  return (
    <div className={classes.main}>
      <List className={classes.content}>
        {titles.map((element) => {
          if (element.title) {
            return (
              <ListItem>
                <Typography color="textSecondary">{element.text}</Typography>
              </ListItem>
            )
          } else {
            return (
              <ListItem className={classes.item}>
                <Typography variant="body2">{element.text}</Typography>
                <Typography
                  style={{
                    color: element.percentage
                      ? parseFloat(element.value) > 0
                        ? theme.palette.success.light
                        : theme.palette.error.light
                      : undefined,
                  }}
                  variant="body2"
                >
                  {element.percentage && parseFloat(element.value) > 0 && '+'}
                  {element.value}
                  {element.percentage && '%'}
                </Typography>
              </ListItem>
            )
          }
        })}
      </List>
    </div>
  )
}

export default MarketData
