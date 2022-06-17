import React from 'react'
import { makeStyles, Box, Typography } from '@material-ui/core'
import { IndividualCoin } from '../../../models/api/individualCoin'
import { handleNotExist } from '../../../common/number'

const useStyles = makeStyles(() => ({
  main: {
    height: '100%',
    width: '100%',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  text: {
    minWidth: 150,
  },
}))

interface Prop {
  coin: IndividualCoin
}

function DeveloperStats(prop: Prop) {
  const classes = useStyles()

  return (
    <div className={classes.main}>
      <Box display="flex" justifyContent="space-evenly">
        <Box display="flex" flexDirection="column">
          <Typography variant="h6" className={classes.text}>
            {handleNotExist(prop.coin.developer_data.stars, true)}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            className={classes.text}
          >
            Stars
          </Typography>
        </Box>
        <Box display="flex" flexDirection="column">
          <Typography variant="h6" className={classes.text}>
            {handleNotExist(prop.coin.developer_data.subscribers, true)}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            className={classes.text}
          >
            Watchers
          </Typography>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-evenly">
        <Box display="flex" flexDirection="column">
          <Typography variant="h6" className={classes.text}>
            {handleNotExist(prop.coin.developer_data.forks, true)}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            className={classes.text}
          >
            Forks
          </Typography>
        </Box>
        <Box display="flex" flexDirection="column">
          <Typography variant="h6" className={classes.text}>
            {handleNotExist(
              prop.coin.developer_data.pull_request_contributors,
              true,
            )}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            className={classes.text}
          >
            Contributors
          </Typography>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-evenly">
        <Box display="flex" flexDirection="column">
          <Typography variant="h6" className={classes.text}>
            {handleNotExist(
              prop.coin.developer_data.pull_requests_merged,
              true,
            )}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            className={classes.text}
          >
            Merged PRs
          </Typography>
        </Box>
        <Box display="flex" flexDirection="column">
          <Typography variant="h6" className={classes.text}>
            {handleNotExist(prop.coin.developer_data.closed_issues, true)}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            className={classes.text}
          >
            Closed Issues
          </Typography>
        </Box>
      </Box>
    </div>
  )
}

export default DeveloperStats
