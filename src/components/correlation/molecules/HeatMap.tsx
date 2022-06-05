import React, { useState, useEffect } from 'react'
import { makeStyles, Theme, useTheme } from '@material-ui/core'
import { useAppSelector } from '../../../app/hooks'
import Chart from 'react-apexcharts'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    width: '100%',
    height: '100%',
    marginTop: 35,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 20,
    '& .tooltip': {
      padding: 12,
      backgroundColor: theme.palette.background.default,
      '& .header': {
        color: theme.palette.text.primary,
      },
      '& .content': {
        color: theme.palette.text.secondary,
      },
    },
  },
}))

function HeatMap() {
  const classes = useStyles()
  const theme = useTheme()
  const correlation = useAppSelector((state) => state.correlation)
  const coins = useAppSelector((state) => state.coin)

  const coinListSymbol = coins.value.map((coin) => coin.symbol)
  const coinListName = coins.value.map((coin) => coin.name)
  const timeframe = correlation.timeframe
  const numCoins = correlation.coinsNum

  const rawData = correlation.correlationValues[timeframe]
  const formattedData = []

  for (let i = 0; i < numCoins; i++) {
    const data = []
    for (let j = 0; j < numCoins; j++) {
      const x = coinListSymbol[j].toUpperCase()
      const y = Math.abs(rawData[i][j] * 100)
      data.push({ x: x, y: y })
    }
    formattedData.push({ name: coinListSymbol[i].toUpperCase(), data: data })
  }

  const options = {
    chart: {
      id: 'CorrelationHeatMap',
      fontFamily: 'Erbaum',
      color: theme.palette.text.primary,
    },
    dataLabels: {
      enabled: false,
    },
    colors: ['#000000'],
    yaxis: {
      labels: {
        style: {
          colors: theme.palette.text.primary,
          fontSize: `${theme.typography.subtitle2.fontSize}`,
        },
      },
    },
    xaxis: {
      labels: {
        style: {
          colors: theme.palette.text.primary,
          fontSize: `${theme.typography.subtitle2.fontSize}`,
        },
      },
      tooltip: {
        enabled: false,
      },
    },
    legend: {
      labels: {
        colors: theme.palette.text.primary,
      },
    },
    tooltip: {
      custom: (data: any) => {
        const correlation = (
          rawData[data.seriesIndex][data.dataPointIndex] * 100
        ).toFixed(1)
        return `<div class="tooltip">
          <div class="header">${coinListName[data.seriesIndex]} vs ${
          coinListName[data.dataPointIndex]
        }</div>
          <div class="content">Correlation Value: ${correlation}</div>
        </div>`
      },
    },
    plotOptions: {
      heatmap: {
        enableShades: true,
        shadeIntensity: 0.5,
        radius: 3,
        colorScale: {
          ranges: [
            {
              from: 0.00000001,
              to: 29.999999999,
              color: '#108703',

              name: 'Weak (0 - 30)',
            },
            {
              from: 30,
              to: 59.9999999999,
              color: '#3684ba',
              name: 'Moderate (30 - 60)',
            },
            {
              from: 60,
              to: 89.9999999,
              color: '#f5bb51',
              name: 'Strong (60 - 90)',
            },
            {
              from: 90,
              to: 99.999999999,
              color: '#ff0000',
              name: 'Insane (> 90)',
            },
          ],
        },
      },
    },
  }

  return (
    <div className={classes.main}>
      <Chart
        options={options}
        series={formattedData}
        type="heatmap"
        height="100%"
        width="100%"
      />
    </div>
  )
}

export default HeatMap
