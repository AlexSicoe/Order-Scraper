const OrderService = require('../services/OrderService')
const AuthService = require('../services/AuthService')
const ExcelGenerator = require('../generators/ExcelGenerator')
const OrderPage = require('../pages/OrderPage')
const OrderListPage = require('../pages/OrderListPage')
const AuthPage = require('../pages/AuthPage')
const OrderType = require('../data_classes/OrderType')
/** @typedef {import('./data_classes/OrderType')} OrderType */

const DEFAULT_REDO = () => {
  throw Error('"Redo" callback not implemented')
}

class Collector {
  constructor() {
    this.authService = new AuthService()
    this.orderService = new OrderService(this.authService)
  }

  async _checkAuthentication(html, redo = DEFAULT_REDO) {
    const authPage = new AuthPage(html)
    if (authPage.shouldAuthenticate()) {
      throw Error('Not Authenticated')
      //   authPage.authenticate()
      //   return await redo() //get order again
    }
  }

  async _getOrderById(id) {
    if (!id) throw Error(`id doesn't exist`)

    const orderHtml = await this.orderService.getOrderHtml(id)
    await this._checkAuthentication(orderHtml)

    const orderPage = new OrderPage(orderHtml)
    const order = orderPage.scrapeOrder(id)
    console.log(`Collected #${order.id}`)

    // console.log(`Comanda #${order.id}`)
    // console.table(order.products)
    // console.log(order.delivery)
    // console.log(order.billing)

    return order
  }

  async collectById(id) {
    console.log('Collecting...')
    const order = await this._getOrderById(id)
    console.log('Done!')
    const excelGenerator = new ExcelGenerator(order)
    excelGenerator.generate()
  }

  /**
   * @param  {OrderType} orderType
   * @param  {number|string} pageNum
   */
  async collectByPageNumber(pageNum, orderType) {
    console.log('Collecting...')
    const orderListHtml = await this.orderService.getOrderListHtml(
      pageNum,
      orderType
    )
    await this._checkAuthentication(orderListHtml)

    const orderListPage = new OrderListPage(orderListHtml)
    const ids = orderListPage.scrapeOrderIds()
    console.log(ids)

    for (const id of ids) {
      const order = await this._getOrderById(id)
      const excelGenerator = new ExcelGenerator(order)
      excelGenerator.generate()
    }
    console.log('Done!')
  }

  async findLastPageNumber(orderType) {
    const orderListHtml = await this.orderService.getOrderListHtml(1, orderType)
    await this._checkAuthentication(orderListHtml)

    const orderListPage = new OrderListPage(orderListHtml)
    return orderListPage.scrapeLastPageNumber()
  }
}

module.exports = Collector
