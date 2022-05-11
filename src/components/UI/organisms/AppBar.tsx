import React from 'react'
import {
  makeStyles,
  Theme,
  AppBar as MuiAppBar,
  Toolbar,
} from '@material-ui/core'
import SideUtils from '../molecules/SideUtils'
import SearchBar from '../molecules/SearchBar'
import { drawerWidth } from '../../../common/dimensions'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    backgroundColor: theme.palette.background.default,
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    marginLeft: drawerWidth,
    marginTop: '13px',
  },
}))

function AppBar() {
  const classes = useStyles()

  return (
    <MuiAppBar className={classes.main} elevation={0}>
      <Toolbar className={classes.toolbar}>
        <SearchBar />
        <SideUtils />
      </Toolbar>
    </MuiAppBar>
  )
}

export default AppBar
