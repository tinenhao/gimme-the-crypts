import React, { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import { useNavigate } from 'react-router-dom'
import {
  makeStyles,
  Theme,
  Box,
  InputAdornment,
  TextField,
} from '@material-ui/core'
import { fetchSupportedCoins } from '../../../features/supportedCoinsSlice'
import { Search as SearchIcon } from '@mui/icons-material'
import { Autocomplete } from '@material-ui/lab'
import { SupportedCoin } from '../../../models/api/supportedCoins'

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
  },
  rec: {
    overflow: 'hidden',
  },
}))

function SearchBar() {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const supportedCoins = useAppSelector((state) => state.supportedCoins)

  useEffect(() => {
    if (supportedCoins.value.length === 0) {
      dispatch(fetchSupportedCoins())
    }
  }, [dispatch, supportedCoins.value, supportedCoins.status])

  function handleOnChange(
    event: React.ChangeEvent<Record<string, unknown>>,
    value: any,
  ) {
    if (value !== null) {
      navigate(`/coins/${value.id}`)
    }
  }

  return (
    <Box>
      <Autocomplete
        clearOnBlur
        clearOnEscape
        freeSolo
        options={supportedCoins.value}
        getOptionLabel={(coin: SupportedCoin) => coin.name}
        onChange={handleOnChange}
        classes={{ paper: classes.options, option: classes.rec }}
        className={classes.main}
        filterOptions={(coinList: SupportedCoin[], state) =>
          coinList.filter((coin: SupportedCoin) =>
            coin.name.toLowerCase().startsWith(state.inputValue.toLowerCase()),
          )
        }
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
