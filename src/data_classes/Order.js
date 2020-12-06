const XLSX = require('xlsx')


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

  toXLSX() {
    return [
      {
        id: this.id,
        products: this.products[0],
        // { adresa: this.billing.adresa.toString() },
      },
      {
        products: this.products[1]
      },
      {
        products: this.products[2]
      },
    ]
  }
}

module.exports = Order
