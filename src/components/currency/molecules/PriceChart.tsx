import React from 'react'
import { useTheme } from '@material-ui/core'
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  YAxis,
  XAxis,
} from 'recharts'
import { Dataformat } from '../../../models/api/coinMarketChart'
import moment from 'moment'

interface Prop {
  timeframe: number
  data: Dataformat[]
}

function PriceChart(prop: Prop) {
  const theme = useTheme()
  const gain = prop.data[0].price < prop.data[prop.data.length - 1].price

  function tickXFormatter(tick: number) {
    if (prop.timeframe === 4) {
      return moment(tick).format('MMM')
    } else if (
      prop.timeframe === 3 ||
      prop.timeframe === 2 ||
      prop.timeframe === 1
    ) {
      return moment(tick).format('MM/DD')
    } else {
      return moment(tick).format('HH') + '00'
    }
  }

  function tooltipFormatter(value: number) {
    return value.toFixed(5)
  }

  function dateFormatter(day: number) {
    if (prop.timeframe === 4 || prop.timeframe === 3 || prop.timeframe === 2) {
      return moment(day).format('Do MMM YYYY')
    } else {
      return moment(day).format('Do MMM YYYY HH') + '00'
    }
  }

  return (
    <ResponsiveContainer height="100%" width="100%">
      <LineChart data={prop.data} margin={{ top: 12 }}>
        <Tooltip
          formatter={(value: number) => [
            tooltipFormatter(value),
            'Exchange Rate',
          ]}
          labelFormatter={(label) => dateFormatter(label)}
          contentStyle={{
            borderRadius: 15,
            backgroundColor: theme.palette.background.default,
          }}
        />
        <YAxis type="number" domain={['auto', 'auto']} />
        <XAxis
          dataKey="time"
          domain={['auto', 'auto']}
          type="number"
          tickFormatter={(tick) => tickXFormatter(tick)}
        />
        <Line
          type="monotone"
          dataKey={'price'}
          strokeWidth={3}
          stroke={
            gain ? theme.palette.success.light : theme.palette.error.light
          }
          fillOpacity={0}
          animationDuration={2000}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default PriceChart
