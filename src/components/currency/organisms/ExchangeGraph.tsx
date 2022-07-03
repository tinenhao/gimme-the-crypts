import React, { useState, useEffect } from 'react'
import {
  makeStyles,
  Theme,
  Box,
  Typography,
  Avatar,
  Hidden,
} from '@material-ui/core'
import { ToggleButton } from '@material-ui/lab'
import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import { fetchMarketData } from '../../../features/currencyConverterSlice'
import PercentageChange from '../../overview/atoms/PercentageChange'
import CoinTitle from '../atoms/CoinTitle'
import PriceChart from '../molecules/PriceChart'
import Spinner from '../../UI/atoms/Spinner'
import img from '../../../assets/chooseCoin.png'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    paddingRight: 15,
    height: '90%',
    width: '100%',
  },
  divider: {
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 0,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  buttons: {
    fontSize: 20,
    color: theme.palette.text.primary,
    border: 'none',
    borderRadius: 15,
    '&.Mui-selected': {
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.info.main,
    },
    '&:hover': {
      backgroundColor: theme.palette.background.paper,
    },
  },
}))

function ExchangeGraph() {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const currencyConverter = useAppSelector((state) => state.currencyConverter)
  const [timeframe, setTimeframe] = useState<number>(0)
  const [progress, setProgress] = useState<number>(0)
  const price = (
    currencyConverter.coinFrom.current_price /
    currencyConverter.coinTo.current_price
  ).toFixed(5)

  function getPercentageChange() {
    return (
      ((currencyConverter.value[timeframe][
        currencyConverter.value[timeframe].length - 1
      ].price -
        currencyConverter.value[timeframe][0].price) *
        100) /
      currencyConverter.value[timeframe][0].price
    ).toFixed(2)
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress < 100 ? prevProgress + 1 : prevProgress,
      )
    }, 50)

    return () => {
      clearInterval(timer)
    }
  }, [])

  useEffect(() => {
    if (
      currencyConverter.value.length === 0 &&
      currencyConverter.coinFrom.symbol !== undefined &&
      currencyConverter.coinTo.symbol !== undefined
    ) {
      setProgress(0)
      dispatch(
        fetchMarketData({
          coinFrom: currencyConverter.coinFrom,
          coinTo: currencyConverter.coinTo,
        }),
      )
    }
  }, [dispatch, currencyConverter.coinFrom, currencyConverter.coinTo])

  const toggleButtons = (
    <Box>
      <ToggleButton
        value={0}
        selected={timeframe === 0}
        className={classes.buttons}
        onClick={() => setTimeframe(0)}
      >
        1D
      </ToggleButton>
      <ToggleButton
        value={1}
        selected={timeframe === 1}
        className={classes.buttons}
        onClick={() => setTimeframe(1)}
      >
        1W
      </ToggleButton>
      <ToggleButton
        value={2}
        selected={timeframe === 2}
        className={classes.buttons}
        onClick={() => setTimeframe(2)}
      >
        1M
      </ToggleButton>
      <ToggleButton
        value={3}
        selected={timeframe === 3}
        className={classes.buttons}
        onClick={() => setTimeframe(3)}
      >
        3M
      </ToggleButton>
      <ToggleButton
        value={4}
        selected={timeframe === 4}
        className={classes.buttons}
        onClick={() => setTimeframe(4)}
      >
        1Y
      </ToggleButton>
    </Box>
  )

  return (
    <div className={classes.main}>
      {currencyConverter.coinFrom.symbol === undefined ||
      currencyConverter.coinTo.symbol === undefined ? (
        <Box style={{ margin: 'auto' }}>
          <Avatar
            style={{ width: 250, height: 250, margin: 'auto' }}
            variant="square"
            src={img}
          />
          <Typography variant="h6" style={{ marginTop: 15 }}>
            Please select the respective coins
          </Typography>
        </Box>
      ) : (
        <div style={{ height: '85%', width: '100%' }}>
          <Box style={{ display: 'flex' }}>
            <Box style={{ display: 'flex', marginTop: 10 }}>
              <CoinTitle type="To" />
              <Typography variant="h5" className={classes.divider}>
                /
              </Typography>
              <CoinTitle type="From" />
            </Box>
            {currencyConverter.value.length !== 0 && (
              <PercentageChange
                percentageChange={getPercentageChange()}
                negative={getPercentageChange().charAt(0) === '-'}
                noTooltip={true}
              />
            )}
          </Box>
          <Box className={classes.header}>
            <Typography
              noWrap
              variant="h4"
              style={{ marginTop: 8, width: 280 }}
            >
              {price}
            </Typography>
            <Hidden mdDown>{toggleButtons}</Hidden>
          </Box>
          <Hidden lgUp>{toggleButtons}</Hidden>
          {currencyConverter.value.length === 0 ? (
            <Box
              height="100%"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Spinner determinate={true} progress={progress} />
            </Box>
          ) : (
            <PriceChart
              data={currencyConverter.value[timeframe]}
              timeframe={timeframe}
            />
          )}
        </div>
      )}
    </div>
  )
}

export default ExchangeGraph
