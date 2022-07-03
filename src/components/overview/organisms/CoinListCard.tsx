import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  makeStyles,
  Theme,
  useTheme,
  Avatar,
  CardHeader,
  List,
  Divider,
  Button,
  Box,
} from '@material-ui/core'
import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import { Coin } from '../../../models/api/coin'
import { fetchCoinMarketChartList } from '../../../features/coinMarketChartSlice'
import LandscapeIcon from '@mui/icons-material/Landscape'
import CardLayout from '../../template/CardLayout'
import CoinItem from '../molecules/CoinItem'
import Spinner from '../../UI/atoms/Spinner'

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    height: '85%',
    marginTop: 8,
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  divider: {
    backgroundColor: theme.palette.info.main,
    height: 2,
  },
  view: {
    width: '100%',
    textAlign: 'center',
    marginTop: 5,
  },
}))

function CoinListCard() {
  const classes = useStyles()
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const coin = useAppSelector((state) => state.coin)
  const coinMarketChart = useAppSelector((state) => state.coinMarketChart)
  const [isLoading1, setIsLoading1] = useState<boolean>(true)
  const top15: Coin[] = coin.value.slice(0, 15)

  useEffect(() => {
    if (coin.value.length !== 0) {
      setIsLoading1(false)
    }
  }, [coin.status, coin.value])

  useEffect(() => {
    if (
      top15.length !== 0 &&
      Object.keys(coinMarketChart.value30).length === 0
    ) {
      dispatch(
        fetchCoinMarketChartList({
          coinId: top15.map((element) => element.id),
          dayRange: 30,
        }),
      )
    }
  }, [top15.length])

  return (
    <CardLayout>
      {isLoading1 ? (
        <Box
          height="100%"
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Spinner />
        </Box>
      ) : (
        <div style={{ height: '100%' }}>
          <CardHeader
            avatar={
              <Avatar style={{ backgroundColor: theme.palette.text.secondary }}>
                <LandscapeIcon
                  style={{ fill: theme.palette.background.default }}
                />
              </Avatar>
            }
            title="Top Crypts"
            titleTypographyProps={{
              variant: 'h6',
              color: 'textPrimary',
            }}
            subheader="by Market Cap"
            subheaderTypographyProps={{
              variant: 'caption',
              color: 'textSecondary',
            }}
            style={{ paddingBottom: 8, paddingTop: 13 }}
          />
          <div className={classes.content}>
            <Divider className={classes.divider} />
            <List disablePadding>
              {top15.map((element, index) => {
                return (
                  <div key={index}>
                    <CoinItem
                      rank={index}
                      coin={coin.value[index]}
                      coinMarketChart={coinMarketChart.value30}
                    />
                    <Divider className={classes.divider} />
                  </div>
                )
              })}
            </List>
            <Button
              onClick={() => navigate('/coins')}
              variant="text"
              className={classes.view}
            >
              View More
            </Button>
          </div>
        </div>
      )}
    </CardLayout>
  )
}

export default CoinListCard
