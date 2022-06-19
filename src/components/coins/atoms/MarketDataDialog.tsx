import React from 'react'
import {
  makeStyles,
  DialogContent,
  Typography,
  List,
  ListItem,
  Theme,
} from '@material-ui/core'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { handleMobileStatsDialog } from '../../../features/individualCoinSlice'
import DialogLayout from '../../template/DialogLayout'
import { IndividualCoin } from '../../../models/api/individualCoin'
import MarketData from '../molecules/MarketData'

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
}))

interface Prop {
  coin: IndividualCoin
}

function MarketDataDialog(prop: Prop) {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const open = useAppSelector((state) => state.individualCoin).mobileStatsDialog

  return (
    <DialogLayout
      title={prop.coin.symbol.toUpperCase() + ' Price Stats'}
      open={open}
      onClose={() => dispatch(handleMobileStatsDialog())}
    >
      <DialogContent className={classes.content}>
        <MarketData coin={prop.coin} mobile />
      </DialogContent>
    </DialogLayout>
  )
}

export default MarketDataDialog
