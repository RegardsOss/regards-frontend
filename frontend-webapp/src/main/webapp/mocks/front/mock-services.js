const { JSON_CONTENT_TYPE, logMessage, makePageResult, loadJSONModelFile } = require('./mock-front-utils')

const { businessServices, uiServices } = loadJSONModelFile('./mocks/front/resources/services.json')

function filterBusinessServices(serviceScope) {
  // convert
  return businessServices[serviceScope].map(service => ({
    content: service,
    links: [],
  }))
}

/**
 * Mocks runtime services for both UI (rs-access) and business (rs-catalog)
 */
function getBusinessServices(datasetIpId, serviceScope) {
  logMessage(`Serving business services for "${datasetIpId}" "${serviceScope}"`, false, 'Mock services')
  // we just ignore the dataset IP ID so far
  switch (serviceScope) {
    case 'QUERY':
    case 'MANY':
    case 'ONE':
      return { code: 200, content: filterBusinessServices(serviceScope), contentType: JSON_CONTENT_TYPE }
    default:
      return { code: 403 }
  }
}

function getUIServices(datasetIpId) {
  logMessage(`Serving UI services for "${datasetIpId}"`, false, 'Mock services')
  const content = uiServices.map(({ id, active, pluginId, label, conf }) => ({
    content: { id, active, pluginId, label, conf: JSON.stringify(conf) }, // the real backend returns conf as string
    links: [],
  }))
  return { code: 200, content, contentType: JSON_CONTENT_TYPE }
}


module.exports = {
  GET: {
    businessServices: {
      url: 'rs-catalog/services/{datasetIpId}',
      handler: (request, { service_scope }, { datasetIpId }) => getBusinessServices(datasetIpId, service_scope),
    },
    uiServices: {
      url: 'rs-access-project/services/{datasetIpId}',
      handler: (request, query, { datasetIpId }) => getUIServices(datasetIpId),
    }
  }
}


