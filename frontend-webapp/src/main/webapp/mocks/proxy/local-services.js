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

const catalogServices = {
  common: {
    'ui-services': [{
      configId: 0,
      label: 'Do progress! (UI)',
      icon: 'https://d30y9cdsu7xlg0.cloudfront.net/png/593651-200.png',
      applicationModes: ['MANY'],
      entityTypes: ['COLLECTION', 'DATASET', 'DOCUMENT', 'DATA'],
      config: {}
    },
    {
      configId: 1,
      label: 'Selfish! (UI)',
      icon: 'https://image.flaticon.com/teams/slug/freepik.jpg',
      applicationModes: ['ONE'],
      entityTypes: ['COLLECTION', 'DATASET', 'DOCUMENT', 'DATA'],
      config: {}
    }
    ],
    'catalog-services': [{
      configId: 2,
      label: 'Self destruct (Cat.)',
      icon: 'https://vignette3.wikia.nocookie.net/dirtybomb/images/f/f7/Dirty_Bomb_Icon.svg/revision/latest?cb=20151221234323',
      applicationModes: ['MANY'],
      entityTypes: ['COLLECTION', 'DATASET', 'DOCUMENT', 'DATA'],
      config: {}
    }
    ],
  },
  // cassini RPWS Native L1 data on test raph
  'URN:AIP:DATASET:test_raph:f8e8c56d-1d3e-45e1-b322-d20f135ef21b:V1': {
    'ui-services': [{
      configId: 3,
      label: 'One sheep (UI/RPWS)',
      icon: 'http://www.clipartsfree.net/vector/large/pitr_Sheep_icon_Vector_Clipart.png',
      applicationModes: ['ONE'],
      entityTypes: ['DATA', 'DATASET'],
      config: {}
    }],
    'catalog-services': [{
      configId: 4,
      label: 'Mix it (Cat./RPWS)',
      icon: 'https://www.google.fr/url?sa=i&rct=j&q=&esrc=s&source=imgres&cd=&ved=0ahUKEwi9zNyGjJXVAhUGVhQKHUW5DccQjBwIBA&url=https%3A%2F%2Fwww.shareicon.net%2Fdownload%2F2016%2F05%2F01%2F758018_blender.svg&psig=AFQjCNFsaiv4uJ4tffreqoCTPxNRQHITCg&ust=1500545049959549',
      applicationModes: ['MANY'],
      entityTypes: ['DATA'],
      config: {}
    }],
  },
}


const localServices = {
  GET: {
    /** Provide catalog services */
    catalogServices: {
      url: 'rs-access-project/services',
      handler: (request, response, pathParams, { datasetIpId }) => {
        // filter / convert method for definitions into request expected format
        const filterServices = (list) => _.reduce(list, (acc, s) => {
          return s.applicationModes.includes('MANY') ? [...acc, _.omit(s, 'config')] : acc
        }, [])
        // Gather available request services (service app mode ignored - considered MANY)
        const content = _.reduce(catalogServices, (acc, definition, key) => {
          if (key === 'common' || key === datasetIpId) {
            return {
              'ui-services': acc['ui-services'].concat(filterServices(definition['ui-services'])),
              'catalog-services': acc['catalog-services'].concat(filterServices(definition['catalog-services'])),
            }
          }
          return acc
        }, { 'ui-services': [], 'catalog-services': [] })
        return { content }
      }
    }
  },
  PUT: {

  },
  POST: {

  },
  DELETE: {

  },
}

module.exports = {
  localServices,
}