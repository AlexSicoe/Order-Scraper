const jsdom = require('jsdom')
const { JSDOM } = jsdom

class OrderListPage {
  constructor(html) {
    this.dom = new JSDOM(html)
  }

  scrapeOrderIds() {
    const { document } = this.dom.window
    const elements = document.querySelectorAll('a.text_normal_b')
    const ids = []
    for (const e of elements) {
      const id = e.textContent
      ids.push(id)
    }
    return ids
  }

  scrapeMaxPage() {
    const { document } = this.dom.window
    const elements = document.querySelectorAll('td.text_normal_b > div > a')

    //td.text_normal_b > div > a
    //Get all
    //if (array.length) get max of array - 1
    //else return 0
  }
}
module.exports = OrderListPage
