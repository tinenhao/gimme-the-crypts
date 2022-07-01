import React from 'react'
import { makeStyles, Theme, Box } from '@material-ui/core'
import NFTList from '../molecules/NFTList'
import Toolbar from '../molecules/Toolbar'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    width: '100%',
    height: '100%',
    paddingLeft: 20,
    paddingRight: 20,
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      margin: 'auto',
    },
  },
}))

function NFTContent() {
  const classes = useStyles()

  return (
    <div className={classes.main}>
      <Box className={classes.toolbar}>
        <Toolbar type="type" />
        <Toolbar type="time" />
      </Box>
      <NFTList />
    </div>
  )
}

export default NFTContent
