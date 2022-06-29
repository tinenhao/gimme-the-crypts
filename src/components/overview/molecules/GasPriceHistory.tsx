import React from 'react'
import { useTheme } from '@material-ui/core'
import { gasPriceData } from '../../../models/api/gasPriceHistory'
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
  data: gasPriceData[]
}

function GasPriceHistory(prop: Prop) {
  const theme = useTheme()
  const chartData = prop.data.map((element, index) => {
    return {
      time: index,
      high: element.gasPrice.high,
      low: element.gasPrice.low,
      open: element.gasPrice.open,
      close: element.gasPrice.close,
    }
  })

  function tickXFormatter(tick: number) {
    return moment().subtract(1, 'years').add(tick, 'days').format('MMM')
  }

  function tickYFormatter(tick: number) {
    return tick.toFixed(0)
  }

  function tooltipFormatter(value: number) {
    return value + ' Gwei'
  }

  function dateFormatter(days: string) {
    return moment()
      .subtract(1, 'years')
      .add(parseInt(days), 'days')
      .format('Do MMM YYYY')
  }

  return (
    <ResponsiveContainer height="75%" width="95%">
      <AreaChart data={chartData} margin={{ top: 13, left: 13 }}>
        <defs>
          <linearGradient id="high" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor={theme.palette.error.light}
              stopOpacity={0.4}
            />
            <stop
              offset="70%"
              stopColor={theme.palette.error.light}
              stopOpacity={0}
            />
          </linearGradient>
          <linearGradient id="low" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor={theme.palette.success.light}
              stopOpacity={0.7}
            />
            <stop
              offset="70%"
              stopColor={theme.palette.success.light}
              stopOpacity={0}
            />
          </linearGradient>
          <linearGradient id="open" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor={theme.palette.primary.main}
              stopOpacity={0.7}
            />
            <stop
              offset="70%"
              stopColor={theme.palette.primary.main}
              stopOpacity={0}
            />
          </linearGradient>
          <linearGradient id="close" x1="0" y1="0" x2="0" y2="1">
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
        <XAxis
          dataKey="time"
          tickCount={5}
          type="number"
          tickFormatter={(tick) => tickXFormatter(tick)}
        />
        <YAxis tickFormatter={(tick) => tickYFormatter(tick)} />
        <Legend />
        <Tooltip
          formatter={(value: number) => tooltipFormatter(value)}
          labelFormatter={(label) => dateFormatter(label)}
          contentStyle={{
            borderRadius: 15,
            backgroundColor: theme.palette.background.default,
          }}
        />
        <Area
          type="monotone"
          dataKey="high"
          stroke={theme.palette.error.light}
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#high)"
        />
        <Area
          type="monotone"
          dataKey="low"
          stroke={theme.palette.success.light}
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#low)"
        />
        <Area
          type="monotone"
          dataKey="open"
          stroke={theme.palette.primary.main}
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#open)"
        />
        <Area
          type="monotone"
          dataKey="close"
          stroke={theme.palette.secondary.main}
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#close)"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default GasPriceHistory
