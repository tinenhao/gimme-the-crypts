import React from 'react'
import {
  makeStyles,
  useTheme,
  CardHeader,
  Avatar,
  Box,
  Typography,
} from '@material-ui/core'
import CardLayout from '../../template/CardLayout'
import { IndividualCoin } from '../../../models/api/individualCoin'
import { handleNotExist } from '../../../common/number'
import { Facebook, Twitter, Reddit } from '@mui/icons-material'

const useStyles = makeStyles(() => ({
  main: {
    width: '100%',
    height: '100%',
    padding: 15,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    height: `calc(100% - ${100}px)`,
  },
}))

interface Prop {
  type: 'twitter' | 'facebook' | 'reddit'
  coin: IndividualCoin
}

function SocialStats(prop: Prop) {
  const classes = useStyles()
  const theme = useTheme()

  return (
    <div className={classes.main}>
      <CardLayout info>
        <div style={{ height: '100%', width: '100%' }}>
          <CardHeader
            avatar={
              <Avatar style={{ backgroundColor: theme.palette.info.main }}>
                {prop.type === 'facebook' ? (
                  <Facebook style={{ fill: '#1092f3' }} />
                ) : prop.type === 'reddit' ? (
                  <Reddit style={{ fill: '#ff4500' }} />
                ) : (
                  <Twitter style={{ fill: '#1da1f2' }} />
                )}
              </Avatar>
            }
            title={
              prop.type === 'facebook'
                ? 'Facebook'
                : prop.type === 'reddit'
                ? 'Reddit'
                : 'Twitter'
            }
            titleTypographyProps={{
              variant: 'h6',
              color: 'textPrimary',
            }}
            style={{ paddingBottom: 8, paddingTop: 13 }}
          />
          {prop.type === 'reddit' ? (
            <Box className={classes.content} justifyContent="space-evenly">
              <Box display="flex" justifyContent="space-evenly">
                <Box display="flex" flexDirection="column">
                  <Typography variant="h6">
                    {handleNotExist(
                      prop.coin.community_data.reddit_accounts_active_48h,
                      true,
                    )}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Active Accounts (48H)
                  </Typography>
                </Box>
                <Box display="flex" flexDirection="column">
                  <Typography variant="h6">
                    {handleNotExist(
                      prop.coin.community_data.reddit_subscribers,
                      true,
                    )}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Subscribers
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" justifyContent="space-evenly">
                <Box display="flex" flexDirection="column">
                  <Typography variant="h6">
                    {handleNotExist(
                      prop.coin.community_data.reddit_average_comments_48h,
                      true,
                    )}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Average Comments(48H)
                  </Typography>
                </Box>
                <Box display="flex" flexDirection="column">
                  <Typography variant="h6">
                    {handleNotExist(
                      prop.coin.community_data.reddit_average_posts_48h,
                      true,
                    )}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Average Posts (48H)
                  </Typography>
                </Box>
              </Box>
            </Box>
          ) : prop.type === 'facebook' ? (
            <Box className={classes.content} justifyContent="center">
              <Typography variant="h6">
                {handleNotExist(prop.coin.community_data.facebook_likes, true)}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Likes
              </Typography>
            </Box>
          ) : (
            <Box className={classes.content} justifyContent="center">
              <Typography variant="h6">
                {handleNotExist(
                  prop.coin.community_data.twitter_followers,
                  true,
                )}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Followers
              </Typography>
            </Box>
          )}
        </div>
      </CardLayout>
    </div>
  )
}

export default SocialStats
