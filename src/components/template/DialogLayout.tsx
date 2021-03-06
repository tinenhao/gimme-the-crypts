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

const useStyles = (prop: Props) =>
  makeStyles(() => ({
    main: {
      height: prop.height ? prop.height : 700,
      width: prop.width ? prop.width : 400,
      borderRadius: 30,
      paddingBottom: 25,
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
  height?: number
  width?: number
  header?: ReactElement<any, any> | ReactElement<any, any>[]
  children: ReactElement<any, any> | ReactElement<any, any>[]
}

function DialogLayout(prop: Props) {
  const classes = useStyles(prop)()
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
