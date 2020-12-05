const jsdom = require('jsdom')
const { JSDOM } = jsdom
const Parser = require('../util/Parser')

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

  scrapeLastPageNumber() {
    const { document } = this.dom.window
    const elements = document.querySelectorAll('td.text_normal_b > div > a')
    const pageNumbers = []
    for (const e of elements) {
      const pageNum = Parser.parseInt(e.textContent)
      pageNumbers.push(pageNum)
    }
    return pageNumbers.length ? pageNumbers[pageNumbers.length - 1] : 1
  }
}
module.exports = OrderListPage
