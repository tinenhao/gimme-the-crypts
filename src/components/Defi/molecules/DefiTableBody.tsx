import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../../app/hooks'
import {
  makeStyles,
  Theme,
  useTheme,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Avatar,
  Box,
} from '@material-ui/core'
import { protocol } from '../../../models/api/defi'
import { formatPercentage, formatMarketCap } from '../../../common/number'
import Tooltip from '../../template/Tooltip'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    width: '100%',
    height: '60%',
    marginTop: 5,
  },
  stickyColumn: {
    position: 'sticky',
    zIndex: 5,
    left: 0,
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.down('xs')]: {
      left: 'auto !important',
    },
  },
}))

interface Prop {
  cols: number
}

function DefiTableBody(prop: Prop) {
  const classes = useStyles()
  const theme = useTheme()
  const navigate = useNavigate()
  const defi = useAppSelector((state) => state.defiProtocol)
  const coins = useAppSelector((state) => state.coin)
  const defiList = [...defi.protocolList]
  const TVL = defi.TVLChart[defi.TVLChart.length - 1].totalLiquidityUSD

  function sort(a: protocol, b: protocol) {
    if (a[defi.sortKey as keyof protocol] > b[defi.sortKey as keyof protocol]) {
      return defi.sortOrder === 'desc' ? -1 : 1
    } else if (
      a[defi.sortKey as keyof protocol] < b[defi.sortKey as keyof protocol]
    ) {
      return defi.sortOrder === 'desc' ? 1 : -1
    } else {
      return 0
    }
  }

  return (
    <TableBody>
      {defiList
        .splice(0, prop.cols)
        .sort(sort)
        .map((data, index) => {
          const iconList = data.chains
            .map(
              (element) =>
                defi.chainList.find((obj) => obj.name === element)?.gecko_id,
            )
            .map((data) => coins.value.find((coin) => coin.id === data)?.image)
            .filter((id) => id !== undefined)
          let mainList = [] as any[]
          let tooltipList = [] as any[]
          if (iconList.length > 5) {
            mainList = iconList.splice(0, 5)
            tooltipList = iconList.splice(5, iconList.length - 1)
          } else {
            mainList = iconList
          }

          return (
            <TableRow
              key={index}
              style={{ height: 70 }}
              hover
              onClick={() => navigate(`/defi/${data.slug}`)}
            >
              <TableCell className={classes.stickyColumn}>
                <Box display="flex">
                  <Typography
                    variant="body2"
                    style={{ marginTop: 4, width: 25 }}
                  >
                    {index + 1}
                  </Typography>
                  <Avatar
                    src={data.logo}
                    style={{
                      width: 27,
                      height: 27,
                      marginLeft: 10,
                    }}
                  />
                  <Typography
                    variant="body2"
                    style={{ marginLeft: 10, marginTop: 4 }}
                  >
                    {data.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    style={{ marginLeft: 10, marginTop: 4 }}
                  >
                    ({data.symbol})
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Typography variant="body2" align="right">
                  {data.category}
                </Typography>
              </TableCell>
              <TableCell>
                <Box display="flex" justifyContent="flex-end">
                  {mainList.map((icon, index) => {
                    return (
                      <Avatar
                        src={icon}
                        key={index}
                        style={{
                          width: 23,
                          height: 23,
                        }}
                      />
                    )
                  })}
                  {tooltipList.length > 0 && (
                    <Tooltip
                      title={
                        <Box display="flex" flexWrap="wrap">
                          {tooltipList.map((icon, index) => {
                            return (
                              <Avatar
                                src={icon}
                                key={index}
                                style={{
                                  width: 23,
                                  height: 23,
                                }}
                              />
                            )
                          })}
                        </Box>
                      }
                    >
                      <Avatar
                        style={{
                          width: 23,
                          height: 23,
                          backgroundColor: theme.palette.info.main,
                        }}
                      >
                        <Typography
                          style={{ fontSize: 12 }}
                          color="textPrimary"
                        >
                          +{tooltipList.length}
                        </Typography>
                      </Avatar>
                    </Tooltip>
                  )}
                </Box>
              </TableCell>
              <TableCell style={{ paddingRight: 8 }}>
                <Typography
                  variant="body2"
                  align="right"
                  style={{
                    color:
                      data.change_1h > 0
                        ? theme.palette.success.light
                        : theme.palette.error.light,
                  }}
                >
                  {data.change_1h > 0 && '+'}
                  {formatPercentage(data.change_1h)}
                </Typography>
              </TableCell>
              <TableCell style={{ paddingRight: 8 }}>
                <Typography
                  variant="body2"
                  align="right"
                  style={{
                    color:
                      data.change_1d > 0
                        ? theme.palette.success.light
                        : theme.palette.error.light,
                  }}
                >
                  {data.change_1d > 0 && '+'}
                  {formatPercentage(data.change_1d)}
                </Typography>
              </TableCell>
              <TableCell style={{ paddingRight: 8 }}>
                <Typography
                  variant="body2"
                  align="right"
                  style={{
                    color:
                      data.change_7d > 0
                        ? theme.palette.success.light
                        : theme.palette.error.light,
                  }}
                >
                  {data.change_7d > 0 && '+'}
                  {formatPercentage(data.change_7d)}
                </Typography>
              </TableCell>
              <TableCell style={{ paddingRight: 8 }}>
                <Typography variant="body2" align="right">
                  US$ {formatMarketCap(data.tvl)}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" align="right">
                  {formatPercentage((data.tvl * 100) / TVL)}
                </Typography>
              </TableCell>
            </TableRow>
          )
        })}
    </TableBody>
  )
}

export default DefiTableBody
