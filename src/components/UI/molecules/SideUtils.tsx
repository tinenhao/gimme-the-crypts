import React from 'react'
import { makeStyles, Box, Theme } from '@material-ui/core'
import { handleDialog } from '../../../features/mainSlice'
import { useAppDispatch } from '../../../app/hooks'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import InfoDialog from '../molecules/InfoDialog'
import SideButton from '../atoms/SideButton'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    display: 'flex',
    justifyContent: 'space-evenly',
    width: '220px',
  },
  info: {
    width: 20,
    height: 20,
    marginTop: 12,
    cursor: 'pointer',
    color: theme.palette.text.primary,
    '&:hover': {
      transform: 'scale(1.15)',
    },
  },
}))

function SideButtons() {
  const classes = useStyles()
  const dispatch = useAppDispatch()

  return (
    <Box className={classes.main}>
      <HelpOutlineIcon
        onClick={() => dispatch(handleDialog())}
        className={classes.info}
      />
      <SideButton type={'email'} />
      <SideButton type={'linkedin'} />
      <SideButton type={'github'} />
      <InfoDialog />
    </Box>
  )
}

export default SideButtons
