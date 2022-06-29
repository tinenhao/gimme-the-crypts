import React from 'react'
import { makeStyles, useTheme, Grid, Hidden } from '@material-ui/core'
import MainCorrelation from '../../components/correlation/organisms/MainCorrelation'
import SideCorrelation from '../../components/correlation/organisms/SideCorrelation'

const useStyles = makeStyles(() => ({
  main: {
    height: '100%',
    maxHeight: 1000,
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
            lg={8}
            xl={9}
            style={{ height: `calc(100% - ${theme.spacing(3)}px)` }}
          >
            <MainCorrelation />
          </Grid>
          <Grid item lg={4} xl={3}>
            <Grid
              container
              direction="column"
              spacing={3}
              className={classes.main}
            >
              <Grid item style={{ height: '50%' }}>
                <SideCorrelation type="Positive" />
              </Grid>
              <Grid item style={{ height: '50%' }}>
                <SideCorrelation type="Negative" />
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
                <SideCorrelation type="Positive" />
              </Grid>
              <Grid item md={6} style={{ height: 400 }}>
                <SideCorrelation type="Negative" />
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
            <SideCorrelation type="Positive" />
          </Grid>
          <Grid item xs={12} style={{ height: 400 }}>
            <SideCorrelation type="Negative" />
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
