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
  common: [
    {
      configId: 0,
      label: 'Do progress! (Cat.)',
      icon: 'https://d30y9cdsu7xlg0.cloudfront.net/png/593651-200.png',
      applicationModes: ['MANY'],
      entityTypes: ['COLLECTION', 'DATASET', 'DOCUMENT', 'DATA'],
      type: 'CATALOG',
      config: {}
    },
    {
      configId: 0,
      label: 'Selfish! (UI)',
      icon: 'https://image.flaticon.com/teams/slug/freepik.jpg',
      applicationModes: ['MANY'],
      entityTypes: ['COLLECTION', 'DATASET', 'DOCUMENT', 'DATA'],
      type: 'UI',
      config: {}
    },
    {
      configId: 1,
      label: 'Self destruct (Cat.)',
      icon: 'https://vignette3.wikia.nocookie.net/dirtybomb/images/f/f7/Dirty_Bomb_Icon.svg/revision/latest?cb=20151221234323',
      applicationModes: ['ONE'],
      entityTypes: ['COLLECTION', 'DATASET', 'DOCUMENT', 'DATA'],
      type: 'CATALOG',
      config: {}
    }],
  // cassini RPWS Native L1 data on test raph
  'URN:AIP:DATASET:test_raph:f8e8c56d-1d3e-45e1-b322-d20f135ef21b:V1': [{
    configId: 1,
    label: 'One sheep (UI/RPWS)',
    icon: 'http://www.clipartsfree.net/vector/large/pitr_Sheep_icon_Vector_Clipart.png',
    applicationModes: ['ONE'],
    entityTypes: ['DATA', 'DATASET'],
    type: 'UI',
    config: {}
  }, {
    configId: 2,
    label: 'Mix it (Cat./RPWS)',
    icon: 'https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_accessibility_white_24px.svg',
    applicationModes: ['MANY'],
    entityTypes: ['DATA'],
    type: 'CATALOG',
    config: {}
  }],
}


const localServices = {
  GET: {
    /** Provide catalog services */
    catalogServices: {
      url: 'rs-access-project/services',
      handler: (request, response, pathParams, { datasetIpId }) => {
        // Gather available request services (service app mode ignored - considered MANY)
        const content = _.flatMap(catalogServices, (services, key) =>
          key === 'common' || key === datasetIpId ?
            // filter definitions then map service to equivalent content / links resource object
            services.filter(s => s.applicationModes.includes('MANY')).map(s => ({ content: _.omit(s, 'config') })) :
            [])
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