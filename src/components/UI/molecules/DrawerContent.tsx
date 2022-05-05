import React from 'react'
import { RootModule } from '../../../models/general/pages'
import {
  makeStyles,
  Theme,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
} from '@material-ui/core'

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
          <ListItem
            key={element.index}
            disableGutters
            button
            onClick={() => console.log('test')}
          >
            <ListItemAvatar>
              <Avatar>{element.icon}</Avatar>
            </ListItemAvatar>
            <ListItemText primary={element.label} />
          </ListItem>
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
