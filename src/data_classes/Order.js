// const Product = require('./Product')

/** @typedef {import('./Product')} Product  */
/** @typedef {import('./Delivery')} Delivery */
/** @typedef {import('./Billing')} Billing */

class Order {
  /**
   * @param  {number|string} id
   * @param  {Array<Product>} products
   * @param  {Delivery} delivery
   * @param  {Billing} billing
   */
  constructor(id, products, delivery, billing) {
    this.id = id
    this.products = products
    this.delivery = delivery
    this.billing = billing
  }
}

module.exports = Order
