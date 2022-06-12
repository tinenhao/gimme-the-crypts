import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { RootModule } from '../models/general/pages'
import {
  Whatshot as OverviewIcon,
  SwapHorizontalCircle as CorrelationIcon,
  Paid as CoinsIcon,
  AccountBalance as ExchangeIcon,
  Memory as DefiIcon,
  CatchingPokemon as NFTIcon,
  CurrencyExchange as CurrencyIcon,
} from '@mui/icons-material'
import Overview from './Menu/Overview'
import Correlation from './Menu/Correlation'
import Currency from './Menu/Currency'
import Coins from './Others/Coins'
import IndividualCoins from './Others/IndividualCoins'
import Exchange from './Others/Exchange'
import Defi from './Others/Defi'
import NFT from './Others/NFT'
import PageLayout from '../components/template/PageLayout'

const pages: RootModule[] = [
  {
    moduleName: 'Main',
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
        label: 'Correlation',
        path: '/correlation',
        icon: <CorrelationIcon />,
        page: <Correlation />,
        index: 2,
      },
      {
        label: 'Currency',
        path: '/currency',
        icon: <CurrencyIcon />,
        page: <Currency />,
        index: 3,
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
        subpage: {
          path: 'coinId',
          page: <IndividualCoins />,
        },
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
