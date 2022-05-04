import React from 'react'
import { Theme, makeStyles } from '@material-ui/core/styles'
import { RootModule } from '../../models/general/pages'
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

  return (
    <div className={classes.main}>
      <AppBar />
      <Drawer rootModule={prop.rootModule} />
    </div>
  )
}

export default PageLayout
