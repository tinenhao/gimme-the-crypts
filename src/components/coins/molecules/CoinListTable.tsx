import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  makeStyles,
  Theme,
  useTheme,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  Avatar,
  Box,
} from '@material-ui/core'
import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import TrendingSparkline from '../../overview/molecules/TrendingSparkline'
import { fetchCoins, addPage } from '../../../features/coinSlice'
import CoinListTableHeader from '../atoms/CoinListTableHeader'
import { formatPrice, formatPercentage } from '../../../common/number'
import { Coin, CoinSparkline } from '../../../models/api/coin'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    width: '100%',
    height: '88%',
    overflowY: 'scroll',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    '& .MuiTableBody-root .MuiTableRow-root:hover .MuiTableCell-root': {
      backgroundColor: theme.palette.info.main,
      cursor: 'pointer',
    },
  },
  stickyColumn: {
    position: 'sticky',
    zIndex: 5,
    backgroundColor: theme.palette.background.paper,
    borderColor: theme.palette.text.secondary,
    [theme.breakpoints.down('xs')]: {
      left: 'auto !important',
    },
  },
  column: {
    borderColor: theme.palette.text.secondary,
  },
  view: {
    marginTop: 8,
    width: '100%',
    textAlign: 'center',
    cursor: 'pointer',
    position: 'sticky',
    left: 0,
    '&:hover': {
      color: theme.palette.text.secondary,
    },
  },
}))

interface Prop {
  start: number
  end: number
}

function CoinListTable(prop: Prop) {
  const classes = useStyles()
  const theme = useTheme()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const coins = useAppSelector((state) => state.coin)
  const temp = [...coins.value]
  const startRef = useRef<HTMLDivElement>(null)
  const endRef = useRef<HTMLDivElement>(null)
  const [cols, setCols] = useState<number>(50)

  function sort(a: Coin, b: Coin) {
    if (a[coins.sortID as keyof Coin] > b[coins.sortID as keyof Coin]) {
      return coins.sortOrder === 'desc' ? -1 : 1
    } else if (a[coins.sortID as keyof Coin] < b[coins.sortID as keyof Coin]) {
      return coins.sortOrder === 'desc' ? 1 : -1
    } else {
      return 0
    }
  }

  useEffect(() => {
    if (prop.start !== 0) {
      startRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [prop.start])

  useEffect(() => {
    if (prop.end !== 0) {
      endRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [prop.end])

  useEffect(() => {
    if (coins.status === 'IDLE' && coins.value.length !== 250 * coins.page) {
      dispatch(fetchCoins())
    }
  }, [dispatch, coins.status, coins.value, coins.page])

  function formatData(data: CoinSparkline) {
    return data.price.map((element, index) => {
      return [index, element] as [number, number]
    })
  }

  function handleAddCoins() {
    if (cols + 50 > coins.value.length) {
      dispatch(addPage())
    }
    setCols(cols + 50)
  }

  return (
    <div className={classes.main}>
      <Table stickyHeader>
        <CoinListTableHeader />
        <TableBody>
          <div ref={startRef} />
          {temp
            .splice(0, cols)
            .sort(sort)
            .map((coin: Coin, index) => {
              const gain24h = coin.price_change_24h > 0
              const gain7d = coin.price_change_percentage_7d_in_currency > 0
              const gain1m = coin.price_change_percentage_30d_in_currency > 0
              const gain1y = coin.price_change_percentage_1y_in_currency > 0
              return (
                <TableRow
                  key={index}
                  style={{ height: 100 }}
                  hover
                  onClick={() => navigate(`/coins/${coin.id}`)}
                >
                  <TableCell
                    className={classes.stickyColumn}
                    style={{ left: 0 }}
                  >
                    <Typography variant="body2" style={{ marginLeft: 3 }}>
                      {coin.market_cap_rank}
                    </Typography>
                  </TableCell>
                  <TableCell
                    className={classes.stickyColumn}
                    style={{ left: 100 }}
                  >
                    <Box display="flex">
                      <Avatar
                        style={{
                          height: 30,
                          width: 30,
                          marginRight: 8,
                          marginTop: 10,
                        }}
                        src={coin.image}
                      />
                      <Box display="flex" flexDirection="column">
                        <Typography
                          noWrap
                          style={{ marginTop: 4, marginLeft: 10 }}
                        >
                          {coin.name}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="textSecondary"
                          style={{ marginLeft: 10 }}
                        >
                          {coin.symbol.toUpperCase()}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  {coins.show[2] && (
                    <TableCell className={classes.column}>
                      <Typography
                        style={{ textAlign: 'right' }}
                        variant="body2"
                      >
                        US$ {coin.market_cap.toLocaleString()}
                      </Typography>
                    </TableCell>
                  )}
                  {coins.show[3] && (
                    <TableCell className={classes.column}>
                      <Typography
                        style={{ textAlign: 'right' }}
                        variant="body2"
                      >
                        US$ {formatPrice(coin.current_price)}
                      </Typography>
                    </TableCell>
                  )}
                  {coins.show[4] && (
                    <TableCell className={classes.column}>
                      <Typography
                        style={{ textAlign: 'right' }}
                        variant="body2"
                      >
                        US$ {formatPrice(coin.ath)}
                      </Typography>
                    </TableCell>
                  )}
                  {coins.show[5] && (
                    <TableCell className={classes.column}>
                      <Typography
                        style={{ textAlign: 'right' }}
                        variant="body2"
                      >
                        US$ {coin.total_volume.toLocaleString()}
                      </Typography>
                    </TableCell>
                  )}
                  {coins.show[6] && (
                    <TableCell className={classes.column}>
                      <Typography
                        style={{
                          textAlign: 'right',
                          color: gain24h
                            ? theme.palette.success.light
                            : theme.palette.error.light,
                        }}
                        variant="body2"
                      >
                        {gain24h ? '+' : ''}
                        {formatPercentage(
                          coin.price_change_percentage_24h_in_currency,
                        )}
                      </Typography>
                    </TableCell>
                  )}
                  {coins.show[7] && (
                    <TableCell className={classes.column}>
                      <Typography
                        style={{
                          textAlign: 'right',
                          color: gain7d
                            ? theme.palette.success.light
                            : theme.palette.error.light,
                        }}
                        variant="body2"
                      >
                        {gain7d ? '+' : ''}
                        {formatPercentage(
                          coin.price_change_percentage_7d_in_currency,
                        )}
                      </Typography>
                    </TableCell>
                  )}
                  {coins.show[8] && (
                    <TableCell className={classes.column}>
                      <Typography
                        style={{
                          textAlign: 'right',
                          color: gain1m
                            ? theme.palette.success.light
                            : theme.palette.error.light,
                        }}
                        variant="body2"
                      >
                        {gain1m ? '+' : ''}
                        {formatPercentage(
                          coin.price_change_percentage_30d_in_currency,
                        )}
                      </Typography>
                    </TableCell>
                  )}
                  {coins.show[9] && (
                    <TableCell className={classes.column}>
                      <Typography
                        style={{
                          textAlign: 'right',
                          color: gain1y
                            ? theme.palette.success.light
                            : theme.palette.error.light,
                        }}
                        variant="body2"
                      >
                        {gain1y ? '+' : ''}
                        {formatPercentage(
                          coin.price_change_percentage_1y_in_currency,
                        )}
                      </Typography>
                    </TableCell>
                  )}
                  {coins.show[10] && (
                    <TableCell
                      className={classes.column}
                      style={{ height: 100 }}
                    >
                      {coin.sparkline_in_7d.price.length !== 0 ? (
                        <TrendingSparkline
                          positive={gain7d}
                          data={formatData(coin.sparkline_in_7d)}
                        />
                      ) : (
                        <Typography style={{ marginLeft: 100 }}>-</Typography>
                      )}
                    </TableCell>
                  )}
                </TableRow>
              )
            })}
        </TableBody>
      </Table>
      {coins.status === 'LOADING' ? (
        <Typography className={classes.view}>Loading</Typography>
      ) : (
        <Typography
          onClick={() => handleAddCoins()}
          className={classes.view}
          innerRef={endRef}
        >
          View More
          <div ref={endRef} />
        </Typography>
      )}
    </div>
  )
}

export default CoinListTable
