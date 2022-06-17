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
import { handleDialog } from '../../../features/individualCoinSlice'
import DialogLayout from '../../template/DialogLayout'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    height: 700,
    width: 400,
    borderRadius: 30,
  },
  content: {
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  item: {
    color: 'black',
    backgroundColor: theme.palette.secondary.main,
    borderRadius: 5,
    padding: '1px 8px',
  },
}))

interface Prop {
  categories: string[]
}

function CategoriesDialog(prop: Prop) {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const open = useAppSelector((state) => state.individualCoin).dialog

  return (
    <DialogLayout
      title="Categories"
      open={open}
      onClose={() => dispatch(handleDialog())}
      height={350}
      header={
        <Typography color="textSecondary">
          All categories associated with this coin
        </Typography>
      }
    >
      <DialogContent className={classes.content}>
        <List>
          {prop.categories.map((section, index) => {
            return (
              <ListItem key={index}>
                <Typography className={classes.item}>{section}</Typography>
              </ListItem>
            )
          })}
        </List>
      </DialogContent>
    </DialogLayout>
  )
}

export default CategoriesDialog
