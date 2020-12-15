const XLSX = require('xlsx')

class ExcelWorksheetHelper {
  /**
   * @param  {XLSX.WorkSheet} ws
   */
  constructor(ws) {
    this.ws = ws ? ws : XLSX.utils.json_to_sheet([])
    this.isEmpty = ws ? false : true
  }

  get _DEFAULT_OPTS() {
    const origin = this.isEmpty ? 0 : -1
    return { origin }
  }

  add(data = [], opts = {}) {
    XLSX.utils.sheet_add_json(this.ws, data, { ...this._DEFAULT_OPTS, ...opts })
    this.isEmpty = false
  }

  addArray2D(data = [], opts = {}) {
    XLSX.utils.sheet_add_aoa(this.ws, data, { ...this._DEFAULT_OPTS, ...opts })
    this.isEmpty = false
  }
}

module.exports = ExcelWorksheetHelper
