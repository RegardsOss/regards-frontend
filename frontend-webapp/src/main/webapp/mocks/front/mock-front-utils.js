const _ = require('lodash')
const fs = require('fs')
const fsExtra = require('fs-extra')

const headerStyles = '\x1b[0m\x1b[34m'
const subheaderStyles = '\x1b[0m\x1b[36m'
const messageStyles = {
  defaultStyle: '\x1b[0m',
  errorStyle: '\x1b[0m\x1b[41m',
}


const JSON_CONTENT_TYPE = 'application/json; charset=utf-8'

const defaultConverter = content => ({
  content,
  links: [],
})

/**
   * Makes a JSON page result (with metadata and all the data required)
   * @param pageEntities : object or array holding page entities
   * @param converter : (object, key) => object (or null if filtered). converted object is like {content: ..., links: ...}
   * @param number first page index
   * @param size page size
   */
const makePageResult = (pageEntities, converter = defaultConverter, number = 0, size = 100) => {
  let currentIndex = 0
  const formattedResponse = _.reduce(pageEntities, ({ content, links, metadata }, object, key) => {
    const convertedObj = converter(object, key)
    if (convertedObj) {
      if (currentIndex >= number && currentIndex < number + size) {
        // in page
        return {
          content: content.concat([convertedObj]),
          links,
          metadata,
        }
      }
      currentIndex += 1
    }
    // filtered
    return { content, links, metadata }
  }, {
      content: [],
      links: [],
      metadata: { number, size, totalElements: _.size(pageEntities) },
    })
  return {
    content: formattedResponse,
    code: 200,
    contentType: JSON_CONTENT_TYPE,
  }
}

const logMessage = (message, isError = false, subheader = '') => console.log(headerStyles, 'Facade mock server - ', subheaderStyles, subheader, isError ? messageStyles.errorStyle : messageStyles.defaultStyle, message)
const loadFile = (file, charset) => fs.readFileSync(file, charset) || this.logMessage(`Failed reading file ${file}`, true) || {}

module.exports = {
  JSON_CONTENT_TYPE,
  logMessage,
  makePageResult,
  copyFile: (sourceFile, targetFile) => fsExtra.copy(sourceFile, targetFile),
  loadFile,
  loadJSONModelFile: file => JSON.parse(loadFile(file), 'utf8'),
  writeJSONModelFile: (file, jsModel) => fs.writeFileSync(file, JSON.stringify(jsModel), 'utf8'),

}
