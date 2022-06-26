import React from 'react'
import {
  makeStyles,
  Theme,
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  Typography,
} from '@material-ui/core'
import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import { setSortKey } from '../../../features/defiProtocolSlice'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    '& .MuiTableCell-stickyHeader': {
      backgroundColor: theme.palette.background.paper,
    },
  },
  stickyColumn: {
    zIndex: 900,
    [theme.breakpoints.down('xs')]: {
      position: 'relative',
      left: 'auto !important',
    },
  },
}))

function DefiTableHeader() {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const defi = useAppSelector((state) => state.defiProtocol)
  const headCells = [
    {
      id: 'name',
      label: 'Name',
      minWidth: 400,
    },
    {
      id: 'category',
      label: 'Category',
      minWidth: 100,
    },
    {
      id: 'chains',
      label: 'Chains',
      minWidth: 150,
    },
    {
      id: 'change_1h',
      label: '1H %',
      minWidth: 80,
    },
    {
      id: 'change_1d',
      label: '1D %',
      minWidth: 80,
    },
    {
      id: 'change_7d',
      label: '7D %',
      minWidth: 80,
    },
    {
      id: 'tvl',
      label: 'TVL',
      minWidth: 100,
    },
    {
      id: 'marketshare',
      label: 'Market Share',
      minWidth: 150,
    },
  ]

  return (
    <TableHead className={classes.main}>
      <TableRow>
        {headCells.map((header, index) => {
          return (
            <TableCell
              key={index}
              align={index === 0 ? 'left' : 'right'}
              className={index === 0 ? classes.stickyColumn : undefined}
              style={{
                minWidth: header.minWidth,
                left: index === 0 ? 0 : 'auto',
                padding: 8,
              }}
            >
              <TableSortLabel
                disabled={
                  index === 0 || index === 1 || index === 2 || index === 7
                }
                active={header.id === defi.sortKey}
                direction={defi.sortOrder}
                onClick={() => dispatch(setSortKey(header.id))}
              >
                <Typography
                  variant="caption"
                  style={{ marginLeft: index === 0 ? 5 : 0 }}
                >
                  {header.label}
                </Typography>
              </TableSortLabel>
            </TableCell>
          )
        })}
      </TableRow>
    </TableHead>
  )
}

export default DefiTableHeader
