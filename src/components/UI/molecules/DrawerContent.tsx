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
    '& .MuiListItem-root.Mui-selected': {
      backgroundColor: theme.palette.background.paper,
    },
  },
}))

interface Prop {
  rootModule: RootModule[]
}

function DrawerContent(prop: Prop) {
  const classes = useStyles()
  const location = useLocation()
  const navigate = useNavigate()

  function handleClick(path: string) {
    navigate(path)
  }

  const pathGroup =
    /(.+)\//.exec(location.pathname) === null
      ? location.pathname
      : /(.+)\//.exec(location.pathname)![1]

  return (
    <div className={classes.main}>
      {prop.rootModule.map((section) => (
        <div key={section.index}>
          <Typography>{section.moduleName}</Typography>
          <List>
            {section.pages.map((element) => (
              <ListItem
                key={element.index}
                button
                style={{ borderRadius: '15px' }}
                selected={element.path === pathGroup}
                onClick={() => handleClick(element.path)}
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
