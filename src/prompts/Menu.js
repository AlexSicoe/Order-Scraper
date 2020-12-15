const Collector = require('../collectors/Collector')
const prompts = require('prompts')

class Menu {
  constructor() {
    this.collector = new Collector()
  }

  async main() {
    // await authService.authenticate()
    // console.log(authService.phpsessid)
    // await authService.getControlPanel()

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
        await this.byId()
        break
      case ProgramType.ByPageNum:
        await this.byPageNum()
        break
      case ProgramType.AllPages:
        throw Error('not implemented')
      default:
        throw Error('not implemented')
    }
  }

  async byId() {
    const answer = await prompts({
      type: 'number',
      name: 'id',
      initial: 1,
      min: 1,
      message: `Order ID`
    })
    await this.collector.collectById(answer.id)
  }

  async byPageNum() {
    // TODO orderType
    const lastPageNum = await this.collector.findLastPageNumber()
    console.log(lastPageNum)
    const answer = await prompts({
      type: 'number',
      name: 'pageNum',
      message: `Select Page number`,
      initial: 1,
      min: 1,
      max: lastPageNum
    })
    await this.collector.collectByPageNumber(answer.pageNum)
  }
}

module.exports = Menu
