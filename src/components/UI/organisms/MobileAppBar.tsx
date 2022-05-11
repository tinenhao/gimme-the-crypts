import React from 'react'
import {
  Theme,
  makeStyles,
  AppBar as MuiAppBar,
  Toolbar,
} from '@material-ui/core'
import SideUtils from '../molecules/SideUtils'
import MobileMainUtils from '../molecules/MobileMainUtils'

interface Prop {
  toggleDrawer: () => void
}

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    backgroundColor: theme.palette.background.default,
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '13px',
  },
}))

function MobileAppBar(prop: Prop) {
  const classes = useStyles()

  return (
    <MuiAppBar className={classes.main} elevation={0}>
      <Toolbar className={classes.toolbar}>
        <MobileMainUtils toggleDrawer={prop.toggleDrawer} />
        <SideUtils />
      </Toolbar>
    </MuiAppBar>
  )
}

export default MobileAppBar
