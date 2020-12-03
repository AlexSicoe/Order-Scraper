const fs = require('fs')

const OrderPage = require('./pages/OrderPage')

let htmlOrder = fs.readFileSync('./input/Comanda 1.html', 'utf8')
let orderPage = new OrderPage(htmlOrder)
const order = orderPage.scrape()

console.log(order.info)
console.table(order.products)
