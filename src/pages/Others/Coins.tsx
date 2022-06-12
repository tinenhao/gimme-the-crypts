import React from 'react'
import { makeStyles } from '@material-ui/core'
import CoinListCard from '../../components/coins/organisms/CoinListCard'

const useStyles = makeStyles(() => ({
  main: {
    width: '100%',
    height: '100%',
  },
}))

function Coins() {
  const classes = useStyles()

  return (
    <div className={classes.main}>
      <CoinListCard />
    </div>
  )
}

export default Coins
