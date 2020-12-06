const OrderPage = require('./pages/OrderPage')
const OrderListPage = require('./pages/OrderListPage')
const OrderService = require('./services/OrderService')
const ExcelGenerator = require('./generators/ExcelGenerator')
const OrderType = require('./data_classes/OrderType')
/** @typedef {import('./data_classes/OrderType')} OrderType */
const service = new OrderService()

async function getOrderById(id) {
  if (!id) throw Error(`id doesn't exist`)
  const orderHtml = await service.getOrderHtml(id)
  const orderPage = new OrderPage(orderHtml)
  const order = orderPage.scrapeOrder(id)

  // console.log(`Comanda #${order.id}`)
  // console.table(order.products)
  // console.log(order.delivery)
  // console.log(order.billing)

  return order
}

async function collectById(id) {
  const order = await getOrderById(id)
  const excelGenerator = new ExcelGenerator(order)
  excelGenerator.generate()
}

/**
 * @param  {OrderType} orderType
 * @param  {number|string} pageNum
 */
async function collectByPageNumber(pageNum) {
  const orderListHtml = await service.getOrderListHtml(pageNum)
  const orderListPage = new OrderListPage(orderListHtml)

  const ids = orderListPage.scrapeOrderIds()
  console.log(ids)

  for (const id of ids) {
    const order = await getOrderById(id)
    const excelGenerator = new ExcelGenerator(order)
    excelGenerator.generate()
  }
}

// collectByPageNumber(1)
collectById(5298)
