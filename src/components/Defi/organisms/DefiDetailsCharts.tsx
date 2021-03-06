import React from 'react'
import { makeStyles, Theme, Box, Hidden } from '@material-ui/core'
import { useAppSelector } from '../../../app/hooks'
import DefiChartLayout from '../molecules/DefiChartLayout'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    width: '100%',
    borderRadius: 20,
    marginTop: 20,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.paper,
  },
}))

function DefiDetailsChart() {
  const classes = useStyles()
  const defi = useAppSelector((state) => state.defiProtocol)
  let banned1 = false
  for (let i = 0; i < defi.protocol.tokensInUsd.length; i++) {
    if (Object.keys(defi.protocol.tokensInUsd[i].tokens).length > 20) {
      banned1 = true
      break
    }
  }

  return (
    <div className={classes.main}>
      <Hidden mdDown>
        <Box display="flex" width="100%">
          <DefiChartLayout type={0} />
          {defi.protocol.tokensInUsd.length !== 0 && !banned1 && (
            <DefiChartLayout type={1} />
          )}
        </Box>
        <Box display="flex" width="100%">
          <DefiChartLayout type={2} />
          {defi.protocol.tokensInUsd.length !== 0 && !banned1 && (
            <DefiChartLayout type={3} />
          )}
        </Box>
      </Hidden>
      <Hidden lgUp>
        <DefiChartLayout type={0} />
        {defi.protocol.tokensInUsd.length !== 0 && !banned1 && (
          <DefiChartLayout type={1} />
        )}
        <DefiChartLayout type={2} />
        {defi.protocol.tokensInUsd.length !== 0 && !banned1 && (
          <DefiChartLayout type={3} />
        )}
      </Hidden>
    </div>
  )
}

export default DefiDetailsChart
