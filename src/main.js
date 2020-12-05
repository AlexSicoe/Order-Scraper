const fs = require('fs')
const OrderPage = require('./pages/OrderPage')
const OrderListPage = require('./pages/OrderListPage')
const OrderService = require('./services/OrderService')

const service = new OrderService()

async function getOrderById(id) {
  if (!id) throw Error(`id doesn't exist`)
  const orderHtml = await service.getOrderHtml(id)
  // const orderHtml = fs.readFileSync('./output/OrderPage.html', 'utf-8')
  const orderPage = new OrderPage(orderHtml)
  const order = orderPage.scrapeOrder()

  console.table(order.products)
  console.log(order.delivery)
  console.log(order.billing)

  return order
}

async function exec() {
  const orderListHtml = await service.getOrderListHtml()
  const orderListPage = new OrderListPage(orderListHtml)

  const ids = orderListPage.scrapeOrderIds()
  console.log(ids)

  for (const id of ids) {
    const order = await getOrderById(id)
  }
}

exec()
// getOrderById(5303)
