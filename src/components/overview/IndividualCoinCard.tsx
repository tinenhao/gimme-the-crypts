import React from 'react'
import { makeStyles, Theme } from '@material-ui/core'
import CardLayout from '../template/CardLayout'

const useStyles = makeStyles((theme: Theme) => ({
  main: {},
}))

function IndividualCoinCard() {
  const classes = useStyles()
  return (
    <CardLayout>
      <div> Individual Coin Card </div>
    </CardLayout>
  )
}

export default IndividualCoinCard
