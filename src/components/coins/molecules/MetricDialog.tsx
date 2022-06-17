import React from 'react'
import {
  makeStyles,
  DialogContent,
  Typography,
  List,
  ListItem,
  Checkbox,
} from '@material-ui/core'
import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import { handleDialog, showSection } from '../../../features/coinSlice'
import DialogLayout from '../../template/DialogLayout'

const useStyles = makeStyles(() => ({
  main: {
    height: 700,
    width: 400,
    borderRadius: 30,
  },
  title: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  content: {
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
}))

function MetricDialog() {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const coins = useAppSelector((state) => state.coin)
  const sections = [
    'Market Cap',
    'Price',
    'ATH',
    'Volume(24h)',
    '24h %',
    '7d %',
    '1m %',
    '1y %',
    'Last 7 days',
  ]

  return (
    <DialogLayout
      title="Customize the table"
      open={coins.dialog}
      onClose={() => dispatch(handleDialog())}
      header={
        <Typography color="textSecondary">
          Choose the metrics you would like to display
        </Typography>
      }
    >
      <DialogContent className={classes.content}>
        <List>
          {sections.map((section, index) => {
            return (
              <ListItem key={index}>
                <Checkbox
                  checked={coins.show[index + 2]}
                  onChange={() => dispatch(showSection(index + 2))}
                  color="primary"
                />
                <Typography>{section}</Typography>
              </ListItem>
            )
          })}
        </List>
      </DialogContent>
    </DialogLayout>
  )
}

export default MetricDialog
