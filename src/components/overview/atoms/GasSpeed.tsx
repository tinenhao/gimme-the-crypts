import React from 'react'
import { makeStyles, Theme, useTheme, Box, Typography } from '@material-ui/core'
import { useAppSelector } from '../../../app/hooks'
import {
  GppGood as LowRiskIcon,
  HourglassTop as MiddleRiskIcon,
  Dangerous as HighRiskIcon,
} from '@mui/icons-material'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    backgroundColor: theme.palette.info.main,
    margin: 'auto',
    width: '90%',
    textAlign: 'center',
    borderRadius: 15,
    padding: 7,
  },
  header: {
    display: 'flex',
    width: 100,
    margin: 'auto',
  },
}))

interface Prop {
  rank: number
  gasPrice: number
  txPrice: number
}

function GasSpeed(prop: Prop) {
  const classes = useStyles()
  const main = useAppSelector((state) => state.main)
  const theme = useTheme()
  const speeds = [
    {
      title: 'High',
      color: '#cd3a48',
      icon: (
        <HighRiskIcon
          style={{ fill: '#cd3a48', marginTop: 8, marginLeft: 5 }}
        />
      ),
    },
    {
      title: 'Medium',
      color: main.darkMode ? '#f0d46f' : '#d1b85e',
      icon: (
        <MiddleRiskIcon
          style={{ fill: main.darkMode ? '#f0d46f' : '#b59628', marginTop: 8 }}
        />
      ),
    },
    {
      title: 'Low',
      color: main.darkMode ? '#11e4a2' : '#0fba85',
      icon: (
        <LowRiskIcon
          style={{
            fill: main.darkMode ? '#11e4a2' : '#0fba85',
            marginTop: 8,
            marginLeft: 5,
          }}
        />
      ),
    },
  ]

  return (
    <div className={classes.main}>
      <Box className={classes.header}>
        {speeds[prop.rank].icon}
        <Typography variant="body2" style={{ color: speeds[prop.rank].color }}>
          {speeds[prop.rank].title} Risk
        </Typography>
      </Box>
      <Typography style={{ marginTop: 5 }}>
        {prop.gasPrice.toFixed(0)}
      </Typography>
      <Typography color="textSecondary">GWEI</Typography>
      <Typography color="textSecondary">US$</Typography>
      <Typography>{prop.txPrice.toFixed(2)}</Typography>
    </div>
  )
}

export default GasSpeed
