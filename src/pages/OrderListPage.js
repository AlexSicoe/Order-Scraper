const jsdom = require('jsdom')
const { JSDOM } = jsdom

class OrderListPage {
  constructor(html) {
    this.dom = new JSDOM(html)
  }

  scrape() {
    //
  }
}
module.exports = OrderListPage
