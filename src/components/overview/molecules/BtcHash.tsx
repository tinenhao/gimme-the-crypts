import React from 'react'
import { useTheme } from '@material-ui/core'
import { rootModule } from '../../../models/api/btcHashRate'
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from 'recharts'
import moment from 'moment'

interface Prop {
  hashRate: rootModule
  btcPrice: rootModule
}

function GasPriceHistory(prop: Prop) {
  const theme = useTheme()
  const chartData = prop.btcPrice.values.map((element, index) => {
    if (prop.hashRate.values[index] !== undefined)
      return {
        time: index,
        hashRate: prop.hashRate.values[index].y,
        btcPrice: prop.btcPrice.values[index].y,
      }
  })

  function formatLegend(name: string) {
    return name === 'btcPrice' ? 'Bitcoin Price' : 'Hash Rate'
  }

  function tickXFormatter(tick: number) {
    return moment().subtract(1, 'years').add(tick, 'days').format('MMM')
  }

  function tickYFormatter(tick: number) {
    return (tick / 1000000).toFixed(0) + 'M'
  }

  function tooltipFormatter(name: string, value: number) {
    if (name === 'btcPrice') {
      return ['US$ ' + value, 'Bitcoin Price']
    }
    return [(value / 1000000).toFixed(2) + 'M TH/s', 'Hash Rate']
  }

  function dateFormatter(days: string) {
    return moment()
      .subtract(1, 'years')
      .add(parseInt(days), 'days')
      .format('Do MMM YYYY')
  }

  return (
    <ResponsiveContainer height="75%" width="95%">
      <AreaChart data={chartData} margin={{ top: 15, left: 13 }}>
        <defs>
          <linearGradient id="hashRate" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor={theme.palette.primary.main}
              stopOpacity={0.4}
            />
            <stop
              offset="70%"
              stopColor={theme.palette.primary.main}
              stopOpacity={0}
            />
          </linearGradient>
          <linearGradient id="btcPrice" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor={theme.palette.secondary.main}
              stopOpacity={0.7}
            />
            <stop
              offset="70%"
              stopColor={theme.palette.secondary.main}
              stopOpacity={0}
            />
          </linearGradient>
        </defs>
        <XAxis dataKey="time" tickFormatter={(tick) => tickXFormatter(tick)} />
        <YAxis
          yAxisId="hashRate"
          tickFormatter={(tick) => tickYFormatter(tick)}
        />
        <YAxis yAxisId="btcPrice" orientation="right" />
        <Legend formatter={(value) => formatLegend(value)} />
        <Tooltip
          formatter={(value: number, name: string) =>
            tooltipFormatter(name, value)
          }
          labelFormatter={(label) => dateFormatter(label)}
          contentStyle={{
            borderRadius: 15,
            backgroundColor: theme.palette.background.default,
          }}
        />
        <Area
          type="monotone"
          dataKey="hashRate"
          yAxisId="hashRate"
          stroke={theme.palette.primary.main}
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#hashRate)"
        />
        <Area
          type="monotone"
          dataKey="btcPrice"
          yAxisId="btcPrice"
          stroke={theme.palette.secondary.main}
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#btcPrice)"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default GasPriceHistory
