/** @typedef {import('jsdom').JSDOM} JSDOM */

class Scraper {
  /**
   * @param  {JSDOM} dom
   */
  constructor(dom) {
    this.dom = dom
  }

  getValueById(id) {
    const elem = this.dom.window.document.getElementById(id)
    if (!elem) throw Error(`cannot find element by id ${id}`)
    return elem.value
  }

  mightGetValueById(id) {
    const elem = this.dom.window.document.getElementById(id)
    return elem ? elem.value : undefined
  }

  getValueByName(name, index = 0) {
    const elems = this.dom.window.document.getElementsByName(name)
    const elem = elems[index]
    if (!elem)
      throw Error(`cannot find element by name ${name} and index ${index}`)
    return elem.value
  }
}

module.exports = Scraper
