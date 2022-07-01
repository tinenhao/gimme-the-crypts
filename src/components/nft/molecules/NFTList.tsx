import React, { useEffect } from 'react'
import { makeStyles, Theme, Box } from '@material-ui/core'
import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import { fetchCollections, fetchSales } from '../../../features/nftSlice'
import { collections, sales } from '../../../models/api/nft'
import Spinner from '../../UI/atoms/Spinner'
import NFTCard from '../atoms/NFTCard'
import NFTDataDialog from './NFTDataDialog'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    height: `calc(100% - ${150}px)`,
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    overflowY: 'scroll',
    padding: 8,
    marginTop: 12,
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  box: {
    height: 250,
    [theme.breakpoints.up('xs')]: {
      width: '100%',
    },
    [theme.breakpoints.up('sm')]: {
      width: '50%',
    },
    [theme.breakpoints.up('lg')]: {
      width: '25%',
    },
    [theme.breakpoints.up('xl')]: {
      width: '20%',
    },
  },
  view: {
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.text.secondary,
    },
  },
}))

function NFTList() {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const nft = useAppSelector((state) => state.nft)

  useEffect(() => {
    if (nft.type === 0) {
      if (nft.collections[nft.timeframeCollection].length === 0) {
        dispatch(fetchCollections())
      }
    } else if (nft.type === 1) {
      if (nft.sales[nft.timeframeSales].length === 0) {
        dispatch(fetchSales())
      }
    }
  }, [dispatch, nft.timeframeCollection, nft.timeframeSales, nft.type])

  return nft.collections[nft.timeframeCollection].length !== 0 &&
    nft.sales[nft.timeframeSales].length !== 0 ? (
    <div className={classes.main}>
      {(nft.type === 0
        ? nft.collections[nft.timeframeCollection]
        : nft.sales[nft.timeframeSales]
      ).map((data, index) => {
        return (
          <Box className={classes.box} key={index} padding={2}>
            {nft.type === 0 ? (
              <NFTCard collection={data as collections} />
            ) : (
              <NFTCard sales={data as sales} />
            )}
          </Box>
        )
      })}
      <NFTDataDialog />
    </div>
  ) : (
    <Box
      height={`calc(100% - ${150}px)`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Spinner />
    </Box>
  )
}

export default NFTList
