import React from 'react'
import { makeStyles, Theme, Box } from '@material-ui/core'
import CorrelationList from '../atoms/CorrelationList'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    width: '100%',
    height: `calc(100% - ${200}px)`,
    marginTop: 35,
    paddingLeft: 5,
    paddingRight: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    [theme.breakpoints.down('md')]: {
      height: `calc(100% - ${55}px)`,
    },
  },
  box: {
    display: 'flex',
    justifyContent: 'space-evenly',
  },
}))

function IndividualCorrelation() {
  const classes = useStyles()

  return (
    <div className={classes.main}>
      <Box height="48%" width="100%" className={classes.box}>
        <CorrelationList type={0} />
        <CorrelationList type={1} />
      </Box>
      <Box height="48%" width="100%" className={classes.box}>
        <CorrelationList type={2} />
        <CorrelationList type={3} />
      </Box>
    </div>
  )
}

export default IndividualCorrelation
