import React, { useState } from 'react'
import {
  makeStyles,
  Theme,
  useTheme,
  CardHeader,
  Avatar,
  Button,
  Box,
  IconButton,
} from '@material-ui/core'
import { handleDialog } from '../../../features/coinSlice'
import { useAppDispatch } from '../../../app/hooks'
import MetricDialog from '../molecules/MetricDialog'
import { Landscape, ArrowCircleUp, ArrowCircleDown } from '@mui/icons-material'
import CardLayout from '../../template/CardLayout'
import CoinListTable from '../molecules/CoinListTable'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    width: '100%',
    height: '100%',
    minWidth: 600,
  },
  button: {
    marginTop: 15,
    marginRight: 25,
    borderColor: theme.palette.text.primary,
    borderWidth: 2,
    color: theme.palette.text.primary,
  },
}))

function CoinListCard() {
  const classes = useStyles()
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const [start, setStart] = useState<number>(0)
  const [end, setEnd] = useState<number>(0)

  return (
    <CardLayout>
      <div className={classes.main}>
        <CardHeader
          avatar={
            <Avatar style={{ backgroundColor: theme.palette.text.secondary }}>
              <Landscape />
            </Avatar>
          }
          title="All Cryptocurrencies"
          titleTypographyProps={{
            variant: 'h6',
            color: 'textPrimary',
          }}
          action={
            <Box>
              <IconButton
                onClick={() => setStart(start + 1)}
                style={{ marginTop: 13, color: theme.palette.text.primary }}
              >
                <ArrowCircleUp style={{ fontSize: 40 }} />
              </IconButton>
              <IconButton
                onClick={() => setEnd(end + 1)}
                style={{
                  marginTop: 13,
                  marginRight: 8,
                  color: theme.palette.text.primary,
                }}
              >
                <ArrowCircleDown style={{ fontSize: 40 }} />
              </IconButton>
              <Button
                variant="outlined"
                className={classes.button}
                onClick={() => dispatch(handleDialog())}
              >
                Metrics
              </Button>
            </Box>
          }
          style={{ paddingBottom: 0, paddingTop: 10, paddingLeft: 15 }}
        />
        <CoinListTable start={start} end={end} />
        <MetricDialog />
      </div>
    </CardLayout>
  )
}

export default CoinListCard
