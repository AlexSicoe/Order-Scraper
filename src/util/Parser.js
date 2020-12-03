class Parser {
  static parsePrice(price, varName = 'price') {
    const parsedPrice = parseFloat(price, 2)
    if (isNaN(parsedPrice)) throw Error(`${varName} is not float`)
    return parsedPrice
  }

  static parseInt(int, varName = 'this') {
    const parsedInt = parseInt(int)
    if (isNaN(parsedInt)) throw Error(`${varName} is not int`)
    return parsedInt
  }
}

module.exports = Parser
