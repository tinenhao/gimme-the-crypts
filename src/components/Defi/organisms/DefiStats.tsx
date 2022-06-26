import React from 'react'
import { makeStyles, Hidden, Box } from '@material-ui/core'
import InfoStats from '../atoms/InfoStats'
import ProtocolDominance from '../molecules/ProtocolDominance'
import TVLChart from '../molecules/TVLChart'

const useStyles = makeStyles(() => ({
  main: {
    width: '100%',
  },
}))

function DefiStats() {
  const classes = useStyles()

  return (
    <div className={classes.main}>
      <Hidden mdDown>
        <Box display="flex" justifyContent="space-between">
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            width={300}
          >
            <InfoStats type={0} />
            <InfoStats type={1} />
            <InfoStats type={2} />
          </Box>
          <ProtocolDominance />
          <TVLChart />
        </Box>
      </Hidden>
      <Hidden xsDown lgUp>
        <Box display="flex" flexDirection="column">
          <Box display="flex" justifyContent="space-between">
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              width="40%"
            >
              <InfoStats type={0} />
              <InfoStats type={1} />
              <InfoStats type={2} />
            </Box>
            <ProtocolDominance />
          </Box>
          <TVLChart />
        </Box>
      </Hidden>
      <Hidden smUp>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <InfoStats type={0} />
          <InfoStats type={1} />
          <InfoStats type={2} />
          <ProtocolDominance />
          <TVLChart />
        </Box>
      </Hidden>
    </div>
  )
}

export default DefiStats
