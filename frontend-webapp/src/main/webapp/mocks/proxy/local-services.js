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
    const dynamicProxyURL = `${proxiedURL}${_.isEmpty(queryParams) ? '' : '?'}${_.join(_.map(queryParams, (value, key) => `${key}=${value}`), '&')}`
    logMessage(`Serving on proxy mock service using real back URL ${dynamicProxyURL}`, false, 'Local services')
    const headers = _.omit(request.headers, 'content-length', 'content-type')
    return fetch(dynamicProxyURL, {
      headers: headers,
    }).then((fetchedResults) => {
      if (fetchedResults.status !== 200) {
        // On 'normal' error
        return { code: fetchedResults.status, content: fetchedResults.statusText }
      } else {
        // note: fetch res.headers.raw() return an object where each field is an array: we need here to keep only a single value
        const serverHeaders = _.reduce(fetchedResults.headers.raw(), (acc, [value], key) =>
          Object.assign({ [key]: value }, acc), {}) // note: we reuse here accumulator for perfs
        // read the content and provide it to subhandler
        return fetchedResults.json().then((json) => {
          const { content, code, contentType, binary, headers = {} } = handler(json, pathParams, queryParams, bodyParams)
          return { content, code, contentType, binary, headers: Object.assign({}, headers, serverHeaders) }
        })
      }
    }).catch(err => logMessage(JSON.stringify(err), true, '[Proxy]') || err)
  }
}

/**
 * List of mocked dependencies
 */
const MOCK_RESOURCES = [
  // mock backet deps
  {
    content: {
      controllerSimpleName: 'OrderServiceControllerOrder',
      defaultRole: 'PUBLIC',
      description: 'Order service basket controller - view content',
      id: 100000,
      microservice: 'rs-order',
      resource: '/order/basket',
      verb: 'GET',
    },
    links: [],
  },
  {
    content: {
      controllerSimpleName: 'OrderServiceBasketControllerAddSelection',
      defaultRole: 'PUBLIC',
      description: 'Order service basket controller - add selection',
      id: 100001,
      microservice: 'rs-order',
      resource: '/order/basket/selection',
      verb: 'POST',
    },
    links: [],
  },
  {
    content: {
      controllerSimpleName: 'OrderServiceControllerOrder',
      defaultRole: 'PUBLIC',
      description: 'Order service basket controller - clear basket selection',
      id: 100002,
      microservice: 'rs-order',
      resource: '/order/basket',
      verb: 'DELETE',
    },
    links: [],
  },
  {
    content: {
      controllerSimpleName: 'OrderServiceControllerOrder',
      defaultRole: 'PUBLIC',
      description: 'Order service basket controller - remove dataset selections',
      id: 100003,
      microservice: 'rs-order',
      resource: '/order/basket/dataset/{datasetSelectionId}',
      verb: 'DELETE',
    },
    links: [],
  },
  {
    content: {
      controllerSimpleName: 'OrderServiceControllerOrder',
      defaultRole: 'PUBLIC',
      description: 'Order service basket controller - remove dated item selection',
      id: 100004,
      microservice: 'rs-order',
      resource: '/order/basket/dataset/{datasetSelectionId}/{itemsSelectionDate}',
      verb: 'DELETE',
    },
    links: [],
  },
  {
    content: {
      controllerSimpleName: 'OrderServiceControllerOrder',
      defaultRole: 'PUBLIC',
      description: 'Order service controller - do order',
      id: 100005,
      microservice: 'rs-order',
      resource: '/user/orders',
      verb: 'POST',
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

const MOCKED_BASKET = { // MOCK a full backet, win TIME, SAVE MONNEY
  id: 0,
  email: 'test@mail.com',
  datasetSelections: [
    {
      id: 0,
      datasetIpid: "TEST-DATASET:URN",
      objectsCount: 19,
      filesCount: 0,
      filesSize: 27730,
      datasetLabel: "Fake dataset 1",
      openSearchRequest: null,
      itemsSelections: [{
        id: 0,
        objectsCount: 1,
        filesCount: 0,
        filesSize: 1440,
        date: '2017-09-08T15:59:57.664Z',
        openSearchRequest: '"tag:fake-tag-index0"'
      },
      {
        id: 1,
        objectsCount: 1,
        filesCount: 0,
        filesSize: 956,
        date: '2017-09-08T15:59:58.682Z',
        openSearchRequest: '"tag:fake-tag-index1"'
      },
      {
        id: 2,
        objectsCount: 1,
        filesCount: 0,
        filesSize: 2294,
        date: '2017-09-08T15:59:59.649Z',
        openSearchRequest: '"tag:fake-tag-index2"'
      },
      {
        id: 4,
        objectsCount: 1,
        filesCount: 0,
        filesSize: 1440,
        date: '2017-09-08T16:00:32.497Z',
        openSearchRequest: '"tag:fake-tag-index3"'
      },
      {
        id: 5,
        objectsCount: 1,
        filesCount: 0,
        filesSize: 1440,
        date: '2017-09-08T16:00:32.802Z',
        openSearchRequest: '"tag:fake-tag-index4"'
      },
      {
        id: 6,
        objectsCount: 1,
        filesCount: 0,
        filesSize: 1440,
        date: '2017-09-08T16:00:33.465Z',
        openSearchRequest: '"tag:fake-tag-index5"'
      },
      {
        id: 7,
        objectsCount: 1,
        filesCount: 0,
        filesSize: 1440,
        date: '2017-09-08T16:00:33.597Z',
        openSearchRequest: '"tag:fake-tag-index6"'
      },
      {
        id: 8,
        objectsCount: 1,
        filesCount: 0,
        filesSize: 1440,
        date: '2017-09-08T16:00:33.725Z',
        openSearchRequest: '"tag:fake-tag-index7"'
      },
      {
        id: 9,
        objectsCount: 1,
        filesCount: 0,
        filesSize: 1440,
        date: '2017-09-08T16:00:36.269Z',
        openSearchRequest: '"tag:fake-tag-index8"'
      },
      {
        id: 10,
        objectsCount: 1,
        filesCount: 0,
        filesSize: 1440,
        date: '2017-09-08T16:00:36.401Z',
        openSearchRequest: '"tag:fake-tag-index9"'
      },
      {
        id: 11,
        objectsCount: 1,
        filesCount: 0,
        filesSize: 1440,
        date: '2017-09-08T16:00:36.533Z',
        openSearchRequest: '"tag:fake-tag-index10"'
      },
      {
        id: 12,
        objectsCount: 1,
        filesCount: 0,
        filesSize: 1440,
        date: '2017-09-08T16:00:36.664Z',
        openSearchRequest: '"tag:fake-tag-index11"'
      },
      {
        id: 13,
        objectsCount: 1,
        filesCount: 0,
        filesSize: 1440,
        date: '2017-09-08T16:00:36.795Z',
        openSearchRequest: '"tag:fake-tag-index12"'
      },
      {
        id: 14,
        objectsCount: 1,
        filesCount: 0,
        filesSize: 1440,
        date: '2017-09-08T16:00:36.915Z',
        openSearchRequest: '"tag:fake-tag-index13"'
      },
      {
        id: 15,
        objectsCount: 1,
        filesCount: 0,
        filesSize: 1440,
        date: '2017-09-08T16:00:37.054Z',
        openSearchRequest: '"tag:fake-tag-index14"'
      },
      {
        id: 16,
        objectsCount: 1,
        filesCount: 0,
        filesSize: 1440,
        date: '2017-09-08T16:00:37.185Z',
        openSearchRequest: '"tag:fake-tag-index15"'
      },
      {
        id: 17,
        objectsCount: 1,
        filesCount: 0,
        filesSize: 1440,
        date: '2017-09-08T16:00:37.355Z',
        openSearchRequest: '"tag:fake-tag-index16"'
      },
      {
        id: 18,
        objectsCount: 1,
        filesCount: 0,
        filesSize: 1440,
        date: '2017-09-08T16:00:37.467Z',
        openSearchRequest: '"tag:fake-tag-index17"'
      },
      {
        id: 19,
        objectsCount: 1,
        filesCount: 0,
        filesSize: 1440,
        date: '2017-09-08T16:00:37.545Z',
        openSearchRequest: '"tag:fake-tag-index18"'
      }]
    }, {
      id: 1,
      datasetIpid: "test-dataset-for-fake-search",
      objectsCount: 25,
      filesCount: 306, "filesSize": 5048,
      datasetLabel: "Fake dataset 2",
      openSearchRequest: null,
      itemsSelections: [{
        id: 3,
        objectsCount: 25,
        filesCount: 306,
        filesSize: 5048,
        date: '2017-09-08T16:00:02.625Z',
        openSearchRequest: '"tag:fake-tag-index0"'
      }]
    }]
}

// TODO remove when useless, use to change the itemSelections format
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
  token: null,
  basket: MOCKED_BASKET,
  datasetSelectionId: 0,
  selectionItemId: 0
}


function getBasket(request) {
  const token = request.headers.authorization
  if (currentBasketData.token !== token) {
    // re init mock basket
    currentBasketData.token = token
    currentBasketData.basket = MOCKED_BASKET // reinit to mock
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
            resolve({
              code: 200,
              content: {
                content: currentBasketData.basket,
                links: [],
              }
            })
          }).catch(err => logMessage(err, true, '[Add to basket]') || reject({
            code: 500,
            content: err
          }))
      } else {
        // case 2: adding a request, excluding the list of dataobjects: we will just mock it
        console.error('<<<<<<<<<<<<<<<< ', currentBasketData.basket)
        updateBasketWithDatasetInfo(25, 306, 5048, 'test-dataset-for-fake-search')
        console.error('>>>>>>>>>>>>>>>> ', currentBasketData.basket)
        resolve({
          code: 200,
          content: {
            content: currentBasketData.basket,
            links: [],
          }
        })
      }
    })
  }
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
      addInBasket: { url: 'rs-order/order/basket', handler: getPushInBasketHandler(gatewayURL) },
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

