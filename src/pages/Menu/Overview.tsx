import React from 'react'
import { makeStyles, useTheme, Grid, Hidden } from '@material-ui/core'
import CoinListCard from '../../components/overview/organisms/CoinListCard'
import DefiDominanceCard from '../../components/overview/organisms/DefiDominanceCard'
import GasPriceCard from '../../components/overview/organisms/GasPriceCard'
import HashRateCard from '../../components/overview/organisms/HashRateCard'
import IndividualCoinCard from '../../components/overview/organisms/IndividualCoinCard'
import MarketCapCard from '../../components/overview/organisms/MarketCapCard'

const useStyles = makeStyles(() => ({
  main: {
    height: 1000,
  },
  wrapper: {
    minHeight: 800,
    height: '100%',
  },
}))

function Overview() {
  const classes = useStyles()
  const theme = useTheme()

  return (
    <Grid container className={classes.main}>
      <Hidden mdDown>
        <Grid
          container
          className={classes.wrapper}
          direction="column"
          spacing={3}
        >
          <Grid item>
            <Grid container spacing={3}>
              <Grid item md={3} style={{ height: 230 }}>
                <IndividualCoinCard rank={0} />
              </Grid>
              <Grid item md={3} style={{ height: 230 }}>
                <IndividualCoinCard rank={1} />
              </Grid>
              <Grid item md={3} style={{ height: 230 }}>
                <IndividualCoinCard rank={2} />
              </Grid>
              <Grid item md={3} style={{ height: 230 }}>
                <IndividualCoinCard rank={3} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item style={{ height: 700 }}>
            <Grid container spacing={3} style={{ height: `100%` }}>
              <Grid item md={4}>
                <Grid
                  container
                  direction="column"
                  className={classes.wrapper}
                  spacing={3}
                >
                  <Grid item style={{ height: '50%' }}>
                    <MarketCapCard />
                  </Grid>
                  <Grid item style={{ height: '50%' }}>
                    <DefiDominanceCard />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item md={4}>
                <Grid
                  container
                  direction="column"
                  className={classes.wrapper}
                  spacing={3}
                >
                  <Grid item style={{ height: '50%' }}>
                    <GasPriceCard />
                  </Grid>
                  <Grid item style={{ height: '50%' }}>
                    <HashRateCard />
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                md={4}
                className={classes.wrapper}
                style={{ height: `calc(100% - ${theme.spacing(3)}px)` }}
              >
                <CoinListCard />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Hidden>

      <Hidden smDown lgUp>
        <Grid container spacing={3}>
          <Grid item md={12}>
            <Grid container spacing={3} style={{ height: 230 }}>
              <Grid item md={6}>
                <IndividualCoinCard rank={0} />
              </Grid>
              <Grid item md={6} style={{ height: 230 }}>
                <IndividualCoinCard rank={1} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={12}>
            <Grid container spacing={3} style={{ height: 230 }}>
              <Grid item md={6}>
                <IndividualCoinCard rank={2} />
              </Grid>
              <Grid item md={6} style={{ height: 230 }}>
                <IndividualCoinCard rank={3} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={12} style={{ height: 500 }}>
            <MarketCapCard />
          </Grid>
          <Grid item xs={12} style={{ height: 500 }}>
            <DefiDominanceCard />
          </Grid>
          <Grid item xs={12} style={{ height: 500 }}>
            <HashRateCard />
          </Grid>
          <Grid item xs={12} style={{ height: 500 }}>
            <GasPriceCard />
          </Grid>
          <Grid item xs={12} style={{ height: 700 }}>
            <CoinListCard />
          </Grid>
        </Grid>
      </Hidden>

      <Hidden mdUp>
        <Grid container spacing={3}>
          <Grid item xs={12} style={{ height: 230 }}>
            <IndividualCoinCard rank={0} />
          </Grid>
          <Grid item xs={12} style={{ height: 230 }}>
            <IndividualCoinCard rank={1} />
          </Grid>
          <Grid item xs={12} style={{ height: 230 }}>
            <IndividualCoinCard rank={2} />
          </Grid>
          <Grid item xs={12} style={{ height: 230 }}>
            <IndividualCoinCard rank={3} />
          </Grid>
          <Grid item xs={12} style={{ height: 700 }}>
            <CoinListCard />
          </Grid>
          <Grid item xs={12} style={{ height: 500 }}>
            <MarketCapCard />
          </Grid>
          <Grid item xs={12} style={{ height: 500 }}>
            <DefiDominanceCard />
          </Grid>
          <Grid item xs={12} style={{ height: 500 }}>
            <HashRateCard />
          </Grid>
          <Grid item xs={12} style={{ height: 500 }}>
            <GasPriceCard />
          </Grid>
        </Grid>
      </Hidden>
    </Grid>
  )
}

export default Overview
