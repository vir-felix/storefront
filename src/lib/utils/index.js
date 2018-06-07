import keyMirror from "keymirror";

export const INVENTORY_STATUS = keyMirror({
  BACKORDER: null,
  BESTSELLER: null,
  LOW_QUANTITY: null,
  SOLD_OUT: null,
  SALE: null
});


/**
 * Determines a product's badge status
 *
 * @param {Object} product - The product
 * @returns {Object} - The computed product status
 */
export function badgeStatus(product) {
  let status;

  if (product.isSoldOut && product.isBackorder) {
    status = { type: INVENTORY_STATUS.BACKORDER, label: "Backorder" };
  } else if (product.isSoldOut && !product.isBackorder) {
    status = { type: INVENTORY_STATUS.SOLD_OUT, label: "Sold Out" };
  } else if (product.isOnSale) {
    status = { type: INVENTORY_STATUS.SALE, label: "Sale" };
  } else if (product.isLowQuantity && !product.isSoldOut) {
    status = { type: INVENTORY_STATUS.LOW_QUANTITY, label: "Low Inventory" };
  } else if (product.isBestSeller) {
    status = { type: INVENTORY_STATUS.BESTSELLER, label: "Best Seller" };
  }

  return status;
}

/**
 * Determines if a product is a best seller.
 * TODO: this is a placeholder, as we don't have "Best Seller" at this moment
 *
 * @param {Object} product - The product
 * @returns {Boolean} - Indicates whether the product is a best seller
 */
export function isProductBestSeller(product) {
  // This is a placeholder.
  return true;
  // return product.isBestSeller;
}

/**
 * Determines if a product has low inventory.
 *
 * @param {Object} product - The product
 * @returns {Boolean} - Indicates whether the product has low inventory
 */
export function isProductLowQuantity(product) {
  return product.isLowQuantity && !product.isSoldOut;
}

/**
 * Determines if a product is on sale.
 * TODO: this is a placeholder, as we don't have "Best Seller" at this moment
 *
 * @param {Object} product - The product
 * @returns {Boolean} - Indicates whether the product is on sale
 */
export function isProductOnSale(product) {
  // This is a placeholder.
  return true;
  // return product.isBestSeller;
}

/**
 * Determines the pricing a product given a currency code.
 *
 * @param {String} currencyCode - the shop's set currency code, i.e. "USD"
 * @param {Array} pricing - An array of pricing objects with different currencies.
 * @returns {Object} - pricing object, or null if none found.
 */
export function priceByCurrencyCode(currencyCode, pricing) {
  const _pricing = pricing.find((price) => price.currency.code === currencyCode);

  return _pricing || null;
}

/**
 * Find a variant by _id
 *
 * @param {Array} variants - A list of variants
 * @param {String} variantId - _id of target variant
 * @returns {Object} - target variant or null if none found.
 */
export function variantById(variants, variantId) {
  const _variant = variants.find((variant) => variant._id === variantId);

  return _variant || null;
}


