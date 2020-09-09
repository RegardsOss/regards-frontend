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
 * Builds a function to return proxy URL on a constant URL, to be used as first parameter of withProxyFetcher
 * @param {string} urlRoot URL root like {gateway}/api/v1/anything, does not include parameters
 * @return {function} to build contant URL based on parameters
 */
function buildGetConstantProxiedURL(urlRoot){
  return function getConstantProxiedURL(requestURL, parameters){
    return `${urlRoot}?${_.join(_.map(parameters, (value, key) => `${key}=${value}`), '&')}`
  }
}

/**
 * Builds a function to return proxy URL on a dynbamic URL, to be used as first parameter of withProxyFetcher
 * @param {string} gatewayURL regards gateway URL
 * @return {string} constant proxy URL builder (to include parameters values)
 */
function buildREGARDSPassthroughProxiedURL(gatewayURL){
  return function (requestURL, parameters){
    return `${gatewayURL}${requestURL}`
  }
}

/**
 * Decorates handler that require to fetch a server result in order to build a response
 * @param {Function} getProxiedURL method that builds URL to proxy on 
 * request URL (URL:string, parameters: {*}) => (URL:string)
 * @param {Function} handler handler (pathParams, queryParams, bodyParams) => { normal handler result}
 * @return {Function} request handler
  */
function withProxyFetcher(getProxiedURL, handler) {
  /** Real request handler */
  return function handleWithProxy(request, response, pathParams, queryParams, bodyParams) {
    // fetching induce promise resolution first
    const dynamicProxyURL = getProxiedURL(request.url, queryParams)
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

const quicklooksFiles = [
  'diamond_sd', 'rectangle_sd', 'square_sd',
  'circle_md', 'diamond_md', 'square_md',
  'rectangle_hd', 'square_hd', 'circle_hd',
  'unknown_sd', 'unknown_hd',
  'large_sd', 'large_hd',
  'veryLarge_hd',
]

/** Converts file name marker (sd/hd/md) into data file type and size (constant) */
const fileExtToType = {
  sd: {
    type: 'QUICKLOOK_SD',
    size: 64,
  },
  md: {
    type: 'QUICKLOOK_MD',
    size: 256,
  }, hd: {
    type: 'QUICKLOOK_HD',
    size: 2048,
  }
}

/** All quicklook definitions for mock */
const quicklooksDataFiles = quicklooksFiles.reduce((acc,fileName, index) => {
  // get group name, type and resolution from file name
  const fileData = fileName.split('_')
  let groupName = fileData[0]
  const types = []
  let width
  let height
  const commonDef = fileExtToType[fileData[1]]
  const type = commonDef.type
  if (groupName === 'unknown'){
    if (type === 'QUICKLOOK_SD'){
      width = 12
      height = 128
    } else {
      width = 300
      height = 4000
    }
  } else {
    types.push(groupName)
    if(groupName === 'large'){
      if (type === 'QUICKLOOK_SD'){
        width = 128
        height = 12
      } else {
        width = 4000
        height = 300
      }
    } else if (groupName ==='veryLarge'){
      width = 6000
      height = 4000
    } else {
      width = commonDef.size
      height = commonDef.size
    }
  }

  if (groupName === 'diamond'){
    types.push('primary')
  }

  // add the data file in corresponding group
  return {
    ...acc,
    [type]: [
      ...acc[type], {
        dataType: type,
        reference: true,
        uri: `http://localhost:3000/api/v1/tempFiles?fileIndex=${index}`,
        mimeType: 'image/png',
        imageWidth: width,
        imageHeight: height,
        online: true,
        checksum: index.toString(),
        filename: fileName,
        types,
      }
    ]
  }
}, {
  QUICKLOOK_SD: [],
  QUICKLOOK_MD: [],
  QUICKLOOK_HD: [],
})

function getDescriptionEntityWithMockQuicklooks({content, links}){
  return {
    content: {
      content: {
        ...content,
        files: {
          ...content.files,
          THUMBNAIL: [{
            dataType: 'THUMBNAIL',
            reference: true,
            uri: `http://localhost:3000/api/v1/tempFiles?fileIndex=0`,
            mimeType: 'image/png',
            imageWidth: 64,
            imageHeight: 64,
            online: true,
            checksum: '0',
            filename: 'myThumbnail', 
          }],
          ...quicklooksDataFiles,
        }
      },
      links,
    },
  }
}

function getCatalogPageWithMockQuicklooks({content, facets, links, metadata}){
  return {
    content: {
      content: content.map(entity => ({
        content: {
          ...entity.content,
          files: {
            ...entity.content.files,
            THUMBNAIL: [{
              dataType: 'THUMBNAIL',
              reference: true,
              uri: `http://localhost:3000/api/v1/tempFiles?fileIndex=13`,
              mimeType: 'image/png',
              imageWidth: 300,
              imageHeight: 4000,
              online: true,
              checksum: '0', 
              filename: 'myThumbnail', 
            }],
            ...quicklooksDataFiles,
          },
        },
        links: entity.links,
      })),
      facets,
      links,
      metadata,
    }
  }

}

const tempFilesMap = [
  // for quicklook tests
  ...quicklooksFiles.map(name => ({
    name: `ql/${name}.png`,
    binary: true,
    mimeType: 'image/png', 
  })),
  {
    name: 'CSS-TEST.css',
    binary: false,
    mimeType: 'text/css', 
  }, {
    name: 'GIF-TEST.gif',
    binary: true,
    mimeType: 'image/gif', 
  }, {
    name: 'HTML-TEST.html',
    binary: false,
    mimeType: 'text/html', 
  }, {
    name: 'JPEG-TEST.jpeg',
    binary: true,
    mimeType: 'image/jpeg', 
  }, {
    name: 'JPEG-BIG-TEST.jpeg',
    binary: true,
    mimeType: 'image/jpeg', 
  },  {
    name: 'JSON-TEST.json',
    binary: false,
    mimeType: 'application/json', 
  }, {
    name: 'JS-TEST.js',
    binary: false,
    mimeType: 'application/javascript', 
  }, {
    name: 'MD-TEST.md',
    binary: false,
    mimeType: 'text/markdown', 
  }, {
    name: 'PDF-TEST.pdf',
    binary: true,
    mimeType: 'application/pdf', 
  }, {
    name: 'PNG-TEST.png',
    binary: true,
    mimeType: 'image/png', 
  }, {
    name: 'TEXT-TEST.txt',
    binary: false,
    mimeType: 'text/plain', 
  }, {
    name: 'XHTML-TEST.xhtml',
    binary: false,
    mimeType: 'application/xhtml+xml', 
  }, {
    name: 'XML-TEST.xml',
    binary: false,
    mimeType: 'application/xml', 
  }, {
    name: 'TEST-UNKNOWN.unk',
    binary: false,
    mimeType: 'text/unknown', 
  },
]

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
        handler: withProxyFetcher(buildREGARDSPassthroughProxiedURL(gatewayURL), getResourcesDependencies)
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
      getDescriptionEntityWithMockQuicklooks: {
         url: 'rs-catalog/engines/legacy/entities/{entity}',
         handler: withProxyFetcher(buildREGARDSPassthroughProxiedURL(gatewayURL), getDescriptionEntityWithMockQuicklooks)
      },
      searchEntitiesWithMockQuicklooks: {
        url: 'rs-access-project/dataobjects/search',
        handler: withProxyFetcher(buildREGARDSPassthroughProxiedURL(gatewayURL), getCatalogPageWithMockQuicklooks)
      },

      // wrap (description) http://localhost:3000/api/v1/rs-catalog/engines/legacy/entities/URN:AIP:DATA:project1:8239915a-bcc0-30a6-94bd-5435bf1539ad:V1
      // wrap (ql): http://localhost:3000/api/v1/rs-access-project/dataobjects/search?q=datasetModelNames%3AEmptyDataset&sort=properties.CREATION_DATE%2CASC&offset=0&page=0&size=500


      getTempFile: {
        url: 'tempFiles',
        handler: (req, resp, pathParams, {fileIndex}) => {
          const fileIndexAsNumber = parseInt(fileIndex, 10)
          if (!isNaN(fileIndex) && fileIndex >= 0 && fileIndex < tempFilesMap.length){
            const fileData = tempFilesMap[fileIndexAsNumber]
            return {
              content: loadFile(`mocks/proxy/resources/files/${fileData.name}`, fileData.binary  ? 'binary' : 'utf-8'),
              contentType: fileData.mimeType,
              binary:  fileData.binary,
            }
          }
          return { content: 'Invalid file index', code: 404 }
        }
      },
      getSession: {
        url: 'rs-admin/sessions',
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
        url: 'rs-admin/sessions/sources',
        handler: (req, resp) => {
          let myMock = JSON.parse(loadFile('mocks/proxy/resources/mock-sessions-list.json'))
          return myMock
        },
      },
      getSessionsList: {
        url: 'rs-admin/sessions/names',
        handler: (req, resp) => {
          let myMock = JSON.parse(loadFile('mocks/proxy/resources/mock-sessions-list.json'))
          return myMock
        },
      },
      getChainInfo: {
        url: 'rs-dataprovider/chains/1',
        handler: (req, resp) => {
          let myMock = JSON.parse(loadFile('mocks/proxy/resources/mock-chain-edit.json'))
          return { content: myMock }
        },
      },
    },
    PUT: {
      stateUpdate: {
        url: 'rs-admin/sessions/3/acknowledge',
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
