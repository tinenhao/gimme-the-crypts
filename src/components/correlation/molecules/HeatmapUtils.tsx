import React from 'react'
import { makeStyles, Theme, Box, Button, Typography } from '@material-ui/core'
import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import { changeState } from '../../../features/correlationSlice'
import Slider from '../atoms/Slider'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    width: '100%',
    height: 55,
    marginTop: 5,
    paddingLeft: 30,
    paddingRight: 20,
    display: 'flex',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: theme.palette.info.main,
    borderRadius: 5,
    height: 40,
    marginTop: 25,
  },
}))

function HeatmapUtils() {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const correlation = useAppSelector((state) => state.correlation)

  return (
    <div className={classes.main}>
      <Box width={'60%'} marginTop={1}>
        <Typography style={{ marginLeft: 27 }}>
          Number of coins to display: {correlation.coinsNum}
        </Typography>
        <Slider />
      </Box>
      <Button
        className={classes.button}
        onClick={() => dispatch(changeState())}
      >
        HeatMap
      </Button>
    </div>
  )
}

export default HeatmapUtils
