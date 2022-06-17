import React from 'react'
import { Box, CircularProgress, Typography } from '@material-ui/core'

interface Prop {
  title: string
  percentage: number
  big?: boolean
}

function Score(prop: Prop) {
  const value =
    prop.percentage === undefined || prop.percentage === null
      ? 0
      : prop.percentage
  const color =
    prop.percentage > 66
      ? '#11e4a2'
      : prop.percentage > 33
      ? '#f0d46f'
      : '#cd3a48'

  return (
    <div
      style={{
        margin: 'auto',
        textAlign: 'center',
      }}
    >
      <Box position="relative" display="inline-flex">
        <CircularProgress
          variant="determinate"
          thickness={5}
          value={value}
          style={{
            width: prop.big ? 200 : 120,
            height: prop.big ? 200 : 120,
            color: color,
          }}
        />
        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography
            variant={prop.big ? 'h6' : 'body2'}
            component="div"
            color="textPrimary"
          >{`${value.toFixed(2)}%`}</Typography>
        </Box>
      </Box>
      <Typography
        variant={prop.big ? 'h5' : 'body1'}
        style={{
          marginTop: 15,
          textAlign: 'center',
        }}
      >
        {prop.title}
      </Typography>
    </div>
  )
}

export default Score
