import React from 'react'
import { makeStyles, Theme, useTheme } from '@material-ui/core'
import { pools } from '../../../models/api/btcHashRate'
import { Pie, PieChart, ResponsiveContainer, Tooltip, Cell } from 'recharts'
import chroma from 'chroma-js'

const useStyles = makeStyles((theme: Theme) => ({}))

interface Prop {
  data: pools
}

function GasPriceHistory(prop: Prop) {
  const classes = useStyles()
  const theme = useTheme()
  let totalBlocks = 0
  const keys = Object.keys(prop.data)
  const chartData = keys.map((element) => {
    totalBlocks += parseInt(prop.data[element])
    return { pool: element, blocks: prop.data[element] }
  })

  function tooltipFormatter(value: number) {
    const percentage = ((value * 100) / totalBlocks).toFixed(2)
    return value + ` blocks (${percentage}%)`
  }

  return (
    <ResponsiveContainer height="75%" width="95%">
      <PieChart>
        <Pie
          data={chartData}
          dataKey="blocks"
          nameKey="pool"
          cx="50%"
          cy="50%"
          innerRadius="45%"
          outerRadius="60%"
          label={(data) => data.pool}
          paddingAngle={5}
        >
          {chartData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={
                chroma
                  .scale([
                    theme.palette.success.light,
                    theme.palette.error.light,
                  ])
                  .colors(7)[index]
              }
              stroke={
                chroma
                  .scale([
                    theme.palette.success.light,
                    theme.palette.error.light,
                  ])
                  .colors(7)[index]
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

export default GasPriceHistory
