import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Theme, makeStyles, Hidden } from '@material-ui/core'
import { RootModule, Page } from '../../models/general/pages'
import Drawer from '../UI/organisms/Drawer'
import AppBar from '../UI/organisms/AppBar'
import {
  drawerWidth,
  appBarHeight,
  leftMargin,
  rightMargin,
} from '../../common/constants/dimensions'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    // overflow: 'hidden',
  },
  content: {
    display: 'flex',
    height: `calc(100vh - ${appBarHeight}px)`,
    marginTop: appBarHeight,
    marginLeft: drawerWidth + leftMargin,
    marginRight: rightMargin,
    // overflowY: 'scroll',
    [theme.breakpoints.down('sm')]: {
      marginLeft: leftMargin,
      marginRight: rightMargin,
    },
  },
}))

interface Prop {
  rootModule: RootModule[]
}

function PageLayout(prop: Prop) {
  const classes = useStyles()

  const pages = prop.rootModule
    .map((module) => module.pages)
    .reduce((acc, element) => acc.concat(element), [])

  return (
    <div className={classes.root}>
      <Hidden smDown>
        <Drawer rootModule={prop.rootModule} />
        <AppBar />
      </Hidden>
      <div className={classes.content}>
        <Routes>
          {pages.map((page: Page) => {
            return (
              <Route key={page.path} path={page.path} element={page.page} />
            )
          })}
        </Routes>
      </div>
    </div>
  )
}

export default PageLayout
