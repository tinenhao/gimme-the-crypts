import React from 'react'
import { makeStyles, Theme, useTheme, Grid, Hidden } from '@material-ui/core'
import CoinListCard from '../../components/overview/CoinListCard'
import DefiDominanceCard from '../../components/overview/DefiDominanceCard'
import ExchangeRateCard from '../../components/overview/ExchangeRateCard'
import GasPriceCard from '../../components/overview/GasPriceCard'
import HashRateCard from '../../components/overview/HashRateCard'
import IndividualCoinCard from '../../components/overview/IndividualCoinCard'
import MarketCapCard from '../../components/overview/MarketCapCard'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    height: '100%',
  },
  wrapper: {
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
                <IndividualCoinCard />
              </Grid>
              <Grid item md={3} style={{ height: 230 }}>
                <IndividualCoinCard />
              </Grid>
              <Grid item md={3} style={{ height: 230 }}>
                <IndividualCoinCard />
              </Grid>
              <Grid item md={3} style={{ height: 230 }}>
                <IndividualCoinCard />
              </Grid>
            </Grid>
          </Grid>
          <Grid item style={{ height: `calc(100% - ${230}px)` }}>
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
                  <Grid item style={{ height: '33.3%' }}>
                    <ExchangeRateCard />
                  </Grid>
                  <Grid item style={{ height: '33.3%' }}>
                    <GasPriceCard />
                  </Grid>
                  <Grid item style={{ height: '33.3%' }}>
                    <HashRateCard />
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                md={4}
                style={{ height: `calc(100% - ${theme.spacing(3)}px)` }}
              >
                <CoinListCard />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Hidden>

      <Hidden smDown lgUp>
        <Grid container direction="column" spacing={3}>
          <Grid item>
            <Grid container spacing={3} style={{ height: 300 }}>
              <Grid item md={6}>
                <IndividualCoinCard />
              </Grid>
              <Grid item md={6} style={{ height: 300 }}>
                <IndividualCoinCard />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container spacing={3} style={{ height: 300 }}>
              <Grid item md={6}>
                <IndividualCoinCard />
              </Grid>
              <Grid item md={6} style={{ height: 300 }}>
                <IndividualCoinCard />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container spacing={3} style={{ height: 500 }}>
              <Grid item md={6}>
                <MarketCapCard />
              </Grid>
              <Grid item md={6} style={{ height: 500 }}>
                <DefiDominanceCard />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container spacing={3} style={{ height: 500 }}>
              <Grid item md={6}>
                <GasPriceCard />
              </Grid>
              <Grid item md={6} style={{ height: 500 }}>
                <HashRateCard />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container spacing={3} style={{ height: 500 }}>
              <Grid item md={6}>
                <ExchangeRateCard />
              </Grid>
              <Grid item md={6} style={{ height: 500 }}>
                <CoinListCard />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Hidden>

      <Hidden mdUp>
        <Grid container spacing={3}>
          <Grid item xs={12} style={{ height: 300 }}>
            <IndividualCoinCard />
          </Grid>
          <Grid item xs={12} style={{ height: 300 }}>
            <IndividualCoinCard />
          </Grid>
          <Grid item xs={12} style={{ height: 300 }}>
            <IndividualCoinCard />
          </Grid>
          <Grid item xs={12} style={{ height: 300 }}>
            <IndividualCoinCard />
          </Grid>
          <Grid item xs={12} style={{ height: 'fit-content' }}>
            <CoinListCard />
          </Grid>
          <Grid item xs={12} style={{ height: 300 }}>
            <MarketCapCard />
          </Grid>
          <Grid item xs={12} style={{ height: 300 }}>
            <DefiDominanceCard />
          </Grid>
          <Grid item xs={12} style={{ height: 200 }}>
            <ExchangeRateCard />
          </Grid>
          <Grid item xs={12} style={{ height: 200 }}>
            <HashRateCard />
          </Grid>
          <Grid item xs={12} style={{ height: 200 }}>
            <GasPriceCard />
          </Grid>
        </Grid>
      </Hidden>
    </Grid>
  )
}

export default Overview
