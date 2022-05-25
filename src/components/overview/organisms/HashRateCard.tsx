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
import { fetchBTCHashRateAndPrice } from '../../../features/btcHashRateSlice'
import BtcHash from '../molecules/BtcHash'
import HandymanIcon from '@mui/icons-material/Handyman'
import CardLayout from '../../template/CardLayout'
import Spinner from '../../UI/atoms/Spinner'

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

function HashRateCard() {
  const classes = useStyles()
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const btcHashRate = useAppSelector((state) => state.btcHashRate)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [dataType, setDataType] = useState<number>(0)
  const subheaders = ['hash rate', 'mining pools']
  const buttonTitle = ['hash', 'pools']

  useEffect(() => {
    if (
      Object.keys(btcHashRate.value['btcPrice']).length +
        Object.keys(btcHashRate.value['hashRate']).length +
        Object.keys(btcHashRate.value['pools']).length ===
        0 &&
      btcHashRate.status === 'IDLE'
    ) {
      dispatch(fetchBTCHashRateAndPrice())
    } else if (
      Object.keys(btcHashRate.value['btcPrice']).length !== 0 &&
      Object.keys(btcHashRate.value['hashRate']).length !== 0 &&
      Object.keys(btcHashRate.value['pools']).length !== 0
    ) {
      setIsLoading(false)
    }
  }, [dispatch, btcHashRate.status, btcHashRate.value])

  return (
    <CardLayout>
      {isLoading ? (
        <Spinner marginTop={35} />
      ) : (
        <div className={classes.main}>
          <CardHeader
            avatar={
              <Avatar style={{ backgroundColor: theme.palette.text.secondary }}>
                <HandymanIcon style={{ fill: 'black' }} />
              </Avatar>
            }
            title="BTC Mine"
            titleTypographyProps={{
              variant: 'h6',
              color: 'textPrimary',
            }}
            subheader={'Bitcoin ' + subheaders[dataType % 2]}
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
                {buttonTitle[dataType % 2]}
              </Button>
            }
          />
          {dataType % 2 === 0 ? (
            <BtcHash
              btcPrice={btcHashRate.value.btcPrice}
              hashRate={btcHashRate.value.hashRate}
            />
          ) : (
            <div>test2</div>
          )}
        </div>
      )}
    </CardLayout>
  )
}

export default HashRateCard
