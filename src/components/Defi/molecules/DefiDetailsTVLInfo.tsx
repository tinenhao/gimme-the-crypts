import React from 'react'
import { makeStyles, Theme, Box, Typography, Avatar } from '@material-ui/core'
import { formatMarketCap } from '../../../common/number'
import { useAppSelector } from '../../../app/hooks'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    width: 450,
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '15px 0px 0px 15px',
    padding: 25,
    backgroundColor: theme.palette.info.main,
    [theme.breakpoints.down('md')]: {
      width: '100%',
      borderRadius: '15px 15px 0px 0px',
    },
  },
  box: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 20,
    maxHeight: 300,
    overflowY: 'scroll',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
}))

function DefiDetailsTVLInfo() {
  const classes = useStyles()
  const protocol = useAppSelector((state) => state.defiProtocol).protocol
  let borrowed = 0
  let staking = 0
  let pool2 = 0
  const chains = [] as [string, number][]
  const others = [] as [string, number][]
  Object.keys(protocol.currentChainTvls).forEach((key) => {
    if (key.includes('borrowed')) {
      borrowed += protocol.currentChainTvls[key]
    } else if (key.includes('staking')) {
      staking += protocol.currentChainTvls[key]
    } else if (key.includes('pool2')) {
      pool2 += protocol.currentChainTvls[key]
    } else {
      chains.push([key, protocol.currentChainTvls[key]])
    }
  })
  borrowed !== 0 && others.push(['Borrowed', borrowed])
  staking !== 0 && others.push(['Staking', staking])
  pool2 !== 0 && others.push(['Pool2', pool2])

  return (
    <div className={classes.main}>
      <Box display="flex">
        <Avatar
          src={protocol.logo}
          style={{
            width: 40,
            height: 40,
            marginTop: 'auto',
            marginBottom: 'auto',
          }}
        />
        <Typography variant="h6" style={{ marginLeft: 10, marginTop: 4 }}>
          {protocol.name}
        </Typography>
        <Typography
          variant="h6"
          color="textSecondary"
          style={{ marginLeft: 10, marginTop: 4 }}
        >
          ({protocol.symbol})
        </Typography>
      </Box>
      <Box className={classes.box}>
        <Typography variant="body2" color="textSecondary">
          Total Value Locked
        </Typography>
        <Typography variant="h5" style={{ marginTop: 5 }}>
          US${' '}
          {formatMarketCap(
            protocol.tvl[protocol.tvl.length - 1].totalLiquidityUSD,
          )}
        </Typography>
      </Box>
      <Box className={classes.box}>
        <Typography variant="body2" color="textSecondary">
          Chain Breakdown
        </Typography>
        {chains
          .sort((a, b) => b[1] - a[1])
          .map((key, index) => {
            return (
              <Box
                display="flex"
                justifyContent="space-between"
                key={index}
                marginTop={0.5}
              >
                <Typography variant="body1">{key[0]}</Typography>
                <Typography variant="body1">
                  US$ {formatMarketCap(key[1])}
                </Typography>
              </Box>
            )
          })}
        {others.length !== 0 && (
          <Box className={classes.box}>
            <Typography variant="body2" color="textSecondary">
              Others
            </Typography>
            {others
              .sort((a, b) => b[1] - a[1])
              .map((key, index) => {
                return (
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    key={index}
                    marginTop={0.5}
                  >
                    <Typography variant="body1">{key[0]}</Typography>
                    <Typography variant="body1">
                      US$ {formatMarketCap(key[1])}
                    </Typography>
                  </Box>
                )
              })}
          </Box>
        )}
      </Box>
    </div>
  )
}

export default DefiDetailsTVLInfo
