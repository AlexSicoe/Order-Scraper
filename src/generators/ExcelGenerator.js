const XLSX = require('xlsx')
const ExcelWorksheetHelper = require('./ExcelWorksheetHelper')

/** @typedef {import('../data_classes/Order')} Order */

class ExcelGenerator {
  /**
   * @param  {Order} order
   */
  constructor(order) {
    this.order = order
  }

  async generate() {
    // const cell = XLSX.utils.decode_cell('A1')

    let { order } = this
    const filename = `Comanda ${order.id}.xlsx`
    const ws = XLSX.utils.json_to_sheet([{ 'Comanda nr': order.id }])
    const wsHelper = new ExcelWorksheetHelper(ws)
    wsHelper.append()
    wsHelper.append(order.products)
    wsHelper.append()
    wsHelper.append([
      {
        'Tip Livrare': order.delivery.tipLivrare,
        'Preț Livrare': order.delivery.pretLivrare,
        'Adresa Facturare': order.billing.adresa.toString()
      }
    ])
    wsHelper.append()
    wsHelper.append([
      {
        Apelativ: order.billing.apelativ,
        Nume: order.billing.nume,
        Prenume: order.billing.prenume,
        Telefon: order.billing.telefon,
        Email: order.billing.email
      }
    ])

    // console.log(ws['!ref']) //get used range

    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
    await XLSX.writeFile(wb, './output/excel/' + filename)
  }

  static appendColumn() {}
}

module.exports = ExcelGenerator
