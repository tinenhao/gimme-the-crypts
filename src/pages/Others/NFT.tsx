import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchCollections, fetchSales } from '../../features/nftSlice'
import { makeStyles, useTheme, CardHeader, Avatar } from '@material-ui/core'
import CardLayout from '../../components/template/CardLayout'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import NFTContent from '../../components/nft/organisms/NFTContent'

const useStyles = makeStyles(() => ({
  main: {
    width: '100%',
    height: '98%',
  },
}))

function NFT() {
  const dispatch = useAppDispatch()
  const classes = useStyles()
  const theme = useTheme()
  const nft = useAppSelector((state) => state.nft)
  const timeframe = [
    'in the last day',
    'in the last week',
    'in the last month',
    'of all time',
  ]
  const subheader =
    nft.type === 0
      ? timeframe[nft.timeframeCollection]
      : timeframe[nft.timeframeSales]
  const title = ['Collections', 'Sales']

  useEffect(() => {
    dispatch(fetchCollections())
    dispatch(fetchSales())
  }, [])

  return (
    <div className={classes.main}>
      <CardLayout>
        <CardHeader
          avatar={
            <Avatar style={{ backgroundColor: theme.palette.text.secondary }}>
              <FormatListBulletedIcon style={{ fill: 'black' }} />
            </Avatar>
          }
          title={`Top 100 NFT ${title[nft.type]}`}
          titleTypographyProps={{
            variant: 'h6',
            color: 'textPrimary',
          }}
          subheader={subheader}
          subheaderTypographyProps={{
            variant: 'caption',
            color: 'textSecondary',
          }}
          style={{ paddingBottom: 8, paddingTop: 13 }}
        />
        <NFTContent />
      </CardLayout>
    </div>
  )
}

export default NFT
