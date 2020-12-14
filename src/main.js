const fs = require('fs')
const prompts = require('prompts')
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

async function checkAuthentication(html) {
  const authPage = new AuthPage(html)
  if (authPage.shouldAuthenticate()) {
    throw Error('Not Authenticated')
    // authPage.authenticate()
    //get order again
  }
}

async function getOrderById(id) {
  if (!id) throw Error(`id doesn't exist`)

  const orderHtml = await orderService.getOrderHtml(id)
  await checkAuthentication(orderHtml)

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
async function collectByPageNumber(pageNum, orderType) {
  const orderListHtml = await orderService.getOrderListHtml(pageNum, orderType)
  await checkAuthentication(orderListHtml)

  const orderListPage = new OrderListPage(orderListHtml)
  const ids = orderListPage.scrapeOrderIds()
  console.log(ids)

  for (const id of ids) {
    const order = await getOrderById(id)
    const excelGenerator = new ExcelGenerator(order)
    excelGenerator.generate()
  }
}

async function collectLastPageNumber(orderType) {
  const orderListHtml = await orderService.getOrderListHtml(1, orderType)
  await checkAuthentication(orderListHtml)

  const orderListPage = new OrderListPage(orderListHtml)
  const ids = orderListPage.scrapeLastPageNumber()
  console.log(ids)
}

async function main() {
  fs.rmdirSync('./output/excel/', { recursive: true })
  fs.mkdirSync('./output/excel/')

  await authService.authenticate()
  // console.log(authService.phpsessid)
  // await authService.getControlPanel()
  // await collectByPageNumber(1)
  await collectById(5393)
}

main()
