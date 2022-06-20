import React from 'react'
import { makeStyles, Theme, Box, Avatar, Typography } from '@material-ui/core'
import { OpenInNewRounded } from '@mui/icons-material'
import { formatMarketCap, handleNotExist } from '../../../common/number'
import { useAppSelector } from '../../../app/hooks'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    width: '30%',
    minWidth: 350,
    height: '100%',
    borderRadius: 20,
    padding: 15,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: theme.palette.info.main,
  },
  title: {
    marginLeft: 10,
    marginTop: 8,
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.text.secondary,
    },
  },
}))

function ExchangeDetails() {
  const classes = useStyles()
  const exchange = useAppSelector((state) => state.exchange)
  const btcPrice =
    useAppSelector((state) => state.coin).value.find(
      (coin) => coin.id === 'bitcoin',
    )?.current_price || 0
  const exchangeSelected = exchange.exchangeList[exchange.displayExchange]
  const data = [
    {
      title: 'Trust Score Rank:',
      value: `#${exchangeSelected.trust_score_rank}`,
    },
    { title: 'Trust Score:', value: `${exchangeSelected.trust_score}` },
    {
      title: 'Trade Volume (24H): ',
      value: `US$ ${formatMarketCap(
        exchangeSelected.trade_volume_24h_btc * btcPrice,
      )}`,
    },
    { title: 'Country:', value: `${handleNotExist(exchangeSelected.country)}` },
    {
      title: 'Year Established:',
      value: `${handleNotExist(exchangeSelected.year_established)}`,
    },
  ]

  return (
    <div className={classes.main}>
      <Box display="flex">
        <Avatar
          src={exchangeSelected.image}
          style={{ width: 50, height: 50 }}
        />
        <Typography
          className={classes.title}
          variant="h5"
          noWrap
          onClick={() => (window.open(exchangeSelected.url), '_blank')}
        >
          {exchangeSelected.name}
        </Typography>
        <OpenInNewRounded style={{ marginTop: 13, marginLeft: 8 }} />
      </Box>
      {data.map((element, index) => {
        return (
          <Box display="flex" justifyContent="space-between" key={index}>
            <Typography>{element.title}</Typography>
            <Typography>{element.value}</Typography>
          </Box>
        )
      })}
    </div>
  )
}

export default ExchangeDetails
