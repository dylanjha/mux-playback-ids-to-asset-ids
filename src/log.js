const chalk = require('chalk')
const log = console.log
const info = chalk.keyword('cyan')
const warn = chalk.keyword('orange')
const success = chalk.bold.greenBright
const error = chalk.bold.red

module.exports = {
  log,
  info: (...args) => log(info(...args)),
  warn: (...args) => log(warn(...args)),
  success: (...args) => log(success(...args)),
  error: (...args) => log(error(...args)),
}
