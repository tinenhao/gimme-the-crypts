import React from 'react'
import { makeStyles, Theme } from '@material-ui/core'
import logo from '../../../assets/logo.png'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    height: '40px',
    width: '40px',
    margin: 'auto',
    backgroundImage: `url(${logo})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
  },
}))

function Logo() {
  const classes = useStyles()

  return <div className={classes.main} />
}

export default Logo
