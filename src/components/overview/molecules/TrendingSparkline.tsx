import React from 'react'
import { useTheme } from '@material-ui/core'
import { Area, AreaChart, ResponsiveContainer, YAxis } from 'recharts'

interface Prop {
  data: [number, number][]
  positive?: boolean
}

interface DataFormat {
  date: number
  price: number
}

function TrendingSparkline(prop: Prop) {
  const theme = useTheme()
  const chartdata = prop.data.map((element) => {
    const datapoint = {} as DataFormat
    datapoint.date = element[0]
    datapoint.price = element[1]
    return datapoint
  })
  const gain =
    prop.positive !== undefined
      ? prop.positive
      : chartdata[0].price < chartdata[chartdata.length - 1].price

  return (
    <ResponsiveContainer height="100%" width="100%">
      <AreaChart
        data={chartdata}
        margin={{ top: 0, right: 0, bottom: 0, left: 20 }}
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
              offset={'75%'}
              stopColor={
                gain ? theme.palette.success.light : theme.palette.error.light
              }
              stopOpacity={0}
            />
          </linearGradient>
        </defs>
        <YAxis
          hide
          domain={[
            (dataMin: number) => dataMin * 0.95,
            (dataMax: number) => dataMax * 1.05,
          ]}
        />
        <Area
          type="monotone"
          dataKey={'price'}
          strokeWidth={2}
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
