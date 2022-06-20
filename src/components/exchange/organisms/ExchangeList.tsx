import React, { useEffect } from 'react'
import { makeStyles, Theme, Box, Typography } from '@material-ui/core'
import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import { fetchExchangeList, addPage } from '../../../features/exchangeSlice'
import CardLayout from '../../template/CardLayout'
import ExchangeCard from '../atoms/ExchangeCard'
import Spinner from '../../UI/atoms/Spinner'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    overflowY: 'scroll',
    padding: 8,
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  box: {
    height: 250,
    [theme.breakpoints.up('xs')]: {
      width: '100%',
    },
    [theme.breakpoints.up('sm')]: {
      width: '50%',
    },
    [theme.breakpoints.up('lg')]: {
      width: '25%',
    },
    [theme.breakpoints.up('xl')]: {
      width: '20%',
    },
  },
  view: {
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.text.secondary,
    },
  },
}))

function ExchangeList() {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const exchange = useAppSelector((state) => state.exchange)

  useEffect(() => {
    if (
      exchange.exchangeStatus === 'IDLE' &&
      exchange.exchangeList.length !== 100 * exchange.page
    ) {
      dispatch(fetchExchangeList())
    }
  }, [dispatch, exchange.exchangeStatus, exchange.page])

  return (
    <CardLayout>
      {exchange.exchangeList.length !== 0 ? (
        <div className={classes.main}>
          {exchange.exchangeList.map((data, index) => {
            return (
              <Box className={classes.box} key={index} padding={2}>
                <ExchangeCard exchange={data} />
              </Box>
            )
          })}
          {exchange.exchangeStatus === 'LOADING' ? (
            <Typography className={classes.view}>Loading</Typography>
          ) : (
            <Typography
              className={classes.view}
              onClick={() => dispatch(addPage())}
            >
              View More
            </Typography>
          )}
        </div>
      ) : (
        <Box
          height="100%"
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Spinner />
        </Box>
      )}
    </CardLayout>
  )
}

export default ExchangeList
