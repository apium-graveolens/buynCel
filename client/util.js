export const calculateTotal = lineItems => {
  if (lineItems.length > 0) {
    return lineItems.reduce((total, curr) => (
      total + (curr.product.price * curr.quantity)
    ), 0);
  } else {
    return 0;
  }
}

export const formatTotal = total => '$' + total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');