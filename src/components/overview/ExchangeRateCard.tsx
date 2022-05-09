import React from 'react'
import { makeStyles, Theme } from '@material-ui/core'
import CardLayout from '../template/CardLayout'

const useStyles = makeStyles((theme: Theme) => ({
  main: {},
}))

function ExchangeRateCard() {
  const classes = useStyles()
  return (
    <CardLayout>
      <div> Exchange Rate Card </div>
    </CardLayout>
  )
}

export default ExchangeRateCard
