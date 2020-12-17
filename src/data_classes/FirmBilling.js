const Billing = require('./Billing')

class FirmBilling extends Billing {
  constructor(firma, codFiscal, rc, banca, contBancar, ...args) {
    super(...args)
    this.firma = firma
    this.codFiscal = codFiscal
    this.rc = rc
    this.banca = banca
    this.contBancar = contBancar
  }
}

module.exports = FirmBilling
