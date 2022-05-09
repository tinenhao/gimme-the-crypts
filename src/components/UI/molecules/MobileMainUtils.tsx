import React from 'react'
import { makeStyles, Theme, Box, IconButton } from '@material-ui/core'
import { Menu as DrawerIcon, Search as AppBarIcon } from '@mui/icons-material'

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
}))

function MobileMainUtils(prop: Prop) {
  const classes = useStyles()

  return (
    <Box className={classes.main}>
      <div className={classes.button}>
        <IconButton onClick={prop.toggleDrawer}>
          <DrawerIcon style={{ fill: 'white' }} />
        </IconButton>
      </div>
      <div className={classes.button} style={{ marginLeft: 10 }}>
        <IconButton>
          <AppBarIcon style={{ fill: 'white' }} />
        </IconButton>
      </div>
    </Box>
  )
}

export default MobileMainUtils
