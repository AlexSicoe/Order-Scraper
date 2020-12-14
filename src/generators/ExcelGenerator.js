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
    const sheet = new ExcelWorksheetHelper()
    sheet.append([{ 'Comanda nr': order.id }], { origin: 0 })
    sheet.append()
    sheet.append(order.products)
    sheet.append()
    sheet.append([
      {
        'Tip Livrare': order.delivery.tipLivrare,
        'Preț Livrare': order.delivery.pretLivrare,
        'Adresa Facturare': order.billing.adresa.toString()
      }
    ])
    sheet.append()
    sheet.append([
      {
        Apelativ: order.billing.apelativ,
        Nume: order.billing.nume,
        Prenume: order.billing.prenume,
        Telefon: order.billing.telefon,
        Email: order.billing.email
      }
    ])

    // console.log(sheet.ws['!ref']) //get used range

    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, sheet.ws, 'Sheet1')
    await XLSX.writeFile(wb, './output/excel/' + filename)
  }

  static appendColumn() {}
}

module.exports = ExcelGenerator
