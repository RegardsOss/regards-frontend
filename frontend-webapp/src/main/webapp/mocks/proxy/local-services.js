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

const catalogServices = {
  common: [
    { // first catalog service (common to all): defines config unlike others
      configId: 0,
      label: 'Do progress! (Cat.)',
      iconUrl: 'https://d30y9cdsu7xlg0.cloudfront.net/png/593651-200.png',
      applicationModes: ['ONE', 'MANY'],
      entityTypes: ['COLLECTION', 'DATASET', 'DOCUMENT', 'DATA'],
      type: 'CATALOG',
      common: {
        pluginId: 'aSamplePlugin',
        version: '0.0.1',
        pluginClassName: 'fr.cnes.regards.framework.plugins.SamplePlugin',
        interfaceNames: ['fr.cnes.regards.framework.plugins.ISamplePlugin'],
      },
      config: {
        priorityOrder: 0,
        active: true,
        parameters: [
          { id: 8, name: 'A bool', value: '', dynamic: true },
          { id: 2, name: 'A string', value: '', dynamic: true },
          { id: 1, name: 'A string choice', value: '1/1', dynamic: true, dynamicsValues: [{ value: '1/1' }, { value: '1/5' }, { value: '1/10' }] },
          { id: 3, name: 'A char', value: 'C', dynamic: true, },
          { id: 4, name: 'A double', value: '', dynamic: true },
          { id: 5, name: 'An int', value: '4', dynamic: true },
          { id: 6, name: 'Hidden 1', value: 'h1', dynamic: false },
          { id: 7, name: 'Hidden 2', value: 'h2', dynamic: false },
        ]
      },
      meta: {
        author: 'REGARDS Team',
        description: 'Sample plugin test',
        url: 'https://github.com/RegardsOss',
        contact: 'regards@c-s.fr',
        owner: 'CSSI',
        licence: 'LGPLv3.0',
        parameters: [
          { name: 'A bool', type: 'java.lang.Boolean', paramType: 'PRIMITIVE', optional: false },
          { name: 'A string', type: 'java.lang.String', paramType: 'PRIMITIVE', defaultValue: 'Default val', optional: false },
          { name: 'A string choice', type: 'java.lang.String', paramType: 'PRIMITIVE', defaultValue: 'xxx', optional: false },
          { name: 'A char', type: 'java.lang.Character', paramType: 'PRIMITIVE', defaultValue: 'B', optional: false },
          { name: 'A double', type: 'java.lang.Double', paramType: 'PRIMITIVE', optional: true },
          { name: 'An int', type: 'java.lang.Integer', paramType: 'PRIMITIVE', optional: false },
          { name: 'Hidden 1', type: 'java.lang.String', paramType: 'PRIMITIVE', optional: false },
          { name: 'Hidden 2', type: 'java.lang.String', paramType: 'PRIMITIVE', optional: false },
        ]
      },
    },
    {
      configId: 0,
      label: 'Selfish! (UI)',
      iconUrl: 'https://image.flaticon.com/teams/slug/freepik.jpg',
      applicationModes: ['MANY'],
      entityTypes: ['COLLECTION', 'DATASET', 'DOCUMENT', 'DATA'],
      type: 'UI',
      common: {},
      config: {},
      meta: {},
    },
    {
      configId: 1,
      label: 'Self destruct (Cat.)',
      iconUrl: 'https://vignette3.wikia.nocookie.net/dirtybomb/images/f/f7/Dirty_Bomb_Icon.svg/revision/latest?cb=20151221234323',
      applicationModes: ['ONE'],
      entityTypes: ['COLLECTION', 'DATASET', 'DOCUMENT', 'DATA'],
      type: 'CATALOG',
      common: {},
      config: {},
      meta: {},
    }],
  // cassini RPWS Native L1 data on test raph
  'URN:AIP:DATASET:test_raph:f8e8c56d-1d3e-45e1-b322-d20f135ef21b:V1': [{
    configId: 1,
    label: 'One sheep (UI/RPWS)',
    iconUrl: 'https://wpclipart.com/animals/S/sheep/sheep_2/sheep_surprised_happy.png',
    applicationModes: ['ONE'],
    entityTypes: ['DATA', 'DATASET'],
    type: 'UI',
    common: {},
    config: {},
    meta: {},
  }, {
    configId: 2,
    label: 'Mix it (Cat./RPWS)',
    iconUrl: 'https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_accessibility_white_24px.svg',
    applicationModes: ['MANY'],
    entityTypes: ['DATA'],
    type: 'CATALOG',
    common: {},
    config: {},
    meta: {},
  }],
}

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

const MOCK_RESOURCES_PATHS = ['/datasets/search', '/dataobjects/search']
const geMockResources = () => MOCK_RESOURCES_PATHS.map((path, index) => ({
  content: {
    controllerSimpleName: `ProxySearchController-${index}`,
    defaultRole: "PUBLIC",
    description: `Search endpoint ${index}`,
    id: 100000 + index,
    microservice: "rs-access-project",
    resource: path,
    verb: "GET",
  },
  links: [],
}))

function getResourcesDependencies({ content, links, metadata }, pathParams, queryParams, bodyParams) {
  return {
    content: {
      content: content.concat(geMockResources()),
      links,
      metadata: {
        size: metadata.size + MOCK_RESOURCES_PATHS.length,
        totalElements: metadata.totalElements + MOCK_RESOURCES_PATHS.length,
        totalPages: metadata.totalPages,
      }
    }
  }
}

/** Mimics rs-access proxy to catalog */
function addServicesToEntity(entityContent) {
  // append all services for entities like: Entity type is OK, application mode is ONE and service is not specific
  // to a dataset OR the dataset is entity parent
  const services = _.flatMap(catalogServices, (services, key) =>
    services.filter(s =>
      s.entityTypes.includes(entityContent.entityType) &&
      s.applicationModes.includes('ONE') &&
      (key === 'common' || entityContent.tags.includes(key))).
      map(s => ({ content: _.omit(s, ['common', 'config', 'meta']) })))

  return Object.assign({ services }, entityContent)
}

function getSearchResults({ content, links, metadata }, pathParams, queryParams, bodyParams) {
  const withServicesContent = content.map(({ content: entityContent, links: entityLinks }) => ({
    content: addServicesToEntity(entityContent),
    links: entityLinks,
  }))

  return { content: { content: withServicesContent, links, metadata } }
}

function buildLocalServices(gatewayURL) {
  return {
    GET: {
      /** Provide results plugin services */
      resultsPluginServices: {
        url: 'rs-access-project/services/aggregated',
        handler: (request, response, pathParams, { datasetIpId }) => {
          // Gather available request services (service app mode ignored - considered MANY)
          const content = _.flatMap(catalogServices, (services, key) =>
            key === 'common' || key === datasetIpId ?
              // filter definitions then map service to equivalent content / links resource object
              services.filter(s => s.applicationModes.includes('MANY')).map(s => ({ content: _.omit(s, ['common', 'config', 'meta']) })) :
              [])
          return { content }
        }
      },
      /** Provide configuration for catalog plugin services */
      catalogPluginConfiguration: {
        url: 'rs-catalog/plugins/configs/{configId}',
        handler: (request, response, { configId }) => {
          const searchedConfId = parseInt(configId, 10)
          const service = findServiceWithType('CATALOG', s => s.configId === searchedConfId)
          if (service) {
            return {
              content: {
                content: Object.assign({ id: service.configId, label: service.label }, service.config, service.common),
                links: [],
              }
            }
          } else {
            return { code: 404 }
          }
        }
      },
      /** Provide metadata for catalog plugin services */
      cataloPluginMetadata: {
        url: 'rs-catalog/plugins/{pluginId}',
        handler: (request, response, { pluginId }) => {
          // retrieve service by corresponding plugin (restriction: do not use twice the same pluginId in services)
          const service = findServiceWithType('CATALOG', s => s.common.pluginId === pluginId)
          if (service) {
            return {
              content: {
                content: Object.assign({}, service.meta, service.common),
                links: [],
              }
            }
          } else {
            return { code: 404 }
          }
        }
      },
      /** Provide config for UI plugin services */
      uiPluginConfiguration: {
        url: 'rs-access-project/plugins/configurations/{confId}',
        handler: (request, response, { confId }) => {
          const parsedConfigId = parseInt(confId, 10)
          const service = findServiceWithType('UI', s => s.configId === parsedConfigId)
          if (!service) {
            return { code: 404 }
          }
          // directly mock here the conf of the only UI plugin create (service example)
          return {
            code: 200,
            content: {
              content: {
                id: confId,
                active: true,
                label: 'I don\'t care',
                linkedToAllEntities: false,
                pluginDefinition: {
                  id: 0,
                  name: 'I still don\'t care',
                  type: 'SERVICE',
                  sourcePath: '/plugins/service/example/plugin.js'
                },
                conf:
                `{
  "label": "must say i really don't care",
  "static": {
    "static1": "mock-server-val1",
    "static2": "mock-server-val2"
  },
  "dynamic": {
    "pBool": true,
    "pChar": "z",
    "pDate": "1997-07-16T19:20:30.45+01:00",
    "pFloat": "4.3",
    "pString": "je suis un test",
    "pInt": 42
  }
}`
              },
              links: [],
            }
          }
        },
      },
      // Mock: rs-access proxy on catalog (provides services on catalog search results)
      proxyAccessSearchDatasets: { url: 'rs-access-project/datasets/search', handler: withProxyFetcher(`${gatewayURL}/api/v1/rs-catalog/datasets/search/`, getSearchResults) },
      proxyAccessSearchData: { url: 'rs-access-project/dataobjects/search', handler: withProxyFetcher(`${gatewayURL}/api/v1/rs-catalog/dataobjects/search/`, getSearchResults) },
      proxyAccessSearchDatasetsData: { url: 'rs-access-project/dataobjects/datasets/search', handler: withProxyFetcher(`${gatewayURL}/api/v1/rs-catalog/dataobjects/datasets/search/`, getSearchResults) },
      proxyAccessSearchCollections: { url: 'rs-access-project/collections/search', handler: withProxyFetcher(`${gatewayURL}/api/v1/rs-catalog/collections/search/`, getSearchResults) },
      proxyAccessSearchDataobjects: { url: 'rs-access-project/documents/search', handler: withProxyFetcher(`${gatewayURL}/api/v1/rs-catalog/documents/search/`, getSearchResults) },
      proxyAccessSearchAny: { url: 'rs-access-project/search', handler: withProxyFetcher(`${gatewayURL}/api/v1/rs-catalog/search/`, getSearchResults) },
      // Mock: add missing dependencies
      proxyDependencies: { url: 'rs-admin/resources', handler: withProxyFetcher(`${gatewayURL}/api/v1/rs-admin/resources`, getResourcesDependencies) }
    },
    PUT: {

    },
    POST: {
      catalogServiceApply: {
        url: 'rs-catalog/services/{pluginConfigurationId}/apply',
        handler: (request, response, { pluginConfigurationId }, queryParams, bodyParams) => {
          const files = {
            html: { name: 'temporary.html', type: 'text/html', binary: false },
            json: { name: 'temporary.json', type: 'application/json', binary: false },
            md: { name: 'temporary.md', type: 'text/markdown', binary: false },
            xml: { name: 'temporary.xml', type: 'application/xml', binary: false },
            pdf: { name: 'temporary.pdf', type: 'application/pdf', binary: true },
            png: { name: 'temporary.png', type: 'image/png', binary: true },
            gif: { name: 'temporary.gif', type: 'image/gif', binary: true },
            jpg: { name: 'temporary.jpg', type: 'image/jpeg', binary: true },
            empty: {},
          }
          file = files.xml // select a file
          let content
          if (file.name) {
            const filePath = `./mocks/proxy/resources/${file.name}`
            content = loadFile(filePath, file.binary ? undefined : 'utf8')
          }
          return {
            code: 200,
            contentType: file.type,
            content,
            binary: !!file.binary,
          }

        }
      }

    },
    DELETE: {

    },
  }
}

module.exports = {
  buildLocalServices,
}