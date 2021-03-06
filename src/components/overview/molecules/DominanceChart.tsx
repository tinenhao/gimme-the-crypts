import React from 'react'
import { useTheme } from '@material-ui/core'
import { CoinMarketChart } from '../../../models/api/coinMarketChart'
import { CoinMarketChartDataTypes } from '../../../models/api/coinMarketChart'
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
  type: CoinMarketChartDataTypes
  coinsData: { [key: string]: CoinMarketChart }
}

function DominanceChart(prop: Prop) {
  const theme = useTheme()
  const coinColors = {
    avalanche: '#e13f40',
    polkadot: '#e6007a',
    solana: '#11e4a2',
    cardano: '#3265ca',
    ethereum: '#f0d46f',
  }

  let arr = Object.keys(prop.coinsData['ethereum'][prop.type])
  const keys = Object.keys(prop.coinsData)
  for (const key in keys) {
    if (Object.keys(prop.coinsData[keys[key]][prop.type]).length < arr.length) {
      arr = Object.keys(prop.coinsData[keys[key]][prop.type])
    }
  }

  const chartData = arr.map((element) => {
    const time = parseInt(element)
    const eth = prop.coinsData['ethereum'][prop.type][time][1]
    const ada = prop.coinsData['cardano'][prop.type][time][1]
    const sol = prop.coinsData['solana'][prop.type][time][1]
    const dot = prop.coinsData['polkadot'][prop.type][time][1]
    const avax = prop.coinsData['avalanche-2'][prop.type][time][1]
    return {
      time: time,
      Ethereum: eth,
      Cardano: ada,
      Solana: sol,
      Polkadot: dot,
      Avalanche: avax,
    }
  })

  function tickXFormatter(tick: number) {
    return moment().subtract(1, 'years').add(tick, 'days').format('MMM')
  }

  function tickYFormatter(tick: number) {
    if (prop.type === 'prices') {
      return tick.toString()
    }
    return (tick / 1000000000).toFixed(0) + 'B'
  }

  function tooltipFormatter(value: number) {
    if (prop.type === 'prices') {
      return 'US$' + value.toFixed(2)
    }
    const marketCap = (value / 1000000000).toFixed(2)
    return 'US$' + marketCap + ' Billion'
  }

  function dateFormatter(days: string) {
    return moment()
      .subtract(1, 'years')
      .add(parseInt(days), 'days')
      .format('Do MMM YYYY')
  }

  return (
    <ResponsiveContainer height="75%" width="95%">
      <AreaChart data={chartData} margin={{ top: 10 }}>
        <defs>
          <linearGradient id="ethereum" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor={coinColors['ethereum']}
              stopOpacity={0.4}
            />
            <stop
              offset="70%"
              stopColor={coinColors['ethereum']}
              stopOpacity={0}
            />
          </linearGradient>
          <linearGradient id="cardano" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor={coinColors['cardano']}
              stopOpacity={0.7}
            />
            <stop
              offset="70%"
              stopColor={coinColors['cardano']}
              stopOpacity={0}
            />
          </linearGradient>
          <linearGradient id="polkadot" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor={coinColors['polkadot']}
              stopOpacity={0.7}
            />
            <stop
              offset="70%"
              stopColor={coinColors['polkadot']}
              stopOpacity={0}
            />
          </linearGradient>
          <linearGradient id="solana" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor={coinColors['solana']}
              stopOpacity={0.7}
            />
            <stop
              offset="70%"
              stopColor={coinColors['solana']}
              stopOpacity={0}
            />
          </linearGradient>
          <linearGradient id="avalanche" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor={coinColors['avalanche']}
              stopOpacity={0.7}
            />
            <stop
              offset="70%"
              stopColor={coinColors['avalanche']}
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
          dataKey="Avalanche"
          stroke={coinColors['avalanche']}
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#avalanche)"
        />
        <Area
          type="monotone"
          dataKey="Cardano"
          stroke={coinColors['cardano']}
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#cardano)"
        />
        <Area
          type="monotone"
          dataKey="Ethereum"
          stroke={coinColors['ethereum']}
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#ethereum)"
        />
        <Area
          type="monotone"
          dataKey="Polkadot"
          stroke={coinColors['polkadot']}
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#polkadot)"
        />
        <Area
          type="monotone"
          dataKey="Solana"
          stroke={coinColors['solana']}
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#solana)"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default DominanceChart
