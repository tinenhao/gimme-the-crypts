import React from 'react'
import { useTheme } from '@material-ui/core'
import { useAppSelector } from '../../../app/hooks'
import { formatMarketCap } from '../../../common/number'
import { Pie, PieChart, ResponsiveContainer, Tooltip, Cell } from 'recharts'
import chroma from 'chroma-js'

interface Prop {
  type: number
}

function ProtocolDonut(prop: Prop) {
  const theme = useTheme()
  const defi = useAppSelector((state) => state.defiProtocol)
  const tvl = defi.TVLChart[defi.TVLChart.length - 1].totalLiquidityUSD
  const chartData = (
    prop.type === 0 ? [...defi.protocolList] : [...defi.chainList]
  )
    .sort((a, b) => b.tvl - a.tvl)
    .splice(0, 10)
    .map((protocol) => {
      return { name: protocol.name, percentage: protocol.tvl / tvl }
    })
  const others = 1 - chartData.reduce((x, y) => x + y.percentage, 0)
  chartData.push({ name: 'Others', percentage: others })

  // const tokenData = [...defi.chainList].sort((a, b) => b.tvl - a.tvl).splice(0, 10).map((chain) => {
  //   return {name: chain.name, percentage: per}
  // })

  function customizeLabel(data: any) {
    const RADIAN = Math.PI / 180
    const radius = 25 + data.innerRadius + (data.outerRadius - data.innerRadius)
    const x = data.cx + radius * Math.cos(-data.midAngle * RADIAN)
    const y = data.cy + radius * Math.sin(-data.midAngle * RADIAN)

    return (
      <text
        x={x}
        y={y}
        fill={
          chroma
            .scale([theme.palette.primary.main, theme.palette.secondary.main])
            .colors(11)[data.index]
        }
        textAnchor={x > data.cx ? 'start' : 'end'}
        dominantBaseline="central"
        width={20}
        fontSize={12}
      >
        {data.name}
      </text>
    )
  }

  function tooltipFormatter(percentage: number) {
    const marketCap = formatMarketCap(percentage * tvl)
    return 'US$ ' + marketCap + ' (' + (percentage * 100).toFixed(2) + '%)'
  }

  return (
    <ResponsiveContainer height="80%" width="100%">
      <PieChart>
        <Pie
          data={chartData}
          dataKey="percentage"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius="35%"
          outerRadius="50%"
          isAnimationActive={false}
          label={customizeLabel}
          paddingAngle={8}
          startAngle={40}
          endAngle={392}
        >
          {chartData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={
                chroma
                  .scale([
                    theme.palette.primary.main,
                    theme.palette.secondary.main,
                  ])
                  .colors(11)[index]
              }
              stroke={
                chroma
                  .scale([
                    theme.palette.primary.main,
                    theme.palette.secondary.main,
                  ])
                  .colors(11)[index]
              }
            />
          ))}
        </Pie>
        <Tooltip
          formatter={(value: number) => tooltipFormatter(value)}
          itemStyle={{ color: theme.palette.text.primary }}
          contentStyle={{
            borderRadius: 15,
            backgroundColor: theme.palette.background.default,
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default ProtocolDonut
