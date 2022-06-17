import React from 'react'
import {
  makeStyles,
  Theme,
  useTheme,
  CardHeader,
  Avatar,
  Box,
  Typography,
} from '@material-ui/core'
import CardLayout from '../../template/CardLayout'
import { IndividualCoin } from '../../../models/api/individualCoin'
import { handleNotExist } from '../../../common/number'
import { GitHub } from '@mui/icons-material'
import DeveloperStats from '../atoms/DeveloperStats'
import CommitData from '../atoms/CommitData'
import CommitChart from '../atoms/CommitChart'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    width: '65%',
    height: '100%',
    padding: 15,
  },
  content: {
    paddingLeft: 15,
    paddingRight: 15,
    display: 'flex',
    justifyContent: 'space-evenly',
    height: `calc(100% - ${100}px)`,
  },
  text: {
    minWidth: 150,
  },
}))

interface Prop {
  coin: IndividualCoin
}

function DeveloperTab(prop: Prop) {
  const classes = useStyles()
  const theme = useTheme()
  const githubLink = handleNotExist(prop.coin.links.repos_url.github[0])
  const repoName =
    /.com\/(.+)/.exec(githubLink) === null
      ? githubLink
      : /.com\/(.+)/.exec(githubLink)![1]

  return (
    <div className={classes.main}>
      <CardLayout info>
        <Box height="100%" width="100%">
          <CardHeader
            avatar={
              <Avatar style={{ backgroundColor: theme.palette.info.main }}>
                <GitHub style={{ fill: 'white', fontSize: 40 }} />
              </Avatar>
            }
            title="Git Hub Repo"
            titleTypographyProps={{
              variant: 'h6',
              color: 'textPrimary',
            }}
            subheader={
              githubLink === '-' ? (
                ''
              ) : (
                <Typography
                  variant="caption"
                  color="secondary"
                  style={{ cursor: 'pointer' }}
                  onClick={() => (window.open(githubLink), '_blank')}
                >
                  {repoName}
                </Typography>
              )
            }
            style={{ paddingBottom: 8, paddingTop: 13 }}
          />
          <Box className={classes.content}>
            <Box width="50%">
              <DeveloperStats coin={prop.coin} />
            </Box>
            <Box width="50%">
              <CommitData coin={prop.coin} />
              <CommitChart
                data={
                  prop.coin.developer_data.last_4_weeks_commit_activity_series
                }
              />
            </Box>
          </Box>
        </Box>
      </CardLayout>
    </div>
  )
}

export default DeveloperTab
