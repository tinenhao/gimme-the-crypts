export const formatPrice = (price: number) => {
  if (price >= 10000) {
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
