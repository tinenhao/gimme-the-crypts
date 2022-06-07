import React from 'react'
import {
  makeStyles,
  Theme,
  useTheme,
  Box,
  Button,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Avatar,
  Typography,
} from '@material-ui/core'
import { changeState, setCoin } from '../../../features/correlationSlice'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    width: '100%',
    height: 55,
    marginTop: 5,
    paddingLeft: 20,
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
  item: {
    width: 150,
  },
  dropdown: {
    height: 400,
    width: 150,
    overflow: 'scroll',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  icon: {
    color: theme.palette.text.primary,
  },
}))

function IndividualUtils() {
  const classes = useStyles()
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const coins = useAppSelector((state) => state.coin)
  const correlation = useAppSelector((state) => state.correlation)
  const temp = coins.value

  return (
    <div className={classes.main}>
      <Box style={{ width: 150 }}>
        <FormControl fullWidth>
          <InputLabel>Coin</InputLabel>
          <Select
            variant="standard"
            disableUnderline
            inputProps={{
              classes: { icon: classes.icon },
            }}
            MenuProps={{
              anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'left',
              },
              transformOrigin: {
                vertical: 'top',
                horizontal: 'left',
              },
              getContentAnchorEl: null,
              classes: { paper: classes.dropdown },
            }}
            value={correlation.coinSelected}
            onChange={(e) => dispatch(setCoin(e.target.value))}
          >
            {temp.slice(0, 50).map((coin, index) => {
              return (
                <MenuItem
                  key={index}
                  value={coin.name}
                  className={classes.item}
                >
                  <Box style={{ display: 'flex' }}>
                    <Avatar src={coin.image} />
                    <Typography style={{ marginLeft: 13, marginTop: 8 }}>
                      {coin.symbol.toUpperCase()}
                    </Typography>
                  </Box>
                </MenuItem>
              )
            })}
          </Select>
        </FormControl>
      </Box>
      <Button
        className={classes.button}
        onClick={() => dispatch(changeState())}
      >
        Individual
      </Button>
    </div>
  )
}

export default IndividualUtils
