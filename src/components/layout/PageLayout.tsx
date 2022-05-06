import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Theme, makeStyles } from '@material-ui/core/styles'
import { RootModule, Page } from '../../models/general/pages'
import Drawer from '../UI/organisms/Drawer'
import AppBar from '../UI/organisms/AppBar'
import { drawerWidth, appBarHeight } from '../../common/constants/dimensions'

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    marginTop: appBarHeight,
    marginLeft: drawerWidth,
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
    <div>
      <Drawer rootModule={prop.rootModule} />
      <AppBar />
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
