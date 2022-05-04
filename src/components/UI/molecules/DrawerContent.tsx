import React from 'react'
import { RootModule } from '../../../models/general/pages'
import { makeStyles, Theme } from '@material-ui/core'
import {
  List,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
} from '@mui/material'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '15%',
  },
}))

interface Prop {
  rootModule: RootModule[]
}

function DrawerTabs(pages: RootModule[]) {
  return pages.map((section) => (
    <div key={section.index}>
      <Typography>{section.moduleName}</Typography>
      <List>
        {section.pages.map((element) => (
          <ListItemButton key={element.index} disableGutters divider>
            <ListItemAvatar>
              <Avatar>{element.icon}</Avatar>
            </ListItemAvatar>
            <ListItemText primary={element.label} />
          </ListItemButton>
        ))}
      </List>
    </div>
  ))
}

function DrawerContent(prop: Prop) {
  const classes = useStyles()

  return <div className={classes.main}>{DrawerTabs(prop.rootModule)}</div>
}

export default DrawerContent
