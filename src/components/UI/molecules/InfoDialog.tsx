import React from 'react'
import {
  makeStyles,
  DialogContent,
  Typography,
  List,
  ListItem,
  Box,
  Theme,
  useTheme,
} from '@material-ui/core'
import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import { GppMaybe, Info } from '@mui/icons-material'
import { handleDialog } from '../../../features/mainSlice'
import DialogLayout from '../../template/DialogLayout'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    height: 700,
    width: 400,
    borderRadius: 30,
  },
  title: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  content: {
    paddingLeft: 8,
    paddingTop: 0,
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  sources: {
    marginTop: 4,
    marginLeft: 15,
    cursor: 'pointer',
    color: theme.palette.text.secondary,
  },
  about: {
    marginTop: 4,
    '& a': {
      textDecoration: 'none',
      color: theme.palette.primary.main,
    },
  },
}))

function InfoDialog() {
  const classes = useStyles()
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const main = useAppSelector((state) => state.main)
  const about =
    'This project was born out of my interest for the Crypto world and my desire to practice and learn more about frontend development, specifically the framework - React, state management library - Redux and component library - Material UI. I was fortunate to chance upon <a href="https://cryptoscapes.org/">Cryptospaces</a>, a Crypto Dashboard developed by Leonard Tng which served as an inspiration and reference for the development of Gimme the Crypts.'

  const sources = [
    { title: 'CoinGecko', website: 'https://www.coingecko.com/' },
    { title: 'Owlracle', website: 'https://owlracle.info/eth' },
    { title: 'Blockchain', website: 'https://www.blockchain.com/' },
    { title: 'DefiLlama', website: 'https://defillama.com/' },
    { title: 'CryptoSlam', website: 'https://cryptoslam.io/' },
  ]

  return (
    <DialogLayout
      title="Gimme the Crypts"
      open={main.infoDialog}
      width={500}
      onClose={() => dispatch(handleDialog())}
      header={
        <Typography color="textSecondary">
          One stop dashboard for Cryptocurrency, Defi and NFT Market Data
        </Typography>
      }
    >
      <DialogContent className={classes.content}>
        <List>
          <ListItem>
            <Box display="flex" flexDirection="column">
              <Box display="flex">
                <Info style={{ color: theme.palette.primary.main }} />
                <Typography
                  color="primary"
                  style={{ marginTop: 1, marginLeft: 5 }}
                >
                  About
                </Typography>
              </Box>
              <Typography
                align="justify"
                variant="body2"
                color="textSecondary"
                className={classes.about}
                dangerouslySetInnerHTML={{
                  __html: about.replaceAll(
                    '<a',
                    '<a target="_blank" rel="noopener noreferrer"',
                  ),
                }}
              />
            </Box>
          </ListItem>
          <ListItem>
            <Box display="flex" flexDirection="column">
              <Typography>Powered by: </Typography>
              {sources.map((obj, index) => {
                return (
                  <Typography
                    key={index}
                    onClick={() => (window.open(obj.website), '_blank')}
                    className={classes.sources}
                  >
                    {index + 1}. {obj.title}
                  </Typography>
                )
              })}
            </Box>
          </ListItem>
          <ListItem>
            <Box display="flex" flexDirection="column">
              <Box display="flex">
                <GppMaybe style={{ color: theme.palette.secondary.main }} />
                <Typography
                  color="secondary"
                  style={{ marginTop: 1, marginLeft: 5 }}
                >
                  Warning
                </Typography>
              </Box>
              <Typography
                align="justify"
                variant="body2"
                color="textSecondary"
                style={{ marginTop: 4 }}
              >
                This dashboard is powered primarily by free APIs from the above
                sources and is thus restricted to a maximum number of requests
                per second. This results in the data presented on the dashboard
                to lag real time data by a few seconds. Hence, please do not
                rely on the data presented to make any financial decisions. In
                addition, please try not to click on another page when data is
                still being fetched on the current page as it may result in
                unnecessary delay in fetching data due to the maximum number of
                API calls place by the data sources.
              </Typography>
            </Box>
          </ListItem>
        </List>
      </DialogContent>
    </DialogLayout>
  )
}

export default InfoDialog
