import React from 'react'
import { makeStyles, Theme, useTheme, TextField, Box } from '@material-ui/core'
import { updateSearchValue } from '../../../features/currencyConverterSlice'
import { useAppDispatch } from '../../../app/hooks'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    width: '100%',
    marginTop: 9,
    marginLeft: 12,
    '& input[type=number]': {
      '-moz-appearance': 'textfield',
    },
    '& input[type=number]::-webkit-outer-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },
    '& input[type=number]::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },
  },
  bar: {
    width: '100%',
    height: 55,
    borderRadius: 15,
    backgroundColor: theme.palette.info.main,
    display: 'flex',
  },
}))

function SearchBar() {
  const classes = useStyles()
  const theme = useTheme()
  const dispatch = useAppDispatch()

  return (
    <Box
      border={2}
      borderColor={theme.palette.text.secondary}
      className={classes.bar}
    >
      <TextField
        onChange={(e) => dispatch(updateSearchValue(e.target.value))}
        className={classes.main}
        inputProps={{ style: { textTransform: 'uppercase' } }}
        InputProps={{
          disableUnderline: true,
          style: { fontSize: 17 },
        }}
        placeholder="Search for coin"
      />
    </Box>
  )
}

export default SearchBar
