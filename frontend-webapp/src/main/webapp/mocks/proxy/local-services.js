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
const { addLinks, loadFile, logMessage } = require('./utils')

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

let MOCKED_ORDERS_LIST = JSON.parse(loadFile('mocks/proxy/resources/mock-orders.json'))
const MOCKED_ORDER_DS_FILES_LIST = JSON.parse(loadFile('mocks/proxy/resources/mock-order-ds-files.json'))

function buildLocalServices(gatewayURL) {
  return {
    GET: {
      // Mock: add missing dependencies
      proxyDependencies: { url: 'rs-admin/resources', handler: withProxyFetcher(`${gatewayURL}/api/v1/rs-admin/resources`, getResourcesDependencies) },
      getSessions: {
        url: 'rs-ingest/sessions', handler: () => {
          const content = JSON.parse(loadFile('mocks/proxy/resources/mock-ingest-sessions.json'))
          return { content }
        }
      },
      userOrders: {
        url: 'user/orders', handler: (req, resp, pathParameters, { page, size }) => {
          const pageIndex = parseInt(page, 10)
          const ordersList = MOCKED_ORDERS_LIST.slice(pageIndex * size, Math.min((pageIndex + 1) * size, MOCKED_ORDERS_LIST.length))
          return {
            content: {
              content: ordersList,
              metadata: {
                number: pageIndex,
                size: ordersList.length,
                totalElements: MOCKED_ORDERS_LIST.length,
              },
            }
          }
        }
      },
      userOderFiles: {
        url: 'rs-order/orders/{orderId}/dataset/{datasetId}/files',
        handler: (req, resp, { orderId, datasetId }, { page, size }) => {
          const pageIndex = parseInt(page, 10)
          const filesList = MOCKED_ORDER_DS_FILES_LIST.slice(pageIndex * size, Math.min((pageIndex + 1) * size, MOCKED_ORDER_DS_FILES_LIST.length))
          return {
            content: {
              content: filesList,
              metadata: {
                number: pageIndex,
                size: filesList.length,
                totalElements: MOCKED_ORDER_DS_FILES_LIST.length,
              },
            }
          }
        }
      },
      storageMonitoring: {
        url: 'rs-storage/storages/monitoring', handler: () => {
          const content = addLinks(JSON.parse(loadFile('mocks/proxy/resources/mock-storage-monitoring.json')))
          return { content }
        }
      },
    },
    PUT: {
      // pause order
      pauseOrder: {
        url: 'rs-order/user/orders/pause/{orderId}',
        handler: () => {
          return {
            code: 200,
            content: {},
            //   messages: ['ORDER_NOT_COMPLETELY_PAUSED'],
            // },
          }
        },
      },
      // resume order
      resumeOrder: {
        url: 'rs-order/user/orders/resume/{orderId}',
        handler: () => {
          return {
            code: 200,
            content: {},
            //   messages: ['ORDER_MUST_BE_DELETED'],
            // },
          }
        },
      }
    },
    POST: {
    },
    DELETE: {
      deletePartiallyOrder: {
        url: 'rs-order/user/orders/{orderId}',
        handler: (req, resp, { orderId }) => {
          const idAsNumber = parseInt(orderId, 10)
          const foundIndex = MOCKED_ORDERS_LIST.findIndex(order => order.content.id === idAsNumber)
          console.error('Found index is then ', foundIndex)
          if (foundIndex === -1) {
            return { code: 404, content: [{ messages: 'Order not found' }] }
          }
          // mutate the list to hold the new state
          MOCKED_ORDERS_LIST[foundIndex].content.status = 'DELETED'
          return { code: 204 }
        }
      },
      deleteCompletelyOrder: {
        url: 'rs-order/user/orders/remove/{orderId}',
        handler: (req, resp, { orderId }) => {
          const idAsNumber = parseInt(orderId, 10)
          const oldMockedOrderList = MOCKED_ORDERS_LIST
          MOCKED_ORDERS_LIST = MOCKED_ORDERS_LIST.filter(order => order.content.id !== idAsNumber)
          if (MOCKED_ORDERS_LIST.length === oldMockedOrderList.length - 1) {
            return { code: 204 }
          }
          if (MOCKED_ORDERS_LIST.length === oldMockedOrderList) {
            return { code: 404, content: [{ messages: 'Order not found' }] }
          }
          // roll back
          MOCKED_ORDERS_LIST = oldMockedOrderList
          return { code: 500, content: [{ messages: 'Order not found' }] }
        }
      },
    }
  }
}

module.exports = {
  buildLocalServices,
}
