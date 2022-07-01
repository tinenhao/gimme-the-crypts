import React, { useEffect, useState } from 'react'
import { makeStyles, Box } from '@material-ui/core'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  fetchProtocolList,
  fetchTVLData,
  fetchChainList,
  fetchChainTVL,
} from '../../features/defiProtocolSlice'
import { fetchCoins, addPage } from '../../features/coinSlice'
import DefiTable from '../../components/Defi/organisms/DefiTable'
import DefiStats from '../../components/Defi/organisms/DefiStats'
import Spinner from '../../components/UI/atoms/Spinner'

const useStyles = makeStyles(() => ({
  main: {
    width: '100%',
    height: '100%',
    minHeight: 800,
  },
}))

function Defi() {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const defi = useAppSelector((state) => state.defiProtocol)
  const coins = useAppSelector((state) => state.coin)
  const [isLoading1, setIsLoading1] = useState<boolean>(true)
  const [isLoading2, setIsLoading2] = useState<boolean>(true)
  const [isLoading3, setIsLoading3] = useState<boolean>(true)
  const [isLoading4, setIsLoading4] = useState<boolean>(true)

  useEffect(() => {
    if (defi.protocolList.length === 0) {
      dispatch(fetchProtocolList())
    } else {
      setIsLoading1(false)
    }
  }, [dispatch, defi.statusProtocolList, defi.protocolList])

  useEffect(() => {
    if (defi.TVLChart.length === 0) {
      dispatch(fetchTVLData())
    } else {
      setIsLoading2(false)
    }
  }, [dispatch, defi.statusTVLChart, defi.TVLChart])

  useEffect(() => {
    if (defi.chainList.length === 0) {
      dispatch(fetchChainList())
    } else {
      setIsLoading3(false)
    }
  }, [dispatch, defi.statusChainList, defi.chainList])

  useEffect(() => {
    if (
      defi.statusChainTVL === 'IDLE' &&
      defi.chainList.length !== 0 &&
      defi.chainTVLList.length !== 9
    ) {
      const chainList = [...defi.chainList]
        .sort((a, b) => b.tvl - a.tvl)
        .splice(0, 9)
        .map((chain) => chain.name)
      for (let i = 0; i < chainList.length; i++) {
        dispatch(fetchChainTVL({ id: chainList[i] }))
      }
    } else {
      setIsLoading4(false)
    }
  }, [dispatch, defi.chainList])

  useEffect(() => {
    if (coins.status === 'IDLE' && coins.page <= 2) {
      dispatch(fetchCoins())
      dispatch(addPage())
    }
  }, [dispatch, coins.status, coins.value, coins.page])

  return isLoading1 ||
    isLoading2 ||
    isLoading3 ||
    isLoading4 ||
    defi.protocol.color === '' ? (
    <Box
      height="100%"
      width="100%"
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
      <DefiStats />
      <DefiTable />
    </div>
  )
}

export default Defi
