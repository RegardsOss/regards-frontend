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
const { loadFile, logMessage } = require('./utils')

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

/**
 * List of mocked dependencies
 */
const MOCK_RESOURCES = [
  // {
  //   content: {
  //     controllerSimpleName: `ProxySearchController-0`,
  //     defaultRole: 'PUBLIC',
  //     description: `Search endpoint 0`,
  //     id: 100000,
  //     microservice: 'rs-access-project',
  //     resource: '/datasets/search',
  //     verb: "GET",
  //   },
  //   links: [],
  // },
]

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

function buildLocalServices(gatewayURL) {
  return {
    GET: {
      // Mock: add missing dependencies
      proxyDependencies: { url: 'rs-admin/resources', handler: withProxyFetcher(`${gatewayURL}/api/v1/rs-admin/resources`, getResourcesDependencies) }
    },
    PUT: {},
    POST: {},
    DELETE: {},
  }
}

module.exports = {
  buildLocalServices,
}