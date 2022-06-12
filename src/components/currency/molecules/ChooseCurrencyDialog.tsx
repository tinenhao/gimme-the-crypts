import React from 'react'
import {
  makeStyles,
  DialogContent,
  Typography,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from '@material-ui/core'
import { Coin } from '../../../models/api/coin'
import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import {
  handleDialog,
  updateCoin,
} from '../../../features/currencyConverterSlice'
import DialogLayout from '../../template/DialogLayout'
import SearchBar from '../atoms/SearchBar'

const useStyles = makeStyles(() => ({
  content: {
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
}))

function ChooseCurrencyDialog() {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const currencyConverter = useAppSelector((state) => state.currencyConverter)
  const coins = useAppSelector((state) => state.coin)
  const searchValue = currencyConverter.searchValue
  const temp = [...coins.value].splice(0, 250)
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
    <DialogLayout
      title="Select a Token"
      open={currencyConverter.dialog}
      onClose={() => dispatch(handleDialog(''))}
      header={
        <Box>
          {' '}
          <SearchBar />
          <Typography variant="body2" style={{ marginTop: 20, marginLeft: 15 }}>
            Token Name
          </Typography>
        </Box>
      }
    >
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
    </DialogLayout>
  )
}

export default ChooseCurrencyDialog
