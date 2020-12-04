const fs = require('fs')
const axios = require('axios').default
require('dotenv').config()
const { API, Cookie } = process.env
const OrderPage = require('./pages/OrderPage')


// let htmlOrder = fs.readFileSync('./input/Comanda 2.html', 'utf8')
// let orderPage = new OrderPage(htmlOrder)
// const order = orderPage.scrape()

// console.table(order.products)
// console.log(order.delivery)
// console.log(order.billing)

async function getPage() {
  const res = await axios.get(API + '/panou_de_control.php', {
    params: {
      pg: 'procesare_comenzi/comenzi.php',
      comtip: 'comanda_neconfirmata'
    },
    headers: {
      Cookie
    }
  })
  return res
}

getPage()
  .then(res => res.data)
  .then(data => fs.writeFileSync('./output/page.html', data))
