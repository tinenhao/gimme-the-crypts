import React from 'react'
import { Box, Typography, Avatar } from '@material-ui/core'
import { useAppSelector } from '../../../app/hooks'

interface Prop {
  type: 'From' | 'To'
}

function CoinTitle(prop: Prop) {
  const currencyConverter = useAppSelector((state) => state.currencyConverter)

  return (
    <Box style={{ display: 'flex' }}>
      <Avatar
        style={{ height: 30, width: 30, marginRight: 8 }}
        src={
          prop.type === 'From'
            ? currencyConverter.coinFrom.image
            : currencyConverter.coinTo.image
        }
      />
      <Typography style={{ marginTop: 3 }}>
        {prop.type === 'From'
          ? currencyConverter.coinFrom.symbol.toUpperCase()
          : currencyConverter.coinTo.symbol.toUpperCase()}
      </Typography>
    </Box>
  )
}

export default CoinTitle
