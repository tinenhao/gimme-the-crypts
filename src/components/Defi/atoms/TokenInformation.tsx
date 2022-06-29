import React, { useState } from 'react'
import { useAppSelector } from '../../../app/hooks'
import {
  makeStyles,
  Theme,
  Typography,
  Box,
  IconButton,
} from '@material-ui/core'
import { ContentCopy, CheckCircleOutline } from '@mui/icons-material'
import LinkButton from './LinkButton'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  item: {
    fontSize: 15,
    marginTop: 15,
  },
  copy: {
    padding: 0,
    marginLeft: 8,
    color: theme.palette.text.primary,
  },
}))

function TokenInformation() {
  const classes = useStyles()
  const defi = useAppSelector((state) => state.defiProtocol).protocol
  const [clicked, setClicked] = useState<boolean>(false)

  function handleClick() {
    setClicked(true)
    navigator.clipboard.writeText(defi.address)
  }

  return (
    <div className={classes.main}>
      {defi.address !== null && (
        <Box className={classes.item} display="flex">
          <Typography>
            Address: {defi.address.slice(0, 5)}...{defi.address.slice(-6, -1)}
          </Typography>
          <IconButton className={classes.copy}>
            {clicked ? (
              <CheckCircleOutline style={{ fontSize: 18 }} />
            ) : (
              <ContentCopy
                style={{ fontSize: 18 }}
                onClick={() => {
                  handleClick()
                }}
              />
            )}
          </IconButton>
        </Box>
      )}
      <Box display="flex" marginTop="15px">
        {defi.gecko_id !== null && (
          <LinkButton
            text="CoinGecko"
            link={`https://www.coingecko.com/en/coins/${defi.gecko_id}`}
            color={defi.color}
          />
        )}
        {!defi.address.includes(':') && (
          <LinkButton
            text="Etherscan"
            link={`https://etherscan.io/token/${defi.address}`}
            color={defi.color}
          />
        )}
      </Box>
    </div>
  )
}

export default TokenInformation
