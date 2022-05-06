import React from 'react'
import { makeStyles, Theme, Box } from '@material-ui/core'
import SideButton from '../atoms/SideButton'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    display: 'flex',
    justifyContent: 'space-evenly',
    width: '180px',
  },
}))

function SideButtons() {
  const classes = useStyles()

  return (
    <Box className={classes.main}>
      <SideButton type={'email'} />
      <SideButton type={'linkedin'} />
      <SideButton type={'github'} />
    </Box>
  )
}

export default SideButtons
