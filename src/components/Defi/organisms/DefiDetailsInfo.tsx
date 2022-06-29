import React from 'react'
import {
  makeStyles,
  Theme,
  useTheme,
  Box,
  Divider,
  Hidden,
} from '@material-ui/core'
import DefiDetailsInfoLayout from '../molecules/DefiDetailsInfoLayout'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 15,
    marginTop: 20,
    padding: 20,
    backgroundColor: theme.palette.info.main,
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  divider: {
    backgroundColor: theme.palette.text.secondary,
    width: `calc(100% - ${20}px)`,
    marginTop: 15,
    marginBottom: 15,
  },
}))

function DefiDetailsInfo() {
  const classes = useStyles()
  const theme = useTheme()

  return (
    <div className={classes.main}>
      <Hidden mdDown>
        <Box display="flex" flexDirection="column" width="55%">
          <DefiDetailsInfoLayout type={0} />
          <Divider className={classes.divider} />
          <DefiDetailsInfoLayout type={1} />
        </Box>
        <Divider
          orientation="vertical"
          flexItem
          style={{
            backgroundColor: theme.palette.text.secondary,
            marginRight: 20,
          }}
        />
        <Box width="45%">
          <DefiDetailsInfoLayout type={2} />
        </Box>
      </Hidden>
      <Hidden lgUp>
        <DefiDetailsInfoLayout type={0} />
        <Divider className={classes.divider} />
        <DefiDetailsInfoLayout type={1} />
        <Divider className={classes.divider} />
        <DefiDetailsInfoLayout type={2} />
      </Hidden>
    </div>
  )
}

export default DefiDetailsInfo
