import React from 'react'
import { makeStyles, Theme } from '@material-ui/core'
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab'
import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import { setTimeframe } from '../../../features/correlationSlice'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    marginTop: 18,
    marginRight: 8,
    backgroundColor: theme.palette.info.main,
    borderRadius: 15,
  },
  buttons: {
    color: theme.palette.text.primary,
    border: 'none',
    margin: 5,
    width: 50,
    '&.Mui-selected, &.Mui-selected:hover': {
      color: 'black',
      backgroundColor: theme.palette.text.secondary,
      borderRadius: 15,
    },
    '&:hover': {
      borderRadius: 15,
    },
  },
}))

function TimeframeToolbar() {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const correlation = useAppSelector((state) => state.correlation)

  return (
    <ToggleButtonGroup
      value={correlation.timeframe}
      className={classes.main}
      color={'textPrimary'}
      classes={{ grouped: classes.buttons }}
    >
      <ToggleButton value={0} onClick={() => dispatch(setTimeframe(0))}>
        1D
      </ToggleButton>
      <ToggleButton value={1} onClick={() => dispatch(setTimeframe(1))}>
        1W
      </ToggleButton>
      <ToggleButton value={2} onClick={() => dispatch(setTimeframe(2))}>
        1M
      </ToggleButton>
      <ToggleButton value={3} onClick={() => dispatch(setTimeframe(3))}>
        3M
      </ToggleButton>
      <ToggleButton value={4} onClick={() => dispatch(setTimeframe(4))}>
        1Y
      </ToggleButton>
    </ToggleButtonGroup>
  )
}

export default TimeframeToolbar
