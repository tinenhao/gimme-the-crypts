import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { RootModule } from '../models/general/pages'
import OverviewIcon from '@mui/icons-material/Whatshot'
import TrendsIcon from '@mui/icons-material/BarChart'
import CoinsIcon from '@mui/icons-material/Paid'
import ExchangeIcon from '@mui/icons-material/AccountBalance'
import DefiIcon from '@mui/icons-material/Memory'
import NFTIcon from '@mui/icons-material/CatchingPokemon'
import Overview from './Menu/Overview'
import Trends from './Menu/Trends'
import Coins from './Others/Coins'
import Exchange from './Others/Exchange'
import Defi from './Others/Defi'
import NFT from './Others/NFT'
import PageLayout from '../components/layout/PageLayout'

const pages: RootModule[] = [
  {
    moduleName: 'Menu',
    pages: [
      {
        label: 'overview',
        path: '/overview',
        icon: <OverviewIcon />,
        page: <Overview />,
      },
      {
        label: 'trends',
        path: '/trends',
        icon: <TrendsIcon />,
        page: <Trends />,
      },
    ],
  },
  {
    moduleName: 'Others',
    pages: [
      {
        label: 'coins',
        path: '/coins',
        icon: <CoinsIcon />,
        page: <Coins />,
      },
      {
        label: 'exchange',
        path: '/exchange',
        icon: <ExchangeIcon />,
        page: <Exchange />,
      },
      {
        label: 'defi',
        path: '/defi',
        icon: <DefiIcon />,
        page: <Defi />,
      },
      {
        label: 'nft',
        path: '/nft',
        icon: <NFTIcon />,
        page: <NFT />,
      },
    ],
  },
]

function Main() {
  return (
    <div>
      <BrowserRouter>
        <PageLayout rootModule={pages}></PageLayout>
      </BrowserRouter>
    </div>
  )
}

export default Main
