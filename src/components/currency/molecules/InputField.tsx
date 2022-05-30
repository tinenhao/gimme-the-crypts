import React, { ReactElement } from 'react'
import {
  makeStyles,
  Theme,
  useTheme,
  Box,
  Typography,
  TextField,
  Divider,
  Button,
  Avatar,
} from '@material-ui/core'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import {
  handleDialog,
  updateValue,
} from '../../../features/currencyConverterSlice'
import CoinTitle from '../atoms/CoinTitle'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    width: '100%',
    height: '100%',
    margin: 'auto',
    paddingTop: 15,
  },
  bar: {
    width: '100%',
    height: 65,
    borderRadius: 25,
    backgroundColor: theme.palette.info.main,
    display: 'flex',
  },
  input: {
    width: '65%',
    marginTop: 10,
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
  button: {
    margin: 'auto',
    borderRadius: 15,
    paddingLeft: 15,
    paddingRight: 15,
  },
}))

interface Prop {
  type: 'From' | 'To'
}

function InputField(prop: Prop) {
  const classes = useStyles()
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const currencyConverter = useAppSelector((state) => state.currencyConverter)
  let display: ReactElement<any, any> = <div />

  if (prop.type === 'From') {
    currencyConverter.coinFrom.symbol === undefined
      ? (display = <Typography variant="body2">Select Coin</Typography>)
      : (display = <CoinTitle type="From" />)
  } else {
    currencyConverter.coinTo.symbol === undefined
      ? (display = <Typography variant="body2">Select Coin</Typography>)
      : (display = <CoinTitle type="To" />)
  }

  return (
    <div className={classes.main}>
      <Typography
        variant="body1"
        style={{ marginLeft: 10, paddingBottom: 3 }}
        color="textSecondary"
      >
        {prop.type}
      </Typography>
      <Box
        border={2}
        borderColor={theme.palette.text.secondary}
        className={classes.bar}
      >
        <TextField
          value={
            prop.type === 'From'
              ? currencyConverter.coinFromValue
              : currencyConverter.coinToValue
          }
          onChange={(e) =>
            dispatch(updateValue({ type: prop.type, value: e.target.value }))
          }
          disabled={
            currencyConverter.coinTo.symbol === undefined ||
            currencyConverter.coinFrom.symbol === undefined
          }
          className={classes.input}
          InputProps={{
            disableUnderline: true,
            style: { fontSize: 25 },
            type: 'number',
          }}
          placeholder="0.00"
        />
        <Divider
          orientation="vertical"
          style={{
            backgroundColor: theme.palette.text.secondary,
            height: '40%',
            width: 2,
            marginTop: 18,
          }}
        />
        <Button
          className={classes.button}
          onClick={() => dispatch(handleDialog(prop.type))}
        >
          {display}
        </Button>
      </Box>
    </div>
  )
}

export default InputField
