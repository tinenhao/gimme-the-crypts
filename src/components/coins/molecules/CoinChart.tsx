import React from 'react'
import { useTheme } from '@material-ui/core'
import { useAppSelector } from '../../../app/hooks'
import { CoinMarketChartDataTypes } from '../../../models/api/coinMarketChart'
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  formatPrice,
  formatMarketCap,
  formatYAxis,
} from '../../../common/number'
import moment from 'moment'

function CoinChart() {
  const theme = useTheme()
  const coin = useAppSelector((state) => state.individualCoin)
  const title = ['Price', 'Market Cap', 'Volume']
  const types = ['prices', 'market_caps', 'total_volumes'] as string[]
  const chartData = coin.marketChartValue[coin.timeframe][
    types[coin.data] as CoinMarketChartDataTypes
  ].map((element) => {
    return { time: element[0], price: element[1] }
  })

  function tickXFormatter(tick: number) {
    if (coin.timeframe === 6) {
      return moment(tick).format('YYYY')
    } else if (coin.timeframe >= 4) {
      return moment(tick).format('MMM')
    } else if (
      coin.timeframe === 3 ||
      coin.timeframe === 2 ||
      coin.timeframe === 1
    ) {
      return moment(tick).format('DD/MM')
    } else {
      return moment(tick).format('HH') + '00'
    }
  }

  function tickYFormatter(tick: number) {
    if (types[coin.data] === 'prices') {
      return tick.toString()
    }
    return formatYAxis(tick)
  }

  function tooltipFormatter(value: number) {
    if (types[coin.data] === 'prices') {
      return 'US$' + formatPrice(value)
    }
    return 'US$' + formatMarketCap(value)
  }

  function dateFormatter(date: string) {
    return moment(date).format('Do MMM YYYY HH') + '00'
  }

  return (
    <ResponsiveContainer width="100%" height="95%">
      <AreaChart data={chartData} margin={{ top: 10 }}>
        <defs>
          <linearGradient id="chart" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor={theme.palette.secondary.main}
              stopOpacity={0.4}
            />
            <stop
              offset="90%"
              stopColor={theme.palette.secondary.main}
              stopOpacity={0}
            />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="time"
          domain={['dataMin', 'dataMax']}
          tickCount={12}
          type="number"
          tickFormatter={(tick) => tickXFormatter(tick)}
        />
        <YAxis
          tickFormatter={(tick) => tickYFormatter(tick)}
          domain={['auto', 'auto']}
        />
        <Tooltip
          formatter={(value: number) => [
            tooltipFormatter(value),
            title[coin.data],
          ]}
          labelFormatter={(label) => dateFormatter(label)}
          contentStyle={{
            borderRadius: 15,
            backgroundColor: theme.palette.background.default,
          }}
        />
        <Area
          type="monotone"
          dataKey="price"
          stroke={theme.palette.secondary.main}
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#chart)"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default CoinChart
