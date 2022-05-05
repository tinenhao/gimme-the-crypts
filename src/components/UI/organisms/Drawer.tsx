import React from 'react'
import { makeStyles, Theme, Drawer as MuiDrawer } from '@material-ui/core'
import { RootModule } from '../../../models/general/pages'
import { drawerWidth } from '../../../common/constants/dimensions'
import DrawerTitle from '../molecules/DrawerTitle'
import DrawerContent from '../molecules/DrawerContent'

const useStyles = makeStyles((theme: Theme) => ({
  drawerPaper: {
    background: 'transparent',
    width: drawerWidth,
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
