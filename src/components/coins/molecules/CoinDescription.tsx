import React from 'react'
import { makeStyles, Typography, Theme } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    width: '100%',
    height: '97%',
    marginTop: 8,
    lineHeight: 2,
    '& a': {
      textDecoration: 'none',
      color: theme.palette.secondary.main,
    },
  },
}))

interface Prop {
  description: string
}

function CoinDescription(prop: Prop) {
  const classes = useStyles()

  return (
    <Typography
      variant="body1"
      align="justify"
      className={classes.main}
      dangerouslySetInnerHTML={{
        __html: prop.description.replaceAll(
          '<a',
          '<a target="_blank" rel="noopener noreferrer"',
        ),
      }}
    />
  )
}

export default CoinDescription
