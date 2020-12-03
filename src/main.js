const fs = require('fs')

const scrapeOrder = require('./scraping/scrapeOrder')

let htmlOrder = fs.readFileSync('./input/Comanda 1.html', 'utf8')
scrapeOrder(htmlOrder)

