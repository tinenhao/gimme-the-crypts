import React, { ReactElement } from 'react'
import { makeStyles, Theme, Card } from '@material-ui/core'

interface Props {
  children: ReactElement<any, any> | ReactElement<any, any>[]
  info?: boolean
}

const useStyles = (prop: Props) =>
  makeStyles((theme: Theme) => ({
    main: {
      backgroundColor: prop.info
        ? theme.palette.info.main
        : theme.palette.background.paper,
      height: '100%',
      borderRadius: '20px',
      overflowX: 'scroll',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
  }))

function CardLayout(prop: Props) {
  const classes = useStyles(prop)()

  return <Card className={classes.main}>{prop.children}</Card>
}

export default CardLayout
