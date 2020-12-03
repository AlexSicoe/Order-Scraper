const Parser = require('../util/Parser')

class Product {
  constructor(nume, codFurnizor, cantitate, pret) {
    this.nume = nume
    this.codFurnizor = codFurnizor
      .replace('\t', '')
      .replace('\n', '')
      .replace('Cod furnizor: ', '')
      .trim()
    this.cantitate = Parser.parseInt(cantitate)
    this.pret = Parser.parsePrice(pret)
  }
}

module.exports = Product
