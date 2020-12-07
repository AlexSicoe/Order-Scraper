require('dotenv').config()
const { API, UTILIZATOR, PAROLA } = process.env
const fs = require('fs')
const axios = require('axios').default

class AuthService {
  constructor(phpsessid = '') {
    this.phpsessid = phpsessid
  }

  async authenticate() {
    const res = await axios.post(API + 'index.php', {
      params: {
        utilizator: UTILIZATOR,
        parola: PAROLA,
        Autentificare: 'Autentificare'
      }
    })
    if (res.status !== 200) {
      throw Error(`
      Authentication failed!
      =======Response=======
      ${console.error(res)}
      `)
    }

    fs.writeFileSync('./output/PostAuthPage.html', res.data)
    delete res.data
    // console.log(res)
    const cookie = res.headers['set-cookie'][0]
    this.phpsessid = cookie
      .split('; ')
      .find(ss => ss.startsWith('PHPSESSID='))
      .replace('PHPSESSID=', '')
  }

  async getControlPanel() {
    // console.log('====PHPSESSID====')
    // console.log(this.phpsessid)
    const res = await axios.get(API + 'panou_de_control.php', {
      headers: {
        Cookie: `PHPSESSID=${this.phpsessid}`
      }
    })
    fs.writeFileSync('./output/ControlPanel.html', res.data)
    delete res.data
    // console.log(res)
  }
}

module.exports = AuthService
