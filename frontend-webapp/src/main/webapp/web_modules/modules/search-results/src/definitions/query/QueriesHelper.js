/**
* LICENSE_PLACEHOLDER
**/
import { TableSortOrders } from '@regardsoss/components'
import OpenSearchQuery from './opensearch/OpenSearchQuery'
import OpenSearchQueryParameter from './opensearch/OpenSearchQueryParameter'
import URLSearchQuery from './url/URLSearchQuery'
import URLSearchQueryParameter from './url/URLSearchQueryParameter'
import StaticQueryParameter from './common/StaticQueryParameter'


export function getSearchTagParameter(searchTag) {
  return new OpenSearchQueryParameter(OpenSearchQuery.TAGS_PARAM_NAME, searchTag)
}

export function getDatasetIpIdParameter(datasetIpId) {
  return new OpenSearchQueryParameter(OpenSearchQuery.TAGS_PARAM_NAME, datasetIpId)
}

/**
 * Returns open search query
 * @param rootSearchQuery root search query (optional)
 * @param facetFilters [{openSearchQuery}] facet filters, to be applied on result (optional)
 * @param otherParameters other query parameters (optional)
 * @returns open search query
 */
export function getOpenSearchQuery(rootSearchQuery, facettesFilters = [], otherParameters = []) {
  // compute all query parameters
  const openSearchParameters = [
    ...facettesFilters.map(({ openSearchQuery }) => new StaticQueryParameter(openSearchQuery)),
    ...otherParameters,
  ]

  return new OpenSearchQuery(rootSearchQuery, openSearchParameters)
}

/** Maps table sorting to open search sort keywords */
const tableToOpenSearchSort = {
  [TableSortOrders.ASCENDING_ORDER]: 'ASC',
  [TableSortOrders.DESCENDING_ORDER]: 'DESC',
}

/**
 * Returns URL query
 * @param sortingArray [{attributePath, type}] sorting array, where attribute is an attribute path and type is sorting type,
 * from table columns sorting types
 * @param facettesQuery facettes query, facettes to be provided on results (optional)
 * @return URL query
 */
export function getURLQuery(openSearchQuery, sortingArray = [], facettesQuery = '') {
  // specific query format: put parameter value in parenthesis (when available)
  const openSearchQueryText = openSearchQuery.toQueryString()
  const queryParamValue = openSearchQueryText && `(${openSearchQueryText})`
  const urlParameters = [
    // 1 - query parameter (q)
    new URLSearchQueryParameter(URLSearchQuery.QUERY_PARAMETER_NAME, queryParamValue),
    // 2 - sort parameters
    ...sortingArray.map((sorting) => {
      if (!sorting.attributePath || !sorting.type || !tableToOpenSearchSort[sorting.type]) {
        throw new Error('Invalid sorting parameter for query ', sorting)
      }
      const value = `${sorting.attributePath},${tableToOpenSearchSort[sorting.type]}`
      return new URLSearchQueryParameter(URLSearchQuery.SORT_PARAMETER_NAME, value)
    }),
    // 3 - facettes query
    new StaticQueryParameter(facettesQuery),
  ]

  return new URLSearchQuery('', urlParameters)
}

export default {
  getOpenSearchQuery,
  getURLQuery,
}

