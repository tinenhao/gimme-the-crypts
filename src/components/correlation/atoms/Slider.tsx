import React from 'react'
import {
  makeStyles,
  Theme,
  useTheme,
  Slider as MuiSlider,
  IconButton,
} from '@material-ui/core'
import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import {
  setCoinsNum,
  incrementCoinsNum,
  decrementCoinsNum,
} from '../../../features/correlationSlice'
import { Add as AddIcon, Remove as MinusIcon } from '@mui/icons-material/'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    width: '100%',
    height: '100%',
    marginLeft: 12,
    display: 'flex',
  },
  rail: {
    height: 25,
    borderRadius: 15,
    opacity: 1,
    backgroundColor: theme.palette.info.main,
    transform: 'scaleX(1.05)',
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '4px solid',
    borderColor: theme.palette.info.main,
    marginTop: 0,
  },
  label: {
    color: theme.palette.info.main,
    marginLeft: 4,
    marginBottom: 4,
  },
  buttons: {
    marginTop: 3,
    color: theme.palette.text.primary,
  },
}))

function Slider() {
  const classes = useStyles()
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const correlation = useAppSelector((state) => state.correlation)

  return (
    <div className={classes.main}>
      <IconButton
        className={classes.buttons}
        style={{ marginRight: 10 }}
        onClick={() => dispatch(decrementCoinsNum())}
      >
        <MinusIcon />
      </IconButton>
      <MuiSlider
        value={correlation.coinsNum}
        classes={{
          rail: classes.rail,
          thumb: classes.thumb,
          valueLabel: classes.label,
        }}
        max={50}
        min={1}
        track={false}
        valueLabelDisplay="auto"
        onChangeCommitted={(e, value) => dispatch(setCoinsNum(value as number))}
      />
      <IconButton
        className={classes.buttons}
        style={{ marginLeft: 10 }}
        onClick={() => dispatch(incrementCoinsNum())}
      >
        <AddIcon />
      </IconButton>
    </div>
  )
}

export default Slider
