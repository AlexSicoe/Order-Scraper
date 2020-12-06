const XLSX = require('xlsx')

/** @typedef {import('../data_classes/Order')} Order */

class ExcelGenerator {
  constructor(order) {
    this.order = order
  }

  /**
   * @param  {Order} order
   */
  async generate() {
    let { order } = this
    const filename = `Comanda ${order.id}.xlsx`
    console.table(order.toXLSX())
    const ws = XLSX.utils.json_to_sheet(order.toXLSX())
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
    await XLSX.writeFile(wb, './output/' + filename)
  }

  static appendColumn() {
    
  }
}

module.exports = ExcelGenerator
