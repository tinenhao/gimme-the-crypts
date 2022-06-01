import React, { useState, useEffect } from 'react'
import {
  makeStyles,
  Theme,
  useTheme,
  CardHeader,
  Avatar,
} from '@material-ui/core'
import CardLayout from '../../template/CardLayout'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    width: '100%',
    height: '100%',
  },
}))

function PositiveCorrelation() {
  const classes = useStyles()
  const theme = useTheme()

  return (
    <CardLayout>
      <div className={classes.main}>
        <CardHeader
          avatar={
            <Avatar
              style={{ backgroundColor: theme.palette.text.secondary }}
            ></Avatar>
          }
          title="+ Correlation"
          titleTypographyProps={{
            variant: 'h6',
            color: 'textPrimary',
          }}
          subheader="test"
          subheaderTypographyProps={{
            variant: 'body2',
            color: 'textSecondary',
          }}
          style={{ paddingBottom: 8, paddingTop: 13 }}
        />
      </div>
    </CardLayout>
  )
}

export default PositiveCorrelation
