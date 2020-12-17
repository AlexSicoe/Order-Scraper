const XLSX = require('xlsx')
const FirmBilling = require('../data_classes/FirmBilling')
const ExcelWorksheetHelper = require('./ExcelWorksheetHelper')

/** @typedef {import('../data_classes/Order')} Order */

class ExcelGenerator {
  /**
   * @param  {Order} order
   */
  constructor(order) {
    this.order = order
  }

  generate() {
    // const cell = XLSX.utils.decode_cell('A1')

    let { order } = this
    const filename = `Comanda ${order.id}.xlsx`
    const sheet = new ExcelWorksheetHelper()
    sheet.add([{ 'Comanda nr': order.id }])
    sheet.add()
    sheet.add(order.products)
    sheet.add()
    sheet.add([
      {
        'Tip Livrare': order.delivery.tipLivrare,
        'Preț Livrare': order.delivery.pretLivrare,
        'Adresa Facturare': order.billing.adresa.toString()
      }
    ])
    sheet.add()
    sheet.add([
      {
        Apelativ: order.billing.apelativ,
        Nume: order.billing.nume,
        Prenume: order.billing.prenume,
        Telefon: order.billing.telefon,
        Email: order.billing.email
      }
    ])

    if (order.billing instanceof FirmBilling) {
      sheet.add()
      sheet.add([
        {
          Firma: order.billing.firma,
          'Cod Fiscal': order.billing.codFiscal,
          RC: order.billing.rc,
          Banca: order.billing.banca,
          'Cont Bancar': order.billing.contBancar
        }
      ])
    }

    // console.log(sheet.ws['!ref']) //get used range

    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, sheet.ws, 'Sheet1')
    XLSX.writeFile(wb, './output/excel/' + filename)
  }

  static appendColumn() {}
}

module.exports = ExcelGenerator
