import React, { useState } from 'react'
import { makeStyles, Theme } from '@material-ui/core'
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab'

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
  const [dataType, setDataType] = useState<number>(0)

  return (
    <ToggleButtonGroup
      value={dataType}
      className={classes.main}
      color={'textPrimary'}
      classes={{ grouped: classes.buttons }}
    >
      <ToggleButton value={0} onClick={() => setDataType(0)}>
        1D
      </ToggleButton>
      <ToggleButton value={1} onClick={() => setDataType(1)}>
        1W
      </ToggleButton>
      <ToggleButton value={2} onClick={() => setDataType(2)}>
        1M
      </ToggleButton>
      <ToggleButton value={3} onClick={() => setDataType(3)}>
        3M
      </ToggleButton>
      <ToggleButton value={4} onClick={() => setDataType(4)}>
        1Y
      </ToggleButton>
    </ToggleButtonGroup>
  )
}

export default TimeframeToolbar
