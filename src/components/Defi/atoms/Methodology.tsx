import React from 'react'
import { useAppSelector } from '../../../app/hooks'
import { makeStyles, Typography, Box } from '@material-ui/core'
import LinkButton from './LinkButton'

const useStyles = makeStyles(() => ({
  main: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  item: {
    fontSize: 15,
    marginTop: 15,
    marginBottom: 15,
    wordWrap: 'break-word',
  },
}))

function Methodology() {
  const classes = useStyles()
  const defi = useAppSelector((state) => state.defiProtocol).protocol

  return (
    <div className={classes.main}>
      <Typography className={classes.item}>{defi.methodology}</Typography>
      <Box>
        <LinkButton
          text="Code"
          link={`https://github.com/DefiLlama/DefiLlama-Adapters/blob/main/projects/${defi.module}`}
          color={defi.color}
        />
      </Box>
    </div>
  )
}

export default Methodology
