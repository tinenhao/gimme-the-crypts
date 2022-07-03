import React from 'react'
import { useAppSelector } from '../../../app/hooks'
import {
  makeStyles,
  Theme,
  List,
  Avatar,
  Typography,
  ListItem,
} from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    height: '100%',
    width: '48%',
    backgroundColor: theme.palette.info.main,
    borderRadius: 20,
  },
  title: {
    height: 20,
    marginTop: 15,
    marginLeft: 20,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    maxHeight: 240,
    marginTop: 13,
    paddingLeft: 15,
    overflow: 'scroll',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    [theme.breakpoints.down('md')]: {
      height: 210,
    },
  },
  list: {
    display: 'flex',
    justifyContent: 'center',
  },
}))

interface Prop {
  type: number
}

function CorrelationList(prop: Prop) {
  const classes = useStyles()
  const coins = useAppSelector((state) => state.coin).value
  const correlation = useAppSelector((state) => state.correlation)
  const correlationValues = correlation.correlationValues[correlation.timeframe]
  const index = coins.map((coin) => coin.name).indexOf(correlation.coinSelected)

  const types = [
    {
      title: 'Weak (0 - 30)',
      color: '#108703',
      from1: 0,
      to1: 29.9999,
      from2: -29.9999,
      to2: 0,
    },
    {
      title: 'Moderate (30 - 60)',
      color: '#3684ba',
      from1: 30,
      to1: 59.9999,
      from2: -59.9999,
      to2: -30,
    },
    {
      title: 'Strong (60 - 90)',
      color: '#f5bb51',
      from1: 60,
      to1: 89.99999,
      from2: -89.9999,
      to2: -60,
    },
    {
      title: 'Insane (90 - 100)',
      color: '#ff8484',
      from1: 90,
      to1: 99.9999999,
      from2: -99.999999,
      to2: -90,
    },
  ]

  const filteredValues = correlationValues[index]
    .map((element, index) => {
      return { index: index, value: element }
    })
    .filter(
      (coin) =>
        (coin.value * 100 > types[prop.type].from1 &&
          coin.value * 100 < types[prop.type].to1) ||
        (coin.value * 100 > types[prop.type].from2 &&
          coin.value * 100 < types[prop.type].to2),
    )

  return (
    <div className={classes.main}>
      <Typography
        className={classes.title}
        style={{ color: types[prop.type].color }}
      >
        {types[prop.type].title}
      </Typography>
      <div className={classes.content}>
        <List>
          {filteredValues.map((element, index) => {
            return (
              <ListItem key={index} className={classes.list}>
                <Avatar src={coins[element.index].image} />
                <Typography style={{ marginLeft: 20, marginTop: 8, width: 55 }}>
                  {coins[element.index].symbol.toUpperCase()}
                </Typography>
                <Typography
                  align="right"
                  style={{
                    marginLeft: 8,
                    marginTop: 8,
                    width: 55,
                    color: types[prop.type].color,
                  }}
                >
                  {(element.value * 100).toFixed(1)}
                </Typography>
              </ListItem>
            )
          })}
        </List>
      </div>
    </div>
  )
}

export default CorrelationList
