import React from 'react'
import { makeStyles, Typography } from '@material-ui/core'
import ProtocolInformation from '../atoms/ProtocolInformation'
import TokenInformation from '../atoms/TokenInformation'
import Methodology from '../atoms/Methodology'

const useStyles = makeStyles(() => ({
  main: {
    width: '100%',
  },
}))

interface Prop {
  type: number
}

function DefiDetailsInfoLayout(prop: Prop) {
  const classes = useStyles()
  const titles = ['Protocol Information', 'Token Information', 'Methodology']
  const body = [
    <ProtocolInformation key={0} />,
    <TokenInformation key={1} />,
    <Methodology key={2} />,
  ]

  return (
    <div className={classes.main}>
      <Typography color="textSecondary">{titles[prop.type]}</Typography>
      {body[prop.type]}
    </div>
  )
}

export default DefiDetailsInfoLayout
