import React from 'react'
import { useTheme } from '@material-ui/core'
import { CoinMarketChart } from '../../../models/api/coinMarketChart'
import { Area, AreaChart, ResponsiveContainer } from 'recharts'

interface Prop {
  data: Record<string, unknown>
  coin: string
}

interface DataFormat {
  date: number
  price: number
}

function TrendingSparkline(prop: Prop) {
  const theme = useTheme()
  const data: CoinMarketChart = prop.data[prop.coin] as CoinMarketChart
  const chartdata = data.prices.map((element) => {
    const datapoint = {} as DataFormat
    datapoint.date = element[0]
    datapoint.price = element[1]
    return datapoint
  })
  const gain = chartdata[0].price < chartdata[23].price

  return (
    <ResponsiveContainer height="100%" width="100%">
      <AreaChart
        data={chartdata}
        margin={{ top: 0, right: 20, bottom: 0, left: 30 }}
      >
        <defs>
          <linearGradient
            id={gain ? 'gain' : 'loss'}
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop
              offset="5%"
              stopColor={
                gain ? theme.palette.success.light : theme.palette.error.light
              }
              stopOpacity={0.8}
            />
            <stop
              offset="85%"
              stopColor={
                gain ? theme.palette.success.light : theme.palette.error.light
              }
              stopOpacity={0}
            />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey={'price'}
          strokeWidth={3}
          stroke={
            gain ? theme.palette.success.light : theme.palette.error.light
          }
          fillOpacity={1}
          fill={`url(#${gain ? 'gain' : 'loss'})`}
          animationDuration={2000}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default TrendingSparkline
