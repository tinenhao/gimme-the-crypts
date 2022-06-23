import React, { useEffect } from 'react'
import {
  makeStyles,
  Theme,
  useTheme,
  CardHeader,
  Avatar,
  Box,
} from '@material-ui/core'
import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import {
  fetchTop50Prices,
  updateCorrelationValues,
  incrementProgress,
} from '../../../features/correlationSlice'
import { correlationCalculator } from '../../../common/correlationCalculator'
import MapIcon from '@mui/icons-material/Map'
import CardLayout from '../../template/CardLayout'
import TimeframeToolbar from '../atoms/TimeframeToolbar'
import HeatmapUtils from '../molecules/HeatmapUtils'
import HeatMap from '../molecules/HeatMap'
import IndividualUtils from '../molecules/IndividualUtils'
import IndividualCorrelation from '../molecules/IndividualCorrelation'
import Spinner from '../../UI/atoms/Spinner'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    width: '100%',
    height: '100%',
    minWidth: 650,
    [theme.breakpoints.down('md')]: {
      height: '80%',
    },
  },
}))

function MainCorrelation() {
  const classes = useStyles()
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const topCoins = useAppSelector((state) => state.coin)
  const correlation = useAppSelector((state) => state.correlation)
  const arr = [] as number[][]

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch(incrementProgress())
    }, 550)

    return () => {
      clearInterval(timer)
    }
  }, [])

  useEffect(() => {
    if (
      topCoins.value.length !== 0 &&
      correlation.correlationValues[correlation.timeframe] === undefined
    ) {
      dispatch(
        fetchTop50Prices({
          coinId: topCoins.value.map((coin) => coin.id),
          timeframe: correlation.timeframe,
        }),
      )
    }
  }, [correlation.timeframe])

  useEffect(() => {
    for (let a = 0; a < 5; a++) {
      if (
        correlation.value[a] !== undefined &&
        correlation.correlationValues[a] === undefined
      ) {
        for (let i = 0; i < 50; i++) {
          if (arr[i] === undefined) {
            arr[i] = []
          }
          for (let j = i; j < 50; j++) {
            if (arr[j] === undefined) {
              arr[j] = []
            }
            const corr = correlationCalculator(correlation.value[a], i, j)
            arr[i][j] = corr
            arr[j][i] = corr
          }
        }
        dispatch(
          updateCorrelationValues({
            arr: arr,
            timeframe: a,
          }),
        )
      }
    }
  }, [correlation.value])

  return (
    <CardLayout>
      <div className={classes.main}>
        <CardHeader
          avatar={
            <Avatar style={{ backgroundColor: theme.palette.text.secondary }}>
              <MapIcon />
            </Avatar>
          }
          title="Coin Correlation"
          titleTypographyProps={{
            variant: 'h6',
            color: 'textPrimary',
          }}
          subheader="Heatmap"
          subheaderTypographyProps={{
            variant: 'body2',
            color: 'textSecondary',
          }}
          style={{ paddingBottom: 8, paddingTop: 13 }}
          action={<TimeframeToolbar />}
        />
        {correlation.correlationValues[correlation.timeframe] === undefined ? (
          <Box
            height={`calc(100% - ${80}px)`}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Spinner
              determinate={true}
              progress={correlation.progress[correlation.timeframe]}
            />
          </Box>
        ) : (
          <Box height="100%">
            {correlation.heatmap ? (
              <Box height="100%">
                <HeatmapUtils />
                <HeatMap />
              </Box>
            ) : (
              <Box height="100%">
                <IndividualUtils />
                <IndividualCorrelation />
              </Box>
            )}
          </Box>
        )}
      </div>
    </CardLayout>
  )
}

export default MainCorrelation
