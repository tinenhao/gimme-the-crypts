import React from 'react'
import { makeStyles, Theme } from '@material-ui/core'
import CardLayout from '../../template/CardLayout'

const useStyles = makeStyles((theme: Theme) => ({
  main: {},
}))

function CoinListCard() {
  const classes = useStyles()
  return (
    <CardLayout>
      <div> Coin List Card </div>
    </CardLayout>
  )
}

export default CoinListCard
