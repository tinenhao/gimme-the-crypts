import React from 'react'
import {
  makeStyles,
  DialogContent,
  Typography,
  List,
  ListItem,
  Theme,
  useTheme,
  Avatar,
} from '@material-ui/core'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { handleDialog } from '../../../features/nftSlice'
import { handleNotExist, formatPercentage } from '../../../common/number'
import DialogLayout from '../../template/DialogLayout'
import Address from '../atoms/Address'
import moment from 'moment'

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    width: '100%',
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}))

function NFTDataDialog() {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const theme = useTheme()
  const nft = useAppSelector((state) => state.nft)
  const sale = [
    {
      title: 'Rank',
      color: theme.palette.text.primary,
      value: '#' + nft.sale.rank,
    },
    { title: 'Token', value: handleNotExist(nft.sale.paymentToken) },
    { title: 'Marketplace', value: handleNotExist(nft.sale.marketplaceName) },
    {
      title: 'Price (Token)',
      value: handleNotExist(nft.sale.price.toFixed(5)),
    },
    {
      title: 'Price (USD)',
      value: 'US$ ' + handleNotExist(nft.sale.priceUSD.toLocaleString()),
    },
    {
      title: 'Date',
      value: moment(nft.sale.timeStamp).format('Do MMM YYYY HH:MM'),
    },
    { title: 'Buyer', address: true, value: <Address text={nft.sale.buyer} /> },
    {
      title: 'Seller',
      address: true,
      value: <Address text={nft.sale.seller} />,
    },
    {
      title: 'Transaction',
      address: true,
      value: <Address text={nft.sale.transactionHash} />,
    },
  ]

  const collection = [
    { title: 'Rank', value: '#' + nft.collection.rank },
    { title: 'Token', value: handleNotExist(nft.collection.baseCurrency) },
    {
      title: 'Sales (Token)',
      value: handleNotExist(nft.collection.value.toFixed(5)),
    },
    {
      title: 'Sales (USD)',
      value:
        'US$ ' +
        handleNotExist(nft.collection.previousValueUSD.toLocaleString()),
    },
    {
      title: 'Percentage Change',
      color:
        nft.collection.changeInValueUSD > 0
          ? theme.palette.success.light
          : theme.palette.error.light,
      value:
        (nft.collection.changeInValueUSD > 0
          ? '+' + formatPercentage(nft.collection.changeInValueUSD)
          : formatPercentage(nft.collection.changeInValueUSD)) + '%',
    },
    { title: 'Buyers', value: handleNotExist(nft.collection.buyers) },
    { title: 'Sellers', value: handleNotExist(nft.collection.sellers) },
    {
      title: 'Transactions',
      address: false,
      value: handleNotExist(nft.collection.transactions),
    },
  ]

  return (
    <DialogLayout
      title="NFT Data"
      open={nft.dialog}
      height={640}
      onClose={() => dispatch(handleDialog())}
    >
      <DialogContent className={classes.content}>
        <List>
          <ListItem>
            <Avatar
              src={nft.type === 0 ? nft.collection.iconUrl : nft.sale.imageURI}
              variant="square"
              style={{ width: 100, height: 100, margin: 'auto' }}
            />
          </ListItem>
          <ListItem>
            <Typography align="center" variant="h6" style={{ width: '100%' }}>
              {nft.type === 0
                ? nft.collection.contractName
                : nft.sale.collectionName}
            </Typography>
          </ListItem>
          {(nft.type === 0 ? collection : sale).map((obj, index) => {
            return (
              <ListItem key={index} className={classes.item}>
                <Typography>{obj.title}</Typography>
                {obj.address ? (
                  <div> {obj.value}</div>
                ) : (
                  <Typography
                    style={{ color: obj.color ? obj.color : undefined }}
                  >
                    {obj.value}
                  </Typography>
                )}
              </ListItem>
            )
          })}
        </List>
      </DialogContent>
    </DialogLayout>
  )
}

export default NFTDataDialog
