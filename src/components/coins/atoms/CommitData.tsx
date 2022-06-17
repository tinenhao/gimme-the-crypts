import React from 'react'
import { makeStyles, Box, Typography, useTheme } from '@material-ui/core'
import { IndividualCoin } from '../../../models/api/individualCoin'
import { handleNotExist } from '../../../common/number'

const useStyles = makeStyles(() => ({
  main: {
    height: '50%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
}))

interface Prop {
  coin: IndividualCoin
}

function CommitData(prop: Prop) {
  const classes = useStyles()
  const theme = useTheme()
  const data = [
    {
      title: 'Total Count',
      value: handleNotExist(prop.coin.developer_data.commit_count_4_weeks),
      color: theme.palette.text.primary,
    },
    {
      title: 'Additions',
      value: prop.coin.developer_data.code_additions_deletions_4_weeks.additions
        ? '+' +
          prop.coin.developer_data.code_additions_deletions_4_weeks.additions
        : '-',
      color: theme.palette.success.light,
    },
    {
      title: 'Deletions',
      value: handleNotExist(
        prop.coin.developer_data.code_additions_deletions_4_weeks.deletions,
      ),
      color: theme.palette.error.light,
    },
  ]

  return (
    <div className={classes.main}>
      <Typography align="center" color="textSecondary">
        Commit Activity (4 weeks)
      </Typography>
      {data.map((element, index) => {
        return (
          <Box display="flex" justifyContent="space-between" key={index}>
            <Typography>{element.title}</Typography>
            <Typography style={{ color: element.color }}>
              {element.value}
            </Typography>
          </Box>
        )
      })}
    </div>
  )
}

export default CommitData
