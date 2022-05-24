import React, { useEffect, useState } from 'react'
import {
  makeStyles,
  Theme,
  useTheme,
  CardHeader,
  Avatar,
  Button,
} from '@material-ui/core'
import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import { fetchGasPrice } from '../../../features/gasPriceEstimateSlice'
import EvStationIcon from '@mui/icons-material/EvStation'
import CardLayout from '../../template/CardLayout'
import Spinner from '../../UI/atoms/Spinner'
import GasPrice from '../molecules/GasPrices'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    width: '100%',
    height: '100%',
  },
  button: {
    marginTop: 18,
    marginRight: 8,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.primary,
  },
}))

function GasPriceCard() {
  const classes = useStyles()
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const gasPriceEstimation = useAppSelector((state) => state.gasPriceEstimation)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [dataType, setDataType] = useState<number>(0)
  const titles = ['estimate', 'history']

  useEffect(() => {
    if (
      Object.keys(gasPriceEstimation.value).length === 0 &&
      gasPriceEstimation.status === 'IDLE'
    ) {
      dispatch(fetchGasPrice())
    } else if (Object.keys(gasPriceEstimation.value).length !== 0) {
      setIsLoading(false)
    }
  }, [dispatch, gasPriceEstimation.status, gasPriceEstimation.value])

  return (
    <CardLayout>
      {isLoading ? (
        <Spinner marginTop={35} />
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
                className={classes.button}
                onClick={() => setDataType(dataType + 1)}
              >
                {titles[dataType % 2]}
              </Button>
            }
          />
          <GasPrice data={gasPriceEstimation.value} />
        </div>
      )}
    </CardLayout>
  )
}

export default GasPriceCard
