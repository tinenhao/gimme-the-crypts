import React from 'react'
import { useTheme } from '@material-ui/core'
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from 'recharts'
import { useAppSelector } from '../../../app/hooks'
import moment from 'moment'
import chroma from 'chroma-js'

interface data {
  date: number
  [key: string]: number
}

function ChainPercentageGraph() {
  const theme = useTheme()
  const defi = useAppSelector((state) => state.defiProtocol)
  const chainList = [...defi.chainList]
    .sort((a, b) => b.tvl - a.tvl)
    .splice(0, 9)
    .map((chain) => chain.name)
  const chartData = defi.chainTVLList[0].map((chain) => {
    const tvl =
      defi.TVLChart.find((date) => date.date === chain.date)
        ?.totalLiquidityUSD || 0
    const element: data = { date: chain.date }
    let percentage = 0
    for (let i = 0; i < chainList.length; i++) {
      if (defi.chainTVLList[i].find((data) => data.date === chain.date)) {
        const value =
          Math.round(
            ((defi.chainTVLList[i].find((data) => data.date === chain.date)
              ?.totalLiquidityUSD || 0) *
              10000) /
              tvl,
          ) / 100
        element[chainList[i]] = value
        percentage += value
      }
    }
    element['Others'] = 100 - percentage
    return element
  })
  chainList.push('Others')

  const colors = chroma
    .scale(['#f61802', '#f5bb51', '#ffcc40', '#11e4a2', '#1da1f2', '#a660ff'])
    .colors(11)

  function tickXFormatter(tick: number) {
    return moment.unix(tick).format('YYYY')
  }

  function dateFormatter(date: string) {
    return moment.unix(parseInt(date)).format('Do MMM YYYY')
  }

  return (
    <ResponsiveContainer width={'95%'} height={'80%'}>
      <AreaChart data={chartData} stackOffset="expand">
        {chainList.map((chain, index) => (
          <defs key={index}>
            <linearGradient id={chain} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={colors[index]} stopOpacity={0.4} />
              <stop offset="95%" stopColor={colors[index]} stopOpacity={0} />
            </linearGradient>
          </defs>
        ))}
        <XAxis
          dataKey="date"
          domain={['dataMin', 'dataMax']}
          tickCount={6}
          type="number"
          tickFormatter={(tick) => tickXFormatter(tick)}
        />
        <YAxis />
        <Tooltip
          formatter={(value: number) => value.toFixed(2) + '%'}
          labelFormatter={(label) => dateFormatter(label)}
          contentStyle={{
            borderRadius: 15,
            backgroundColor: theme.palette.background.default,
          }}
        />
        <Legend />
        {chainList.map((chain, index) => (
          <Area
            key={index}
            stackId="1"
            type="monotone"
            dataKey={chain}
            stroke={colors[index]}
            strokeWidth={2}
            fillOpacity={1}
            fill={`url(#${chain})`}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default ChainPercentageGraph
