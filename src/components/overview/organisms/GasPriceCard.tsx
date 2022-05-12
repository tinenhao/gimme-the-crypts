import React from 'react'
import { makeStyles, Theme } from '@material-ui/core'
import CardLayout from '../../template/CardLayout'

const useStyles = makeStyles((theme: Theme) => ({
  main: {},
}))

function GasPriceCard() {
  const classes = useStyles()
  return (
    <CardLayout>
      <div> Gas Price Card </div>
    </CardLayout>
  )
}

export default GasPriceCard
