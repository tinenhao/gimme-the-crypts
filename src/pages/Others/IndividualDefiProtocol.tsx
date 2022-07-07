import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { getColor } from 'color-thief-react'
import { makeStyles, Box } from '@material-ui/core'
import {
  fetchProtocolDetails,
  fetchProtocolList,
  restart,
  setColor,
} from '../../features/defiProtocolSlice'
import { LightenDarkenColor } from '../../common/color'
import DefiDetailsTVL from '../../components/Defi/organisms/DefiDetailsTVL'
import DefiDetailsInfo from '../../components/Defi/organisms/DefiDetailsInfo'
import DefiDetailsChart from '../../components/Defi/organisms/DefiDetailsCharts'
import Spinner from '../../components/UI/atoms/Spinner'
import DefiSearchBar from '../../components/Defi/molecules/DefiSearchBar'

const useStyles = makeStyles(() => ({
  main: {
    width: '100%',
    height: '100%',
    overflowY: 'scroll',
    paddingLeft: 8,
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
}))

function IndividualDefiProtocol() {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const location = useLocation()
  const id = location.pathname.split('/').pop() as string
  const defi = useAppSelector((state) => state.defiProtocol)

  useEffect(() => {
    dispatch(restart())
    dispatch(fetchProtocolDetails({ id: id }))
  }, [id])

  useEffect(() => {
    if (defi.protocolList.length === 0) {
      dispatch(fetchProtocolList())
    }
  }, [])

  useEffect(() => {
    if (Object.keys(defi.protocol).length !== 0) {
      getColor(defi.protocol.logo, 'hex', 'anonymous').then((data) =>
        dispatch(setColor(LightenDarkenColor(data, 100))),
      )
    }
  }, [id, defi.protocol])

  return Object.keys(defi.protocol).length <= 1 ||
    defi.protocolList.length === 0 ||
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
      <DefiSearchBar />
      <DefiDetailsTVL />
      <DefiDetailsInfo />
      <DefiDetailsChart />
    </div>
  )
}

export default IndividualDefiProtocol
