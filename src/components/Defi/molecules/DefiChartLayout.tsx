import React from 'react'
import { makeStyles, Theme, Typography } from '@material-ui/core'
import MultiAreaGraph from '../atoms/MultiAreaGraph'
import BarGraph from '../atoms/BarGraph'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    height: 400,
    width: '100%',
    padding: 25,
  },
}))

interface Prop {
  type: number
}

function DefiChartLayout(prop: Prop) {
  const classes = useStyles()
  const titles = ['Chains', 'Tokens', 'USD Inflows', 'Token Inflows']
  const graphs = [
    <MultiAreaGraph type={0} key={0} />,
    <MultiAreaGraph type={1} key={1} />,
    <BarGraph key={2} type={0} />,
    <BarGraph key={3} type={1} />,
  ]

  return (
    <div className={classes.main}>
      <Typography>{titles[prop.type]}</Typography>
      {graphs[prop.type]}
    </div>
  )
}

export default DefiChartLayout
