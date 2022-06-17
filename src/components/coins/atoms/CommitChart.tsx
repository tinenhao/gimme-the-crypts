import React from 'react'
import { makeStyles, Theme, useTheme, Typography } from '@material-ui/core'
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import moment from 'moment'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    width: '100%',
    height: '50%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
}))

interface Prop {
  data: number[]
}

function CommitChart(prop: Prop) {
  const classes = useStyles()
  const theme = useTheme()
  const chartData = prop.data.map((element, index) => {
    return { date: index, commits: element }
  })

  function tickXFormatter(tick: number) {
    return moment().subtract(28, 'days').add(tick, 'days').format('DD/MM')
  }

  function dateFormatter(value: number) {
    return moment()
      .subtract(28, 'days')
      .add(value, 'days')
      .format('Do MMM YYYY')
  }

  return (
    <div className={classes.main}>
      {prop.data.length !== 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ left: -30, top: 20, bottom: -10 }}
          >
            <XAxis tickFormatter={(tick) => tickXFormatter(tick)} />
            <YAxis />
            <Tooltip
              labelFormatter={(label) => dateFormatter(label)}
              contentStyle={{
                borderRadius: 15,
                backgroundColor: theme.palette.background.default,
              }}
            />
            <Bar dataKey="commits" fill={theme.palette.secondary.main} />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <Typography align="center" color="textSecondary">
          No data available
        </Typography>
      )}
    </div>
  )
}

export default CommitChart
