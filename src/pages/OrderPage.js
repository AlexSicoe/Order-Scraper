const jsdom = require('jsdom')
const { JSDOM } = jsdom
const Product = require('../data_classes/Product')
const Order = require('../data_classes/Order')

const TABLE_SELECTOR =
  'body > table > tbody > tr:nth-child(2) > td:nth-child(3) > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td > table > tbody'

class OrderPage {
  constructor(html) {
    this.dom = new JSDOM(html)
  }

  _scrapeProducts() {
    const table = this.dom.window.document.querySelector(TABLE_SELECTOR)
    const list = table.querySelectorAll('tr > td[height="20"]')
  
    /** @type {Array<Product>} */
    const products = []
  
    for (let child of list) {
      const tr = child.parentElement
  
      const nume = tr.querySelector('a').textContent
      const codFurnizor = tr.querySelector('p').textContent
      const cantitate = tr
        .querySelector('input[name*="cantitate"]')
        .getAttribute('value')
      const pret = tr
        .querySelector('input[name*="pretproduse"]')
        .getAttribute('value')
  
      const product = new Product({ nume, codFurnizor, cantitate, pret })
      products.push(product)
    }
  
    return products
  }

  _scrapeBillingInfo() {
    // TODO
  }

  scrape() {
    const products = this._scrapeProducts()
    const info = this._scrapeBillingInfo()
    return new Order(products, info)
  }
}

module.exports = OrderPage