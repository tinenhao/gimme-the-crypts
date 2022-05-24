import React from 'react'
import { makeStyles, Theme, useTheme } from '@material-ui/core'
import { gasPriceEstimation } from '../../../models/api/gasPriceEstimation'
import GasSpeed from '../atoms/GasSpeed'
import GasAcceptance from '../atoms/GasAcceptance'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    display: 'flex',
    justifyContent: 'space-evenly',
    width: '95%',
    marginTop: 20,
    margin: 'auto',
  },
  content: {
    width: '100%',
  },
}))

interface Prop {
  data: gasPriceEstimation
}

function GasPrice(prop: Prop) {
  const classes = useStyles()
  const theme = useTheme()
  console.log(prop.data)

  return (
    <div className={classes.main}>
      {prop.data.speeds.map(({ acceptance, estimatedFee, gasPrice }, index) => {
        return (
          <div key={index} className={classes.content}>
            <GasSpeed rank={index} gasPrice={gasPrice} txPrice={estimatedFee} />
            <GasAcceptance rank={index} />
          </div>
        )
      })}
    </div>
  )
}

export default GasPrice
