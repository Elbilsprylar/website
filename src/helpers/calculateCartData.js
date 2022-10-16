const calcCartData = (cartItems) => {
  let totalCount = 0
  let totalAmount = 0

  if (cartItems.length > 0) {
    cartItems.forEach((item) => {
      totalCount += item.quantity
      totalAmount += item.line_total
    })
  }

  return { totalAmount, totalCount }
}

export default calcCartData
