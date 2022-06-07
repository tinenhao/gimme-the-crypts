import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Theme, makeStyles, Hidden } from '@material-ui/core'
import { RootModule, Page } from '../../models/general/pages'
import Drawer from '../UI/organisms/Drawer'
import AppBar from '../UI/organisms/AppBar'
import MobileDrawer from '../UI/organisms/MobileDrawer'
import MobileAppBar from '../UI/organisms/MobileAppBar'
import {
  drawerWidth,
  appBarHeight,
  leftMargin,
  rightMargin,
} from '../../common/dimensions'

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    display: 'flex',
    height: `calc(100vh - ${appBarHeight}px)`,
    marginTop: appBarHeight,
    marginLeft: drawerWidth + leftMargin,
    marginRight: rightMargin,
    overflowX: 'hidden',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
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
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false)

  function handleDrawerClick() {
    setDrawerOpen(!drawerOpen)
  }

  const pages = prop.rootModule
    .map((module) => module.pages)
    .reduce((acc, element) => acc.concat(element), [])

  return (
    <div>
      <Hidden smDown>
        <Drawer rootModule={prop.rootModule} />
        <AppBar />
      </Hidden>
      <Hidden mdUp>
        <MobileDrawer
          rootModule={prop.rootModule}
          open={drawerOpen}
          toggleDrawer={handleDrawerClick}
        />
        <MobileAppBar toggleDrawer={handleDrawerClick} />
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
