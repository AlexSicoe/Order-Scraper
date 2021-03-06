const jsdom = require('jsdom')
const { JSDOM } = jsdom
const Scraper = require('../util/Scraper')
const Product = require('../data_classes/Product')
const Order = require('../data_classes/Order')
const Address = require('../data_classes/Address')
const Billing = require('../data_classes/Billing')
const FirmBilling = require('../data_classes/FirmBilling')
const Delivery = require('../data_classes/Delivery')

class OrderPage {
  constructor(html) {
    this.dom = new JSDOM(html)
    this.scraper = new Scraper(this.dom)
  }

  _scrapeProducts() {
    const { document } = this.dom.window
    const list = document.querySelectorAll(
      'tr:nth-child(2) > td > table > tbody > tr > td[height="20"]'
    )

    /** @type {Array<Product>} */
    const products = []

    for (let child of list) {
      const tr = child.parentElement

      const nume = tr.querySelector('a').textContent
      const codFurnizorElem = tr.querySelector('p')
      const codFurnizor = codFurnizorElem ? codFurnizorElem.textContent : ''
      const cantitate = tr.querySelector('input[name*="cantitate"]').value
      const pret = tr.querySelector('input[name*="pretproduse"]').value

      const product = new Product(nume, codFurnizor, cantitate, pret)
      products.push(product)
    }

    return products
  }

  _scrapeDelivery() {
    const { scraper } = this

    const tipLivrare = scraper.getValueById('tip_livrare')
    const pretLivrare = scraper.getValueById('pret_livrare')

    const adresa = new Address(
      scraper.getValueById('livrare_adresa_strada'),
      scraper.getValueById('livrare_adresa_strada_nr'),
      scraper.getValueById('_livrare_adresa_bloc'),
      scraper.getValueById('livrare_adresa_scara'),
      scraper.getValueById('livrare_adresa_etaj'),
      scraper.getValueById('livrare_adresa_ap'),
      scraper.getValueById('livrare_cod_postal'),
      scraper.getValueById('livrare_localitate'),
      scraper.getValueByName('judet')
    )

    return new Delivery(tipLivrare, pretLivrare, adresa)
  }

  _scrapeBilling() {
    const { scraper } = this

    const adresa = new Address(
      scraper.getValueById('adresa_strada'),
      scraper.getValueById('adresa_strada_nr'),
      scraper.getValueById('adresa_bloc'),
      scraper.getValueById('adresa_scara'),
      scraper.getValueById('adresa_etaj'),
      scraper.getValueById('adresa_ap'),
      scraper.getValueById('cod_postal'),
      scraper.getValueById('localitate'),
      scraper.getValueByName('judet', 1)
    )

    //if you find these, its a firm
    const firma = scraper.mightGetValueById('firma')
    if (firma) {
      return new FirmBilling(
        firma,
        scraper.mightGetValueById('cod_fiscal'),
        scraper.mightGetValueById('registrul_comertului'),
        scraper.mightGetValueById('banca'),
        scraper.mightGetValueById('cont_banca'),
        scraper.getValueById('apelativ'),
        scraper.getValueById('nume'),
        scraper.getValueById('prenume'),
        scraper.getValueById('telefon'),
        scraper.getValueById('email'),
        adresa
      )
    } else {
      return new Billing(
        scraper.getValueById('apelativ'),
        scraper.getValueById('nume'),
        scraper.getValueById('prenume'),
        scraper.getValueById('telefon'),
        scraper.getValueById('email'),
        adresa
      )
    }
  }

  scrapeOrder(id) {
    if (!id) throw Error('id not specified')

    const products = this._scrapeProducts()
    const delivery = this._scrapeDelivery()
    const billing = this._scrapeBilling()
    return new Order(id, products, delivery, billing)
  }
}

module.exports = OrderPage
