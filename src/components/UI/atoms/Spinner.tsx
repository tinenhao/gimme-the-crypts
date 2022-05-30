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
  determinate?: boolean
  progress?: number
}

function Spinner(prop: Prop) {
  const classes = useStyles()
  const theme = useTheme()
  const progress = prop.progress ? prop.progress : 0

  return (
    <div className={classes.main} style={{ marginTop: `${prop.marginTop}%` }}>
      <Box>
        {prop.determinate ? (
          <Box
            position="relative"
            display="inline-flex"
            marginBottom={1}
            marginLeft={4}
          >
            <CircularProgress
              variant="determinate"
              value={progress}
              style={{ width: 65, height: 65 }}
            />
            <Box
              top={0}
              left={0}
              bottom={0}
              right={0}
              position="absolute"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography
                variant="caption"
                component="div"
                color="textSecondary"
              >{`${Math.round(progress)}%`}</Typography>
            </Box>
          </Box>
        ) : (
          <CircularProgress
            style={{ marginLeft: '40px', color: theme.palette.text.secondary }}
          />
        )}
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
