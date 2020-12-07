require('dotenv').config()
const { API, PHPSESSID } = process.env
const fs = require('fs')
const axios = require('axios').default
const OrderType = require('../data_classes/OrderType')

/** @typedef {import('../data_classes/OrderType')} OrderType */
/** @typedef {import('../services/AuthService')} AuthService */

class OrderService {
  /**
   * @param  {AuthService} authService
   */
  constructor(authService) {
    this.authService = authService
  }

  /**
   * @param  {OrderType} orderType
   * @param  {number|string} pageNum
   */
  async getOrderListHtml(pageNum = 1, orderType = OrderType.Neconfirmata) {
    const res = await axios.get(API + 'panou_de_control.php', {
      params: {
        pg: 'procesare_comenzi/comenzi.php',
        comtip: orderType,
        pageNum_comenzi: --pageNum
      },
      headers: {
        Cookie: `PHPSESSID=${PHPSESSID}`
      }
    })
    fs.writeFileSync('./output/OrderListPage.html', res.data)
    return res.data
  }

  async getOrderHtml(id) {
    // console.log(this.authService.phpsessid)
    if (!id) throw Error(`id doesn't exist`)
    const res = await axios.get(API + 'panou_de_control.php', {
      params: {
        pg: 'procesare_comenzi/informatii_comanda.php',
        idc: id
      },
      headers: {
        Cookie: `PHPSESSID=${PHPSESSID}`
      }
    })
    fs.writeFileSync('./output/OrderPage.html', res.data)
    return res.data
  }
}

module.exports = OrderService
