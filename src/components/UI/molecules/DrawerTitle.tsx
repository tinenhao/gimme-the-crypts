import React from 'react'
import { makeStyles, Theme, Typography } from '@material-ui/core'
import { appBarHeight, drawerWidth } from '../../../common/constants/dimensions'
import Logo from '../atoms/Logo'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    display: 'flex',
    height: appBarHeight,
    width: drawerWidth,
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
