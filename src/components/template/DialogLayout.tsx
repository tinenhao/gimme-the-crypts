import React, { ReactElement } from 'react'
import {
  makeStyles,
  useTheme,
  Dialog,
  DialogTitle,
  IconButton,
  Typography,
  Box,
} from '@material-ui/core'
import CloseIcon from '@mui/icons-material/Close'

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
}))

interface Props {
  open: boolean
  title: string
  onClose: () => void
  header?: ReactElement<any, any> | ReactElement<any, any>[]
  children: ReactElement<any, any> | ReactElement<any, any>[]
}

function DialogLayout(prop: Props) {
  const classes = useStyles()
  const theme = useTheme()

  return (
    <Dialog
      open={prop.open}
      onClose={prop.onClose}
      classes={{ paper: classes.main }}
      scroll="paper"
    >
      <DialogTitle>
        <Box className={classes.title}>
          <Typography style={{ marginTop: 13 }}>{prop.title}</Typography>
          <IconButton onClick={prop.onClose}>
            <CloseIcon style={{ fill: theme.palette.text.primary }} />
          </IconButton>
        </Box>
        {prop.header}
      </DialogTitle>
      {prop.children}
    </Dialog>
  )
}

export default DialogLayout
