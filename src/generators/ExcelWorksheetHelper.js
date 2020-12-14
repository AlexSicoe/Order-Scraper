const XLSX = require('xlsx')

class ExcelWorksheetHelper {
  /**
   * @param  {XLSX.WorkSheet} ws
   */
  constructor(ws) {
    this.ws = ws ? ws : XLSX.utils.json_to_sheet([])
  }

  append(data = [], opts = {}) {
    const DEFAULT_OPTS = { origin: -1 }
    XLSX.utils.sheet_add_json(this.ws, data, { ...DEFAULT_OPTS, ...opts })
  }

  appendArray2D(data = [], opts = {}) {
    const DEFAULT_OPTS = { origin: -1 }
    XLSX.utils.sheet_add_aoa(this.ws, data, { ...DEFAULT_OPTS, ...opts })
  }
}

module.exports = ExcelWorksheetHelper
