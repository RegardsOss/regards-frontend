const _ = require('lodash')
const { logMessage, makePageResult, loadJSONModelFile } = require('./mock-front-utils')


const sourceCatalogFile = './mocks/front/resources/catalog.json'
// load users pool
const catalog = loadJSONModelFile(sourceCatalogFile)

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
    // check equal to one of mentionned model name
    equalityChecker: (fieldValue, values) => values.includes(fieldValue),
  },
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
    const parameterValue = splitParameter[1]

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
    if (entity.type === searchedType) {
      const matchAllParameters = _.reduce(searchedValuesByParameter,
        (acc, { modelField, equalityChecker, values }) => acc && equalityChecker(entity[modelField], values),

        true)
      if (matchAllParameters) {
        return Object.assign({ [entity.id]: entity }, entitiesAcc)
      }
    }
    // not matching type or open search query
    return entitiesAcc
  }, {})
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
  },
}

