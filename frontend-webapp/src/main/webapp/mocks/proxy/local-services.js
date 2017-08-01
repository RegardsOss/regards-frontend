/**
 * Put in this file every local service structured as 
 * {
 *   METHOD: {
 *     SERVICE_NAME: {
 *       url: 'url-pattern',
 *       handler: (request, response, pathParams, queryParams, bodyParams) => *,
 *     }
 *   }
 * }
 * When finding them, the server will use it instead of proxying the real server
 * The handler must return an object like:
 * { 
 *   content: (optional, string | object | binary content, default={}), 
 *   code: (optional, integer, default=200),
 *   contentType: (optional, string, default = 'application/json; charset=utf-8'),
 *   binary: (optional, boolean, default= false)
 * } 
 */
const _ = require('lodash')
const { loadFile } = require('./utils')

const catalogServices = {
  common: [
    { // first catalog service (common to all): defines config unlike others
      configId: 0,
      label: 'Do progress! (Cat.)',
      icon: 'https://d30y9cdsu7xlg0.cloudfront.net/png/593651-200.png',
      applicationModes: ['MANY'],
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
      icon: 'https://image.flaticon.com/teams/slug/freepik.jpg',
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
      icon: 'https://vignette3.wikia.nocookie.net/dirtybomb/images/f/f7/Dirty_Bomb_Icon.svg/revision/latest?cb=20151221234323',
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
    icon: 'http://www.clipartsfree.net/vector/large/pitr_Sheep_icon_Vector_Clipart.png',
    applicationModes: ['ONE'],
    entityTypes: ['DATA', 'DATASET'],
    type: 'UI',
    common: {},
    config: {},
    meta: {},
  }, {
    configId: 2,
    label: 'Mix it (Cat./RPWS)',
    icon: 'https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_accessibility_white_24px.svg',
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

const localServices = {
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
        }
        file = files.png // select a file
        const filePath = `./mocks/proxy/resources/${file.name}`
        let content = loadFile(filePath, file.binary ? undefined : 'utf8')
        return {
          code: 200,
          contentType: file.type,
          content,
          binary: file.binary,
          headers: {
            'Content-Disposition': `inline;filename=${file.name}`,
          }
        }

      }
    }

  },
  DELETE: {

  },
}

module.exports = {
  localServices,
}