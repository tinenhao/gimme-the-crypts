import React from 'react'
import { useTheme, Box, Typography } from '@material-ui/core'
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { chartData } from '../../../models/api/defi'
import { formatMarketCap, formatYAxis } from '../../../common/number'
import moment from 'moment'

interface Prop {
  chartData: chartData[]
  color?: string
  individual?: boolean
}

function HistoricalTVLGraph(prop: Prop) {
  const theme = useTheme()

  function tickXFormatter(tick: number) {
    return moment.unix(tick).format('YYYY')
  }

  function tooltipFormatter(value: number) {
    return 'US$' + formatMarketCap(value)
  }

  function dateFormatter(date: string) {
    return moment.unix(parseInt(date)).format('Do MMM YYYY')
  }

  return (
    <ResponsiveContainer
      width={prop.individual ? '100%' : '95%'}
      height={prop.individual ? '90%' : '80%'}
    >
      <AreaChart data={prop.chartData} margin={{ top: 20 }}>
        <defs>
          <linearGradient id="chart" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor={prop.color ? prop.color : theme.palette.secondary.main}
              stopOpacity={0.4}
            />
            <stop
              offset="95%"
              stopColor={prop.color ? prop.color : theme.palette.secondary.main}
              stopOpacity={0}
            />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="date"
          domain={['dataMin', 'dataMax']}
          tickCount={6}
          type="number"
          tickFormatter={(tick) => tickXFormatter(tick)}
        />
        <YAxis
          tickFormatter={(tick) => formatYAxis(tick)}
          domain={['auto', 'auto']}
        />
        {prop.individual ? (
          <Tooltip
            formatter={(value: number) => [tooltipFormatter(value), 'TVL']}
            labelFormatter={(label) => dateFormatter(label)}
            contentStyle={{
              borderRadius: 15,
              backgroundColor: theme.palette.background.default,
            }}
          />
        ) : (
          <Tooltip
            position={{ x: 70, y: 10 }}
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <Box display="flex" flexDirection="column">
                    <Typography variant="body2" color="textSecondary">
                      Total Value Locked
                    </Typography>
                    <Typography variant="h6" color="secondary">
                      {tooltipFormatter(payload[0].payload.totalLiquidityUSD)}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {dateFormatter(label)}
                    </Typography>
                  </Box>
                )
              } else {
                return null
              }
            }}
            contentStyle={{
              border: 'none',
              background: 'none',
            }}
          />
        )}
        <Area
          type="monotone"
          dataKey="totalLiquidityUSD"
          stroke={prop.color ? prop.color : theme.palette.secondary.main}
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#chart)"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default HistoricalTVLGraph
