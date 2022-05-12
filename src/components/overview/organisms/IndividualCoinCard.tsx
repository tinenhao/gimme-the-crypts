import React, { useEffect } from 'react'
import { makeStyles, Theme, CardHeader } from '@material-ui/core'
import CardLayout from '../../template/CardLayout'
import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import { fetchTrendingCoins } from '../../../features/trendingSlice'

const useStyles = makeStyles((theme: Theme) => ({
  subheader: {
    color: theme.palette.text.primary,
  },
}))

interface Prop {
  rank: number
}

function IndividualCoinCard(prop: Prop) {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const trendingCoins = useAppSelector((state) => state.trending)

  useEffect(() => {
    if (trendingCoins.value.length === 0 && trendingCoins.status === 'IDLE') {
      dispatch(fetchTrendingCoins())
    }
  }, [dispatch, trendingCoins.status, trendingCoins.value])

  return (
    <CardLayout>
      <CardHeader
        title="Trending"
        titleTypographyProps={{ variant: 'body1' }}
        subheader={`Rank ${prop.rank + 1} by CoinGecko`}
        subheaderTypographyProps={{
          variant: 'caption',
          className: classes.subheader,
        }}
      />
    </CardLayout>
  )
}

export default IndividualCoinCard
