import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { RootModule } from '../models/general/pages'
import {
  Whatshot as OverviewIcon,
  BarChart as TrendsIcon,
  Paid as CoinsIcon,
  AccountBalance as ExchangeIcon,
  Memory as DefiIcon,
  CatchingPokemon as NFTIcon,
} from '@mui/icons-material'
import Overview from './Menu/Overview'
import Trends from './Menu/Trends'
import Coins from './Others/Coins'
import Exchange from './Others/Exchange'
import Defi from './Others/Defi'
import NFT from './Others/NFT'
import PageLayout from '../components/template/PageLayout'

const pages: RootModule[] = [
  {
    moduleName: 'Menu',
    index: 1,
    pages: [
      {
        label: 'Overview',
        path: '/',
        icon: <OverviewIcon />,
        page: <Overview />,
        index: 1,
      },
      {
        label: 'Trends',
        path: '/trends',
        icon: <TrendsIcon />,
        page: <Trends />,
        index: 2,
      },
    ],
  },
  {
    moduleName: 'Others',
    index: 2,
    pages: [
      {
        label: 'Coins',
        path: '/coins',
        icon: <CoinsIcon />,
        page: <Coins />,
        index: 3,
      },
      {
        label: 'Exchange',
        path: '/exchange',
        icon: <ExchangeIcon />,
        page: <Exchange />,
        index: 4,
      },
      {
        label: 'Defi',
        path: '/defi',
        icon: <DefiIcon />,
        page: <Defi />,
        index: 5,
      },
      {
        label: 'NFT',
        path: '/nft',
        icon: <NFTIcon />,
        page: <NFT />,
        index: 6,
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
