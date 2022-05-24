import React from 'react'
import clsx from 'clsx'
import { makeStyles, Theme, Typography } from '@material-ui/core'
import Tooltip from '../../template/Tooltip'

const useStyles = makeStyles((theme: Theme) => ({
  change: {
    marginLeft: '30px',
    marginTop: '4px',
    width: '105px',
    height: '40px',
    borderRadius: '15px',
    paddingTop: '7px',
  },
  positive: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.success.light,
  },
  negative: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.light,
  },
}))

interface Prop {
  negative: boolean
  percentageChange: string
}

function PercentageChange(prop: Prop) {
  const classes = useStyles()

  return (
    <Tooltip title="Change in the last 24 hours">
      <Typography
        className={clsx(classes.change, {
          [classes.positive]: !prop.negative,
          [classes.negative]: prop.negative,
        })}
        variant="body1"
        align="center"
      >
        {prop.negative ? prop.percentageChange : '+' + prop.percentageChange}%
      </Typography>
    </Tooltip>
  )
}

export default PercentageChange
