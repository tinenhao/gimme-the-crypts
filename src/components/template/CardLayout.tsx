import React, { ReactElement } from 'react'
import { makeStyles, Theme, Card } from '@material-ui/core'

interface Prop {
  children: ReactElement<any, any>
}

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    backgroundColor: theme.palette.background.paper,
    height: '100%',
    borderRadius: '20px',
  },
  paper: {
    marginLeft: '20px',
  },
}))

function CardLayout(prop: Prop) {
  const classes = useStyles()

  return <Card className={classes.main}>{prop.children}</Card>
}

export default CardLayout
