import React, { ReactElement } from 'react'
import { makeStyles, Theme, Tooltip as MuiTooltip } from '@material-ui/core'

interface Prop {
  children: ReactElement<any, any>
  title: string | ReactElement<any, any>
}

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    backgroundColor: theme.palette.background.paper,
    fontSize: '11px',
    fontFamily: 'erbaum',
    border: `1px solid ${theme.palette.text.secondary}`,
    borderRadius: '15px',
    marginTop: 5,
    textAlign: 'center',
  },
}))

function Tooltip(prop: Prop) {
  const classes = useStyles()
  return (
    <MuiTooltip classes={{ tooltip: `${classes.main}` }} title={prop.title}>
      {prop.children}
    </MuiTooltip>
  )
}

export default Tooltip
