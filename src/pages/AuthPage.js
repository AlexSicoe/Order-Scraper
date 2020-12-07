const jsdom = require('jsdom')
const { JSDOM } = jsdom
require('dotenv').config()
const { UTILIZATOR, PAROLA } = process.env
const Scraper = require('../util/Scraper')

class AuthPage {
  constructor(html) {
    this.dom = new JSDOM(html)
    this.scraper = new Scraper(this.dom)
  }

  shouldAuthenticate() {
    const utilizator = this.dom.window.document.getElementById('utilizator')
    const parola = this.dom.window.document.getElementById('parola')
    return utilizator && parola
  }

  //doesn't work
  authenticate() {
    const utilizator = this.dom.window.document.getElementById('utilizator')
    const parola = this.dom.window.document.getElementById('parola')
    const btn = this.dom.window.document.getElementById('Autentificare')
    utilizator.value = UTILIZATOR
    parola.value = PAROLA

    btn.onclick()
  }
}

module.exports = AuthPage
