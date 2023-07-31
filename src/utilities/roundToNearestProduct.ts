// rounding aimtainer and reactiontime results  for graph data for now (not accurate enough)

function roundToNearestProduct(
  number: number,
  productNumber: 1 | 10 | 25 | 50
) {
  const roundedResult = Math.round(number / productNumber);
  const nearestProduct = roundedResult * productNumber;
  return nearestProduct;
}

export default roundToNearestProduct;
