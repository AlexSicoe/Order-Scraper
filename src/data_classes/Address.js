const { default: AuthService } = require('../services/AuthService')

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

  toString() {
    const {
      strada,
      nr,
      bloc,
      scara,
      etaj,
      ap,
      codPostal,
      localitate,
      judet
    } = this

    const sb = new AddressStringBuilder(`strada: ${strada} ${nr}`)
    sb.append('bloc', bloc)
    sb.append('scara', scara)
    sb.append('etaj', etaj)
    sb.append('ap', ap)
    sb.append('cod postal', codPostal)
    sb.append('localitate', localitate)
    sb.append('judet', judet)
    return sb.build()
  }
}

class AddressStringBuilder {
  /**
   * @param  {String} initStr
   */
  constructor(initStr) {
    this.arr = [initStr]
  }

  append(dataName, data) {
    if (data) {
      this.arr.push(`${dataName}: ${data}`)
    }
  }

  build() {
    return this.arr.join(', ')
  }
}

module.exports = Address
