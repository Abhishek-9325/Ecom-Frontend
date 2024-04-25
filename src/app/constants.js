export const PRODUCTS_PER_PAGE = 12;
export function discountedPrice(product) {
  return Math.round(product.price * (1 - product?.discountPercentage / 100), 2);
}
