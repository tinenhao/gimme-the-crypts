import React, { useState } from 'react'
import { makeStyles, Theme, CardHeader, Button } from '@material-ui/core'
import { useAppSelector } from '../../../app/hooks'
import CardLayout from '../../template/CardLayout'
import HistoricalTVLGraph from '../atoms/HistoricalTVLGraph'
import ChainPercentageGraph from '../atoms/ChainPercentageGraph'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    width: `calc(100% - ${710}px)`,
    height: 400,
    padding: 5,
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  button: {
    marginTop: 5,
    marginRight: 8,
    borderWidth: 2,
    height: 35,
    color: theme.palette.text.primary,
    borderColor: theme.palette.text.primary,
  },
}))

function TVLChart() {
  const classes = useStyles()
  const defi = useAppSelector((state) => state.defiProtocol)
  const [dataType, setDataType] = useState<number>(0)
  const titles = ['Historical TVL', 'Chain Dominance']
  const buttons = ['TVL', 'Chains']

  return (
    <div className={classes.main}>
      <CardLayout>
        <CardHeader
          title={`${titles[dataType % 2]}`}
          titleTypographyProps={{
            variant: 'body1',
          }}
          action={
            <Button
              variant="outlined"
              className={classes.button}
              onClick={() => setDataType(dataType + 1)}
            >
              {buttons[dataType % 2]}
            </Button>
          }
        />
        {dataType % 2 === 0 ? (
          <HistoricalTVLGraph chartData={defi.TVLChart} />
        ) : (
          <ChainPercentageGraph />
        )}
      </CardLayout>
    </div>
  )
}

export default TVLChart
