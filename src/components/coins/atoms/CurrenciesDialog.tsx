import React from 'react'
import {
  makeStyles,
  DialogContent,
  Typography,
  List,
  ListItem,
  Theme,
  Avatar,
  ListItemAvatar,
  ListItemText,
} from '@material-ui/core'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import {
  handleCurrencyDialog,
  setCurrency,
} from '../../../features/individualCoinSlice'
import { countries } from '../../../common/countries'
import DialogLayout from '../../template/DialogLayout'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    height: 700,
    width: 400,
    borderRadius: 30,
  },
  content: {
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  item: {
    color: 'black',
    backgroundColor: theme.palette.secondary.main,
    borderRadius: 5,
    padding: '1px 8px',
  },
}))

function CurrenciesDialog() {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const open = useAppSelector((state) => state.individualCoin).currencyDialog

  function handleClick(currency: string) {
    dispatch(handleCurrencyDialog())
    dispatch(setCurrency(currency))
  }

  return (
    <DialogLayout
      title="Currencies"
      open={open}
      onClose={() => dispatch(handleCurrencyDialog())}
      header={
        <Typography color="textSecondary">
          Please choose your desired currency
        </Typography>
      }
    >
      <DialogContent className={classes.content}>
        <List>
          {countries.map((country, index) => {
            return (
              <ListItem
                key={index}
                button
                onClick={() => handleClick(country.currency)}
              >
                <ListItemAvatar>
                  <Avatar src={country.image} />
                </ListItemAvatar>
                <ListItemText
                  primary={country.currency}
                  secondary={country.country}
                />
              </ListItem>
            )
          })}
        </List>
      </DialogContent>
    </DialogLayout>
  )
}

export default CurrenciesDialog
