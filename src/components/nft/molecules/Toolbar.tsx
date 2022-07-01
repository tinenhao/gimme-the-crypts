import React from 'react'
import { makeStyles, Theme } from '@material-ui/core'
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab'
import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import {
  setTimeframeCollection,
  setTimeframeSales,
  setType,
} from '../../../features/nftSlice'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    marginTop: 15,
    marginRight: 8,
    borderRadius: 8,
    padding: 8,
    backgroundColor: theme.palette.info.main,
    [theme.breakpoints.down('xs')]: {
      marginTop: 15,
      margin: 'auto',
    },
  },
  buttons: {
    height: 35,
    color: theme.palette.text.primary,
    border: 'none',
    '&.Mui-selected, &.Mui-selected:hover': {
      color: 'black',
      backgroundColor: theme.palette.text.secondary,
      borderRadius: 5,
    },
    '&:hover': {
      borderRadius: 5,
    },
  },
}))

interface Prop {
  type: 'time' | 'type'
}

function NFTToolbar(prop: Prop) {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const nft = useAppSelector((state) => state.nft)
  const toggleValue =
    prop.type === 'type'
      ? nft.type
      : prop.type === 'time' && nft.type === 0
      ? nft.timeframeCollection
      : nft.timeframeSales
  const title =
    prop.type === 'type'
      ? ['Collection', 'Sales']
      : ['Day', 'Week', 'Month', 'All']

  return (
    <ToggleButtonGroup
      value={toggleValue}
      className={classes.main}
      classes={{ grouped: classes.buttons }}
      style={{ width: prop.type === 'type' ? 207 : 270 }}
    >
      {title.map((element, index) => {
        return (
          <ToggleButton
            key={index}
            value={index}
            onClick={() =>
              prop.type === 'type'
                ? dispatch(setType(index))
                : prop.type === 'time' && nft.type === 0
                ? dispatch(setTimeframeCollection(index))
                : dispatch(setTimeframeSales(index))
            }
          >
            {element}
          </ToggleButton>
        )
      })}
    </ToggleButtonGroup>
  )
}

export default NFTToolbar
