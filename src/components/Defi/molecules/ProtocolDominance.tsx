import React, { useState } from 'react'
import { makeStyles, Theme, CardHeader, Button } from '@material-ui/core'
import CardLayout from '../../template/CardLayout'
import ProtocolDonut from '../atoms/ProtocolDonut'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    width: 410,
    height: 400,
    padding: 5,
    [theme.breakpoints.down('md')]: {
      width: '60%',
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  button: {
    marginTop: 5,
    marginRight: 8,
    borderWidth: 2,
    height: 35,
    color: theme.palette.text.primary,
    borderColor: theme.palette.text.primary,
  },
}))

function ProtocolDominance() {
  const classes = useStyles()
  const [dataType, setDataType] = useState<number>(0)
  const titles = ['Protocols', 'Chains']

  return (
    <div className={classes.main}>
      <CardLayout>
        <CardHeader
          title={`Top ${titles[dataType % 2]}`}
          titleTypographyProps={{
            variant: 'body1',
          }}
          action={
            <Button
              variant="outlined"
              className={classes.button}
              onClick={() => setDataType(dataType + 1)}
            >
              {titles[dataType % 2]}
            </Button>
          }
        />
        <ProtocolDonut type={dataType % 2} />
      </CardLayout>
    </div>
  )
}

export default ProtocolDominance
