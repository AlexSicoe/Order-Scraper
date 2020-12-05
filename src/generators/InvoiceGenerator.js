const XLSX = require('xlsx')

/** @typedef {import('../data_classes/Order')} Order */

class InvoiceGenerator {
  constructor() {
    //
  }

  /**
   * @param  {number|string} id
   * @param  {Order} order
   */
  generate(order) {
    const filename = `Comanda ${order.id}.xlsx`
    // XLSX.writeFile('test', filename)
  }
}

module.exports = InvoiceGenerator
