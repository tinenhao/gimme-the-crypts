import React from 'react'
import {
  makeStyles,
  Theme,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from '@material-ui/core'
import CloseIcon from '@mui/icons-material/Close'
import { Coin } from '../../../models/api/coin'
import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import {
  handleDialog,
  updateCoin,
} from '../../../features/currencyConverterSlice'
import SearchBar from '../atoms/SearchBar'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    height: 700,
    width: 400,
    borderRadius: 30,
  },
  title: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  content: {
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
}))

function ChooseCurrencyDialog() {
  const classes = useStyles()
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const currencyConverter = useAppSelector((state) => state.currencyConverter)
  const coins = useAppSelector((state) => state.coin)
  const searchValue = currencyConverter.searchValue
  const temp = [...coins.value]
  const coinArr = temp
    .sort(sortAlphebetical)
    .filter(
      (coin) =>
        coin.symbol.toUpperCase().startsWith(searchValue.toUpperCase()) ||
        coin.name.toUpperCase().startsWith(searchValue.toUpperCase()),
    )

  function sortAlphebetical(a: Coin, b: Coin) {
    if (a.symbol > b.symbol) {
      return 1
    } else if (a.symbol < b.symbol) {
      return -1
    }
    return 0
  }

  function handleClick(coin: Coin) {
    dispatch(updateCoin(coin))
    dispatch(handleDialog(''))
  }

  return (
    <Dialog
      open={currencyConverter.dialog}
      onClose={() => dispatch(handleDialog(''))}
      classes={{ paper: classes.main }}
      scroll="paper"
    >
      <DialogTitle>
        <Box className={classes.title}>
          <Typography style={{ marginTop: 13 }}>Select a Token</Typography>
          <IconButton onClick={() => dispatch(handleDialog(''))}>
            <CloseIcon style={{ fill: theme.palette.text.primary }} />
          </IconButton>
        </Box>
        <SearchBar />
        <Typography variant="body2" style={{ marginTop: 20, marginLeft: 15 }}>
          Token Name
        </Typography>
      </DialogTitle>
      <DialogContent className={classes.content}>
        <List>
          {coinArr.map((coin) => {
            return (
              <ListItem
                key={coin.symbol}
                button
                onClick={() => handleClick(coin)}
              >
                <ListItemAvatar>
                  <Avatar src={coin.image} />
                </ListItemAvatar>
                <ListItemText
                  primary={coin.symbol.toUpperCase()}
                  secondary={coin.name}
                />
              </ListItem>
            )
          })}
        </List>
      </DialogContent>
    </Dialog>
  )
}

export default ChooseCurrencyDialog
