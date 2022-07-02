import React from 'react'
import { makeStyles, DialogContent, Typography } from '@material-ui/core'
import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import { handleWarning } from '../../../features/mainSlice'
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
    paddingLeft: 20,
    paddingTop: 0,
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
}))

function WarningDialog() {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const main = useAppSelector((state) => state.main)

  return (
    <DialogLayout
      title="Info"
      open={main.warningDialog}
      width={500}
      height={220}
      onClose={() => dispatch(handleWarning())}
    >
      <DialogContent className={classes.content}>
        <Typography variant="body2" color="textSecondary">
          Please try not to change timeframe or page while heatmap data is being
          fetched. This is due to the huge amount of data required to be fetched
          to generate the heatmap and thus may result in unnecessarily long
          delays.
        </Typography>
      </DialogContent>
    </DialogLayout>
  )
}

export default WarningDialog
