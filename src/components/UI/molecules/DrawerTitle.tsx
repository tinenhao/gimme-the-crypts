import React from 'react'
import { makeStyles, Typography } from '@material-ui/core'
import { appBarHeight } from '../../../common/dimensions'
import Logo from '../atoms/Logo'

const useStyles = makeStyles(() => ({
  main: {
    display: 'flex',
    height: appBarHeight,
    marginLeft: '20px',
  },
  type: {
    margin: 'auto',
  },
}))

function DrawerTitle() {
  const classes = useStyles()

  return (
    <div className={classes.main}>
      <Logo />
      <Typography align="center" variant="h6" className={classes.type}>
        Gimme the Crypts
      </Typography>
    </div>
  )
}

export default DrawerTitle
