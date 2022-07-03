import React from 'react'
import { makeStyles, Typography, Theme, Box, Avatar } from '@material-ui/core'
import { LightMode, Nightlight } from '@mui/icons-material'
import { setDarkMode, setLightMode } from '../../../features/mainSlice'
import { useAppSelector, useAppDispatch } from '../../../app/hooks'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    width: 120,
    height: 50,
    borderRadius: 25,
    padding: '8px 12px 8px 12px',
    backgroundColor: theme.palette.info.main,
  },
  box: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  avatar: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    cursor: 'pointer',
    height: 35,
    width: 35,
  },
}))

function LightDark() {
  const classes = useStyles()
  const main = useAppSelector((state) => state.main)
  const dispatch = useAppDispatch()

  return (
    <div className={classes.main}>
      {main.darkMode ? (
        <Box className={classes.box}>
          <Avatar
            className={classes.avatar}
            onClick={() => dispatch(setLightMode())}
          >
            <Nightlight />
          </Avatar>
          <Typography style={{ marginTop: 5 }}>Dark</Typography>
        </Box>
      ) : (
        <Box className={classes.box}>
          <Typography style={{ marginTop: 5 }}>Light</Typography>
          <Avatar
            className={classes.avatar}
            onClick={() => dispatch(setDarkMode())}
          >
            <LightMode />
          </Avatar>
        </Box>
      )}
    </div>
  )
}

export default LightDark
