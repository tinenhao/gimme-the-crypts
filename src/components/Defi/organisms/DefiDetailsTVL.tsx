import React from 'react'
import { makeStyles, Theme } from '@material-ui/core'
import DefiDetailsTVLInfo from '../molecules/DefiDetailsTVLInfo'
import DefiDetailsTVLChart from '../molecules/DefiDetailsTVLChart'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
}))

function DefiDetailsTVL() {
  const classes = useStyles()

  return (
    <div className={classes.main}>
      <DefiDetailsTVLInfo />
      <DefiDetailsTVLChart />
    </div>
  )
}

export default DefiDetailsTVL
