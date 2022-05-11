import React, { useEffect } from 'react'
import { makeStyles, Theme } from '@material-ui/core'
import CardLayout from '../template/CardLayout'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { fetchTrendingCoins } from '../../features/trendingSlice'

const useStyles = makeStyles((theme: Theme) => ({
  main: {},
}))

function IndividualCoinCard() {
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
      <div> Individual Coin Card </div>
    </CardLayout>
  )
}

export default IndividualCoinCard
