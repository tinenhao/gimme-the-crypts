import React, { ReactElement } from 'react'
import { makeStyles, Theme, Card } from '@material-ui/core'

interface Props {
  children: ReactElement<any, any> | ReactElement<any, any>[]
}

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    backgroundColor: theme.palette.background.paper,
    height: '100%',
    borderRadius: '20px',
    overflowX: 'scroll',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
}))

function CardLayout(prop: Props) {
  const classes = useStyles()

  return <Card className={classes.main}>{prop.children}</Card>
}

export default CardLayout
