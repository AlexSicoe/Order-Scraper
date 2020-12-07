const fsExtra = require('fs-extra')
const OrderPage = require('./pages/OrderPage')
const OrderListPage = require('./pages/OrderListPage')
const AuthPage = require('./pages/AuthPage')
const OrderService = require('./services/OrderService')
const AuthService = require('./services/AuthService')
const ExcelGenerator = require('./generators/ExcelGenerator')
const OrderType = require('./data_classes/OrderType')
/** @typedef {import('./data_classes/OrderType')} OrderType */

const authService = new AuthService()
const orderService = new OrderService(authService)

async function getOrderById(id) {
  if (!id) throw Error(`id doesn't exist`)

  const orderHtml = await orderService.getOrderHtml(id)
  const authPage = new AuthPage(orderHtml)

  if (authPage.shouldAuthenticate()) {
    throw Error('Not Authenticated')
    // authPage.authenticate()
    //get order again
  }

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
  const orderListHtml = await orderService.getOrderListHtml(pageNum)
  const authPage = new AuthPage(orderListHtml)
  const orderListPage = new OrderListPage(orderListHtml)

  if (authPage.shouldAuthenticate()) {
    throw Error('Not Authenticated')
  }

  const ids = orderListPage.scrapeOrderIds()
  console.log(ids)

  for (const id of ids) {
    const order = await getOrderById(id)
    const excelGenerator = new ExcelGenerator(order)
    excelGenerator.generate()
  }
}

async function main() {
  fsExtra.rmdirSync('./output/excel/', { recursive: true })
  fsExtra.mkdirSync('./output/excel/')

  await authService.authenticate()
  // console.log(authService.phpsessid)
  // await authService.getControlPanel()
  // await collectByPageNumber(1)
  await collectById(5298)
}

main()
