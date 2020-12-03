/** @typedef {import('./Address')} Address  */

class Delivery {
  /**
   * @param  {string} tipLivrare
   * @param  {number} pretLivrare
   * @param  {Address} adresa
   */
  constructor(tipLivrare, pretLivrare, adresa) {
    this.tipLivrare = tipLivrare
    this.pretLivrare = pretLivrare
    this.adresa = adresa
  }
}

module.exports = Delivery
