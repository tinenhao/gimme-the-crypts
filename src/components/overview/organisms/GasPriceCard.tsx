import React, { useEffect, useState } from 'react'
import {
  makeStyles,
  Theme,
  useTheme,
  CardHeader,
  Avatar,
  Button,
  Box,
} from '@material-ui/core'
import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import { fetchGasPrice } from '../../../features/gasPriceEstimateSlice'
import { fetchGasPriceHistory } from '../../../features/gasPriceHistorySlice'
import EvStationIcon from '@mui/icons-material/EvStation'
import CardLayout from '../../template/CardLayout'
import Spinner from '../../UI/atoms/Spinner'
import GasPrice from '../molecules/GasPrices'
import GasPriceHistory from '../molecules/GasPriceHistory'
import moment from 'moment'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    width: '100%',
    height: '100%',
  },
  button: {
    marginTop: 15,
    marginRight: 8,
    borderColor: theme.palette.text.primary,
    borderWidth: 2,
    color: theme.palette.text.primary,
  },
}))

function GasPriceCard() {
  const classes = useStyles()
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const gasPriceEstimation = useAppSelector((state) => state.gasPriceEstimation)
  const gasPriceHistory = useAppSelector((state) => state.gasPriceHistory)
  const [isLoading1, setIsLoading1] = useState<boolean>(true)
  const [isLoading2, setIsLoading2] = useState<boolean>(true)
  const [dataType, setDataType] = useState<number>(0)
  const titles = ['estimate', 'history']

  const endDate = moment().unix()
  const startDate = moment().subtract(1, 'year').unix()

  useEffect(() => {
    if (
      Object.keys(gasPriceEstimation.value).length === 0 &&
      gasPriceEstimation.status === 'IDLE'
    ) {
      dispatch(fetchGasPrice())
    } else if (Object.keys(gasPriceEstimation.value).length !== 0) {
      setIsLoading1(false)
    }
  }, [dispatch, gasPriceEstimation.status, gasPriceEstimation.value])

  useEffect(() => {
    if (
      gasPriceHistory.value.length === 0 &&
      gasPriceHistory.status === 'IDLE'
    ) {
      dispatch(fetchGasPriceHistory({ startDate: startDate, endDate: endDate }))
    } else if (gasPriceHistory.value.length !== 0) {
      setIsLoading2(false)
    }
  }, [dispatch, gasPriceHistory.status, gasPriceHistory.value])

  console.log(gasPriceEstimation)
  console.log(gasPriceHistory)

  return (
    <CardLayout>
      {isLoading1 || isLoading2 ? (
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
        <div className={classes.main}>
          <CardHeader
            avatar={
              <Avatar style={{ backgroundColor: theme.palette.text.secondary }}>
                <EvStationIcon style={{ fill: 'black' }} />
              </Avatar>
            }
            title="ETH Gas Station"
            titleTypographyProps={{
              variant: 'h6',
              color: 'textPrimary',
            }}
            subheader={'Gas price ' + titles[dataType % 2]}
            subheaderTypographyProps={{
              variant: 'caption',
              color: 'textSecondary',
            }}
            style={{ paddingBottom: 8, paddingTop: 13 }}
            action={
              <Button
                variant="outlined"
                className={classes.button}
                onClick={() => setDataType(dataType + 1)}
              >
                {titles[dataType % 2]}
              </Button>
            }
          />
          {dataType % 2 === 0 ? (
            <GasPrice data={gasPriceEstimation.value} />
          ) : (
            <GasPriceHistory data={gasPriceHistory.value} />
          )}
        </div>
      )}
    </CardLayout>
  )
}

export default GasPriceCard
