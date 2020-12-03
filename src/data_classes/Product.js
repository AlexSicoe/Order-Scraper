class Product {
  constructor({ nume, codFurnizor, cantitate, pret }) {
    this.nume = nume
    this.codFurnizor = codFurnizor
      .replace('\t', '')
      .replace('\n', '')
      .replace('Cod furnizor: ', '')
      .trim()
    // this.cantitate = cantitate
    // this.pret = pret
    const parsedCantitate = parseInt(cantitate)
    if (isNaN(parsedCantitate)) throw Error('cantitate is not int')
    this.cantitate = parsedCantitate
    const parsedPret = parseFloat(pret, 2)
    if (isNaN(parsedPret)) throw Error('pret is not float')
    this.pret = parsedPret
  }
}

module.exports = Product