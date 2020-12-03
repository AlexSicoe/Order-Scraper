// const Product = require('./Product')

/** @typedef {import('./Product')} Product  */
/** @typedef {import('./Delivery')} Delivery */
/** @typedef {import('./Billing')} Billing */

class Order {
  /**
   * @param  {Array<Product>} products
   * @param  {Delivery} delivery
   * @param  {Billing} billing
   */
  constructor(products, delivery, billing) {
    this.products = products
    this.delivery = delivery
    this.billing = billing
  }
}

module.exports = Order
