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

const EMPTY_BASKET = {
  id: 0,
  email: 'test@mail.com',
  datasetSelections: [],
}

const MOCKED_BASKET = JSON.parse(loadFile('mocks/proxy/resources/mock-basket-content.json'))

// const printDates = MOCKED_BASKET.datasetSelections.forEach(selection =>
//   console.error('>>>>>>>>>>>>>>>\n', selection.itemsSelections.map(
//     ({ id, objectsCount, filesCount, filesSize, date, openSearchRequest }, index) => ({
//       id, objectsCount, filesCount, filesSize,
//       date: new Date(parseInt(date, 10)).toISOString(),
//       openSearchRequest: `"tag:fake-tag-index${index}"`,
//     })
//   )))

// Holds current basket data
const currentBasketData = {
  // init mock basket (even for unlogged user, that is mock BRO!)
  token: undefined,
  basket: MOCKED_BASKET,
  datasetSelectionId: 0,
  selectionItemId: 0
}


function getBasket(request) {
  const token = request.headers.authorization
  if (currentBasketData.token !== token) {
    // re init mock basket
    currentBasketData.token = token
    currentBasketData.basket = Object.assign({}, MOCKED_BASKET) // reinit to mock, get new reference
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

function createDatasetGroups([entity, ...nextEntities], datasetMap = {}) {
  if (!entity) {
    return datasetMap // break case
  } else {
    // locate dataset IP ID in tags
    const datasetIPID = _.find(entity.content.tags, tag => tag.includes('DATASET')) || 'TEST-DATASET:URN'
    // init map if required
    datasetMap[datasetIPID] = datasetMap[datasetIPID] || []
    // store entity IP ID
    datasetMap[datasetIPID].push(entity)
    return createDatasetGroups(nextEntities, datasetMap)
  }
}

function updateBasketWithDatasetInfo(objectsCount, filesCount, filesSize, datasetKey) {
  // 1 - retrieve selection element
  let selection = _.find(currentBasketData.basket.datasetSelections, sel => sel.datasetIpid === datasetKey)
  if (!selection) {
    selection = {
      id: currentBasketData.datasetSelectionId,
      datasetIpid: datasetKey,
      objectsCount,
      filesCount,
      filesSize,
      datasetLabel: datasetKey,
      openSearchRequest: null,
      itemsSelections: [],
    }
    currentBasketData.datasetSelectionId += 1
    currentBasketData.basket.datasetSelections.push(selection)
  }
  else {
    selection.objectsCount = selection.objectsCount + objectsCount // very approxymative mock =)
    selection.filesCount = selection.filesCount + filesCount
    selection.filesSize = selection.filesSize + filesSize
  }
  // 2 - Build the new selection item ID for that group and store it
  selection.itemsSelections.push({
    id: currentBasketData.selectionItemId,
    objectsCount,
    filesCount,
    filesSize,
    date: Date.now(),
    openSearchRequest: null,
  })
  currentBasketData.selectionItemId += 1
}

function getPushInBasketHandler(gatewayURL) {
  return function pushInBasketHandler(request, response, pathParameters, queryParameters,
    { basketSelectionRequest: { ipIds, selectAllOpenSearchRequest } }) {
    return new Promise((resolve, reject) => {
      if (!selectAllOpenSearchRequest) {
        // case 1: adding a list of dataobjects: 
        // 1 - resolve them all (collect results through identity handler)
        const handlerDelegate = json => json
        // promise: create decorated proxy delegates and call them immediately
        // Create promises by decorating the handler delegate and calling that decorated element directly
        const allPromises = ipIds.map(ipId =>
          withProxyFetcher(`${gatewayURL}/api/v1/rs-catalog/entities/${ipId}`, handlerDelegate)(request, response, pathParameters, queryParameters, {}))
        Promise.all(allPromises)
          .then((results) => {
            // 2 - split the request into multiple dataset groups 
            const datasetMap = createDatasetGroups(results)
            // 3 - Update global basket
            _.forEach(datasetMap, (addedEntities, datasetKey) => {
              const objectsCount = addedEntities.length
              const filesCount = _.reduce(addedEntities, (acc, entity) => acc + _.get(entity, 'content.files', []).length, 0) // sum all files count
              const filesSize = _.reduce(addedEntities, (acc, entity) => acc + _.get(entity, 'content.properties.FILE_SIZE', 0), 0) // sum all file size
              updateBasketWithDatasetInfo(objectsCount, filesCount, filesSize, datasetKey)
            })
            resolve(getBasket(request))
          }).catch(err => logMessage(err, true, '[Add to basket]') || reject({
            code: 500,
            content: err
          }))
      } else {
        // case 2: adding a request, excluding the list of dataobjects: we will just mock it
        updateBasketWithDatasetInfo(25, 306, 5048, 'test-dataset-for-fake-search')
        resolve(getBasket(request))
      }
    })
  }
}

function orderBasket(request) {
  return { code: 200, content: { content: { id: 5, message: 'Dummy object' } } } // nothing important in this return value, lets ignore it
}

function clearBasket(request) {
  // reinit basket
  currentBasketData.basket = EMPTY_BASKET
  return getBasket(request) // use default basket delegate
}

function removeBasketDataset(request, response, { datasetSelectionId }) {
  const currentBasket = currentBasketData.basket || {}
  const dsSelections = currentBasket.datasetSelections || []
  const searchedIndex = parseInt(datasetSelectionId, 10)
  const foundIndex = dsSelections.findIndex(selection => selection.id === searchedIndex)
  if (foundIndex === -1) {
    return { code: 500 }
  }
  console.error(foundIndex, dsSelections.slice(0, foundIndex).concat(dsSelections.slice(foundIndex + 1, dsSelections.length)))
  // for the basket, we need to clone dataset selection
  currentBasketData.basket = Object.assign({}, currentBasket, {
    datasetSelections: dsSelections.slice(0, foundIndex).concat(dsSelections.slice(foundIndex + 1, dsSelections.length)),
  })
  return getBasket(request)
}

function removeBasketItem(request, response, { datasetSelectionId, itemsSelectionDate }) {
  const currentBasket = currentBasketData.basket || {}
  const dsSelections = currentBasket.datasetSelections || []
  const searchedIndex = parseInt(datasetSelectionId, 10)
  const foundIndex = dsSelections.findIndex(selection => selection.id === searchedIndex)
  if (foundIndex === -1) {
    return { code: 500 }
  }
  // clone the DS selection, remove the dated selection and rebuild the next basket
  const previousDSSelection = dsSelections[foundIndex]
  const dsItemsSelections = previousDSSelection.itemsSelections
  const datedItemIndex = dsItemsSelections.findIndex(selection => selection.date === itemsSelectionDate)

  if (datedItemIndex === -1) {
    return { code: 500 }
  }
  // remove the item
  const nextItems = dsItemsSelections.slice(0, datedItemIndex).concat(dsItemsSelections.slice(datedItemIndex + 1, dsItemsSelections.length))
  // build the next DS selection
  const newDsSelection = nextItems.length ? Object.assign({}, previousDSSelection, {
    objectsCount: nextItems.reduce((acc, item) => acc + item.objectsCount, 0),
    filesCount: nextItems.reduce((acc, item) => acc + item.filesCount, 0),
    filesSize: nextItems.reduce((acc, item) => acc + item.filesSize, 0),
    itemsSelections: nextItems,
  }) : null

  // rebuild DS selections list
  nextSelections = dsSelections.slice(0, foundIndex)
  if (newDsSelection) {
    nextSelections.push(newDsSelection)
  }
  nextSelections = nextSelections.concat(dsSelections.slice(foundIndex + 1, dsSelections.length))

  // update basket
  currentBasketData.basket = Object.assign({}, currentBasket, {
    datasetSelections: nextSelections,
  })
  return getBasket(request)
}

function buildLocalServices(gatewayURL) {
  return {
    GET: {
      // Mock: add missing dependencies
      proxyDependencies: { url: 'rs-admin/resources', handler: withProxyFetcher(`${gatewayURL}/api/v1/rs-admin/resources`, getResourcesDependencies) },
      getBasket: { url: 'rs-order/order/basket', handler: getBasket },
      getSIPS: { url: 'rs-ingest/sips', handler: () => {
        const content = addLinks([
          {
            id: 1,
            test: "maisbiensurqueçamarche",
          },
          {
            id: 2,
            test: "çamarchepas",
          },
          {
            id: 3,
            test: "enfaitsi",
          },
          {
            id: 4,
            test: "nonenfaitvraimentpas",
          },
        ])
        const result = {
          metadata: {
            size: 4,
            totalElements: 4,
            totalPages: 1,
            number: 0,
          },
          content
        }
        return result
      }},
      getSessions: { url: 'rs-ingest/sessions', handler: () => {
        const content = JSON.parse(loadFile('mocks/proxy/resources/mock-ingest-sessions.json'))
        return { content }
      }},
      storageMonitoring: {
        url: 'rs-storage/storages/monitoring', handler: () => {
          const content = addLinks(JSON.parse(loadFile('mocks/proxy/resources/mock-storage-monitoring.json')))
          return { content }
        }
      }
    },
    PUT: {

    },
    POST: {
      addInBasket: { url: 'rs-order/order/basket', handler: getPushInBasketHandler(gatewayURL) },
      order: { url: 'rs-order/user/orders', handler: orderBasket },
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
