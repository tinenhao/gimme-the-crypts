import React, { useState } from 'react'
import {
  makeStyles,
  Theme,
  Typography,
  Box,
  IconButton,
} from '@material-ui/core'
import { ContentCopy, CheckCircleOutline } from '@mui/icons-material'

const useStyles = makeStyles((theme: Theme) => ({
  item: {
    fontSize: 15,
  },
  copy: {
    padding: 0,
    marginLeft: 8,
    color: theme.palette.text.primary,
  },
}))

interface Prop {
  text: string
}

function Address(prop: Prop) {
  const classes = useStyles()
  const [clicked, setClicked] = useState<boolean>(false)

  function handleClick() {
    setClicked(true)
    navigator.clipboard.writeText(prop.text)
  }

  return (
    <Box className={classes.item} display="flex">
      <Typography>
        {prop.text.slice(0, 5)}...{prop.text.slice(-6, -1)}
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
  )
}

export default Address
