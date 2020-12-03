// const Product = require('./Product')

/** @typedef {import('./Product')} Product  */
/** @typedef {import('./BillingInfo')} BillingInfo */

class Order {
  /**
   * @param  {Array<Product>} products
   * @param  {BillingInfo} info
   */
  constructor(products, info) {
    this.products = products
    this.info = info
  }
}

module.exports = Order
