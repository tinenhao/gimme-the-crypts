import React from 'react'
import {
  makeStyles,
  Theme,
  CardHeader,
  IconButton,
  Typography,
} from '@material-ui/core'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { swap } from '../../../features/currencyConverterSlice'
import CardLayout from '../../template/CardLayout'
import InputField from '../molecules/InputField'
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    height: '100%',
  },
  content: {
    paddingLeft: 18,
    paddingRight: 18,
    width: '100%',
  },
  title: {
    marginTop: 10,
    marginLeft: 5,
  },
  searchField: {
    width: '100%',
    height: 150,
  },
  icon: {
    marginLeft: '42%',
    width: 45,
    height: 45,
  },
  price: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}))

function ExchangeCurrency() {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const currencyConverter = useAppSelector((state) => state.currencyConverter)
  const price = (
    currencyConverter.coinFrom.current_price /
    currencyConverter.coinTo.current_price
  ).toFixed(5)

  const display =
    currencyConverter.coinFrom.current_price === undefined ||
    currencyConverter.coinTo.current_price === undefined
      ? ''
      : price +
        ' ' +
        currencyConverter.coinTo.symbol.toUpperCase() +
        ' per ' +
        currencyConverter.coinFrom.symbol.toUpperCase()

  return (
    <CardLayout>
      <div className={classes.main}>
        <CardHeader
          className={classes.title}
          title="Currency Converter"
          titleTypographyProps={{
            variant: 'h6',
          }}
        />
        <div className={classes.content}>
          <div className={classes.searchField}>
            <InputField type="From" />
          </div>
          <IconButton
            color="secondary"
            className={classes.icon}
            onClick={() => dispatch(swap())}
          >
            <ChangeCircleIcon style={{ fontSize: 48 }} />
          </IconButton>
          <div className={classes.searchField}>
            <InputField type="To" />
          </div>
          <div className={classes.price}>
            <Typography>Price</Typography>
            <Typography>{display}</Typography>
          </div>
        </div>
      </div>
    </CardLayout>
  )
}

export default ExchangeCurrency
