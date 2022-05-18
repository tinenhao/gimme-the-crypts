import React from 'react'
import { makeStyles, Theme, useTheme } from '@material-ui/core'
import { marketCapPercentage } from '../../../models/api/global'
import { Pie, PieChart, ResponsiveContainer, Tooltip, Cell } from 'recharts'
import chroma from 'chroma-js'

const useStyles = makeStyles((theme: Theme) => ({}))

interface Prop {
  marketCap: number
  percentages: marketCapPercentage
}

function Donut(prop: Prop) {
  const classes = useStyles()
  const theme = useTheme()
  const coins = Object.keys(prop.percentages)
  const others = 100 - coins.reduce((x, y) => x + prop.percentages[y], 0)
  const chartData = coins.map((data) => {
    return {
      coin: data.toUpperCase(),
      percentage: prop.percentages[data],
    }
  })
  chartData.push({ coin: 'Others', percentage: others })

  function tooltipFormatter(percentage: number) {
    const marketCap = ((percentage * prop.marketCap) / 100000000000).toFixed(2)
    return marketCap + ' Billion (' + percentage.toFixed(2) + '%)'
  }

  return (
    <ResponsiveContainer height="80%" width="100%">
      <PieChart>
        <Pie
          data={chartData}
          dataKey="percentage"
          nameKey="coin"
          cx="50%"
          cy="40%"
          innerRadius="45%"
          outerRadius="60%"
          label={(data) => data.coin}
          paddingAngle={8}
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
          formatter={(value: number, name: string) => tooltipFormatter(value)}
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

export default Donut
