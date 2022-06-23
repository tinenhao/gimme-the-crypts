import React, { useEffect, useState } from 'react'
import {
  makeStyles,
  Theme,
  useTheme,
  CardHeader,
  Avatar,
  Button,
  Box,
} from '@material-ui/core'
import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import { fetchCoinMarketChartList } from '../../../features/coinMarketChartSlice'
import { CoinMarketChartDataTypes } from '../../../models/api/coinMarketChart'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import CardLayout from '../../template/CardLayout'
import Spinner from '../../UI/atoms/Spinner'
import DominanceChart from '../molecules/DominanceChart'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    width: '100%',
    height: '100%',
  },
  button: {
    marginTop: 15,
    marginRight: 8,
    borderColor: theme.palette.text.primary,
    borderWidth: 2,
    color: theme.palette.text.primary,
  },
}))

function DefiDominanceCard() {
  const classes = useStyles()
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const coins = ['ethereum', 'cardano', 'solana', 'polkadot', 'avalanche-2']
  const coinMarketChart = useAppSelector((state) => state.coinMarketChart)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [dataType, setDataType] = useState<number>(0)
  const titles = ['Market', 'Volume', 'Prices']
  const button = ['Market Cap', 'Trading Volume', 'Coin Price']
  const type = ['market_caps', 'total_volumes', 'prices']

  useEffect(() => {
    if (Object.keys(coinMarketChart.value365).length === 0) {
      dispatch(
        fetchCoinMarketChartList({
          coinId: coins,
          dayRange: 365,
        }),
      )
    } else if (Object.keys(coinMarketChart.value365).length !== 0) {
      setIsLoading(false)
    }
  }, [dispatch, coinMarketChart.status, coinMarketChart.value365])

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
                <EmojiEventsIcon style={{ fill: 'black' }} />
              </Avatar>
            }
            title="Defi"
            titleTypographyProps={{
              variant: 'h6',
              color: 'textPrimary',
            }}
            subheader={button[dataType % 3]}
            subheaderTypographyProps={{
              variant: 'caption',
              color: 'textSecondary',
            }}
            style={{ paddingBottom: 8, paddingTop: 13 }}
            action={
              <Button
                variant="outlined"
                className={classes.button}
                onClick={() => setDataType(dataType + 1)}
              >
                {titles[dataType % 3]}
              </Button>
            }
          />
          <DominanceChart
            type={type[dataType % 3] as CoinMarketChartDataTypes}
            coinsData={coinMarketChart.value365}
          />
        </div>
      )}
    </CardLayout>
  )
}

export default DefiDominanceCard
