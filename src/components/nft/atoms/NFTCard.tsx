import React from 'react'
import { makeStyles, Theme, Box, Avatar, Typography } from '@material-ui/core'
import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import {
  handleDialog,
  setSale,
  setCollection,
} from '../../../features/nftSlice'
import { collections, sales } from '../../../models/api/nft'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    height: '100%',
    width: '100%',
    borderRadius: 15,
    backgroundColor: theme.palette.info.main,
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.background.default,
    },
  },
  info: {
    width: 38,
    fontSize: 13,
    borderRadius: 5,
    marginLeft: 8,
    paddingTop: 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.background.paper,
  },
  text: {
    textAlign: 'center',
    marginTop: 5,
  },
}))

interface Prop {
  collection?: collections
  sales?: sales
}

function NFTCard(prop: Prop) {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const nft = useAppSelector((state) => state.nft)

  function handleOnClick() {
    dispatch(handleDialog())
    if (nft.type === 0) {
      dispatch(setCollection(prop.collection))
    } else {
      dispatch(setSale(prop.sales))
    }
  }

  return (
    <div className={classes.main} onClick={() => handleOnClick()}>
      <Box display="flex" flexDirection="column">
        <Avatar
          src={nft.type === 0 ? prop.collection?.iconUrl : prop.sales?.imageURI}
          variant="square"
          style={{ width: 100, height: 100, margin: 'auto' }}
        />
        <Typography className={classes.text}>
          {nft.type === 0
            ? prop.collection?.contractName
            : prop.sales?.collectionName}
        </Typography>
        <Typography className={classes.text}>
          # {nft.type === 0 ? prop.collection?.rank : prop.sales?.rank}
        </Typography>
        <Typography className={classes.text} color="textSecondary">
          {nft.type === 0 ? 'Volume: ' : 'Price: '}
        </Typography>
        <Typography className={classes.text}>
          US${' '}
          {(
            (nft.type === 0
              ? prop.collection?.valueUSD
              : prop.sales?.priceUSD) || 0
          ).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </Typography>
      </Box>
    </div>
  )
}

export default NFTCard
