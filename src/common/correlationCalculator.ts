export const correlationCalculator = (
  priceArr: number[][],
  coin1: number,
  coin2: number,
) => {
  const n =
    priceArr[coin1].length < priceArr[coin2].length
      ? priceArr[coin1].length
      : priceArr[coin2].length

  let sumProduct = 0
  for (let i = 0; i < n; i++) {
    sumProduct += priceArr[coin1][i] * priceArr[coin2][i]
  }

  let sumCoin1 = 0
  for (let i = 0; i < n; i++) {
    sumCoin1 += priceArr[coin1][i]
  }

  let sumCoin2 = 0
  for (let i = 0; i < n; i++) {
    sumCoin2 += priceArr[coin2][i]
  }

  let sumSquareCoin1 = 0
  for (let i = 0; i < n; i++) {
    sumSquareCoin1 += Math.pow(priceArr[coin1][i], 2)
  }

  let sumSquareCoin2 = 0
  for (let i = 0; i < n; i++) {
    sumSquareCoin2 += Math.pow(priceArr[coin2][i], 2)
  }

  const numerator = n * sumProduct - sumCoin1 * sumCoin2
  const denominator = Math.sqrt(
    (n * sumSquareCoin1 - Math.pow(sumCoin1, 2)) *
      (n * sumSquareCoin2 - Math.pow(sumCoin2, 2)),
  )

  return numerator / denominator
}
