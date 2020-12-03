/** @typedef {import('./Address')} Address  */

class Billing {
  /**
   * @param {String} apelativ
   * @param {String} nume
   * @param {String} prenume
   * @param {String} telefon
   * @param {String} email
   * @param {Address} adresa
   */
  constructor(apelativ, nume, prenume, telefon, email, adresa) {
    this.apelativ = apelativ
    this.nume = nume
    this.prenume = prenume
    this.telefon = telefon
    this.email = email
    this.adresa = adresa
  }
}

module.exports = Billing
