import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import {
  makeStyles,
  Theme,
  Box,
  AppBar,
  Tabs,
  Tab,
  Hidden,
  Button,
} from '@material-ui/core'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import {
  handleMobileStatsDialog,
  fetchIndividualCoin,
  fetchCoinMarketChart,
  restart,
} from '../../../features/individualCoinSlice'
import CardLayout from '../../template/CardLayout'
import Spinner from '../../UI/atoms/Spinner'
import IndividualHeader from '../molecules/IndividualHeader'
import MobileIndividualHeader from '../molecules/MobileIndividualHeader'
import IndividualStats from '../molecules/IndividualStats'
import IndividualConversion from '../molecules/IndividualConversion'
import CoinDescription from '../molecules/CoinDescription'
import ChartToolbar from '../atoms/ChartToolbar'
import CoinChart from '../molecules/CoinChart'
import MarketDataScores from '../molecules/MarketDataScores'
import MarketData from '../molecules/MarketData'
import Score from '../atoms/Score'
import SocialStats from '../molecules/SocialStats'
import DeveloperTab from '../molecules/DeveloperTab'
import MarketDataDialog from '../atoms/MarketDataDialog'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 20,
    paddingRight: 20,
    [theme.breakpoints.down('xs')]: {
      paddingLeft: 5,
      paddingRight: 5,
    },
  },
  appBar: {
    borderBottom: `2px solid ${theme.palette.text.secondary}`,
    '& .MuiTabs-indicator': {
      height: 4,
      borderRadius: 2,
      backgroundColor: theme.palette.secondary.main,
    },
  },
  tab: {
    overflow: 'scroll',
    paddingBottom: 10,
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  indiv: {
    height: '100%',
    width: '100%',
  },
  button: {
    backgroundColor: theme.palette.secondary.main,
    color: 'black',
    width: '70%',
  },
}))

function CoinListCard() {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const location = useLocation()
  const id = location.pathname.split('/').pop() as string
  const individualCoin = useAppSelector((state) => state.individualCoin)
  const [type, setType] = useState<number>(0)

  useEffect(() => {
    dispatch(restart())
    dispatch(fetchIndividualCoin({ id: id }))
    dispatch(fetchCoinMarketChart({ id: id }))
    setType(0)
  }, [id])

  return (
    <CardLayout>
      {Object.keys(individualCoin.value).length !== 0 &&
      individualCoin.marketChartValue.length !== 0 ? (
        <div className={classes.main}>
          <Hidden xsDown>
            <IndividualHeader coin={individualCoin.value} />
            <IndividualStats coin={individualCoin.value} />
            <IndividualConversion coin={individualCoin.value} />
            <Box marginTop={1}>
              <AppBar
                position="static"
                color="transparent"
                elevation={0}
                className={classes.appBar}
              >
                <Tabs value={type} onChange={(e, value) => setType(value)}>
                  <Tab label="Chart" value={0} />
                  <Tab label="About" value={1} />
                  <Tab label="Market Data" value={2} />
                  <Tab label="Social" value={3} />
                  <Tab label="Developer" value={4} />
                </Tabs>
              </AppBar>
            </Box>
            <Box
              width="100%"
              className={classes.tab}
              style={{ height: `calc(88% - ${320}px)` }}
            >
              <Box hidden={type !== 0} className={classes.indiv}>
                <Box display="flex" justifyContent="space-between" height={65}>
                  <ChartToolbar type="type" />
                  <ChartToolbar type="time" />
                </Box>
                <Box width="100%" height="90%">
                  <CoinChart />
                </Box>
              </Box>
              <Box hidden={type !== 1}>
                <CoinDescription
                  description={individualCoin.value.description.en}
                />
              </Box>
              <Box hidden={type !== 2} className={classes.indiv}>
                <Box display="flex" height="100%">
                  <MarketDataScores coin={individualCoin.value} />
                  <MarketData coin={individualCoin.value} />
                </Box>
              </Box>
              <Box hidden={type !== 3} className={classes.indiv}>
                <Box display="flex" height="100%" marginTop={2}>
                  <Score
                    big
                    title="Community Score"
                    percentage={individualCoin.value.community_score}
                  />
                  <Box width="33%">
                    <SocialStats type="reddit" coin={individualCoin.value} />
                  </Box>
                  <Box display="flex" flexDirection="column" width="33%">
                    <SocialStats type="facebook" coin={individualCoin.value} />
                    <SocialStats type="twitter" coin={individualCoin.value} />
                  </Box>
                </Box>
              </Box>
              <Box hidden={type !== 4} className={classes.indiv} marginTop={2}>
                <Box display="flex" height="100%">
                  <Score
                    big
                    title="Developer Score"
                    percentage={individualCoin.value.developer_score}
                  />
                  <DeveloperTab coin={individualCoin.value} />
                </Box>
              </Box>
            </Box>
          </Hidden>
          <Hidden smUp>
            <MobileIndividualHeader coin={individualCoin.value} />
            <Box paddingBottom={3} style={{ textAlign: 'center' }}>
              <Button
                onClick={() => dispatch(handleMobileStatsDialog())}
                className={classes.button}
              >
                Data
              </Button>
              <ChartToolbar type="type" />
              <ChartToolbar type="time" />
            </Box>
            <Box height={`calc(100% - ${300}px)`}>
              <CoinChart />
            </Box>
            <MarketDataDialog coin={individualCoin.value} />
          </Hidden>
        </div>
      ) : (
        <Box
          height="100%"
          width="100%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <Spinner />
        </Box>
      )}
    </CardLayout>
  )
}

export default CoinListCard
