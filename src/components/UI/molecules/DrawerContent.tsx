import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
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
    marginLeft: '40px',
  },
}))

interface Prop {
  rootModule: RootModule[]
}

function handleClick() {
  return null
}

function DrawerContent(prop: Prop) {
  const classes = useStyles()

  return (
    <div className={classes.main}>
      {prop.rootModule.map((section) => (
        <div key={section.index}>
          <Typography>{section.moduleName}</Typography>
          <List>
            {section.pages.map((element) => (
              <ListItem
                key={element.index}
                disableGutters
                button
                onClick={handleClick}
              >
                <ListItemAvatar>
                  <Avatar>{element.icon}</Avatar>
                </ListItemAvatar>
                <ListItemText primary={element.label} />
              </ListItem>
            ))}
          </List>
        </div>
      ))}
    </div>
  )
}

export default DrawerContent
