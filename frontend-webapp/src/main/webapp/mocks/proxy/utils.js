const headerStyles = '\x1b[0m\x1b[34m'
const subheaderStyles = '\x1b[0m\x1b[36m'
const messageStyles = {
  defaultStyle: '\x1b[0m',
  errorStyle: '\x1b[0m\x1b[41m',
}

const logMessage = (message, isError = false, subheader = '') => console.log(headerStyles, 'Facade mock server - ', subheaderStyles, subheader, isError ? messageStyles.errorStyle : messageStyles.defaultStyle, message)

module.exports = {
  logMessage,
  JSON_CONTENT_TYPE: 'application/json; charset=utf-8',
}