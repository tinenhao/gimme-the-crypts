import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { RootModule } from '../../../models/general/pages'
import {
  makeStyles,
  Theme,
  useTheme,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Box,
} from '@material-ui/core'
import { useAppSelector } from '../../../app/hooks'
import LanguageIcon from '@mui/icons-material/Language'
import LightDark from '../atoms/LightDark'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    height: '100%',
    display: 'flex',
    paddingBottom: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
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
  const theme = useTheme()
  const location = useLocation()
  const main = useAppSelector((state) => state.main)
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
      <div>
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
                    <Avatar
                      style={{
                        color: main.darkMode ? 'black' : 'white',
                        backgroundColor: theme.palette.text.secondary,
                      }}
                    >
                      {element.icon}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={element.label} />
                </ListItem>
              ))}
            </List>
          </div>
        ))}
      </div>
      <Box display="flex">
        <LightDark />
        <LanguageIcon style={{ marginLeft: 10, marginTop: 10, fontSize: 30 }} />
        <Typography style={{ marginLeft: 5, marginTop: 12 }}> USD</Typography>
      </Box>
    </div>
  )
}

export default DrawerContent
