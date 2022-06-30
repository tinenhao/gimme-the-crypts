import React from 'react'
import {
  makeStyles,
  Theme,
  TableHead,
  TableCell,
  TableRow,
  TableSortLabel,
  Typography,
} from '@material-ui/core'
import { CoinListTableHead } from '../../../models/api/coin'
import { setSortID } from '../../../features/coinSlice'
import { useAppSelector, useAppDispatch } from '../../../app/hooks'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    width: '100%',
    height: '100%',
    '& .MuiTableCell-stickyHeader': {
      backgroundColor: theme.palette.background.paper,
    },
  },
  stickyColumn: {
    zIndex: 900,
    [theme.breakpoints.down('xs')]: {
      left: 'auto !important',
    },
  },
}))

export const headCells: CoinListTableHead[] = [
  { id: 'market_cap_rank', label: 'Rank', sticky: true, minWidth: 100 },
  { id: 'name', label: 'Name', sticky: true, minWidth: 240 },
  { id: 'market_cap', label: 'Market Cap', sticky: false, minWidth: 220 },
  { id: 'current_price', label: 'Price', sticky: false, minWidth: 175 },
  { id: 'ath', label: 'ATH', sticky: false, minWidth: 175 },
  { id: 'total_volume', label: 'Volume(24h)', sticky: false, minWidth: 220 },
  {
    id: 'price_change_percentage_24h',
    label: '24h %',
    sticky: false,
    minWidth: 150,
  },
  {
    id: 'price_change_percentage_7d_in_currency',
    label: '7d %',
    sticky: false,
    minWidth: 150,
  },
  {
    id: 'price_change_percentage_30d_in_currency',
    label: '1m %',
    sticky: false,
    minWidth: 150,
  },
  {
    id: 'price_change_percentage_1y_in_currency',
    label: '1y %',
    sticky: false,
    minWidth: 150,
  },
  { id: 'sparkline_in_7d', label: 'Last 7 days', sticky: false, minWidth: 250 },
]

function CoinListTableHeader() {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const coins = useAppSelector((state) => state.coin)

  return (
    <TableHead className={classes.main}>
      <TableRow>
        {headCells.map((header: CoinListTableHead, index) => {
          return (
            coins.show[index] && (
              <TableCell
                key={index}
                align={index === 0 || index === 1 ? 'left' : 'right'}
                className={header.sticky ? classes.stickyColumn : undefined}
                style={{
                  minWidth: header.minWidth,
                  left: index === 0 ? 0 : index === 1 ? 100 : 'auto',
                }}
              >
                <TableSortLabel
                  disabled={index === 0 || index === 1 || index === 10}
                  active={header.id === coins.sortID}
                  direction={coins.sortOrder}
                  onClick={() => dispatch(setSortID(header.id))}
                >
                  <Typography variant="body2">{header.label}</Typography>
                </TableSortLabel>
              </TableCell>
            )
          )
        })}
      </TableRow>
    </TableHead>
  )
}

export default CoinListTableHeader
