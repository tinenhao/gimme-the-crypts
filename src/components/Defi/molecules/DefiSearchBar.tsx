import React from 'react'
import { useAppSelector } from '../../../app/hooks'
import { useNavigate } from 'react-router-dom'
import {
  makeStyles,
  Theme,
  Box,
  InputAdornment,
  TextField,
  Avatar,
  Typography,
} from '@material-ui/core'
import { Search as SearchIcon } from '@mui/icons-material'
import { protocol } from '../../../models/api/defi'
import { Autocomplete } from '@material-ui/lab'
import { LightenDarkenColor } from '../../../common/color'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    '& .MuiTextField-root': {
      height: '50px',
      width: '100%',
      backgroundColor: theme.palette.background.paper,
      borderRadius: '20px 20px 0px 0px',
      '& .MuiOutlinedInput-root': {
        borderRadius: '20px 20px 0px 0px',
        padding: '6px 16px',
      },
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderWidth: 1,
      borderColor: theme.palette.background.paper,
    },
  },
  textfield: {
    '& .MuiButtonBase-root.MuiAutocomplete-clearIndicator': {
      color: theme.palette.text.primary,
    },
  },
  rec: {
    overflow: 'hidden',
  },
  box: {
    display: 'flex',
    width: '100%',
    height: 50,
    borderRadius: '0px 0px 20px 20px',
    backgroundColor: theme.palette.info.main,
  },
}))

function DefiSearchBar() {
  const classes = useStyles()
  const navigate = useNavigate()
  const defi = useAppSelector((state) => state.defiProtocol)

  function handleOnChange(
    event: React.ChangeEvent<Record<string, unknown>>,
    value: any,
  ) {
    if (value !== null) {
      navigate(`/defi/${value.slug}`)
    }
  }

  return (
    <Box>
      <Autocomplete
        clearOnBlur
        clearOnEscape
        freeSolo
        options={[...defi.protocolList].sort((a: protocol, b: protocol) =>
          a.name > b.name ? 1 : -1,
        )}
        getOptionLabel={(defi: protocol) => defi.name}
        onChange={handleOnChange}
        classes={{ option: classes.rec }}
        className={classes.main}
        filterOptions={(defiList: protocol[], state) =>
          defiList.filter((defi: protocol) =>
            defi.name.toLowerCase().startsWith(state.inputValue.toLowerCase()),
          )
        }
        renderOption={(option: protocol, state: any) => {
          return (
            <li style={{ display: 'flex' }}>
              <Avatar
                src={option.logo}
                style={{
                  width: 25,
                  height: 25,
                  marginTop: 'auto',
                  marginBottom: 'auto',
                }}
              />
              <Typography
                style={{ marginLeft: 8, marginTop: 3 }}
                variant="body2"
              >
                {option.name}
              </Typography>
              <Typography
                style={{ marginLeft: 8, marginTop: 3 }}
                color="textSecondary"
                variant="body2"
              >
                ({option.symbol})
              </Typography>
            </li>
          )
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            placeholder="Search Protocol"
            className={classes.textfield}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        )}
      />
      <Box className={classes.box}>
        <Typography
          style={{ paddingLeft: 20, paddingTop: 12 }}
        >{`Protocol ->`}</Typography>
        <Typography
          style={{
            paddingLeft: 8,
            paddingTop: 12,
            color: defi.protocol.color,
          }}
        >
          {defi.protocol.name}
        </Typography>
      </Box>
    </Box>
  )
}

export default DefiSearchBar
