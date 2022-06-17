import React from 'react'
import { Box } from '@material-ui/core'
import { IndividualCoin } from '../../../models/api/individualCoin'
import Score from '../atoms/Score'

interface Prop {
  coin: IndividualCoin
}

function MarketDataScores(prop: Prop) {
  return (
    <Box
      display="flex"
      justifyContent="space-evenly"
      marginTop={2}
      height="100%"
      width="100%"
      minHeight={400}
      minWidth={350}
    >
      <Box display="flex" flexDirection="column" justifyContent="space-around">
        <Score title="Project Score" percentage={prop.coin.coingecko_score} />
        <Score title="Liquidity Score" percentage={prop.coin.liquidity_score} />
      </Box>
      <Box display="flex" flexDirection="column" justifyContent="space-around">
        <Score
          title="Public Interest"
          percentage={
            prop.coin.public_interest_score > 1
              ? prop.coin.public_interest_score
              : prop.coin.public_interest_score * 100
          }
        />
        <Score
          title="Market Sentiment"
          percentage={prop.coin.sentiment_votes_up_percentage}
        />
      </Box>
    </Box>
  )
}

export default MarketDataScores
