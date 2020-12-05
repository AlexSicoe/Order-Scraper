require('dotenv').config()
const { API, Cookie } = process.env
const fs = require('fs')
const axios = require('axios').default

class OrderService {
  constructor() {
    //
  }

  async getOrderListHtml(
    orderType = 'comanda_neconfirmata',
    pageNum = 0,
    handleError = () => {}
  ) {
    const res = await axios.get(API + 'panou_de_control.php', {
      params: {
        pg: 'procesare_comenzi/comenzi.php',
        comtip: orderType,
        pageNum_comenzi: pageNum
      },
      headers: {
        Cookie
      }
    })
    await handleError(res)
    fs.writeFileSync('./output/OrderListPage.html', res.data)
    return res.data
  }

  async getOrderHtml(id, handleError = () => {}) {
    if (!id) throw Error(`id doesn't exist`)
    const res = await axios.get(API + 'panou_de_control.php', {
      params: {
        pg: 'procesare_comenzi/informatii_comanda.php',
        idc: id
      },
      headers: {
        Cookie
      }
    })
    await handleError(res)
    fs.writeFileSync('./output/OrderPage.html', res.data)
    return res.data
  }
}

module.exports = OrderService
