import React from 'react'
import { makeStyles, Box } from '@material-ui/core'
import ConversionInput from '../atoms/ConversionInput'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'
import { IndividualCoin } from '../../../models/api/individualCoin'

const useStyles = makeStyles(() => ({
  main: {
    width: '100%',
    height: 70,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 20,
  },
  icon: {
    marginTop: 5,
    marginLeft: 25,
    marginRight: 25,
  },
}))

interface Prop {
  coin: IndividualCoin
}

function IndividualConversion(prop: Prop) {
  const classes = useStyles()

  return (
    <div className={classes.main}>
      <Box display="flex" justifyContent="center">
        <ConversionInput type="From" coin={prop.coin} />
        <SwapHorizIcon className={classes.icon} style={{ fontSize: 40 }} />
        <ConversionInput type="To" />
      </Box>
    </div>
  )
}

export default IndividualConversion
