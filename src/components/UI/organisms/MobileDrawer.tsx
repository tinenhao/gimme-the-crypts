import React from 'react'
import { makeStyles, Theme, Drawer as MuiDrawer } from '@material-ui/core'
import { RootModule } from '../../../models/general/pages'
import { drawerWidth } from '../../../common/dimensions'
import DrawerTitle from '../molecules/DrawerTitle'
import DrawerContent from '../molecules/DrawerContent'

const useStyles = makeStyles((theme: Theme) => ({
  drawerPaper: {
    width: drawerWidth,
    borderWidth: 0,
    paddingRight: 12,
  },
}))

interface Prop {
  rootModule: RootModule[]
  open: boolean
  toggleDrawer: () => void
}

function Drawer(prop: Prop) {
  const classes = useStyles()

  return (
    <MuiDrawer
      classes={{ paper: classes.drawerPaper }}
      variant="temporary"
      open={prop.open}
      onClose={prop.toggleDrawer}
    >
      <DrawerTitle />
      <DrawerContent rootModule={prop.rootModule} />
    </MuiDrawer>
  )
}

export default Drawer
