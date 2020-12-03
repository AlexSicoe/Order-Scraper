const fs = require('fs')

const OrderPage = require('./pages/OrderPage')

let htmlOrder = fs.readFileSync('./input/Comanda 2.html', 'utf8')
let orderPage = new OrderPage(htmlOrder)
const order = orderPage.scrape()

console.table(order.products)
console.log(order.delivery)
console.log(order.billing)
