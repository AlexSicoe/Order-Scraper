const fs = require('fs')
const jsdom = require('jsdom')
const { JSDOM } = jsdom

const TABLE_SELECTOR =
  'body > table > tbody > tr:nth-child(2) > td:nth-child(3) > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td > table > tbody'

let htmlPage = fs.readFileSync(
  './input/Comanda 1.html',
  'utf8',
)
const dom = new JSDOM(htmlPage)

const table = dom.window.document.querySelector(TABLE_SELECTOR)
const list = table.querySelectorAll('tr > td[height="20"]')

class Produs {
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

/** @type {Array<Produs>} */
const produse = []

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

  produs = new Produs({ nume, codFurnizor, cantitate, pret })
  produse.push(produs)
}

console.table(produse)

// const tr2 = table.children[2]
// const stuff = tr2.children[1].querySelector('a').innerHTML
// console.log(stuff)

// for(let child of table.children) {
//     console.log(child.innerHTML)
//     child.

// }
