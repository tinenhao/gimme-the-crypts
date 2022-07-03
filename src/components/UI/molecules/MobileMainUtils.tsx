import React, { useState } from 'react'
import {
  makeStyles,
  Theme,
  useTheme,
  Box,
  IconButton,
  Slide,
} from '@material-ui/core'
import {
  Menu as DrawerIcon,
  Search as AppBarIcon,
  Clear as CloseIcon,
} from '@mui/icons-material'
import SearchBar from '../molecules/SearchBar'

interface Prop {
  toggleDrawer: () => void
}

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    display: 'flex',
    width: '180px',
    marginLeft: '10px',
  },
  button: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: '15px',
    '&:hover': {
      transform: 'scale(1.15)',
    },
  },
  appBar: {
    display: 'flex',
    backgroundColor: theme.palette.background.default,
    position: 'absolute',
    width: '100%',
    left: 15,
    zIndex: 1,
  },
}))

function MobileMainUtils(prop: Prop) {
  const classes = useStyles()
  const theme = useTheme()
  const [appBarOpen, setAppBarOpen] = useState<boolean>(false)

  function handleDrawerClick() {
    setAppBarOpen(!appBarOpen)
  }

  return (
    <Box className={classes.main}>
      <IconButton onClick={prop.toggleDrawer} className={classes.button}>
        <DrawerIcon style={{ fill: theme.palette.text.primary }} />
      </IconButton>
      <IconButton
        onClick={handleDrawerClick}
        className={classes.button}
        style={{ marginLeft: 10 }}
      >
        <AppBarIcon style={{ fill: theme.palette.text.primary }} />
      </IconButton>
      <Slide direction="down" in={appBarOpen} appear={false}>
        <Box className={classes.appBar}>
          <SearchBar />
          <IconButton
            className={classes.button}
            style={{ marginLeft: 10 }}
            onClick={handleDrawerClick}
          >
            <CloseIcon style={{ fill: 'white' }} />
          </IconButton>
        </Box>
      </Slide>
    </Box>
  )
}

export default MobileMainUtils
