/**
 * Put in this file (method buildLocalServices) every local service structured as 
 * {
 *   METHOD: {
 *     SERVICE_NAME: {
 *       url: 'url-pattern',
 *       handler: (request, response, pathParams, queryParams, bodyParams) => *, // handler available in context
 *     }
 *   }
 * }
 * Note: you can access gateway URL in handler context
 * 
 * When finding delegates, the server will use it instead of proxying the real server
 * The handler must return an object like:
 * { 
 *   content: (optional, string | object | binary content, default={}), 
 *   code: (optional, integer, default=200),
 *   contentType: (optional, string, default = 'application/json; charset=utf-8'),
 *   binary: (optional, boolean, default= false)
 * } 
 * OR A PROMISE (in such case, the server-main will resolve the promise and except a similar result on end)
 */
const _ = require('lodash')
const fetch = require('node-fetch')
const { MOCK_RESOURCES } = require('./resources/mock-resources')
const { addLinks, loadFile, writeFile, logMessage } = require('./utils')

function findServiceWithType(type, condition) {
  const services = _.flowRight([_.flatten, _.values])(catalogServices)
  return services.find(s => s.type === type && condition(s))
}

/**
 * Decorates handler that require to fetch a server result in order to build a response
 * @param {*} proxiedURL proxy URL (without query parameters, append at runtime)
 * @param {*} handler handler (pathParams, queryParams, bodyParams) => { normal handler result}
 */
function withProxyFetcher(proxiedURL, handler) {
  /** Real request handler */
  return function handleWithProxy(request, response, pathParams, queryParams, bodyParams) {
    // fetching induce promise resolution first
    const dynamicProxyURL = `${proxiedURL}?${_.join(_.map(queryParams, (value, key) => `${key}=${value}`), '&')}`
    logMessage(`Serving on proxy mock service using real back URL ${dynamicProxyURL}`, false, 'Local services')
    return new Promise(resolve => {
      fetch(dynamicProxyURL, {
        headers: request.headers,
      }).then((fetchedResults) => {
        if (fetchedResults.status !== 200) {
          // On 'normal' error
          resolve({ code: fetchedResults.status, content: fetchedResults.statusText })
        } else {
          // note: fetch res.headers.raw() return an object where each field is an array: we need here to keep only a single value
          const serverHeaders = _.reduce(fetchedResults.headers.raw(), (acc, [value], key) =>
            Object.assign({ [key]: value }, acc), {}) // note: we reuse here accumulator for perfs
          // read the content and provide it to subhandler
          fetchedResults.json().then((json) => {
            const { content, code, contentType, binary, headers = {} } = handler(json, pathParams, queryParams, bodyParams)
            resolve({ content, code, contentType, binary, headers: Object.assign({}, headers, serverHeaders) })
          })
        }
      })
    }).catch(error => resolve({ code: 500, content: error }))
  }
}

function addQuicklook({ content, links, metadata }, pathParams, queryParams, bodyParams) {
  const contentWithQuicklook = content.map((entityContent) => {
    if (Math.floor(Math.random() * 2) + 1 === -1) {

      if (!entityContent.content.files) {
        entityContent.content.files = {}
      }

      const hdW = Math.floor(Math.random() * 400) + 500
      const hdH = Math.floor(Math.random() * 700) + 1000
      entityContent.content.files.QUICKLOOK_HD = [{
        uri: `http://lorempicsum.com/futurama/${hdW}/${hdH}/4`,
        imageHeight: hdH,
        imageWidth: hdW,
      }]

      const mdW = Math.floor(Math.random() * 300) + 200
      const mdH = Math.floor(Math.random() * 300) + 400
      entityContent.content.files.QUICKLOOK_MD = [{
        uri: `http://lorempicsum.com/futurama/${mdW}/${mdH}/4`,
        imageHeight: mdH,
        imageWidth: mdW,
      }]

      const sdW = Math.floor(Math.random() * 250) + 100
      const sdH = Math.floor(Math.random() * 250) + 50
      entityContent.content.files.QUICKLOOK_SD = [{
        uri: `http://lorempicsum.com/futurama/${sdW}/${sdH}/4`,
        imageHeight: sdH,
        imageWidth: sdW,
      }]
    }
    return entityContent
  })
  return {
    content: {
      content: contentWithQuicklook,
      // content: [],
      links,
      metadata
      // metadata: {
      //   number: 0,
      //   size: 500,
      //   totalElements: 0,
      //   totalPages: 1,
      // }
    }
  }
}

function getResourcesDependencies({ content, links, metadata }, pathParams, queryParams, bodyParams) {
  return {
    content: {
      content: content.concat(MOCK_RESOURCES),
      links,
      metadata: {
        size: metadata.size + MOCK_RESOURCES.length,
        totalElements: metadata.totalElements + MOCK_RESOURCES.length,
        totalPages: metadata.totalPages,
      }
    }
  }
}

function compareOrder(attribute, order='ASC') {
  return function (a, b) {
    const stringA = a.content[attribute].toUpperCase()
    const stringB = b.content[attribute].toUpperCase()

    let comparison = 0
    if (stringA > stringB) {
      comparison = 1
    } else if (stringA < stringB) {
      comparison = -1
    }
    return (order ==='DESC' ? (comparison * -1) : comparison)
  }
}

function buildLocalServices(gatewayURL) {
  return {
    GET: {
      // Mock: add missing dependencies
      proxyDependencies: {
        url: 'rs-admin/resources',
        handler: withProxyFetcher(`${gatewayURL}/api/v1/rs-admin/resources`, getResourcesDependencies)
      },
      getSearchEngines: {
        url: 'rs-catalog/enginesconfig',
        handler: (req, resp) => {
          return { content: JSON.parse(loadFile('mocks/proxy/resources/mock-searchengines.json')) }
        }
      },
      getSearchEngine: {
        url: 'rs-catalog/enginesconfig/2',
        handler: (req, resp) => {
          return { content: JSON.parse(loadFile('mocks/proxy/resources/mock-searchengine.json')) }
        }
      },
      tempFilePDF: {
        url: 'files/temp.pdf',
        handler: (req, resp) => {
          return { content: loadFile('mocks/proxy/resources/files/temp-file.pdf', 'binary'), contentType: 'application/pdf', binary: true }
        }
      },
      tempFileMD: {
        url: 'files/temp.md',
        handler: (req, resp) => {
          return { content: loadFile('mocks/proxy/resources/files/temp-file.md', 'utf-8'), contentType: 'text/markdown' }
        },
      },
      tempFileTXT: {
        url: 'files/temp.txt',
        handler: (req, resp) => {
          return { content: loadFile('mocks/proxy/resources/files/temp-file.txt', 'utf-8'), contentType: 'text/plain' }
        },
      },
      tempFileXML: {
        url: 'files/temp.xml',
        handler: (req, resp) => {
          return { content: loadFile('mocks/proxy/resources/files/temp-file.xml', 'utf-8'), contentType: 'application/xml' }
        },
      },
      tempFileJPG: {
        url: 'files/temp.jpg',
        handler: (req, resp) => {
          return { content: loadFile('mocks/proxy/resources/files/temp-file.jpg', 'binary'), contentType: 'image/jpeg', binary: true }
        },
      },
      tempUnknownFile: {
        url: 'files/temp.unknow',
        handler: (req, resp) => {
          return { content: 'ABCDE', contentType: 'text/unkown' }
        },
      },
      getSession: {
        url: 'rs-access-project/sessions2',
        handler: (req, resp, pathParams, requestParams) => {
          let myMock = JSON.parse(loadFile('mocks/proxy/resources/mock-sessions.json'))
          
          if (requestParams.sort) {
            let param = requestParams.sort
            let content = [...myMock.content]
            if (!Array.isArray(requestParams.sort)) {
              param = [requestParams.sort]
            }
            param.reverse().forEach((element) => {
              let split = element.split(',')
              content.sort(compareOrder(split[0], split[1]))
            })
            myMock.content = content
          }
          return { content: myMock }
        },
      },
      getSourcesList: {
        url: 'rs-access-project/sessions/sources2',
        handler: (req, resp) => {
          let myMock = JSON.parse(loadFile('mocks/proxy/resources/mock-sessions-list.json'))
          return myMock
        },
      },
      getSessionsList: {
        url: 'rs-access-project/sessions/names2',
        handler: (req, resp) => {
          let myMock = JSON.parse(loadFile('mocks/proxy/resources/mock-sessions-list.json'))
          return myMock
        },
      }
    },
    PUT: {
      stateUpdate: {
        url: 'rs-access-project/sessions/3/acknowledge',
        handler: (req, resp) => {
          const result = JSON.parse(loadFile('mocks/proxy/resources/mock-sessions.json')).content[3]
          result.content.state= 'ACKNOWLEDGED'
          return { content: result }
        },
      }
    },
    POST: {
    },
    DELETE: {
    }
  }
}

module.exports = {
  buildLocalServices,
}
