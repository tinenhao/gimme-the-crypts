import React, { useEffect, useState } from 'react'
import {
  makeStyles,
  Theme,
  useTheme,
  CardHeader,
  Avatar,
  Button,
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
    marginTop: 18,
    marginRight: 8,
    backgroundColor: theme.palette.primary.main,
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
  const type = ['market_caps', 'total_volumes', 'prices']

  useEffect(() => {
    if (
      Object.keys(coinMarketChart.value[365]).length === 0 &&
      coinMarketChart.status === 'IDLE'
    ) {
      dispatch(
        fetchCoinMarketChartList({
          coinId: coins,
          dayRange: 365,
        }),
      )
    } else if (Object.keys(coinMarketChart.value[365]).length !== 0) {
      setIsLoading(false)
    }
  }, [dispatch, coinMarketChart.status, coinMarketChart.value])

  return (
    <CardLayout>
      {isLoading ? (
        <Spinner marginTop={35} />
      ) : (
        <div className={classes.main}>
          <CardHeader
            avatar={
              <Avatar style={{ backgroundColor: theme.palette.text.secondary }}>
                <EmojiEventsIcon style={{ fill: 'black' }} />
              </Avatar>
            }
            title="Defi Dominance"
            titleTypographyProps={{
              variant: 'h6',
              color: 'textPrimary',
            }}
            subheader={titles[dataType % 3] + ' over past year'}
            subheaderTypographyProps={{
              variant: 'caption',
              color: 'textSecondary',
            }}
            style={{ paddingBottom: 8, paddingTop: 13 }}
            action={
              <Button
                className={classes.button}
                onClick={() => setDataType(dataType + 1)}
              >
                {titles[dataType % 3]}
              </Button>
            }
          />
          <DominanceChart
            type={type[dataType % 3] as CoinMarketChartDataTypes}
            coinsData={coinMarketChart.value[365]}
          />
        </div>
      )}
    </CardLayout>
  )
}

export default DefiDominanceCard
