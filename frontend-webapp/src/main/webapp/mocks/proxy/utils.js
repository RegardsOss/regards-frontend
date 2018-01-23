const fs = require('fs')

const headerStyles = '\x1b[0m\x1b[34m'
const subheaderStyles = '\x1b[0m\x1b[36m'
const messageStyles = {
  defaultStyle: '\x1b[0m',
  errorStyle: '\x1b[0m\x1b[41m',
}

const loadFile = (file, charset) => fs.readFileSync(file, charset) || this.logMessage(`Failed reading file ${file}`, true) || {}

const writeFile = (file, content) => fs.writeFileSync(file, content)

const logMessage = (message, isError = false, subheader = '') => console.log(headerStyles, 'Facade mock server - ', subheaderStyles, subheader, isError ? messageStyles.errorStyle : messageStyles.defaultStyle, message)

const addLinks = ((objects = []) => objects.map(o => ({
  content: o,
  links: ['a-test-link'],
})))

module.exports = {
  addLinks,
  logMessage,
  loadFile,
  writeFile,
  JSON_CONTENT_TYPE: 'application/json; charset=utf-8',
}