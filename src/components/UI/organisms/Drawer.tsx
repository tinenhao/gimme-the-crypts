import React from 'react'
import { makeStyles, Drawer as MuiDrawer } from '@material-ui/core'
import { RootModule } from '../../../models/general/pages'
import { drawerWidth } from '../../../common/dimensions'
import DrawerTitle from '../molecules/DrawerTitle'
import DrawerContent from '../molecules/DrawerContent'

const useStyles = makeStyles(() => ({
  drawerPaper: {
    background: 'transparent',
    width: drawerWidth,
    borderWidth: 0,
  },
}))

interface Prop {
  rootModule: RootModule[]
}

function Drawer(prop: Prop) {
  const classes = useStyles()

  return (
    <MuiDrawer classes={{ paper: classes.drawerPaper }} variant="permanent">
      <DrawerTitle />
      <DrawerContent rootModule={prop.rootModule} />
    </MuiDrawer>
  )
}

export default Drawer
