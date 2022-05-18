import React from 'react'
import {
  makeStyles,
  Theme,
  useTheme,
  CircularProgress,
  Typography,
  Box,
} from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    display: 'flex',
    justifyContent: 'center',
  },
}))

interface Prop {
  marginTop?: number
}

function Spinner(prop: Prop) {
  const classes = useStyles()
  const theme = useTheme()

  return (
    <div className={classes.main} style={{ marginTop: `${prop.marginTop}%` }}>
      <Box>
        <CircularProgress
          style={{ marginLeft: '40px', color: theme.palette.text.secondary }}
        />
        <Typography
          style={{ marginTop: '5px', color: theme.palette.text.secondary }}
        >
          Fetching Data...
        </Typography>
      </Box>
    </div>
  )
}

export default Spinner
