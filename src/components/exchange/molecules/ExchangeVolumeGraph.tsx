import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core'
import { useTheme } from '@material-ui/core'
import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import { fetchExchangeVolume } from '../../../features/exchangeSlice'
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { formatMarketCap, formatYAxis } from '../../../common/number'
import moment from 'moment'
import Spinner from '../../UI/atoms/Spinner'

const useStyles = makeStyles(() => ({
  main: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
}))

function ExchangeVolumeGraph() {
  const theme = useTheme()
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const exchange = useAppSelector((state) => state.exchange)
  const btcPrice =
    useAppSelector((state) => state.coin).value.find(
      (coin) => coin.id === 'bitcoin',
    )?.current_price || 0
  const chartData = exchange.exchangeVolume[exchange.displayTimeframe].map(
    (data) => {
      return { time: data[0], value: parseFloat(data[1]) * btcPrice }
    },
  )

  useEffect(() => {
    if (exchange.exchangeVolume[exchange.displayTimeframe].length === 0) {
      dispatch(
        fetchExchangeVolume({
          id: exchange.exchangeList[exchange.displayExchange].id,
          day: exchange.displayTimeframe,
        }),
      )
    }
  }, [dispatch, exchange.displayTimeframe, exchange.displayExchange])

  function tickXFormatter(tick: number) {
    if (exchange.displayTimeframe === 4) {
      return moment(tick).format('MMM')
    } else if (
      exchange.displayTimeframe === 3 ||
      exchange.displayTimeframe === 2
    ) {
      return moment(tick).format('DD/MM')
    } else {
      return moment(tick).format('HH') + '00'
    }
  }

  function tooltipFormatter(value: number) {
    return 'US$' + formatMarketCap(value)
  }

  function dateFormatter(date: string) {
    return moment(date).format('Do MMM YYYY HH') + '00'
  }

  return (
    <div className={classes.main}>
      {exchange.exchangeVolume[exchange.displayTimeframe].length !== 0 ? (
        <ResponsiveContainer width="98%" height="95%">
          <AreaChart data={chartData} margin={{ top: 20 }}>
            <defs>
              <linearGradient id="chart" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={theme.palette.secondary.main}
                  stopOpacity={0.4}
                />
                <stop
                  offset="95%"
                  stopColor={theme.palette.secondary.main}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="time"
              domain={['dataMin', 'dataMax']}
              tickCount={10}
              type="number"
              tickFormatter={(tick) => tickXFormatter(tick)}
            />
            <YAxis
              tickFormatter={(tick) => formatYAxis(tick)}
              domain={['auto', 'auto']}
            />
            <Tooltip
              formatter={(value: number) => [
                tooltipFormatter(value),
                'Trade Volume (24H)',
              ]}
              labelFormatter={(label) => dateFormatter(label)}
              contentStyle={{
                borderRadius: 15,
                backgroundColor: theme.palette.background.default,
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke={theme.palette.secondary.main}
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#chart)"
            />
          </AreaChart>
        </ResponsiveContainer>
      ) : (
        <Spinner />
      )}
    </div>
  )
}

export default ExchangeVolumeGraph
