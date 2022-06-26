import React from 'react'
import { useTheme, Box, Typography } from '@material-ui/core'
import { useAppSelector } from '../../../app/hooks'
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

function HistoricalTVLGraph() {
  const theme = useTheme()
  const defi = useAppSelector((state) => state.defiProtocol)
  const chartData = defi.TVLChart

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
    <ResponsiveContainer width="95%" height="80%">
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
        <Tooltip
          formatter={(value: number) => [tooltipFormatter(value), 'TVL']}
          labelFormatter={(label) => dateFormatter(label)}
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
        <Area
          type="monotone"
          dataKey="totalLiquidityUSD"
          stroke={theme.palette.secondary.main}
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#chart)"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default HistoricalTVLGraph
