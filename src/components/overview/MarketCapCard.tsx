import React from 'react'
import { makeStyles, Theme } from '@material-ui/core'
import CardLayout from '../template/CardLayout'

const useStyles = makeStyles((theme: Theme) => ({
  main: {},
}))

function MarketCapCard() {
  const classes = useStyles()
  return (
    <CardLayout>
      <div> Market Capitalization Card </div>
    </CardLayout>
  )
}

export default MarketCapCard
