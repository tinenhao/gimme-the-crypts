import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Theme, makeStyles } from '@material-ui/core/styles'
import { RootModule, Page } from '../../models/general/pages'
import Drawer from '../UI/organisms/Drawer'
import AppBar from '../UI/organisms/AppBar'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    display: 'flex',
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
    <div className={classes.main}>
      <AppBar />
      <Drawer rootModule={prop.rootModule} />
      <Routes>
        {pages.map((page: Page) => {
          return <Route key={page.path} path={page.path} element={page.page} />
        })}
      </Routes>
    </div>
  )
}

export default PageLayout
