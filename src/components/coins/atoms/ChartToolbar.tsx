import React from 'react'
import { makeStyles, Theme } from '@material-ui/core'
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab'
import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import {
  setTimeframe,
  setDataType,
} from '../../../features/individualCoinSlice'
import { setDisplayTimeframe } from '../../../features/exchangeSlice'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    marginTop: 15,
    marginRight: 8,
    borderRadius: 10,
  },
  buttons: {
    height: 35,
    color: theme.palette.text.primary,
    border: 'none',
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

interface Prop {
  type: 'time' | 'type' | 'volume'
}

function ChartToolbar(prop: Prop) {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const IndividualCoin = useAppSelector((state) => state.individualCoin)
  const exchange = useAppSelector((state) => state.exchange)
  const toggleValue =
    prop.type === 'time'
      ? IndividualCoin.timeframe
      : prop.type === 'type'
      ? IndividualCoin.data
      : exchange.displayTimeframe
  const title =
    prop.type === 'type'
      ? ['Price', 'Market Cap', 'Volume']
      : prop.type === 'time'
      ? ['1D', '7D', '1M', '3M', '1Y', '3Y', 'Max']
      : ['1D', '7D', '1M', '3M', '1Y']

  return (
    <ToggleButtonGroup
      value={toggleValue}
      className={classes.main}
      color={'textPrimary'}
      classes={{ grouped: classes.buttons }}
    >
      {title.map((element, index) => {
        return (
          <ToggleButton
            key={index}
            value={index}
            onClick={() =>
              prop.type === 'time'
                ? dispatch(setTimeframe(index))
                : prop.type === 'type'
                ? dispatch(setDataType(index))
                : dispatch(setDisplayTimeframe(index))
            }
          >
            {element}
          </ToggleButton>
        )
      })}
    </ToggleButtonGroup>
  )
}

export default ChartToolbar
