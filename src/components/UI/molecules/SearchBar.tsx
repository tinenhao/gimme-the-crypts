import React from 'react'
import {
  makeStyles,
  Theme,
  Box,
  InputAdornment,
  TextField,
} from '@material-ui/core'
import { Search as SearchIcon } from '@mui/icons-material'
import { Autocomplete } from '@material-ui/lab'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    '& .MuiTextField-root': {
      height: '50px',
      width: '300px',
      marginLeft: '10px',
      '& .MuiOutlinedInput-root': {
        borderRadius: '20px',
        padding: '6px 16px',
      },
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderWidth: 2,
      borderColor: theme.palette.background.paper,
    },
  },
  textfield: {
    '& .MuiButtonBase-root.MuiAutocomplete-clearIndicator': {
      color: theme.palette.text.primary,
    },
  },
  options: {
    marginLeft: '12px',
    width: '270px',
  },
}))

function SearchBar() {
  const classes = useStyles()
  const coins = ['Bitcoin', 'Ethereum']

  return (
    <Box>
      <Autocomplete
        clearOnBlur
        clearOnEscape
        freeSolo
        options={coins}
        classes={{ paper: classes.options }}
        className={classes.main}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            placeholder="search"
            className={classes.textfield}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        )}
      />
    </Box>
  )
}

export default SearchBar
