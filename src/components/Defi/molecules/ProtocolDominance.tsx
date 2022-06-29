import React from 'react'
import { makeStyles, Theme, CardHeader } from '@material-ui/core'
import CardLayout from '../../template/CardLayout'
import ProtocolDonut from '../atoms/ProtocolDonut'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    width: 410,
    height: 400,
    padding: 5,
    [theme.breakpoints.down('md')]: {
      width: '60%',
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
}))

function ProtocolDominance() {
  const classes = useStyles()

  return (
    <div className={classes.main}>
      <CardLayout>
        <CardHeader
          title="Top Protocols"
          titleTypographyProps={{
            variant: 'body1',
          }}
        />
        <ProtocolDonut />
      </CardLayout>
    </div>
  )
}

export default ProtocolDominance
