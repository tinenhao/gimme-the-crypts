import React from 'react'
import { makeStyles, Theme } from '@material-ui/core'
import { RootModule } from '../../../models/general/pages'
import { drawerWidth } from '../../../common/constants/dimensions'
import DrawerTitle from '../molecules/DrawerTitle'
import DrawerContent from '../molecules/DrawerContent'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: drawerWidth,
  },
}))

interface Prop {
  rootModule: RootModule[]
}

function Drawer(prop: Prop) {
  const classes = useStyles()

  return (
    <div className={classes.main}>
      <DrawerTitle />
      <DrawerContent />
    </div>
  )
}

export default Drawer
