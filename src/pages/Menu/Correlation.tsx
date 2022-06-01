import React from 'react'
import { makeStyles, Theme, useTheme, Grid, Hidden } from '@material-ui/core'
import MainCorrelation from '../../components/correlation/organisms/MainCorrelation'
import PositiveCorrelation from '../../components/correlation/organisms/PositiveCorrelation'
import NegativeCorrelation from '../../components/correlation/organisms/NegativeCorrelation'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    height: '100%',
  },
}))

function Trends() {
  const classes = useStyles()
  const theme = useTheme()

  return (
    <Grid container className={classes.main}>
      <Hidden mdDown>
        <Grid container spacing={3}>
          <Grid
            item
            md={8}
            style={{ height: `calc(100% - ${theme.spacing(3)}px)` }}
          >
            <MainCorrelation />
          </Grid>
          <Grid item md={4}>
            <Grid
              container
              direction="column"
              spacing={3}
              className={classes.main}
            >
              <Grid item style={{ height: '50%' }}>
                <PositiveCorrelation />
              </Grid>
              <Grid item style={{ height: '50%' }}>
                <NegativeCorrelation />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Hidden>

      <Hidden smDown lgUp>
        <Grid container spacing={3}>
          <Grid item md={12}>
            <Grid container spacing={3}>
              <Grid item md={6} style={{ height: 400 }}>
                <PositiveCorrelation />
              </Grid>
              <Grid item md={6} style={{ height: 400 }}>
                <NegativeCorrelation />
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={12} style={{ height: 800 }}>
            <MainCorrelation />
          </Grid>
        </Grid>
      </Hidden>

      <Hidden mdUp>
        <Grid container spacing={3}>
          <Grid item xs={12} style={{ height: 400 }}>
            <PositiveCorrelation />
          </Grid>
          <Grid item xs={12} style={{ height: 400 }}>
            <NegativeCorrelation />
          </Grid>
          <Grid item xs={12} style={{ height: 800 }}>
            <MainCorrelation />
          </Grid>
        </Grid>
      </Hidden>
    </Grid>
  )
}

export default Trends
