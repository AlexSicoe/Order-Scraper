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
  console.log(`Collected #${order.id}`)

  // console.log(`Comanda #${order.id}`)
  // console.table(order.products)
  // console.log(order.delivery)
  // console.log(order.billing)

  return order
}

async function collectById(id) {
  console.log('Collecting...')
  const order = await getOrderById(id)
  console.log('Done')
  const excelGenerator = new ExcelGenerator(order)
  excelGenerator.generate()
}

/**
 * @param  {OrderType} orderType
 * @param  {number|string} pageNum
 */
async function collectByPageNumber(pageNum, orderType) {
  console.log('Collecting...')
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
  console.log('Done')
}

async function findLastPageNumber(orderType) {
  const orderListHtml = await orderService.getOrderListHtml(1, orderType)
  await checkAuthentication(orderListHtml)

  const orderListPage = new OrderListPage(orderListHtml)
  return orderListPage.scrapeLastPageNumber()
}

async function main() {
  fs.rmdirSync('./output/excel/', { recursive: true })
  fs.mkdirSync('./output/excel/')

  await authService.authenticate()
  // console.log(authService.phpsessid)
  // await authService.getControlPanel()

  await promptMainMenu()

  // await collectByPageNumber(1)
  // await collectById(5393)
}
main()

async function promptMainMenu() {
  const ProgramType = Object.freeze({
    ById: 1,
    ByPageNum: 2,
    AllPages: 3
  })
  const answer = await prompts({
    type: 'select',
    name: 'programMode',
    message: 'Choose program mode',
    choices: [
      { title: '1. Collect by id', value: ProgramType.ById },
      { title: '2. Collect by page number', value: ProgramType.ByPageNum },
      {
        title: '3. Collect all pages',
        value: ProgramType.AllPages,
        disabled: true
      }
    ],
    initial: 1
  })
  switch (answer.programMode) {
    case ProgramType.ById:
      await promptById()
      break
    case ProgramType.ByPageNum:
      await promptByPageNum()
      break
    case ProgramType.AllPages:
      throw Error('not implemented')
    default:
      throw Error('not implemented')
  }
}

async function promptById() {
  const answer = await prompts({
    type: 'number',
    name: 'id',
    initial: 1,
    min: 1,
    message: `Order ID`
  })

  await collectById(answer.id)
}

async function promptByPageNum() {
  // TODO orderType
  const lastPageNum = await findLastPageNumber()
  console.log(lastPageNum)
  const answer = await prompts({
    type: 'number',
    name: 'pageNum',
    message: `Select Page number`,
    initial: 1,
    min: 1,
    max: lastPageNum
  })

  await collectByPageNumber(answer.pageNum)
}

