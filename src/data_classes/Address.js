class Address {
  /**
   * @param  {String} strada
   * @param  {String} nr
   * @param  {String} bloc
   * @param  {String} scara
   * @param  {String} etaj
   * @param  {String} ap
   * @param  {String} codPostal
   * @param  {String} localitate
   * @param  {String} judet
   */
  constructor(strada, nr, bloc, scara, etaj, ap, codPostal, localitate, judet) {
    this.strada = strada
    this.nr = nr
    this.bloc = bloc
    this.scara = scara
    this.etaj = etaj
    this.ap = ap
    this.codPostal = codPostal
    this.localitate = localitate
    this.judet = judet
  }
}

module.exports = Address
