import React from 'react'
import { makeStyles, Theme } from '@material-ui/core'
import { useAppSelector } from '../../../app/hooks'
import Tooltip from '../../../components/template/Tooltip'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    backgroundColor: theme.palette.info.main,
    margin: 'auto',
    marginTop: 10,
    width: '90%',
    textAlign: 'center',
    borderRadius: 10,
    padding: 7,
  },
}))

interface Prop {
  rank: number
}

function GasAcceptance(prop: Prop) {
  const classes = useStyles()
  const main = useAppSelector((state) => state.main)
  const speeds = [
    {
      title: '50%',
      color: '#cd3a48',
    },
    {
      title: '80%',
      color: main.darkMode ? '#f0d46f' : '#b59628',
    },
    {
      title: '100%',
      color: main.darkMode ? '#11e4a2' : '#0fba85',
    },
  ]

  return (
    <Tooltip
      title={`${
        speeds[prop.rank].title
      } of blocks accepting transaction with the suggested fee`}
    >
      <div className={classes.main} style={{ color: speeds[prop.rank].color }}>
        {speeds[prop.rank].title}
      </div>
    </Tooltip>
  )
}

export default GasAcceptance
