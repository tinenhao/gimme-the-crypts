import React from 'react'
import { makeStyles, Theme } from '@material-ui/core'
import CardLayout from '../../template/CardLayout'

const useStyles = makeStyles((theme: Theme) => ({
  main: {},
}))

function DefiDominanceCard() {
  const classes = useStyles()
  return (
    <CardLayout>
      <div> Defi Dominance Card </div>
    </CardLayout>
  )
}

export default DefiDominanceCard
