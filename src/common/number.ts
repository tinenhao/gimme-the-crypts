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
    return price.toFixed(7)
  }
}

export const formatMarketCap = (data: number) => {
  const marketCap = Math.abs(data)
  if (marketCap > 1000000000000) {
    return (data / 1000000000000).toFixed(2) + 'T'
  } else if (marketCap > 1000000000) {
    return (data / 1000000000).toFixed(2) + 'B'
  } else if (marketCap > 1000000) {
    return (data / 1000000).toFixed(2) + 'M'
  } else if (marketCap > 10000) {
    return (data / 1000).toFixed(2) + 'K'
  } else return data.toFixed(2)
}

export const formatYAxis = (data: number) => {
  const marketCap = Math.abs(data)
  if (marketCap > 1000000000000) {
    return data / 1000000000000 + 'T'
  } else if (marketCap > 1000000000) {
    return data / 1000000000 + 'B'
  } else if (marketCap > 1000000) {
    return data / 1000000 + 'M'
  } else if (marketCap > 10000) {
    return data / 1000 + 'K'
  }
  return data.toFixed(0)
}

export const handleNotExist = (num: any, formatLocaleString?: boolean) => {
  if (num === undefined || num === null) {
    return '-'
  } else if (formatLocaleString) {
    return num.toLocaleString()
  }
  return num
}

export const convert2dp = (num: any) => {
  if (num !== '-') {
    return num.toFixed(2)
  }
  return num
}

export const formatPercentage = (percentage: number) => {
  if (percentage === null || percentage === undefined) {
    return '-'
  } else {
    return percentage.toFixed(2) + '%'
  }
}
