const XLSX = require('xlsx')

class ExcelWorksheetHelper {
  /**
   * @param  {XLSX.WorkSheet} ws
   */
  constructor(ws) {
    this.ws = ws
  }

  append(data = [], opts = { origin: -1 }) {
    XLSX.utils.sheet_add_json(this.ws, data, opts)
  }

  appendArray2D(data = [], opts = { origin: -1 }) {
    XLSX.utils.sheet_add_aoa(this.ws, data, opts)
  }
}

module.exports = ExcelWorksheetHelper
