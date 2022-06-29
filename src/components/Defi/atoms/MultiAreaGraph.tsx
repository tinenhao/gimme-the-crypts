import React from 'react'
import { useTheme } from '@material-ui/core'
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { formatMarketCap, formatYAxis } from '../../../common/number'
import { useAppSelector } from '../../../app/hooks'
import { chartData } from '../../../models/api/defi'
import chroma from 'chroma-js'
import moment from 'moment'

interface Prop {
  type: number
}

interface data {
  date: number
  [key: string]: number
}

function MultiAreaGraph(prop: Prop) {
  const theme = useTheme()
  const defi = useAppSelector((state) => state.defiProtocol)
  const protocol = defi.protocol

  const chainTVLArr = protocol.chains.map(
    (chain) => protocol.chainTvls[chain].tvl,
  )
  const chartData = chainTVLArr[indexOfLongestArray(chainTVLArr)].map(
    (data) => {
      const element: data = { date: data.date }
      for (let i = 0; i < protocol.chains.length; i++) {
        if (
          protocol.chainTvls[protocol.chains[i]].tvl.find(
            (value) => value.date === data.date,
          )
        ) {
          element[protocol.chains[i]] =
            protocol.chainTvls[protocol.chains[i]].tvl.find(
              (value) => value.date === data.date,
            )?.totalLiquidityUSD || 0
        }
      }
      return element
    },
  )

  const tokens = [] as string[]
  let tokenData = [] as data[]
  if (prop.type === 1) {
    tokenData = protocol.tokensInUsd.map((entry) => {
      const element: data = { date: entry.date }
      for (let i = 0; i < Object.keys(entry.tokens).length; i++) {
        const tokenName = Object.keys(entry.tokens)[i]
        if (entry.tokens[tokenName] !== 0) {
          element[tokenName] = entry.tokens[tokenName]
          if (!tokens.includes(tokenName)) {
            tokens.push(tokenName)
          }
        }
      }
      return element
    })
  }

  const numColors = prop.type === 0 ? protocol.chains.length : tokens.length
  const colors = chroma
    .scale(['#f61802', '#f5bb51', '#ffcc40', '#11e4a2', '#1da1f2', '#a660ff'])
    .colors(numColors)

  function indexOfLongestArray(arr: chartData[][]) {
    return arr.reduce((x, y, idx) => (arr[x].length > y.length ? x : idx), 0)
  }

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
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={prop.type === 0 ? chartData : tokenData}
        margin={{ top: 20 }}
      >
        {(prop.type === 0 ? protocol.chains : tokens).map((chain, index) => (
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
        <YAxis
          tickFormatter={(tick) => formatYAxis(tick)}
          domain={['auto', 'auto']}
        />
        <Tooltip
          formatter={(value: number) => tooltipFormatter(value)}
          itemSorter={(item) => {
            return (item.value as number) * -1
          }}
          labelFormatter={(label) => dateFormatter(label)}
          contentStyle={{
            borderRadius: 15,
            backgroundColor: theme.palette.background.default,
          }}
        />
        {(prop.type === 0 ? protocol.chains : tokens).map((chain, index) => (
          <Area
            key={index}
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

export default MultiAreaGraph
