import React, { useEffect, useState } from 'react'
import { makeStyles, Theme, CardHeader } from '@material-ui/core'
import CardLayout from '../../template/CardLayout'
import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import { fetchTrendingCoins } from '../../../features/trendingSlice'
import { fetchCoins } from '../../../features/coinSlice'
import { fetchCoinMarketChartList } from '../../../features/coinMarketChartSlice'
import { TrendingCoin } from '../../../models/api/trending'
import TrendingPrice from '../molecules/TrendingPrice'
import TrendingSparkline from '../molecules/TrendingSparkline'
import Spinner from '../../UI/atoms/Spinner'

const useStyles = makeStyles((theme: Theme) => ({
  subheader: {
    color: theme.palette.text.secondary,
  },
  content: {
    display: 'flex',
  },
}))

interface Prop {
  rank: number
}

function IndividualCoinCard(prop: Prop) {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const trendingCoins = useAppSelector((state) => state.trending)
  const coins = useAppSelector((state) => state.coin)
  const coinMarketChart = useAppSelector((state) => state.coinMarketChart)
  const [isLoading1, setIsLoading1] = useState<boolean>(true)
  const [isLoading2, setIsLoading2] = useState<boolean>(true)
  const [isLoading3, setIsLoading3] = useState<boolean>(true)
  const top4: TrendingCoin[] = trendingCoins.value.slice(0, 4)

  useEffect(() => {
    if (trendingCoins.value.length === 0 && trendingCoins.status === 'IDLE') {
      dispatch(fetchTrendingCoins())
    } else if (trendingCoins.value.length !== 0) {
      setIsLoading1(false)
    }
  }, [dispatch, trendingCoins.status, trendingCoins.value])

  useEffect(() => {
    if (coins.value.length === 0 && coins.status === 'IDLE') {
      dispatch(fetchCoins())
    } else if (coins.value.length !== 0) {
      setIsLoading2(false)
    }
  }, [dispatch, coins.status, coins.value])

  useEffect(() => {
    if (
      top4.length !== 0 &&
      Object.keys(coinMarketChart.value[1]).length === 0 &&
      coinMarketChart.status === 'IDLE'
    ) {
      dispatch(
        fetchCoinMarketChartList({
          coinId: top4.map((element) => element.id),
          dayRange: 1,
        }),
      )
    } else if (Object.keys(coinMarketChart.value[1]).length !== 0) {
      setIsLoading3(false)
    }
  }, [dispatch, coinMarketChart.status, coinMarketChart.value])

  return (
    <CardLayout>
      <CardHeader
        title="Trending"
        titleTypographyProps={{ variant: 'body1' }}
        subheader={`Rank ${prop.rank + 1} on CoinGecko`}
        subheaderTypographyProps={{
          variant: 'caption',
          className: classes.subheader,
        }}
        style={{ paddingBottom: 8, paddingTop: 13 }}
      />
      {isLoading1 || isLoading2 || isLoading3 ? (
        <div style={{ marginTop: 25 }}>
          <Spinner />
        </div>
      ) : (
        <div className={classes.content}>
          <TrendingPrice
            trendingcoin={trendingCoins.value[prop.rank]}
            coins={coins.value}
          />
          <TrendingSparkline
            data={coinMarketChart.value[1]}
            coin={trendingCoins.value[prop.rank].id}
          />
        </div>
      )}
    </CardLayout>
  )
}

export default IndividualCoinCard
