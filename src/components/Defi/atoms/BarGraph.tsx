import React from 'react'
import { useTheme } from '@material-ui/core'
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { formatMarketCap, formatYAxis } from '../../../common/number'
import { useAppSelector } from '../../../app/hooks'
import chroma from 'chroma-js'
import moment from 'moment'

interface Prop {
  type: number
}

interface data {
  date: number
  [key: string]: number
}

function BarGraph(prop: Prop) {
  const theme = useTheme()
  const defi = useAppSelector((state) => state.defiProtocol)
  const protocol = defi.protocol

  const chartData = protocol.tvl
    .map((element, index) => {
      if (index !== protocol.tvl.length - 1) {
        return {
          date: element.date,
          totalLiquidityUSD:
            protocol.tvl[index + 1].totalLiquidityUSD -
            element.totalLiquidityUSD,
        }
      }
    })
    .slice(0, -1)

  const tokens = [] as string[]
  let tokenData = [] as data[]
  if (prop.type === 1) {
    tokenData = protocol.tokensInUsd
      .map((entry, index) => {
        const element: data = { date: entry.date }
        if (index !== protocol.tokensInUsd.length - 1) {
          const tokenList = protocol.tokensInUsd[index + 1].tokens
          for (let i = 0; i < Object.keys(tokenList).length; i++) {
            const tokenName = Object.keys(tokenList)[i]
            const value = entry.tokens[tokenName]
              ? tokenList[tokenName] - entry.tokens[tokenName]
              : tokenList[tokenName]
            if (value !== 0) {
              element[tokenName] = value
              if (!tokens.includes(tokenName)) {
                tokens.push(tokenName)
              }
            }
          }
        }
        return element
      })
      .slice(0, -1)
  }

  const colors = chroma
    .scale(['#f61802', '#f5bb51', '#ffcc40', '#11e4a2', '#1da1f2', '#a660ff'])
    .colors(tokens.length)

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
      <BarChart data={prop.type === 0 ? chartData : tokenData}>
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
          formatter={(value: number) =>
            prop.type === 0
              ? [tooltipFormatter(value), 'USD Inflow']
              : tooltipFormatter(value)
          }
          itemSorter={(item) => {
            return (item.value as number) * -1
          }}
          labelFormatter={(label) => dateFormatter(label)}
          contentStyle={{
            borderRadius: 15,
            backgroundColor: theme.palette.background.default,
          }}
        />
        {prop.type === 0 ? (
          <Bar dataKey="totalLiquidityUSD" fill={protocol.color} />
        ) : (
          tokens.map((token, index) => {
            return <Bar key={index} dataKey={token} fill={colors[index]} />
          })
        )}
      </BarChart>
    </ResponsiveContainer>
  )
}

export default BarGraph
