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
  // mock backet deps
  {
    content: {
      controllerSimpleName: `OrderServiceBasketController`,
      defaultRole: 'PUBLIC',
      description: `Order service basket controller`,
      id: 100000,
      microservice: 'rs-order',
      resource: '/order/basket',
      verb: 'GET',
    },
    links: [],
  },
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

// Holds current basket data
const currentBasketData = {}

function getBasket(request) {
  const token = request.headers.authorization
  if (currentBasketData.token !== token) {
    // re init mock basket
    currentBasketData.token = token
    currentBasketData.basket = {
      id: 0,
      email: 'test@mail.com',
      datasetSelections: [],
    }
    currentBasketData.datasetSelectionId = 0
    currentBasketData.selectionItemId = 0
  }
  if (_.isEmpty(currentBasketData.basket)) {
    return {
      code: 204,
    }
  } else {
    return {
      code: 200,
      content: {
        content: currentBasketData.basket,
        links: [],
      }
    }
  }
}

// TODO remove when useless
// {
//         id: 0,
//         datasetIpId: 'kikou.1',
//         datasetLabel: 'Kikou 1',
//         objectsCount: 12,
//         filesCount: 12,
//         filesSize: 1000023,
//       }, {
//         id: 0,
//         datasetIpId: 'kikou.2',
//         datasetLabel: 'Kikou 2',
//         objectsCount: 6,
//         filesCount: 8,
//         filesSize: 255,
//       }

function pushInBasket(request, response, pathParameters, queryParameters, bodyParameters) {

}

function clearBasket() {

}
function removeBasketDataset() {

}
function removeBasketItem() {

}

function buildLocalServices(gatewayURL) {
  return {
    GET: {
      // Mock: add missing dependencies
      proxyDependencies: { url: 'rs-admin/resources', handler: withProxyFetcher(`${gatewayURL}/api/v1/rs-admin/resources`, getResourcesDependencies) },
      getBasket: { url: 'rs-order/order/basket', handler: getBasket },
    },
    PUT: {

    },
    POST: {
      addInBasket: { url: 'rs-order/order/basket', handler: pushInBasket },
    },
    DELETE: {
      clearBasket: { url: 'rs-order/order/basket', handler: clearBasket },
      removeBasketDataset: { url: 'rs-order/order/basket/dataset/{datasetSelectionId}', handler: removeBasketDataset },
      removeBasketItem: { url: 'rs-order/order/basket/dataset/{datasetSelectionId}/{itemsSelectionDate}', handler: removeBasketItem },
    },
  }
}

module.exports = {
  buildLocalServices,
}