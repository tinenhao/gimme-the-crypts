export const formatPrice = (price: number) => {
  if (price === undefined || price === null) {
    return '-'
  } else if (price >= 10000) {
    return price.toFixed(0)
  } else if (price >= 1) {
    return price.toFixed(2)
  } else if (price >= 0.0999999) {
    return price.toFixed(3)
  } else if (price >= 0.00000999999) {
    return price.toFixed(6)
  } else {
    return price.toFixed(8)
  }
}

export const formatMarketCap = (marketCap: number) => {
  if (marketCap > 1000000000000) {
    return (marketCap / 1000000000000).toFixed(2) + 'T'
  } else if (marketCap > 1000000000) {
    return (marketCap / 1000000000).toFixed(2) + 'B'
  } else {
    return (marketCap / 1000000).toFixed(2) + 'M'
  }
}

export const handleNotExist = (num: any, formatLocaleString?: boolean) => {
  if (num === undefined || num === null) {
    return '-'
  } else if (formatLocaleString) {
    return num.toLocaleString()
  }
  return num
}
