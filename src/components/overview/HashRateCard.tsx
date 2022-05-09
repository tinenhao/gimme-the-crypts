import React from 'react'
import { makeStyles, Theme } from '@material-ui/core'
import CardLayout from '../template/CardLayout'

const useStyles = makeStyles((theme: Theme) => ({
  main: {},
}))

function HashRateCard() {
  const classes = useStyles()
  return (
    <CardLayout>
      <div> Hash Rate Card </div>
    </CardLayout>
  )
}

export default HashRateCard
