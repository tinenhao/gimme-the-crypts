import React, { useState, useEffect } from 'react'
import {
  makeStyles,
  Theme,
  useTheme,
  CardHeader,
  Avatar,
  Box,
} from '@material-ui/core'
import DonutLargeIcon from '@mui/icons-material/DonutLarge'
import CardLayout from '../../template/CardLayout'
import { fetchGlobal } from '../../../features/globalSlice'
import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import PercentageChange from '../atoms/PercentageChange'
import Spinner from '../../UI/atoms/Spinner'
import Donut from '../molecules/Donut'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    width: '100%',
    height: '100%',
  },
  utils: {
    marginTop: 10,
    marginRight: 8,
  },
}))

function MarketCapCard() {
  const classes = useStyles()
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const global = useAppSelector((state) => state.global)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    if (Object.keys(global.value).length === 0 && global.status === 'IDLE') {
      dispatch(fetchGlobal())
    } else if (Object.keys(global.value).length !== 0) {
      setIsLoading(false)
    }
  }, [dispatch, global.status, global.value])

  function getMarketCap() {
    return (global.value.total_market_cap.usd / 1000000000000).toFixed(2) + ' T'
  }

  function getPercentage() {
    return global.value.market_cap_change_percentage_24h_usd.toFixed(2)
  }

  function getNegative() {
    return (
      global.value.market_cap_change_percentage_24h_usd.toFixed(1).charAt(0) ===
      '-'
    )
  }

  return (
    <CardLayout>
      {isLoading ? (
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
      ) : (
        <div className={classes.main}>
          <CardHeader
            avatar={
              <Avatar style={{ backgroundColor: theme.palette.text.secondary }}>
                <DonutLargeIcon style={{ fill: 'black' }} />
              </Avatar>
            }
            title="Market Cap"
            titleTypographyProps={{
              variant: 'body2',
              color: 'textSecondary',
            }}
            subheader={getMarketCap()}
            subheaderTypographyProps={{
              variant: 'h6',
              color: 'textPrimary',
            }}
            style={{ paddingBottom: 8, paddingTop: 13 }}
            action={
              <div className={classes.utils}>
                <PercentageChange
                  negative={getNegative()}
                  percentageChange={getPercentage()}
                />
              </div>
            }
          />
          <div className={classes.main}>
            <Donut
              marketCap={global.value.total_market_cap.usd}
              percentages={global.value.market_cap_percentage}
            />
          </div>
        </div>
      )}
    </CardLayout>
  )
}

export default MarketCapCard
