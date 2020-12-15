const fs = require('fs')
const Menu = require('./prompts/Menu')

async function main() {
  fs.rmdirSync('./output/excel/', { recursive: true })
  fs.mkdirSync('./output/excel/')

  const menu = new Menu()
  await menu.main()
}
main()
