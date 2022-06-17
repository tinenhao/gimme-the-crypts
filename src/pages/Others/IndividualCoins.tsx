import React from 'react'
import { makeStyles } from '@material-ui/core'
import IndividualCoinCard from '../../components/coins/organisms/IndividualCoinCard'

const useStyles = makeStyles(() => ({
  main: {
    width: '100%',
    height: '97%',
  },
}))

function Coins() {
  const classes = useStyles()

  return (
    <div className={classes.main}>
      <IndividualCoinCard />
    </div>
  )
}

export default Coins
