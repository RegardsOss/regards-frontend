const _ = require('lodash')
const { logMessage, makePageResult, loadFile, loadJSONModelFile, JSON_CONTENT_TYPE } = require('./mock-front-utils')


const sourceCatalogFile = './mocks/front/resources/catalog.json'
// load catalog and modify entities to hold there model in model attribute, without type, instead of the ID only, and there type
const catalog = loadJSONModelFile(sourceCatalogFile)
catalog.entities = catalog.entities.map(entity => {
  // retrieve entity model
  const entityModel = catalog.modelTypes.find(m => m.id === entity.model.id)
  // delete type field in model
  const modelForRest = Object.assign({}, entityModel)
  delete modelForRest.type
  // add type and model fields in entity
  return Object.assign({}, entity, { model: modelForRest, entityType: entityModel.type })
})



/** Map the source file parameters to expected corresponding openSearchQuery parameter / value regexp and equality type */
const searchQueryParameters = {
  tags: {
    key: 'TAGS',
    modelField: 'tags',
    // check all tags are included in entity tags: must includ all tags
    equalityChecker: (fieldValue, values) => values.reduce((acc, value) => acc && fieldValue.includes(value), true),
  },
  model: {
    key: 'model.name',
    modelField: 'model',
    // check equal the entity model name matches one of searched model names
    equalityChecker: (fieldValue, values) => {
      return !!values.find(modelName => fieldValue.name === modelName)
    }
  }
}


const searchParameterSeparator = ' AND '
const searchParameterValueSeparator = ':'

function extractParameters(openSearchQuery) {
  const splitSearch = openSearchQuery.split(searchParameterSeparator)
  return splitSearch.reduce((params, parameterWithValue) => {
    // check parameter validity
    const splitParameter = parameterWithValue.split(searchParameterValueSeparator)
    if (splitParameter.length < 2) {
      logMessage(`Open search parameter value invalid: ${parameterWithValue}`, true, 'Search entities')
      return params
    }
    // get parameter (join back on ':' if it is part of the parameters), remove all escaping parameters ('\')
    const parameterValue = splitParameter.slice(1, splitParameter.length).join(':').replace(/\\/g, '')

    // find matching parameter
    const foundParameter = _.find(searchQueryParameters, ({ key }) => parameterWithValue.toLowerCase().startsWith(key.toLowerCase()))
    let levelReduced = {}
    if (!foundParameter) {
      logMessage(`Open search parameter not handled in ${parameterWithValue}`, true, 'Search entities')
    } else {
      const parameterValues = params[foundParameter.modelField] || {
        modelField: foundParameter.modelField,
        values: [],
        equalityChecker: foundParameter.equalityChecker,
      }

      parameterValues.values.push(parameterValue)

      levelReduced = { [foundParameter.modelField]: parameterValues }
    }
    return Object.assign(params, levelReduced)
  }, {})
}

function serveFilteredEntitiesPage(openSearchQuery, searchedType) {
  // get constraints in search
  const searchedValuesByParameter = extractParameters(openSearchQuery)
  // filter and index entities by there id (to make a page result)
  const matchingEntities = _.reduce(catalog.entities, (entitiesAcc, entity) => {
    if (entity.entityType === searchedType) {
      const matchAllParameters = _.reduce(searchedValuesByParameter,
        (acc, { modelField, equalityChecker, values }) => acc && equalityChecker(entity[modelField], values), true)
      if (matchAllParameters) {
        return Object.assign({ [entity.id]: entity }, entitiesAcc)
      }
    }
    // not matching type or open search query
    return entitiesAcc
  }, {})
  // convert entities to expected result format and make page 
  return makePageResult(matchingEntities, (object) => {
    const links = object.links || []
    const content = Object.assign({}, object)
    delete content.links // not in content part of the object
    return {
      content,
      links,
    }
  })
}

const serveModelAttributesAssociation = (request, params, { id }) => {
  const idAsNumber = parseInt(id, 10)
  const association = catalog.modelAttributesAssociations.find(assoc => assoc.modelId === idAsNumber)
  const model = catalog.modelTypes.find(({ id: modelId }) => modelId === idAsNumber)
  if (!association || !model) {
    return { code: 404 }
  }
  // convert to expected content for UI: assoc {
  const content = association.associations.map(assoc => ({
    content: Object.assign({
      model,
    }, assoc)
  }))
  return { code: 200, content, contentType: JSON_CONTENT_TYPE }
}

const serveEntityDescriptionFile = (request, params, { id }) => {
  const foundDescription = catalog.localDescriptions.find(({ entityIpId }) => entityIpId === id)
  if (!foundDescription) {
    return { code: 404 }
  }
  const filePath = `./mocks/front/resources/${foundDescription.file}`
  const binary = !foundDescription.contentType.includes('text')
  let content = binary ?
    loadFile(filePath) : // binary file
    loadFile(filePath, 'utf8') // text file
  return {
    code: 200,
    contentType: foundDescription.contentType,
    content,
    binary,
  }
}

retrieveEntityHandler = (request, params, { urn }) => {
  const found = catalog.entities.find(({ ipId }) => ipId === urn)
  if (found) {
    return {
      code: 200,
      content: {
        content: found,
      },
      contentType: JSON_CONTENT_TYPE,
    }
  }
  return { code: 404, contentType: JSON_CONTENT_TYPE }
}

module.exports = {
  GET: {
    collections: {
      url: 'rs-catalog/collections/search',
      handler: (request, { q }) => {
        // serving a fake error for cluster mission
        if (q.includes('TAGS:collection-mission-1')) {
          logMessage('Serving fake open search error for mission Cluster', true, 'Search collections')
          return { code: 500 }
        }
        logMessage(`Serving open search query "${q}"`, false, 'Search collections')
        return serveFilteredEntitiesPage(q, 'COLLECTION')
      },
    },
    datasets: {
      url: 'rs-catalog/datasets/search',
      handler: (request, { q }) => {
        logMessage(`Serving open search query "${q}"`, false, 'Search datasets')
        return serveFilteredEntitiesPage(q, 'DATASET')
      },
    },
    modelAttributesAssoc: {
      url: 'rs-dam/models/{id}/attributes',
      handler: serveModelAttributesAssociation,
    },
    collectionDescriptionFiles: {
      url: 'rs-dam/collection/{id}/file',
      handler: serveEntityDescriptionFile,
    },
    datasetDescriptionFiles: {
      url: 'rs-dam/dataset/{id}/file',
      handler: serveEntityDescriptionFile,
    },
    // used for URL tests in frontent (result module, ds=KIKO)
    getDatasetTemp: {
      url: 'rs-catalog/entities/{urn}',
      handler: retrieveEntityHandler,
    },
  },
}

