import React from 'react'
import {
  makeStyles,
  Theme,
  useTheme,
  Avatar,
  Typography,
  Box,
  Divider,
  TextField,
} from '@material-ui/core'
import { IndividualCoin } from '../../../models/api/individualCoin'
import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import {
  handleCurrencyDialog,
  updateValue,
} from '../../../features/individualCoinSlice'
import { countries } from '../../../common/countries'
import CurrenciesDialog from '../atoms/CurrenciesDialog'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    width: 375,
    height: 50,
    border: '3px solid',
    borderRadius: 10,
    borderColor: theme.palette.text.secondary,
    display: 'flex',
  },
  input: {
    width: '65%',
    marginTop: 5,
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
}))

interface Prop {
  type: 'To' | 'From'
  coin?: IndividualCoin
}

function ConversionInput(prop: Prop) {
  const classes = useStyles()
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const individualCoin = useAppSelector((state) => state.individualCoin)
  const selectedCoin = countries.find(
    (element) => element.currency === individualCoin.selectedCoin,
  )
  const conversion =
    individualCoin.value.market_data.current_price[
      individualCoin.selectedCoin.toLowerCase()
    ]

  return (
    <div className={classes.main}>
      <Box
        display="flex"
        onClick={() => prop.type === 'To' && dispatch(handleCurrencyDialog())}
        style={{ cursor: prop.type === 'To' ? 'pointer' : 'auto' }}
      >
        <Avatar
          src={
            prop.type === 'From' ? prop.coin?.image.small : selectedCoin?.image
          }
          style={{ height: 30, width: 30, marginTop: 7, marginLeft: 8 }}
        />
        <Typography
          noWrap
          style={{ marginTop: 11, marginLeft: 9, marginRight: 9, maxWidth: 80 }}
        >
          {prop.type === 'From'
            ? prop.coin?.symbol.toUpperCase()
            : selectedCoin?.currency}
        </Typography>
        <Divider
          orientation="vertical"
          style={{ backgroundColor: theme.palette.text.secondary, width: 3 }}
        />
      </Box>
      <TextField
        value={
          prop.type === 'From'
            ? individualCoin.coinFromValue
            : individualCoin.coinToValue
        }
        onChange={(e) =>
          dispatch(
            updateValue({
              type: prop.type,
              value: e.target.value,
              exchange: conversion,
            }),
          )
        }
        className={classes.input}
        InputProps={{
          disableUnderline: true,
          style: { fontSize: 18 },
          type: 'number',
        }}
        placeholder="0.00"
      />
      <CurrenciesDialog />
    </div>
  )
}

export default ConversionInput
