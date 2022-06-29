import React from 'react'
import { OpenInNewRounded } from '@mui/icons-material'
import { makeStyles, Button, Theme } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    borderRadius: 8,
    height: 30,
    textTransform: 'none',
    color: theme.palette.background.paper,
  },
}))

interface Prop {
  text: string
  link: string
  color: string
}

function LinkButton(prop: Prop) {
  const classes = useStyles()

  return (
    <div style={{ paddingRight: 8 }}>
      <Button
        className={classes.button}
        style={{
          backgroundColor: prop.color,
        }}
        onClick={() => (window.open(prop.link), '_blank')}
      >
        {prop.text}
        <OpenInNewRounded style={{ marginLeft: 5, fontSize: 18 }} />
      </Button>
    </div>
  )
}

export default LinkButton
