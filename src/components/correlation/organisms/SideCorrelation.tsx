import React from 'react'
import { useAppSelector } from '../../../app/hooks'
import {
  makeStyles,
  useTheme,
  CardHeader,
  Avatar,
  List,
  Hidden,
} from '@material-ui/core'
import {
  ThumbDownAlt as NegativeIcon,
  ThumbUpAlt as PositiveIcon,
} from '@mui/icons-material'
import CardLayout from '../../template/CardLayout'
import CoinPair from '../atoms/CoinPair'
import Spinner from '../../UI/atoms/Spinner'

const useStyles = makeStyles(() => ({
  main: {
    width: '100%',
    height: '90%',
  },
  content: {
    height: '90%',
    overflow: 'scroll',
    marginTop: 8,
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
}))

interface Prop {
  type: 'Positive' | 'Negative'
}

interface coinPair {
  firstCoin: number
  secondCoin: number
  value: number
}

function SideCorrelation(prop: Prop) {
  const classes = useStyles()
  const theme = useTheme()
  const correlation = useAppSelector((state) => state.correlation)
  const correlationValues = correlation.correlationValues[correlation.timeframe]
  const allPairs = []

  if (correlationValues !== undefined) {
    for (let i = 0; i < 50; i++) {
      for (let j = i; j < 50; j++) {
        const coin: coinPair = {
          firstCoin: i,
          secondCoin: j,
          value: correlationValues[i][j],
        }
        if (coin.value !== 1) {
          allPairs.push(coin)
        }
      }
    }
  }

  function sort(a: coinPair, b: coinPair) {
    if (a.value > b.value) {
      return prop.type === 'Positive' ? -1 : 1
    } else if (a.value < b.value) {
      return prop.type === 'Positive' ? 1 : -1
    } else {
      return 0
    }
  }

  const top15Pairs = allPairs.sort(sort).splice(0, 15)

  return (
    <CardLayout>
      <div className={classes.main}>
        <CardHeader
          avatar={
            <Avatar style={{ backgroundColor: theme.palette.text.secondary }}>
              {prop.type === 'Positive' ? <PositiveIcon /> : <NegativeIcon />}
            </Avatar>
          }
          title={prop.type === 'Positive' ? 'Positive' : 'Negative'}
          titleTypographyProps={{
            variant: 'h6',
            color: 'textPrimary',
          }}
          subheader="Top 15 correlated"
          subheaderTypographyProps={{
            variant: 'body2',
            color: 'textSecondary',
          }}
          style={{ paddingBottom: 8, paddingTop: 13 }}
        />
        {correlation.correlationValues[correlation.timeframe] === undefined ? (
          <div>
            <Hidden smDown>
              <Spinner
                marginTop={25}
                determinate={true}
                progress={correlation.progress[correlation.timeframe]}
              />
            </Hidden>
            <Hidden mdUp>
              <Spinner
                marginTop={10}
                determinate={true}
                progress={correlation.progress[correlation.timeframe]}
              />
            </Hidden>
          </div>
        ) : (
          <List disablePadding className={classes.content}>
            {top15Pairs.map((element, index) => {
              return (
                <div key={index}>
                  <CoinPair
                    rank={index + 1}
                    firstCoin={element.firstCoin}
                    secondCoin={element.secondCoin}
                    value={element.value}
                  />
                </div>
              )
            })}
          </List>
        )}
      </div>
    </CardLayout>
  )
}

export default SideCorrelation
